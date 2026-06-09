import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#portfolio" },
  { name: "Opportunities", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isHomePage) return null;

  return (
    <nav
      className="fixed left-0 right-0 z-50 transition-all duration-500"
      style={{
        top: 36,
        background: scrolled ? "rgba(10,10,10,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-16 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="font-display text-xl tracking-tight"
            style={{ color: "var(--white)" }}
            aria-label="Shreejan Sapkota — Home"
          >
            Shreejan<span style={{ color: "var(--accent)" }}>.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono-syne transition-colors duration-300 hover:text-[var(--accent)]"
                style={{ color: "var(--white2)" }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5" style={{ border: "1px solid var(--line2)" }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-soft" style={{ background: "#22c55e" }} />
            <span className="font-mono-syne" style={{ color: "var(--white2)" }}>Available for opportunities</span>
          </div>

          <button
            className="md:hidden p-2"
            style={{ color: "var(--white)" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pt-6 pb-2">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-mono-syne"
                  style={{ color: "var(--white)" }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
