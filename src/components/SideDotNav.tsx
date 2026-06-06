import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "portfolio", label: "Projects" },
  { id: "services", label: "Opportunities" },
  { id: "contact", label: "Contact" },
  { id: "inquiry", label: "Inquiry" },
];

const SideDotNav = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav
      className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4"
      aria-label="Section navigation"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            className="group relative flex items-center justify-end"
          >
            <span
              className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono-syne whitespace-nowrap"
              style={{ color: "var(--accent)" }}
            >
              {s.label}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                background: isActive ? "var(--accent)" : "var(--line2)",
                boxShadow: isActive ? "0 0 12px var(--accent)" : "none",
              }}
            />
          </a>
        );
      })}
    </nav>
  );
};

export default SideDotNav;
