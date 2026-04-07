import { Briefcase, GraduationCap, Users, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const opportunities = [
  { icon: GraduationCap, title: "Internships", description: "Open to learning opportunities and internship positions" },
  { icon: Users, title: "Collaborations", description: "Interested in project collaborations and team experiences" },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow text-primary font-medium text-sm mb-4" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Briefcase className="w-4 h-4" />
            Opportunities
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground font-cyber text-glow">Services</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card className="glass border-glow overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />

                <motion.div className="relative z-10 inline-flex p-5 glass border-glow rounded-2xl mb-6" whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                  <Briefcase className="w-10 h-10 text-muted-foreground" />
                </motion.div>

                <h3 className="relative z-10 text-2xl font-bold text-foreground mb-3 font-cyber">Currently Not Offering Services</h3>
                <p className="relative z-10 text-muted-foreground mb-10 max-w-md mx-auto">As a student, I'm focused on learning and building my skills. However, I'm always open to new opportunities!</p>

                <div className="relative z-10 grid md:grid-cols-2 gap-5">
                  {opportunities.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="group p-6 glass rounded-2xl border-glow hover:box-glow transition-all duration-500 cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <motion.div className="p-3 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors duration-300 border border-primary/20" whileHover={{ scale: 1.1 }}>
                          <item.icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</span>
                        <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div className="relative z-10 mt-10 flex items-center justify-center gap-2 text-primary" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium text-glow">Let's grow together</span>
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
