import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "AI", href: "#cyber-saathi" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 cinematic-ease"
      style={{
        background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(14px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--sp-border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="font-display text-xl tracking-tight"
            style={{
              fontWeight: 600,
              color: "var(--sp-charcoal)",
              fontFamily: '"Playfair Display", serif',
              letterSpacing: "-0.02em",
            }}
            aria-label="Shreejan Sapkota — Home"
          >
            Shreejan<span style={{ color: "var(--sp-medium)" }}>.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {isHomePage &&
              navLinks.map((link) => (
                <a key={link.name} href={link.href} className="nav-link-underline">
                  {link.name}
                </a>
              ))}

            <Link to="/cyberguard/cyber-saathi">
              <button className="btn-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Chat with AI
              </button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-full transition-colors"
            style={{ color: "var(--sp-charcoal)" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pt-6 pb-2 cinematic-in">
            <div className="flex flex-col gap-5">
              {isHomePage &&
                navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-base"
                    style={{ color: "var(--sp-charcoal)", fontFamily: "Inter, sans-serif" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              <Link to="/cyberguard/cyber-saathi" onClick={() => setIsOpen(false)}>
                <button className="btn-mono w-full justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                  Chat with AI
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
