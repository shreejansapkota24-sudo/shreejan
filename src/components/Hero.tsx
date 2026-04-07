import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-6 relative overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow text-primary font-medium text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.p
              className="text-primary font-semibold mb-3 tracking-widest uppercase text-sm font-cyber text-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight font-cyber"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Shreejan{" "}
              <span className="text-primary text-glow-strong relative">
                Sapkota
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-primary/50 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                  style={{ boxShadow: "0 0 10px hsl(var(--primary) / 0.5)" }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground mb-3 italic border-l-2 border-primary/40 pl-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              "Coder by day, anime enthusiast by night."
            </motion.p>

            <motion.p
              className="text-muted-foreground mb-8 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              A passionate Computer Science student exploring the depths of algorithms,
              problem-solving, and building meaningful technology solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 font-cyber text-sm"
              >
                <a href="#portfolio">View Portfolio</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 hover:-translate-y-0.5 font-cyber text-sm text-primary"
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <span className="text-sm text-muted-foreground">Find me on</span>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:shreejansapkota24@gmail.com", label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full glass border-glow flex items-center justify-center text-muted-foreground hover:text-primary hover:box-glow-strong transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Cyber SS Logo */}
          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />

              {/* Rotating hex border */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  background: `conic-gradient(from 0deg, hsl(var(--primary) / 0.6), transparent 30%, hsl(var(--accent) / 0.3), transparent 60%, hsl(var(--primary) / 0.6))`,
                  padding: "2px",
                  borderRadius: "50%",
                }}
              />

              {/* Counter-rotating ring */}
              <motion.div
                className="absolute -inset-6 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{
                  background: `conic-gradient(from 180deg, hsl(var(--accent) / 0.3), transparent 40%, hsl(var(--primary) / 0.2), transparent 80%)`,
                  padding: "1px",
                  borderRadius: "50%",
                }}
              />

              {/* Main container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden border-2 border-primary/20 box-glow">
                  <motion.div
                    className="w-full h-full rounded-full flex items-center justify-center relative"
                    style={{
                      background: "radial-gradient(circle at center, hsl(var(--primary) / 0.08) 0%, hsl(var(--background)) 70%)",
                    }}
                  >
                    {/* Glitch layers */}
                    <motion.span
                      className="absolute text-6xl md:text-8xl font-black font-cyber text-primary/20"
                      animate={{
                        x: [0, -2, 2, 0],
                        opacity: [0, 0.3, 0, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 1] }}
                    >
                      SS
                    </motion.span>
                    <motion.span
                      className="absolute text-6xl md:text-8xl font-black font-cyber"
                      style={{ color: "hsl(var(--accent) / 0.15)" }}
                      animate={{
                        x: [0, 2, -2, 0],
                        opacity: [0, 0.3, 0, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, times: [0, 0.46, 0.51, 1] }}
                    >
                      SS
                    </motion.span>

                    {/* Main SS text */}
                    <motion.span
                      className="text-6xl md:text-8xl font-black font-cyber text-primary text-glow-strong relative z-10"
                      animate={{ 
                        filter: [
                          "brightness(1) drop-shadow(0 0 15px hsl(var(--primary) / 0.5))",
                          "brightness(1.3) drop-shadow(0 0 30px hsl(var(--primary) / 0.8))",
                          "brightness(1) drop-shadow(0 0 15px hsl(var(--primary) / 0.5))",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ animation: "float 6s ease-in-out infinite" }}
                    >
                      SS
                    </motion.span>
                  </motion.div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 glass border-glow rounded-2xl flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-2xl">💻</span>
              </motion.div>

              <motion.div
                className="absolute -top-4 -left-4 w-14 h-14 glass border-glow rounded-2xl flex items-center justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-xl">⚡</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 w-12 h-12 glass border-glow rounded-xl flex items-center justify-center"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-lg">🚀</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-xs text-muted-foreground font-medium font-cyber tracking-wider">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ boxShadow: "0 0 6px hsl(var(--primary) / 0.6)" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
