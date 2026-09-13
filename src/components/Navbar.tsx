import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

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
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isHomePage) return null;

  const isDark = mounted && resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between gap-6">
        <a
          href="#home"
          className="font-display text-[17px]"
          style={{ color: "var(--white)" }}
          aria-label="Shreejan Sapkota — Home"
        >
          Shreejan Sapkota
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-mono-syne transition-colors duration-200"
              style={{ color: "var(--white2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white2)")}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md"
            style={{ border: "1px solid var(--line)", background: "var(--bg2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full pulse-soft" style={{ background: "var(--accent)" }} />
            <span className="font-mono-syne" style={{ color: "var(--white2)" }}>Available</span>
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className="h-9 w-9 rounded-md border-border bg-card text-foreground hover:bg-secondary hover:text-foreground"
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>
          <a href="#contact" className="btn-primary">Contact</a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="h-9 w-9 rounded-md border-border bg-card text-foreground hover:bg-secondary hover:text-foreground"
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-secondary hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-6" style={{ background: "var(--bg)" }}>
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
    </nav>
  );
};

export default Navbar;
