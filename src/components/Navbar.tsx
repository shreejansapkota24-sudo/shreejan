import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LogOut, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
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
          <div className="hidden md:flex items-center gap-8">
            {isHomePage && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:text-glow font-medium tracking-wide"
              >
                {link.name}
              </a>
            ))}
            
            <Link to="/matrix">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10">
                <Pill className="w-4 h-4" />
                Matrix
              </Button>
            </Link>
            
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm" className="gap-2 font-cyber text-xs">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
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
              
              <Link to="/matrix" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary w-fit">
                  <Pill className="w-4 h-4" />
                  Matrix
                </Button>
              </Link>
              
              {user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="gap-2 w-fit border-primary/30 text-primary"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="default" size="sm" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
