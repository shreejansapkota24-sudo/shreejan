import { useEffect, useRef } from "react";

const TEXT_SELECTORS = "p, h1, h2, h3, h4, h5, h6, span, li, blockquote, label, textarea, input[type='text'], input[type='email'], input[type='search']";
const INTERACTIVE_SELECTORS = "a, button, [role='button'], summary, select, .group, [data-cursor='hover']";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !ringRef.current || !dotRef.current) return;
      const ringEl = ringRef.current;
      const dotEl = dotRef.current;
      ringEl.classList.remove("hovering", "text");
      dotEl.style.opacity = "1";

      if (target.closest(INTERACTIVE_SELECTORS)) {
        ringEl.classList.add("hovering");
        dotEl.style.opacity = "0";
      } else if (target.closest(TEXT_SELECTORS) && !target.closest(INTERACTIVE_SELECTORS)) {
        ringEl.classList.add("text");
      }
    };

    const onClick = () => {
      const ringEl = ringRef.current;
      if (!ringEl) return;
      ringEl.classList.remove("click");
      // Force reflow to restart animation
      void ringEl.offsetWidth;
      ringEl.classList.add("click");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onClick, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onClick);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
