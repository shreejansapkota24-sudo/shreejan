import { ArrowUpRight, Mail } from "lucide-react";

const socials = [
  { name: "GitHub", icon: "devicon-github-original", href: "https://github.com/shreejansapkota24-sudo" },
  { name: "LinkedIn", icon: "devicon-linkedin-plain colored", href: "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/" },
  { name: "Facebook", icon: "devicon-facebook-plain colored", href: "https://www.facebook.com/shreejan.sapkota.319" },
  { name: "Instagram", svg: "instagram", href: "https://www.instagram.com/sapkota.shreejan/" },
  { name: "X / Twitter", svg: "x", href: "https://x.com/shreejansapkot4" },
  { name: "Email", svg: "email", href: "mailto:shreejansapkota24@gmail.com" },
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
  if (kind === "email")
    return <Mail size={14} />;
  return null;
};

const Contact = () => {
  return (
    <section id="contact" className="px-6 md:px-16 py-28 md:py-36">
      <div className="max-w-[1320px] mx-auto">
        <span className="eyebrow fade-up">— Contact</span>
        <h2 className="mt-6 fade-up delay-1 leading-[0.95]" style={{ fontSize: "clamp(48px,9vw,128px)" }}>
          <span className="block">LET'S</span>
          <span
            className="block"
            style={{
              fontWeight: 300, textTransform: "lowercase",
              background: "var(--gradient-text)", WebkitBackgroundClip: "text",
              backgroundClip: "text", color: "transparent",
            }}
          >
            connect.
          </span>
        </h2>

        <div className="mt-16 grid lg:grid-cols-2" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          {/* Email block */}
          <a
            href="mailto:shreejansapkota24@gmail.com"
            className="fade-up group relative p-10 md:p-14 transition-all duration-500 hover:bg-[var(--bg2)]"
            style={{ borderRight: "1px solid var(--line)" }}
          >
            <span className="font-mono-syne block mb-6" style={{ color: "var(--white3)" }}>Email</span>
            <p
              className="font-display break-all leading-[1.05]"
              style={{ fontSize: "clamp(24px,3.6vw,44px)", color: "var(--white)" }}
            >
              shreejansapkota24@gmail.com
            </p>
            <p className="mt-6 text-[14px]" style={{ color: "var(--white2)" }}>
              Best for inquiries, collaborations, and opportunities.
            </p>
            <div
              className="absolute bottom-8 right-8 w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:bg-[var(--accent)] group-hover:rotate-45 group-hover:border-[var(--accent)]"
              style={{ border: "1px solid var(--line2)", color: "var(--white)" }}
            >
              <ArrowUpRight className="w-5 h-5" style={{ color: "var(--bg)" }} />
            </div>
          </a>

          {/* Socials */}
          <div className="p-6 md:p-10">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.name}
                className="fade-up group flex items-center justify-between px-5 py-5 transition-all duration-300 hover:translate-x-1"
                style={{ borderBottom: "1px solid var(--line)", boxShadow: "inset 0 0 0 var(--accent)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "inset 2px 0 0 var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 var(--accent)")}
              >
                <span className="flex items-center gap-4 text-[15px] transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: "var(--white)" }}>
                  <span className="w-5 inline-flex justify-center">
                    {s.icon ? <i className={s.icon} style={{ fontSize: 16 }} /> : <Glyph kind={s.svg!} />}
                  </span>
                  {s.name}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[var(--accent)]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
