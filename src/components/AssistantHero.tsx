import { Bot, Sparkles, MessageSquare, Code2, BookOpen, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const capabilities = [
  { icon: MessageSquare, label: "Ask anything" },
  { icon: PenTool, label: "Writing help" },
  { icon: Code2, label: "Coding & debugging" },
  { icon: BookOpen, label: "Study help" },
];

const AssistantHero = () => {
  return (
    <section
      id="cyber-saathi"
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow text-primary font-medium text-sm mb-6 font-cyber">
            <Sparkles className="w-4 h-4" />
            My Personal AI Assistant
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-cyber text-glow mb-4">
            Meet <span className="text-primary text-glow-strong">Cyber Saathi</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A smart multipurpose AI assistant — chat, write, code, study, brainstorm.
            Ask anything, get clear answers powered by advanced AI.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="glass border-glow rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative bot icon */}
            <motion.div
              className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/5 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <Bot className="w-16 h-16 text-primary/30" />
            </motion.div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 box-glow"
                  animate={{
                    boxShadow: [
                      "0 0 20px hsl(var(--primary) / 0.3)",
                      "0 0 40px hsl(var(--primary) / 0.6)",
                      "0 0 20px hsl(var(--primary) / 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="w-7 h-7 text-primary" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold font-cyber text-foreground">Cyber Saathi</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Online · Ready to help
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.label}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl glass border border-primary/10 hover:border-primary/40 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ y: -3, scale: 1.03 }}
                  >
                    <cap.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-medium text-foreground">{cap.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 font-cyber text-sm w-full sm:w-auto group"
                >
                  <Link to="/cyberguard/cyber-saathi">
                    Start Chatting
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground font-cyber">
                  <span className="text-primary">7 free messages</span> per day · No login required
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AssistantHero;
