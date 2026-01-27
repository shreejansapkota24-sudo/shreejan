import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiskScoreMeterProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const RiskScoreMeter = ({ score, size = "md", showLabel = true }: RiskScoreMeterProps) => {
  const getColor = () => {
    if (score < 30) return { stroke: "stroke-emerald-500", text: "text-emerald-500", bg: "bg-emerald-500" };
    if (score < 60) return { stroke: "stroke-amber-500", text: "text-amber-500", bg: "bg-amber-500" };
    return { stroke: "stroke-red-500", text: "text-red-500", bg: "bg-red-500" };
  };

  const getRiskLabel = () => {
    if (score < 30) return "Low Risk";
    if (score < 60) return "Medium Risk";
    return "High Risk";
  };

  const colors = getColor();
  
  const dimensions = {
    sm: { size: 80, strokeWidth: 6, fontSize: "text-lg" },
    md: { size: 120, strokeWidth: 8, fontSize: "text-2xl" },
    lg: { size: 160, strokeWidth: 10, fontSize: "text-4xl" },
  };

  const { size: svgSize, strokeWidth, fontSize } = dimensions[size];
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-muted"
          />
          {/* Progress circle */}
          <motion.circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={colors.stroke}
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn("font-bold", fontSize, colors.text)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      {showLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold",
            colors.bg,
            "text-white"
          )}
        >
          {getRiskLabel()}
        </motion.div>
      )}
    </div>
  );
};

export default RiskScoreMeter;
