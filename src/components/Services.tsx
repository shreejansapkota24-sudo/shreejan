import { GraduationCap, Users, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const opportunities = [
  {
    icon: GraduationCap,
    title: "Internships",
    description:
      "Open to data, software, and research internships where I can learn and contribute.",
  },
  {
    icon: Users,
    title: "Collaborations",
    description:
      "Interested in student project collaborations and small team experiences.",
  },
  {
    icon: Code2,
    title: "Open-source",
    description:
      "Happy to contribute to beginner-friendly open-source projects across the stack.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow mb-6 inline-flex">Opportunities</span>
          <h2
            className="text-4xl md:text-6xl mb-6"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            Open to learning and{" "}
            <span style={{ fontStyle: "italic", color: "var(--sp-mid-dark)" }}>working together.</span>
          </h2>
          <p className="text-[15px]" style={{ color: "var(--sp-mid)" }}>
            As a student, I'm focused on building skills — and I'm always open to opportunities that help me grow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {opportunities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="sp-card p-8"
            >
              <div
                className="inline-flex p-3 rounded-md mb-5"
                style={{ background: "var(--sp-surface-2)", border: "1px solid var(--sp-border)" }}
              >
                <item.icon className="w-5 h-5" style={{ color: "var(--sp-charcoal)" }} />
              </div>
              <h3
                className="text-xl mb-3"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 500,
                  color: "var(--sp-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                {item.title}
              </h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "var(--sp-mid-dark)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
