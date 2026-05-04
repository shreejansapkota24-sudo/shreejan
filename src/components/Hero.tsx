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
      {/* Film slate intro */}
      {!introDone && (
        <>
          <div className="fixed inset-0 z-[100] bg-[#F5F5F7] pointer-events-none" style={{ animation: "opacity-pulse 0.6s ease-out forwards", animationFillMode: "forwards" }} />
          <div
            className="fixed left-0 right-0 top-1/2 h-px bg-[#6B5BFF] z-[101] pointer-events-none origin-left"
            style={{ animation: "slate-expand 0.6s cubic-bezier(0.16,1,0.3,1) forwards" }}
          />
          <div
            className="fixed left-0 right-0 top-0 h-1/2 bg-[#F5F5F7] z-[100] pointer-events-none"
            style={{ animation: "slate-split-top 0.55s cubic-bezier(0.7,0,0.84,0) 0.6s forwards" }}
          />
          <div
            className="fixed left-0 right-0 bottom-0 h-1/2 bg-[#F5F5F7] z-[100] pointer-events-none"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass font-mono text-[11px] uppercase tracking-[0.15em] mb-6"
                style={{ color: "#E8F4FD", borderColor: "rgba(168,216,240,0.25)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8D8F0] animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.p
              className="font-mono mb-3 tracking-[0.25em] uppercase text-[11px]"
              style={{ color: "#7A8FA6" }}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Hello, I'm
            </motion.p>

            <h1 className="font-display text-6xl md:text-8xl mb-6 leading-[1.05] tracking-tight">
              <span
                className="block clip-reveal"
                style={{ color: "#F0F6FF", fontWeight: 300, animationDelay: "1.7s" }}
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
              className="font-mono text-sm mb-4 pl-4 min-h-[1.5em]"
              style={{ color: "#C0C8D8", borderLeft: "1px solid rgba(168,216,240,0.4)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: introDone ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              "{typed}<span className="inline-block w-[2px] h-4 bg-[#A8D8F0] align-middle ml-0.5 animate-pulse" />"
            </motion.p>

            <motion.p
              className="mb-8 max-w-md leading-relaxed font-light"
              style={{ color: "#7A8FA6" }}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              A passionate Computer Science student exploring the depths of algorithms,
              problem-solving, and building meaningful technology solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Button
                asChild
                size="lg"
                className="font-mono text-[11px] uppercase tracking-[0.18em] hover-lift border-0"
                style={{
                  background: "linear-gradient(135deg, #5B9BD5, #A8D8F0)",
                  color: "#04080F",
                  fontWeight: 600,
                }}
              >
                <a href="#portfolio">View Portfolio</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-mono text-[11px] uppercase tracking-[0.18em] hover-lift bg-transparent backdrop-blur-md"
                style={{
                  border: "1px solid rgba(232,244,253,0.3)",
                  color: "#F0F6FF",
                }}
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.9, duration: 0.6 }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: "#7A8FA6" }}>
                Find me on
              </span>
              <div className="flex gap-3 flex-wrap">
                {socials.map((social, index) => {
                  const opensExternalSite = social.href.startsWith("http");
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={opensExternalSite ? "_blank" : undefined}
                      rel={opensExternalSite ? "noopener noreferrer" : undefined}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#C0C8D8",
                      }}
                      whileHover={{
                        scale: 1.12,
                        y: -2,
                        boxShadow: "0 0 16px rgba(91,155,213,0.25)",
                        borderColor: "rgba(168,216,240,0.5)",
                        color: "#A8D8F0",
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.0 + index * 0.08, duration: 0.4 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Arctic SS Avatar */}
          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group">
              {/* Outer halo */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(91,155,213,0.18) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.3)",
                }}
              />

              {/* Conic rotating ring */}
              <div
                className="absolute -inset-2 rounded-full group-hover:[animation-duration:3s]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, #5B9BD5 30%, #E8F4FD 50%, #5B9BD5 70%, transparent 100%)",
                  padding: "1.5px",
                  borderRadius: "50%",
                  animation: "conic-spin 12s linear infinite",
                }}
              >
                <div className="w-full h-full rounded-full" style={{ background: "#04080F" }} />
              </div>

              {/* Inner avatar */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1">
                <div
                  className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: "radial-gradient(circle, #0A1628 60%, #071020 100%)",
                    border: "1px solid rgba(168,216,240,0.15)",
                  }}
                >
                  <span
                    className="font-display text-7xl md:text-9xl"
                    style={{
                      fontWeight: 300,
                      color: "#E8F4FD",
                      textShadow: "0 0 30px rgba(168,216,240,0.6), 0 0 60px rgba(91,155,213,0.3)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    SS
                  </span>
                </div>
              </div>

              {/* Floating frosted cards */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(20px)",
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-2xl">💻</span>
              </motion.div>

              <motion.div
                className="absolute -top-4 -left-4 w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(20px)",
                }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-xl">⚡</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(20px)",
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-lg">🚀</span>
              </motion.div>
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
              color: "#C0C8D8",
              letterSpacing: "0.15em",
              animation: "opacity-pulse 2.5s ease-in-out infinite",
            }}
          >
            Scroll to explore
          </span>
          <div
            className="w-6 h-10 rounded-full flex justify-center p-2"
            style={{ border: "1px solid rgba(192,200,216,0.4)" }}
          >
            <motion.div
              className="w-1 h-1 rounded-full"
              style={{ background: "#A8D8F0", boxShadow: "0 0 6px rgba(168,216,240,0.6)" }}
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
