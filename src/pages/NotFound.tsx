import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden arctic-noise" style={{ background: "#0A0A0A" }}>
      <div className="aurora-blob" style={{ top: "10%", left: "20%" }} />
      <div className="aurora-blob alt" style={{ bottom: "10%", right: "20%", animationDelay: "-7s" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-lg relative"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: "#E8D5A3" }}>
          [ Lost Signal ]
        </p>
        <h1
          className="text-[140px] md:text-[200px] leading-none arctic-gradient-text"
          style={{ fontFamily: '"Playfair Display","Cormorant Garamond",serif', fontWeight: 700, fontStyle: "italic" }}
        >
          404
        </h1>
        <h2 className="text-2xl md:text-3xl mt-2 mb-4" style={{ fontFamily: '"Playfair Display",serif', color: "#FFFFFF", fontWeight: 500 }}>
          This page drifted off-screen.
        </h2>
        <p className="mb-10" style={{ color: "#A1A1AA" }}>
          The route <span className="font-mono text-[12px]" style={{ color: "#E8D5A3" }}>{location.pathname}</span> does not exist in the portfolio.
        </p>
        <a href="/" className="btn-mono hover-lift">
          <ArrowLeft className="w-3.5 h-3.5" />
          Return Home
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
