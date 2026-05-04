import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bot } from "lucide-react";
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
        scrolled ? "border-b border-[rgba(10,10,15,0.08)]" : "border-b border-transparent"
      }`}
      style={{
        background: "rgba(245, 245, 247, 0.72)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl font-display font-bold arctic-gradient-text tracking-tight">
            SS<span>.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {isHomePage && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link-underline text-sm font-medium tracking-tight transition-colors duration-300"
                style={{ color: "var(--iri-text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A0F")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--iri-text-muted)")}
              >
                {link.name}
              </a>
            ))}

            <Link to="/cyberguard/cyber-saathi">
              <Button
                size="sm"
                className="gap-2 font-mono text-[11px] uppercase tracking-[0.15em] hover-lift border-0 text-white"
                style={{
                  background: "linear-gradient(135deg, #6B5BFF 0%, #8B6BFF 50%, #FF6BD5 100%)",
                }}
              >
                <Bot className="w-4 h-4" />
                Chat with AI
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#0A0A0F] hover:bg-black/5"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 cinematic-in">
            <div className="flex flex-col gap-4">
              {isHomePage && navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium tracking-tight transition-colors duration-200"
                  style={{ color: "var(--iri-text-muted)" }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <Link to="/cyberguard/cyber-saathi" onClick={() => setIsOpen(false)}>
                <Button
                  size="sm"
                  className="gap-2 w-fit font-mono text-[11px] uppercase tracking-[0.15em] border-0 text-white"
                  style={{
                    background: "linear-gradient(135deg, #6B5BFF 0%, #8B6BFF 50%, #FF6BD5 100%)",
                  }}
                >
                  <Bot className="w-4 h-4" />
                  Chat with AI
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
