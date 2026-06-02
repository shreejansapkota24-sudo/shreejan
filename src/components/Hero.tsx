import { Github, Linkedin, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const socials = [
  { icon: Github, href: "https://github.com/shreejansapkota24-sudo", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/shreejan.sapkota.319", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/sapkota.shreejan/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/shreejansapkot4", label: "X (Twitter)" },
  { icon: Mail, href: "mailto:shreejansapkota24@gmail.com", label: "Email" },
];

const TAGLINE = "Computer Science Student • Technology Enthusiast";

const Hero = () => {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 1100);
    return () => clearTimeout(t);
  }, []);


  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-6 relative overflow-hidden arctic-noise"
    >
      {!introDone && (
        <>
          <div className="fixed inset-0 z-[100] bg-[#0A0A0A] pointer-events-none" />
          <div
            className="fixed left-0 right-0 top-1/2 h-px bg-white z-[101] pointer-events-none origin-left"
            style={{ animation: "slate-expand 0.6s cubic-bezier(0.16,1,0.3,1) forwards" }}
          />
          <div
            className="fixed left-0 right-0 top-0 h-1/2 bg-[#0A0A0A] z-[100] pointer-events-none"
            style={{ animation: "slate-split-top 0.55s cubic-bezier(0.7,0,0.84,0) 0.6s forwards" }}
          />
          <div
            className="fixed left-0 right-0 bottom-0 h-1/2 bg-[#0A0A0A] z-[100] pointer-events-none"
            style={{ animation: "slate-split-bottom 0.55s cubic-bezier(0.7,0,0.84,0) 0.6s forwards" }}
          />
        </>
      )}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob" style={{ top: "5%", right: "5%" }} />
        <div className="aurora-blob alt" style={{ bottom: "0%", left: "0%", animationDelay: "-7s" }} />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 glass font-mono text-[10px] uppercase tracking-[0.22em] mb-6 border-glow"
                style={{ color: "#E8D5A3", borderRadius: 999 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" style={{ boxShadow: "0 0 8px #C9A84C" }} />
                Available for opportunities
              </span>
            </motion.div>

            <motion.p
              className="font-mono mb-3 tracking-[0.3em] uppercase text-[10px]"
              style={{ color: "#5C5C5C" }}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Hello, I'm
            </motion.p>

            <h1 className="font-display text-6xl md:text-8xl mb-6 leading-[0.9] tracking-tight" style={{ fontFamily: '"Playfair Display","Cormorant Garamond",serif' }}>
              <span
                className="block clip-reveal"
                style={{ color: "#FFFFFF", fontWeight: 600, animationDelay: "1.7s", fontStyle: "italic" }}
              >
                Shreejan
              </span>
              <span
                className="block clip-reveal arctic-gradient-text"
                style={{ fontWeight: 700, animationDelay: "2.0s" }}
              >
                Sapkota
              </span>
            </h1>

            <motion.p
              className="font-mono text-[12px] mb-4 inline-block px-4 py-2"
              style={{ color: "#E8D5A3", border: "1px solid rgba(201,168,76,0.35)", borderRadius: 999, background: "rgba(201,168,76,0.04)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 10 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {TAGLINE}
            </motion.p>


            <motion.p
              className="mb-8 max-w-md leading-relaxed font-normal text-[13px]"
              style={{ color: "#9A9A9A" }}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              I design and build modern, efficient, and user-focused software solutions.
              Passionate about problem-solving, full-stack development, and emerging technologies,
              I am committed to creating impactful digital experiences and continuously expanding my technical expertise.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#portfolio"
                className="btn-mono hover-lift"
              >
                View Portfolio
              </a>
              <a href="#contact" className="btn-ghost-mono hover-lift">
                Contact Me
              </a>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9, duration: 0.6 }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{ color: "#5C5C5C" }}
              >
                Find me on
              </span>
              <div className="flex gap-2 flex-wrap">
                {socials.map((social, index) => {
                  const opensExternalSite = social.href.startsWith("http");
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={opensExternalSite ? "_blank" : undefined}
                      rel={opensExternalSite ? "noopener noreferrer" : undefined}
                      className="w-9 h-9 flex items-center justify-center transition-all duration-300 rounded-full"
                      style={{
                        background: "rgba(201,168,76,0.04)",
                        border: "1px solid rgba(201,168,76,0.25)",
                        color: "#E8D5A3",
                      }}
                      whileHover={{ y: -2, borderColor: "#C9A84C", color: "#FFFFFF", boxShadow: "0 0 18px rgba(201,168,76,0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.0 + index * 0.08, duration: 0.4 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-3.5 h-3.5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="profile-photo-wrap">
              <img
                id="hero-profile-photo"
                src={new URL("../assets/profile-themed.jpg", import.meta.url).href}
                alt="Shreejan Sapkota"
                className="profile-photo"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.6 }}
        >
          <span
            className="font-mono text-[10px] uppercase"
            style={{ color: "#888880", letterSpacing: "0.3em" }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-12 origin-top"
            style={{ background: "linear-gradient(180deg, #C9A84C, transparent)" }}
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
