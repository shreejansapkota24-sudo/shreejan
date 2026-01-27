import { FolderOpen, Shield, ExternalLink, Github, Link2, FileSearch, ScrollText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "CyberGuard",
    description: "A professional cybersecurity toolkit featuring URL phishing detection, file malware scanning with SHA-256 hash analysis, real-time threat logging, and SOC-style dashboard.",
    image: null,
    icon: Shield,
    tags: ["React", "TypeScript", "Tailwind", "Zustand", "Web Crypto API"],
    features: [
      { icon: Link2, label: "URL Scanner" },
      { icon: FileSearch, label: "File Scanner" },
      { icon: ScrollText, label: "Threat Logs" },
    ],
    liveUrl: "/cyberguard",
    isInternal: true,
    color: "from-emerald-500/20 to-primary/20",
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
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore my projects showcasing skills in web development, cybersecurity, and modern UI/UX design.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={cardVariants}>
              <Card className="group bg-background border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Project Preview */}
                    <div className={`relative min-h-[300px] bg-gradient-to-br ${project.color} flex items-center justify-center p-8`}>
                      <motion.div
                        className="relative z-10 p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-xl"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <project.icon className="w-16 h-16 text-primary mx-auto" />
                      </motion.div>
                      
                      {/* Feature Icons */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3">
                        {project.features.map((feature, index) => (
                          <motion.div
                            key={feature.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground border border-border"
                          >
                            <feature.icon className="w-3.5 h-3.5 text-primary" />
                            {feature.label}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-muted text-muted-foreground"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {project.isInternal ? (
                          <Link to={project.liveUrl}>
                            <Button className="gap-2">
                              <ExternalLink className="w-4 h-4" />
                              View Project
                            </Button>
                          </Link>
                        ) : (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <Button className="gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </Button>
                          </a>
                        )}
                        <Button variant="outline" className="gap-2" disabled>
                          <Github className="w-4 h-4" />
                          Source Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* More Projects Coming */}
        <motion.div
          className="mt-12 text-center"
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
            <FolderOpen className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground font-medium">
              More projects coming soon...
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
