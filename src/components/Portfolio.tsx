import { FolderOpen, Clock, Sparkles, Code2, BookOpen, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const placeholderProjects = [
  {
    icon: Code2,
    title: "Algorithm Projects",
    description: "Data structures & algorithms practice",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: BookOpen,
    title: "Coursework",
    description: "Academic programming assignments",
    color: "from-green-500/20 to-green-500/5",
  },
  {
    icon: Rocket,
    title: "Personal Projects",
    description: "Side projects & experiments",
    color: "from-purple-500/20 to-purple-500/5",
  },
];

const Portfolio = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="portfolio" className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
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
            <FolderOpen className="w-4 h-4" />
            My Work
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Portfolio</h2>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full mb-4 border border-primary/20"
            animate={{
              boxShadow: [
                "0 0 0 0 hsl(var(--primary) / 0)",
                "0 0 0 10px hsl(var(--primary) / 0.1)",
                "0 0 0 0 hsl(var(--primary) / 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Academic & Practice Projects Coming Soon</span>
          </motion.div>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Currently building my portfolio through coursework, coding exercises,
            and hands-on practice projects. Stay tuned for updates!
          </p>
        </motion.div>

        {/* Placeholder Project Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {placeholderProjects.map((project, index) => (
            <motion.div key={project.title} variants={cardVariants}>
              <Card className="group bg-background border-2 border-dashed border-muted hover:border-primary/40 transition-all duration-500 overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center justify-center min-h-[250px] relative">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <motion.div
                    className="relative z-10 p-5 bg-muted rounded-2xl mb-5 group-hover:bg-primary/10 transition-colors duration-300"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <project.icon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </motion.div>

                  <h3 className="relative z-10 font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="relative z-10 text-sm text-muted-foreground text-center">
                    {project.description}
                  </p>

                  <motion.span
                    className="relative z-10 mt-4 text-xs text-primary/60 font-medium uppercase tracking-wider"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Coming Soon
                  </motion.span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Current Activities */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-background border border-border rounded-full shadow-lg"
            whileHover={{ scale: 1.05, y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground font-medium">
              Currently practicing algorithms & building small projects
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
