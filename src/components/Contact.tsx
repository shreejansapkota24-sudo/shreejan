import { Mail } from "lucide-react";
import { openExternal } from "@/lib/openExternal";

const socials = [
  { name: "GitHub", icon: "devicon-github-original", href: "https://github.com/shreejansapkota24-sudo" },
  { name: "LinkedIn", icon: "devicon-linkedin-plain colored", href: "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/" },
  { name: "Facebook", icon: "devicon-facebook-plain colored", href: "https://www.facebook.com/shreejan.sapkota.319" },
  { name: "Instagram", svg: "instagram", href: "https://www.instagram.com/sapkota.shreejan/" },
  { name: "X / Twitter", svg: "x", href: "https://x.com/shreejansapkot4" },
];

const Glyph = ({ kind }: { kind: string }) => {
  if (kind === "instagram")
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  if (kind === "x")
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.844l-5.36-7.013L3.6 22H.84l6.98-7.974L1.5 2h6.99l4.84 6.4L18.244 2zm-1.2 18h1.65L7.05 4H5.33l11.715 16z" />
      </svg>
    );
  return null;
};

const Contact = () => {
  return (
    <section id="contact" className="px-6 md:px-16 py-24 md:py-28" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-[720px] mx-auto text-center">
        <span className="eyebrow fade-up">Contact</span>
        <h2 className="mt-4 fade-up delay-1" style={{ fontSize: "clamp(30px,4vw,44px)" }}>
          Let's connect
        </h2>
        <p className="mt-4 fade-up delay-2 text-[15px] leading-[1.85]" style={{ color: "var(--white2)" }}>
          Best for inquiries, collaborations, and internship opportunities.
        </p>

        <a
          href="mailto:shreejansapkota24@gmail.com"
          className="fade-up delay-2 mt-8 inline-flex items-center gap-2.5 break-all font-display"
          style={{ fontSize: "clamp(18px,2.4vw,26px)", color: "var(--white)" }}
        >
          <Mail className="w-5 h-5 shrink-0" style={{ color: "var(--accent)" }} />
          shreejansapkota24@gmail.com
        </a>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5 fade-up delay-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => openExternal(e, s.href)}
              aria-label={s.name}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg transition-colors duration-200"
              style={{ border: "1px solid var(--line)", background: "var(--bg2)", color: "var(--white2)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--line2)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
            >
              <span className="w-4 inline-flex justify-center">
                {s.icon ? <i className={s.icon} style={{ fontSize: 16 }} /> : <Glyph kind={s.svg!} />}
              </span>
              <span className="font-mono-syne">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
