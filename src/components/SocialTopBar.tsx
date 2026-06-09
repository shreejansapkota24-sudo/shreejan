import { Github, Linkedin, Facebook, Instagram } from "lucide-react";

const socials = [
  { name: "GitHub", href: "https://github.com/shreejansapkota24-sudo", icon: <Github size={12} /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/", icon: <Linkedin size={12} /> },
  {
    name: "X",
    href: "https://x.com/shreejansapkot4",
    icon: (
      <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.844l-5.36-7.013L3.6 22H.84l6.98-7.974L1.5 2h6.99l4.84 6.4L18.244 2z" />
      </svg>
    ),
  },
  { name: "Facebook", href: "https://www.facebook.com/shreejan.sapkota.319", icon: <Facebook size={12} /> },
  { name: "Instagram", href: "https://www.instagram.com/sapkota.shreejan/", icon: <Instagram size={12} /> },
];

const SocialTopBar = () => (
  <div
    className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center justify-center px-4"
    style={{ background: "#070707", borderBottom: "1px solid var(--line)" }}
  >
    <div className="flex items-center gap-5 md:gap-7">
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono-syne transition-all duration-300 hover:-translate-y-px hover:text-[var(--accent)]"
          style={{ color: "var(--white2)", fontSize: 10 }}
          aria-label={s.name}
        >
          {s.icon}
          <span className="hidden sm:inline">{s.name}</span>
        </a>
      ))}
    </div>
  </div>
);

export default SocialTopBar;
