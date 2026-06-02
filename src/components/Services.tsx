import { Briefcase, GraduationCap, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

const opportunities = [
  { icon: GraduationCap, title: "Internships", description: "Open to learning opportunities and internship positions." },
  { icon: Users, title: "Collaborations", description: "Interested in project collaborations and team experiences." },
];

const Services = () => {
  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 glass font-mono text-[10px] uppercase tracking-[0.3em] mb-6"
            style={{ color: "#E8D5A3", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 999 }}
          >
            <Briefcase className="w-3 h-3" />
            Opportunities
          </span>
          <h2
            className="text-5xl md:text-6xl"
            style={{ fontFamily: '"Playfair Display",serif', fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            <span style={{ fontStyle: "italic", color: "#F5F5F0" }}>Services</span>{" "}
            <span className="arctic-gradient-text">& Collaboration</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="p-10 md:p-14 text-center relative"
          style={{
            background: "#111111",
            border: "2px dashed rgba(201,168,76,0.4)",
            borderRadius: 24,
          }}
        >
          <motion.div
            className="inline-flex p-5 rounded-2xl mb-6"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.25)",
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Briefcase className="w-9 h-9" style={{ color: "#C9A84C" }} />
          </motion.div>

          <h3
            className="text-2xl md:text-3xl mb-4"
            style={{
              fontFamily: '"Playfair Display",serif',
              fontWeight: 600,
              color: "#F5F5F0",
              letterSpacing: "-0.01em",
            }}
          >
            Currently Not Offering Services
          </h3>
          <p className="max-w-md mx-auto mb-10 text-[14px] leading-relaxed" style={{ color: "#888880" }}>
            As a student, I'm focused on learning and building my skills. However, I'm always open to new opportunities!
          </p>

          <div className="grid md:grid-cols-2 gap-5 text-left">
            {opportunities.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(201,168,76,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-2.5 rounded-lg flex-shrink-0"
                    style={{
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.25)",
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: "#C9A84C" }} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1" style={{ color: "#F5F5F0", fontFamily: '"Inter",sans-serif' }}>
                      {item.title}
                    </h4>
                    <p className="text-[13px]" style={{ color: "#888880" }}>{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "#C9A84C" }}>
            <Heart className="w-3 h-3" />
            Let's grow together
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
