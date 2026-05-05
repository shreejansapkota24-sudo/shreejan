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
        scrolled ? "border-b border-[#1B2747]" : "border-b border-transparent"
      }`}
      style={{
        background: "rgba(8, 16, 31, 0.78)",
        backdropFilter: "blur(14px) saturate(140%)",
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-display tracking-[0.15em] uppercase"
            style={{ color: "#F0F0F0", fontWeight: 400 }}
          >
            SS<span style={{ color: "#888" }}>.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {isHomePage && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link-underline transition-colors duration-300"
                style={{ color: "#888", fontFamily: "'Space Mono', monospace" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F0F0F0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
              >
                {link.name}
              </a>
            ))}

            <Link to="/cyberguard/cyber-saathi">
              <button className="btn-mono">
                <Bot className="w-3.5 h-3.5" />
                Chat with AI
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-white/5"
            style={{ color: "#F0F0F0" }}
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
                  className="text-[11px] uppercase tracking-[0.1em] transition-colors duration-200"
                  style={{ color: "#888", fontFamily: "'Space Mono', monospace" }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}

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
