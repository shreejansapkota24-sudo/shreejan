import { GraduationCap, Code, Lightbulb, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const cards = [
    {
      icon: GraduationCap,
      title: "Education",
      content: [
        "Bachelor in Computer Science (Hons)",
        "IIMS College",
      ],
      highlight: "Expected Graduation: 2029",
    },
    {
      icon: Code,
      title: "Focus Areas",
      content: ["Algorithms, Data Structures, Problem Solving, Web Development"],
    },
    {
      icon: Lightbulb,
      title: "Mindset",
      content: ["Curious learner, future-oriented thinker, open to challenges"],
    },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            Get to know me
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <motion.p
                className="text-muted-foreground leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                I'm <span className="text-foreground font-semibold">Shreejan Sapkota</span>,
                a curious and driven Computer Science student with a deep passion for coding,
                algorithms, and technology. Every day brings a new opportunity to learn,
                explore, and create something meaningful.
              </motion.p>
              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                When I'm not immersed in code, you'll find me enjoying anime—drawing
                inspiration from creative storytelling and imaginative worlds. I believe
                the best solutions come from combining logical thinking with creative vision.
              </motion.p>
              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                I'm committed to continuous learning and growth, always seeking to expand
                my skills and take on new challenges in the ever-evolving tech landscape.
              </motion.p>
            </div>

            {/* Fun fact card */}
            <motion.div
              className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-medium">Fun fact:</span> My favorite anime inspires how I approach problem-solving — with creativity, persistence, and a never-give-up attitude! 🎌
              </p>
            </motion.div>
          </motion.div>

          {/* Education & Highlights */}
          <motion.div
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                className="group bg-background p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  >
                    <card.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {card.title}
                    </h3>
                    {card.content.map((text, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {text}
                      </p>
                    ))}
                    {card.highlight && (
                      <p className="text-primary text-sm font-medium mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
