import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import type { ThreatLevel } from "@/lib/cyberguard/types";

interface ThreatLevelBadgeProps {
  level: ThreatLevel;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

const ThreatLevelBadge = ({ level, size = "md", showIcon = true }: ThreatLevelBadgeProps) => {
  const config = {
    safe: {
      label: "Safe",
      icon: ShieldCheck,
      className: "bg-emerald-500/20 text-emerald-500 border-emerald-500/50",
    },
    suspicious: {
      label: "Suspicious",
      icon: ShieldAlert,
      className: "bg-amber-500/20 text-amber-500 border-amber-500/50",
    },
    dangerous: {
      label: "Dangerous",
      icon: ShieldX,
      className: "bg-red-500/20 text-red-500 border-red-500/50",
    },
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const { label, icon: Icon, className } = config[level];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold",
        className,
        sizes[size]
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {label}
    </motion.div>
  );
};

export default ThreatLevelBadge;
