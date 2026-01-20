import { Mail, Github, Linkedin, Facebook, Instagram, Twitter, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/shreejansapkota24-sudo", color: "hover:bg-gray-800 hover:text-white" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/", color: "hover:bg-blue-600 hover:text-white" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/shreejan.sapkota.319", color: "hover:bg-blue-500 hover:text-white" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/sapkota.shreejan/", color: "hover:bg-pink-500 hover:text-white" },
  { name: "X (Twitter)", icon: Twitter, href: "https://x.com/shreejansapkot4", color: "hover:bg-gray-900 hover:text-white" },
];

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
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
            <MessageCircle className="w-4 h-4" />
            Get in touch
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Contact Me</h2>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-muted-foreground text-lg mb-10">
            I'm always open to connecting with fellow developers, tech enthusiasts,
            and anyone interested in collaboration or just a friendly chat!
          </p>

          {/* Email Button */}
          <motion.div
            className="mb-12"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 px-8 py-6 text-base"
            >
              <a href="mailto:shreejansapkota24@gmail.com" className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                shreejansapkota24@gmail.com
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </a>
            </Button>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or find me on</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4 flex-wrap"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-4 bg-background border border-border rounded-2xl transition-all duration-300 ${link.color}`}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                <link.icon className="w-6 h-6 transition-colors duration-300" />

                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Text */}
          <motion.div
            className="mt-16 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-muted-foreground">
              <span className="text-foreground font-medium">Let's connect</span> and build something amazing together! 🚀
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
