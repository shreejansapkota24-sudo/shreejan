import { Mail, Github, Linkedin, Facebook, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/shreejansapkota24-sudo" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/shreejan-sapkota-0449b023b/" },
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/shreejan.sapkota.319" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/sapkota.shreejan/" },
  { name: "X (Twitter)", icon: Twitter, href: "https://x.com/shreejansapkot4" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow mb-6 inline-flex">Contact</span>
          <h2
            className="text-4xl md:text-6xl mb-6"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            Let's{" "}
            <span style={{ fontStyle: "italic", color: "var(--sp-mid-dark)" }}>connect.</span>
          </h2>
          <p className="text-[15px]" style={{ color: "var(--sp-mid)" }}>
            I'm always open to connecting with fellow students, developers, and anyone curious about technology.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-12 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <a
            href="mailto:shreejansapkota24@gmail.com"
            className="md:col-span-7 sp-card p-8 flex items-start justify-between gap-6 group"
          >
            <div>
              <p className="font-mono-label mb-3">Email</p>
              <p
                className="text-2xl md:text-3xl"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 500,
                  color: "var(--sp-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                shreejansapkota24@gmail.com
              </p>
              <p className="mt-2 text-[13px]" style={{ color: "var(--sp-mid)" }}>
                Best for inquiries, collaborations, and opportunities.
              </p>
            </div>
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45"
              style={{ background: "var(--sp-charcoal)", color: "var(--sp-white)" }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </a>

          <div className="md:col-span-5 sp-card p-8">
            <p className="font-mono-label mb-5">Elsewhere</p>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-2 group transition-colors"
                    style={{ borderBottom: "1px solid var(--sp-border-soft)" }}
                  >
                    <span className="flex items-center gap-3 text-[14px]" style={{ color: "var(--sp-charcoal)" }}>
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "var(--sp-mid)" }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-4 flex items-center gap-2 text-[12px]" style={{ color: "var(--sp-mid)" }}>
          <Mail className="w-3.5 h-3.5" />
          Based in Kathmandu — open to remote and on-site opportunities.
        </div>
      </div>
    </section>
  );
};

export default Contact;
