import { useEffect } from "react";

/**
 * Adds .visible to every .fade-up element when it enters the viewport.
 * Idempotent — safe to mount multiple times.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".fade-up"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Auto-reveal anything already in viewport at mount (e.g. hero)
    requestAnimationFrame(() => {
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) el.classList.add("visible");
      });
    });

    return () => io.disconnect();
  }, []);
}
