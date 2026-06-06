import { ArrowUp } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--line)" }} className="px-6 md:px-16 py-14">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <a href="#home" className="font-display text-2xl" style={{ color: "var(--white)" }}>
            SHREEJAN<span style={{ color: "var(--accent)" }}>.</span>
          </a>
          <nav className="hidden md:flex gap-8">
            {navLinks.map((l) => (
              <a key={l.name} href={l.href} className="nav-link-underline">{l.name}</a>
            ))}
          </nav>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <p className="text-[12px]" style={{ color: "var(--white3)" }}>
            © 2025 Shreejan Sapkota · Built with curiosity from Kathmandu
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 font-mono-syne transition-colors duration-300 hover:text-[var(--accent)]"
            style={{ color: "var(--white2)" }}
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
