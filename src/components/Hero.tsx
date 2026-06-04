import { Github, Linkedin, Mail, Facebook, Instagram, Twitter, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Github, href: "https://github.com/shreejansapkota24-sudo", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/shreejan.sapkota.319", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/sapkota.shreejan/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/shreejansapkot4", label: "X (Twitter)" },
  { icon: Mail, href: "mailto:shreejansapkota24@gmail.com", label: "Email" },
];

const easing = [0.16, 1, 0.3, 1] as const;

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-28 pb-20 px-6 relative arctic-noise"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <motion.span
              className="eyebrow mb-8 inline-flex"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing }}
            >
              Available for opportunities
            </motion.span>

            <h1
              className="mb-6 leading-[1.02] tracking-tight"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 500,
                fontSize: "clamp(48px, 7vw, 88px)",
                color: "var(--sp-charcoal)",
                letterSpacing: "-0.025em",
              }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: easing }}
              >
                Shreejan
              </motion.span>
              <motion.span
                className="block"
                style={{ fontStyle: "italic", color: "var(--sp-mid-dark)" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: easing }}
              >
                Sapkota.
              </motion.span>
            </h1>

            <motion.p
              className="mb-3 text-base"
              style={{ color: "var(--sp-mid-dark)", fontWeight: 500 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: easing }}
            >
              Computer Science Student · Aspiring Data Scientist
            </motion.p>

            <motion.p
              className="mb-10 max-w-xl text-[15px] leading-relaxed"
              style={{ color: "var(--sp-mid)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: easing }}
            >
              Pursuing BCS (Hons) at IIMS in Kathmandu — building strong foundations
              in programming, databases, and modern web development, with a growing
              focus on Data Science.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: easing }}
            >
              <a href="#portfolio" className="btn-mono">View Projects</a>
              <a href="#contact" className="btn-ghost-mono">Get in Touch</a>
            </motion.div>

            <motion.div
              className="flex items-center gap-5 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <span className="font-mono-label">Connect</span>
              <div className="flex gap-1">
                {socials.map((social) => {
                  const external = social.href.startsWith("http");
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300"
                      style={{ color: "var(--sp-mid)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sp-charcoal)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sp-mid)")}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: easing }}
          >
            <div className="profile-photo-wrap">
              <img
                src={new URL("../assets/profile-themed.jpg", import.meta.url).href}
                alt="Shreejan Sapkota — Computer Science Student"
                className="profile-photo"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          className="mt-20 hidden md:inline-flex items-center gap-2 text-xs"
          style={{ color: "var(--sp-mid)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.22em", textTransform: "uppercase" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          aria-label="Scroll to About section"
        >
          Scroll
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
