import { Link, useLocation } from "react-router-dom";
import { Shield, LayoutDashboard, Link2, FileSearch, ScrollText, Info, Home, Globe, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/cyberguard", icon: LayoutDashboard },
  { name: "URL Scanner", href: "/cyberguard/url-scanner", icon: Link2 },
  { name: "File Scanner", href: "/cyberguard/file-scanner", icon: FileSearch },
  { name: "Threat Map", href: "/cyberguard/threat-map", icon: Globe },
  { name: "Cyber Saathi", href: "/cyberguard/cyber-saathi", icon: Bot },
  { name: "Threat Logs", href: "/cyberguard/threat-logs", icon: ScrollText },
  { name: "About", href: "/cyberguard/about", icon: Info },
];

const CyberGuardNavbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/cyberguard" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-lg bg-primary/20"
            >
              <Shield className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="text-xl font-bold text-foreground">
              Cyber<span className="text-primary">Guard</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Back to Portfolio */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 flex gap-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default CyberGuardNavbar;
