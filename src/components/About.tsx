import { GraduationCap, Code, Lightbulb, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const cards = [
    { icon: GraduationCap, title: "Education", content: ["Bachelor in Computer Science (Hons)", "IIMS College"], highlight: "Expected Graduation: 2029" },
    { icon: Code, title: "Focus Areas", content: ["Algorithms, Data Structures, Problem Solving, Web Development"] },
    { icon: Lightbulb, title: "Mindset", content: ["Curious learner, future-oriented thinker, open to challenges"] },
  ];

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 glass border-glow font-mono text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "#FFD56A", borderRadius: 999 }}>
            <Sparkles className="w-3 h-3" />
            Get to know me
          </span>
          <h2 className="text-5xl md:text-7xl" style={{ fontFamily: '"Playfair Display",serif', fontWeight: 600, letterSpacing: "-0.02em" }}>
            <span style={{ fontStyle: "italic", color: "#FFFFFF" }}>About</span>{" "}
            <span className="arctic-gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="space-y-6">
              <motion.p className="text-muted-foreground leading-relaxed text-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                I am <span className="text-primary font-semibold text-glow">Shreejan Sapkota</span>, a dedicated Computer Science student with a strong foundation in programming, algorithms, and software engineering principles. My interests include full-stack web development, database systems, artificial intelligence, and cybersecurity.
              </motion.p>
              <motion.p className="text-muted-foreground leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                I enjoy transforming ideas into practical applications that solve real-world problems. Through academic study, personal projects, and continuous learning, I strive to strengthen both my technical and analytical skills.
              </motion.p>
              <motion.p className="text-muted-foreground leading-relaxed" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                I am motivated by the challenge of building scalable, reliable, and innovative technology solutions that deliver meaningful value.
              </motion.p>
            </div>
          </motion.div>

          <motion.div className="space-y-5" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {cards.map((card) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                className="group glass p-6 rounded-2xl border-glow hover:box-glow transition-all duration-500"
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                <div className="flex items-start gap-4">
                  <motion.div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-all duration-300 border border-primary/20" whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}>
                    <card.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{card.title}</h3>
                    {card.content.map((text, i) => (<p key={i} className="text-muted-foreground text-sm">{text}</p>))}
                    {card.highlight && (
                      <p className="text-primary text-sm font-medium mt-2 flex items-center gap-2 text-glow">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ boxShadow: "0 0 6px hsl(var(--primary) / 0.6)" }} />
                        {card.highlight}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
