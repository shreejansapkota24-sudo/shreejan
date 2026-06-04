import { motion } from "framer-motion";

const profile = [
  { label: "Name", value: "Shreejan Sapkota" },
  { label: "Role", value: "Computer Science Student" },
  { label: "Location", value: "Kathmandu, Nepal" },
  { label: "Education", value: "BCS (Hons), IIMS College" },
  { label: "Graduation", value: "Expected 2029" },
  { label: "Focus", value: "Data Science · Software Development" },
];

const highlights = [
  "Building technical foundations in programming and databases",
  "Practicing modern web development with React and Tailwind",
  "Exploring Data Science as a long-term career path",
  "Strengthening analytical and problem-solving skills through projects",
];

const About = () => {
  return (
    <section id="about" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow mb-6 inline-flex">About</span>
          <h2
            className="text-4xl md:text-6xl mb-6"
            style={{ fontFamily: '"Playfair Display", serif', fontWeight: 500, letterSpacing: "-0.025em" }}
          >
            A student building a thoughtful path into{" "}
            <span style={{ fontStyle: "italic", color: "var(--sp-mid-dark)" }}>data and software.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <motion.div
            className="md:col-span-7 space-y-6 text-[15px] leading-relaxed"
            style={{ color: "var(--sp-mid-dark)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p>
              I'm Shreejan Sapkota, a Computer Science student pursuing a BCS (Hons)
              at IIMS in Kathmandu, with expected graduation in 2029. I'm building
              a strong foundation in Python, Java, JavaScript, React, Tailwind CSS,
              MySQL, MongoDB, and Linux — with a growing focus on Data Science.
            </p>
            <p>
              My goal is to use computing and data-driven thinking to solve
              practical problems and create useful digital solutions. I'm committed
              to continuous learning, technical growth, and building a credible
              career in Data Science.
            </p>
            <p>
              Outside of coursework, I spend time on programming, databases, web
              technologies, and analytical thinking — preparing for future
              opportunities in Data Science and software development.
            </p>

            <div className="pt-6">
              <p className="font-mono-label mb-4">Learning Highlights</p>
              <ul className="space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[14px]">
                    <span
                      className="mt-2 inline-block w-3 h-px flex-shrink-0"
                      style={{ background: "var(--sp-charcoal)" }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.aside
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="sp-card p-8">
              <p className="font-mono-label mb-5">Profile</p>
              <dl className="space-y-4">
                {profile.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-4 pb-3"
                    style={{ borderBottom: "1px solid var(--sp-border-soft)" }}
                  >
                    <dt className="text-[13px]" style={{ color: "var(--sp-mid)" }}>
                      {row.label}
                    </dt>
                    <dd
                      className="text-[13px] text-right"
                      style={{ color: "var(--sp-charcoal)", fontWeight: 500 }}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default About;
