import { ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="py-12 px-6 mt-12"
      style={{ borderTop: "1px solid var(--sp-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              className="text-xl"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                color: "var(--sp-charcoal)",
                letterSpacing: "-0.02em",
              }}
            >
              Shreejan<span style={{ color: "var(--sp-medium)" }}>.</span>
            </span>
            <span style={{ color: "var(--sp-medium)" }}>·</span>
            <span className="text-[13px]" style={{ color: "var(--sp-mid)" }}>
              Computer Science Student
            </span>
          </div>

          <p className="text-[13px]" style={{ color: "var(--sp-mid)" }}>
            © {currentYear} Shreejan Sapkota · Built with ♥ and curiosity
          </p>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            style={{ border: "1px solid var(--sp-border)", color: "var(--sp-charcoal)" }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
