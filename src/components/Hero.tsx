import { Github, Linkedin, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const TAGLINE = "Coder by day, anime enthusiast by night.";

const Hero = () => {
  const [introDone, setIntroDone] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!introDone) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TAGLINE.slice(0, i));
      if (i >= TAGLINE.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [introDone]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-6 relative overflow-hidden arctic-noise"
    >
      {/* Film slate intro (mono dark) */}
      {!introDone && (
        <>
          <div className="fixed inset-0 z-[100] bg-[#08101F] pointer-events-none" />
          <div
            className="fixed left-0 right-0 top-1/2 h-px bg-[#FF7A45] z-[101] pointer-events-none origin-left"
            style={{ animation: "slate-expand 0.6s cubic-bezier(0.16,1,0.3,1) forwards" }}
          />
          <div
            className="fixed left-0 right-0 top-0 h-1/2 bg-[#08101F] z-[100] pointer-events-none"
            style={{ animation: "slate-split-top 0.55s cubic-bezier(0.7,0,0.84,0) 0.6s forwards" }}
          />
          <div
            className="fixed left-0 right-0 bottom-0 h-1/2 bg-[#08101F] z-[100] pointer-events-none"
            style={{ animation: "slate-split-bottom 0.55s cubic-bezier(0.7,0,0.84,0) 0.6s forwards" }}
          />
        </>
      )}

      {/* Aurora background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob" style={{ top: "5%", right: "5%" }} />
        <div className="aurora-blob alt" style={{ bottom: "0%", left: "0%", animationDelay: "-7s" }} />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 glass font-mono text-[10px] uppercase tracking-[0.2em] mb-6"
                style={{ color: "var(--nav-text-muted)", borderRadius: 2 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A45] animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.p
              className="font-mono mb-3 tracking-[0.3em] uppercase text-[10px]"
              style={{ color: "var(--nav-text-faint)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Hello, I'm
            </motion.p>

            <h1 className="font-display text-6xl md:text-8xl mb-6 leading-[0.9] tracking-tight">
              <span
                className="block clip-reveal"
                style={{ color: "var(--nav-text)", fontWeight: 400, fontStyle: "italic", animationDelay: "1.7s" }}
              >
                Shreejan
              </span>
              <span
                className="block clip-reveal arctic-gradient-text"
                style={{ fontWeight: 600, animationDelay: "2.0s" }}
              >
                Sapkota
              </span>
            </h1>

            <motion.p
              className="font-mono text-[13px] mb-4 pl-4 min-h-[1.5em]"
              style={{ color: "var(--nav-text)", borderLeft: "1px solid #FF7A45" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: introDone ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              "{typed}<span className="inline-block w-[2px] h-4 bg-[#FF7A45] align-middle ml-0.5 animate-pulse" />"
            </motion.p>

            <motion.p
              className="mb-8 max-w-md leading-relaxed font-normal text-[13px]"
              style={{ color: "var(--nav-text-muted)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              A passionate Computer Science student exploring the depths of algorithms,
              problem-solving, and building meaningful technology solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <a href="#portfolio" className="btn-mono hover-lift" style={{ background: "var(--accent-orange)", color: "var(--nav-bg)", borderColor: "var(--accent-orange)" }}>
                View Portfolio
              </a>
              <a href="#contact" className="btn-ghost-mono hover-lift">
                Contact Me
              </a>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9, duration: 0.6 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--nav-text-faint)" }}>
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
                      className="w-9 h-9 flex items-center justify-center transition-all duration-300"
                      style={{
                        background: "transparent",
                        border: "1px solid var(--nav-border)",
                        color: "var(--nav-text-muted)",
                        borderRadius: 2,
                      }}
                      whileHover={{
                        y: -2,
                        borderColor: "#FF7A45",
                        color: "#FF7A45",
                      }}
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

          {/* Profile photo with rotating gradient border + float */}
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.6 }}
        >
          <span
            className="font-mono text-[10px] uppercase"
            style={{
              color: "var(--nav-text-faint)",
              letterSpacing: "0.3em",
              animation: "opacity-pulse 2.5s ease-in-out infinite",
            }}
          >
            Scroll
          </span>
          <div
            className="w-5 h-9 flex justify-center p-1.5"
            style={{ border: "1px solid var(--nav-border)", borderRadius: 12 }}
          >
            <motion.div
              className="w-0.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-orange)" }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
