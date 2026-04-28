import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bot, BadgeCheck } from "lucide-react";
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
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-primary/10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-xl font-bold font-cyber text-primary text-glow">
            SS<span className="text-accent">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isHomePage && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:text-glow font-medium tracking-wide"
              >
                {link.name}
              </a>
            ))}

            <Link to="/license-check">
              <Button size="sm" variant="outline" className="gap-2 font-cyber text-xs border-primary/40 text-primary hover:bg-primary/10 hover:text-primary shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
                <BadgeCheck className="w-4 h-4" />
                License Check
              </Button>
            </Link>

            <Link to="/cyberguard/cyber-saathi">
              <Button size="sm" className="gap-2 font-cyber text-xs bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                <Bot className="w-4 h-4" />
                Chat with AI
              </Button>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col gap-4">
              {isHomePage && navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <Link to="/license-check" onClick={() => setIsOpen(false)}>
                <Button size="sm" variant="outline" className="gap-2 w-fit font-cyber text-xs border-primary/40 text-primary hover:bg-primary/10">
                  <BadgeCheck className="w-4 h-4" />
                  License Check
                </Button>
              </Link>

              <Link to="/cyberguard/cyber-saathi" onClick={() => setIsOpen(false)}>
                <Button size="sm" className="gap-2 w-fit font-cyber text-xs bg-primary text-primary-foreground">
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
