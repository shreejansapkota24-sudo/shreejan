import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bot, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Cyber Saathi", href: "#cyber-saathi" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
  { name: "Inquiry", href: "#inquiry" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 cinematic-ease ${
        scrolled ? "border-b border-[#242424]" : "border-b border-transparent"
      }`}
      style={{
        background: scrolled ? "rgba(10,10,10,0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="text-sm font-mono uppercase tracking-[0.25em] arctic-gradient-text"
            style={{ fontWeight: 600 }}
          >
            SS · Studio
          </a>

          <div className="hidden md:flex items-center gap-8">
            {isHomePage &&
              navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link-underline transition-colors duration-300"
                  style={{ color: "#9A9A9A" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF8A1E")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A9A")}
                >
                  {link.name}
                </a>
              ))}

            <Link
              to="/result-checker"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-mono transition-colors duration-200"
              style={{ color: "#FFB36B" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#FFB36B")}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Result Checker
            </Link>

            <Link to="/cyberguard/cyber-saathi">
              <button className="btn-mono">
                <Bot className="w-3.5 h-3.5" />
                Chat with AI
              </button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/5"
            style={{ color: "#F5F5F5" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden pt-4 pb-2 cinematic-in">
            <div className="flex flex-col gap-4">
              {isHomePage &&
                navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-[11px] uppercase tracking-[0.18em] font-mono transition-colors duration-200"
                    style={{ color: "#9A9A9A" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}

              <Link
                to="/result-checker"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-mono"
                style={{ color: "#FFB36B" }}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Result Checker
              </Link>

              <Link to="/cyberguard/cyber-saathi" onClick={() => setIsOpen(false)}>
                <button className="btn-mono">
                  <Bot className="w-3.5 h-3.5" />
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
