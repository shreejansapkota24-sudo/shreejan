import { motion } from "framer-motion";
import { Shield, Link2, FileSearch, Database, Lock, Zap, Users, Github, Linkedin, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CyberGuardNavbar from "@/components/cyberguard/CyberGuardNavbar";

const features = [
  {
    icon: Link2,
    title: "URL Threat Analysis",
    description: "Advanced phishing detection using pattern matching, blacklist verification, and heuristic analysis.",
  },
  {
    icon: FileSearch,
    title: "Malware Detection",
    description: "SHA-256 hash-based file scanning against known malware signature databases.",
  },
  {
    icon: Database,
    title: "Threat Intelligence",
    description: "Continuously updated threat feeds and Indicators of Compromise (IoC) database.",
  },
  {
    icon: Lock,
    title: "Real-time Monitoring",
    description: "Live threat logging and security event tracking for incident response.",
  },
  {
    icon: Zap,
    title: "Risk Scoring",
    description: "Dynamic risk assessment with 0-100 scoring based on multiple threat indicators.",
  },
  {
    icon: Users,
    title: "SOC-Ready Interface",
    description: "Professional Security Operations Center dashboard designed for analysts.",
  },
];

const techStack = [
  "React 18",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Zustand",
  "Web Crypto API",
];

const About = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <CyberGuardNavbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center"
          >
            <Shield className="w-10 h-10 text-primary" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary">CyberGuard</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A professional-grade cybersecurity toolkit designed for threat detection, 
            malware analysis, and security operations monitoring.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Core Capabilities
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-card border-border h-full hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-center">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Card className="bg-amber-500/10 border-amber-500/30">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-amber-500 mb-2">⚠️ Educational Purpose</h3>
              <p className="text-sm text-muted-foreground">
                CyberGuard is a portfolio demonstration project showcasing cybersecurity concepts 
                and modern web development practices. The threat detection uses simulated data 
                and should not be used as a replacement for professional security tools in 
                production environments.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Built by <span className="text-primary font-medium">Sai Sravan</span>
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default About;
