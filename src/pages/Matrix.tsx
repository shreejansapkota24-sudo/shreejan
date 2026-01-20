import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Easy to update messages
const messages = {
  red: [
    "You chose poorly... Now you have to debug CSS for eternity! 🔥",
    "Welcome to the real world. Your code has 47 unresolved merge conflicts.",
    "The Matrix has you... and so does your project manager with 15 new tickets.",
    "You wanted the truth? JavaScript has 3 ways to declare variables and none of them make sense.",
    "Reality check: That 'quick 5-minute fix' will take 3 days.",
  ],
  blue: [
    "Ignorance is bliss! Your code works and you have no idea why. 🌈",
    "Sweet dreams... You'll wake up believing your deadline is next month.",
    "You chose wisely! The bug was a feature all along. ✨",
    "Blissful ignorance: git push --force and walk away.",
    "Everything is fine. That warning in the console? It's just lonely.",
  ],
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "hsl(var(--primary))";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-20"
    />
  );
};

const Matrix = () => {
  const [selectedPill, setSelectedPill] = useState<"red" | "blue" | null>(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handlePillClick = (pill: "red" | "blue") => {
    setSelectedPill(pill);
    const pillMessages = messages[pill];
    const randomMessage = pillMessages[Math.floor(Math.random() * pillMessages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
  };

  const resetChoice = () => {
    setShowMessage(false);
    setTimeout(() => {
      setSelectedPill(null);
      setMessage("");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <MatrixRain />

      {/* Back button */}
      <div className="p-6 relative z-10">
        <Link to="/">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12 relative z-10">
        <motion.div
          className="w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6"
              animate={{ 
                boxShadow: ["0 0 20px hsl(var(--primary) / 0.3)", "0 0 40px hsl(var(--primary) / 0.5)", "0 0 20px hsl(var(--primary) / 0.3)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4" />
              Choose Your Path
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              The <span className="text-primary">Matrix</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              This is your last chance. After this, there is no turning back.
            </p>
          </motion.div>

          {/* Pills */}
          <AnimatePresence mode="wait">
            {!showMessage ? (
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4 }}
              >
                {/* Blue Pill */}
                <motion.button
                  onClick={() => handlePillClick("blue")}
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-32 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl flex items-center justify-center cursor-pointer border-4 border-blue-300/50"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(59, 130, 246, 0.4)",
                        "0 0 60px rgba(59, 130, 246, 0.6)",
                        "0 0 30px rgba(59, 130, 246, 0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white font-bold text-lg drop-shadow-lg">BLUE</span>
                  </motion.div>
                  <p className="mt-4 text-sm text-muted-foreground group-hover:text-blue-400 transition-colors">
                    Stay in Wonderland
                  </p>
                </motion.button>

                {/* Divider */}
                <div className="text-muted-foreground text-2xl font-light hidden sm:block">or</div>

                {/* Red Pill */}
                <motion.button
                  onClick={() => handlePillClick("red")}
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-32 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-2xl flex items-center justify-center cursor-pointer border-4 border-red-300/50"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(239, 68, 68, 0.4)",
                        "0 0 60px rgba(239, 68, 68, 0.6)",
                        "0 0 30px rgba(239, 68, 68, 0.4)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white font-bold text-lg drop-shadow-lg">RED</span>
                  </motion.div>
                  <p className="mt-4 text-sm text-muted-foreground group-hover:text-red-400 transition-colors">
                    See the Truth
                  </p>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {/* Message Card */}
                <motion.div
                  className={`p-8 rounded-2xl border-2 ${
                    selectedPill === "red"
                      ? "bg-red-500/10 border-red-500/30"
                      : "bg-blue-500/10 border-blue-500/30"
                  }`}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className={`w-16 h-10 rounded-full mx-auto mb-6 ${
                      selectedPill === "red"
                        ? "bg-gradient-to-br from-red-400 to-red-600"
                        : "bg-gradient-to-br from-blue-400 to-blue-600"
                    }`}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <p className="text-xl text-foreground font-medium leading-relaxed">
                    {message}
                  </p>
                </motion.div>

                {/* Reset Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={resetChoice}
                    variant="outline"
                    className="gap-2"
                  >
                    Try Again
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fun quote */}
          <motion.p
            className="mt-16 text-sm text-muted-foreground italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            "Unfortunately, no one can be told what the Matrix is. You have to see it for yourself."
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Matrix;
