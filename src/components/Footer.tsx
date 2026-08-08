import { ArrowUp, Mail } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#portfolio" },
  { name: "Opportunities", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  { name: "GitHub", icon: "devicon-github-original", href: "https://github.com/shreejansapkota24-sudo" },
  { name: "LinkedIn", icon: "devicon-linkedin-plain colored", href: "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/" },
  { name: "Facebook", icon: "devicon-facebook-plain colored", href: "https://www.facebook.com/shreejan.sapkota.319" },
  { name: "Instagram", svg: "instagram", href: "https://www.instagram.com/sapkota.shreejan/" },
  { name: "X", svg: "x", href: "https://x.com/shreejansapkot4" },
  { name: "Email", svg: "email", href: "mailto:shreejansapkota24@gmail.com" },
];

const Glyph = ({ kind }: { kind: string }) => {
  if (kind === "instagram")
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  if (kind === "x")
    return (
      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.844l-5.36-7.013L3.6 22H.84l6.98-7.974L1.5 2h6.99l4.84 6.4L18.244 2zm-1.2 18h1.65L7.05 4H5.33l11.715 16z" />
      </svg>
    );
  if (kind === "email") return <Mail size={14} />;
  return null;
};

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

        {/* Social links — bottom of the page */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={(e) => openExternal(e, s.href)}
              aria-label={s.name}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ border: "1px solid var(--line2)", color: "var(--white2)", background: "var(--bg3)" }}
            >
              <span className="w-4 inline-flex justify-center">
                {s.icon ? <i className={s.icon} style={{ fontSize: 15 }} /> : <Glyph kind={s.svg!} />}
              </span>
              <span className="font-mono-syne">{s.name}</span>
            </a>
          ))}
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <p className="text-[12px]" style={{ color: "var(--white3)" }}>
            © 2025 Shreejan Sapkota · Artificial Intelligence Student · Kathmandu, Nepal
          </p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 font-mono-syne transition-all duration-300 hover:text-[var(--accent)] hover:border-[var(--accent)] px-3 py-2"
            style={{ color: "var(--white2)", border: "1px solid var(--line2)" }}
          >
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
