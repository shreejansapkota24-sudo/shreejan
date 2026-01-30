import { motion } from "framer-motion";
import { Play, Pause, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ThreatMapControlsProps {
  isSimulating: boolean;
  onToggleSimulation: () => void;
  intensity: number;
  onIntensityChange: (value: number) => void;
}

const ThreatMapControls = ({
  isSimulating,
  onToggleSimulation,
  intensity,
  onIntensityChange,
}: ThreatMapControlsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-4 sm:gap-6 bg-card/80 border border-border rounded-lg p-3 backdrop-blur-sm"
    >
      {/* Auto Simulate Toggle */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {isSimulating ? (
            <Play className="w-4 h-4 text-emerald-400" />
          ) : (
            <Pause className="w-4 h-4 text-muted-foreground" />
          )}
          <Label htmlFor="simulate" className="text-sm font-medium cursor-pointer">
            Auto Simulate
          </Label>
        </div>
        <Switch
          id="simulate"
          checked={isSimulating}
          onCheckedChange={onToggleSimulation}
          className="data-[state=checked]:bg-emerald-500"
        />
        <span className={cn(
          "text-xs font-semibold px-2 py-0.5 rounded",
          isSimulating 
            ? "bg-emerald-500/20 text-emerald-400" 
            : "bg-muted text-muted-foreground"
        )}>
          {isSimulating ? "ON" : "OFF"}
        </span>
      </div>

      {/* Intensity Slider */}
      <div className="flex items-center gap-3 flex-1 min-w-[180px]">
        <div className="flex items-center gap-2">
          <Zap className={cn(
            "w-4 h-4 transition-colors",
            intensity > 3 ? "text-amber-400" : "text-muted-foreground"
          )} />
          <Label className="text-sm font-medium whitespace-nowrap">
            Intensity
          </Label>
        </div>
        <Slider
          value={[intensity]}
          onValueChange={([value]) => onIntensityChange(value)}
          min={1}
          max={5}
          step={1}
          className="flex-1 max-w-[120px]"
        />
        <span className="text-xs font-mono text-muted-foreground w-4">
          {intensity}
        </span>
      </div>

      {/* Intensity indicator bars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "w-1.5 rounded-full transition-all duration-300",
              level <= intensity 
                ? level <= 2 
                  ? "bg-emerald-500 h-3" 
                  : level <= 4 
                    ? "bg-amber-500 h-4" 
                    : "bg-red-500 h-5"
                : "bg-muted h-2"
            )}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ThreatMapControls;
