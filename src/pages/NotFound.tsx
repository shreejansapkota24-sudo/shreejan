import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--sp-white)" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-lg"
      >
        <p className="font-mono-label mb-6">Not Found</p>
        <h1
          className="text-[120px] md:text-[180px] leading-none"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 500,
            color: "var(--sp-charcoal)",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </h1>
        <h2
          className="text-2xl md:text-3xl mt-4 mb-4"
          style={{ fontFamily: '"Playfair Display", serif', color: "var(--sp-charcoal)", fontWeight: 500 }}
        >
          This page doesn't exist.
        </h2>
        <p className="mb-10 text-[14px]" style={{ color: "var(--sp-mid)" }}>
          The route{" "}
          <span
            className="px-1.5 py-0.5 rounded font-mono text-[12px]"
            style={{ background: "var(--sp-surface-2)", color: "var(--sp-charcoal)" }}
          >
            {location.pathname}
          </span>{" "}
          could not be found.
        </p>
        <a href="/" className="btn-mono">
          <ArrowLeft className="w-3.5 h-3.5" />
          Return Home
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
