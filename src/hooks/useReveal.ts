import { useEffect } from "react";

const SELECTOR = ".fade-up, .reveal-left, .reveal-right, .reveal-scale";

/**
 * Reveals elements on scroll (fade-up / slide / scale variants).
 * Re-scans the DOM via MutationObserver so lazily rendered sections animate too.
 */
export function useReveal() {
  useEffect(() => {
    const seen = new WeakSet<Element>();

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("visible"));
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
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) el.classList.add("visible");
        else io.observe(el);
      });
    };

    requestAnimationFrame(scan);

    const mo = new MutationObserver(() => requestAnimationFrame(scan));
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
