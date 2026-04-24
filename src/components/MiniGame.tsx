import { useEffect, useRef, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gamepad2, Play, RotateCcw, Trophy } from "lucide-react";

interface MiniGameProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FallingIcon {
  id: number;
  emoji: string;
  x: number; // percentage 0-100
  y: number; // pixels from top
  speed: number;
}

const ICONS = ["💻", "🛡️", "⚙️", "🧠"];
const GAME_HEIGHT = 420;
const SPAWN_INTERVAL = 900;
const TICK_MS = 30;

// Tiny built-in WebAudio sound helpers (no asset files needed)
const playBeep = (
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume = 0.08,
) => {
  try {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
    setTimeout(() => ctx.close(), duration * 1000 + 100);
  } catch {
    // ignore audio errors (e.g., browser blocks)
  }
};

// Classic "sad trombone" wah-wah-wah meme fail sound (WebAudio, no assets)
const playSadTrombone = () => {
  try {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    // Three descending "wah" notes
    const notes = [
      { freq: 311, start: 0, dur: 0.28 },    // Eb4
      { freq: 277, start: 0.3, dur: 0.28 },  // Db4
      { freq: 233, start: 0.6, dur: 0.55 },  // Bb3 (longer)
    ];
    notes.forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq * 1.06, ctx.currentTime + start);
      // pitch dip = "wah"
      osc.frequency.linearRampToValueAtTime(freq * 0.92, ctx.currentTime + start + dur);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.05);
    });
    setTimeout(() => ctx.close(), 1500);
  } catch {
    // ignore
  }
};

const sounds = {
  start: () => playBeep(440, 0.12, "triangle", 0.06),
  pop: () => playBeep(880, 0.08, "square", 0.05),
  fail: () => playSadTrombone(),
};

const MiniGame = ({ open, onOpenChange }: MiniGameProps) => {
  const [status, setStatus] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [icons, setIcons] = useState<FallingIcon[]>([]);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("miniGameHighScore") || 0);
  });

  const nextIdRef = useRef(0);
  const tickRef = useRef<number | null>(null);
  const spawnRef = useRef<number | null>(null);
  const statusRef = useRef(status);
  statusRef.current = status;
  const scoreRef = useRef(0);
  scoreRef.current = score;

  // Difficulty scales with score: faster falls + faster spawns, with caps
  const getSpeedMultiplier = (s: number) => Math.min(1 + s * 0.08, 3.5);
  const getSpawnDelay = (s: number) => Math.max(900 - s * 35, 280);

  const clearTimers = useCallback(() => {
    if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (spawnRef.current) {
      window.clearTimeout(spawnRef.current);
      window.clearInterval(spawnRef.current);
      spawnRef.current = null;
    }
  }, []);

  const endGame = useCallback(() => {
    clearTimers();
    sounds.fail();
    setStatus("over");
    setHighScore((prev) => {
      const final = score;
      if (final > prev) {
        localStorage.setItem("miniGameHighScore", String(final));
        return final;
      }
      return prev;
    });
  }, [clearTimers, score]);

  const startGame = useCallback(() => {
    clearTimers();
    setIcons([]);
    setScore(0);
    setStatus("playing");
    sounds.start();

    const scheduleSpawn = () => {
      const delay = getSpawnDelay(scoreRef.current);
      spawnRef.current = window.setTimeout(() => {
        if (statusRef.current !== "playing") return;
        const mult = getSpeedMultiplier(scoreRef.current);
        const newIcon: FallingIcon = {
          id: nextIdRef.current++,
          emoji: ICONS[Math.floor(Math.random() * ICONS.length)],
          x: Math.random() * 88 + 4,
          y: 0,
          speed: (1.4 + Math.random() * 1.2) * mult,
        };
        setIcons((prev) => [...prev, newIcon]);
        scheduleSpawn();
      }, delay);
    };
    scheduleSpawn();

    tickRef.current = window.setInterval(() => {
      setIcons((prev) => {
        const updated = prev.map((i) => ({ ...i, y: i.y + i.speed }));
        const reachedBottom = updated.some((i) => i.y >= GAME_HEIGHT - 40);
        if (reachedBottom && statusRef.current === "playing") {
          // schedule end on next tick to use latest score
          setTimeout(() => endGame(), 0);
          return updated;
        }
        return updated;
      });
    }, TICK_MS);
  }, [clearTimers, endGame]);

  const catchIcon = (id: number) => {
    if (status !== "playing") return;
    setIcons((prev) => prev.filter((i) => i.id !== id));
    setScore((s) => s + 1);
    sounds.pop();
  };

  // cleanup on unmount / modal close
  useEffect(() => {
    if (!open) {
      clearTimers();
      setStatus("idle");
      setIcons([]);
      setScore(0);
    }
    return () => clearTimers();
  }, [open, clearTimers]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-strong border-primary/30 box-glow">
        <DialogHeader>
          <DialogTitle className="font-cyber flex items-center gap-2 text-primary text-glow">
            <Gamepad2 className="w-5 h-5" />
            Mini Game — Catch the Icons
          </DialogTitle>
        </DialogHeader>

        {/* Score bar */}
        <div className="flex items-center justify-between text-xs font-cyber">
          <div className="text-primary text-glow">
            SCORE: <span className="text-base">{score}</span>
          </div>
          <div className="text-accent flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            HI: {highScore}
          </div>
        </div>

        {/* Game area */}
        <div
          className="relative overflow-hidden rounded-md border border-primary/30 bg-background/80 scanline-overlay"
          style={{ height: GAME_HEIGHT }}
        >
          {/* Idle overlay */}
          {status === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-background/60 animate-fade-in">
              <p className="text-sm text-muted-foreground text-center px-6">
                Click the falling icons before they hit the bottom!
              </p>
              <Button onClick={startGame} className="font-cyber gap-2">
                <Play className="w-4 h-4" />
                Start Game
              </Button>
            </div>
          )}

          {/* Game over overlay */}
          {status === "over" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-background/80 animate-fade-in">
              <div className="text-2xl font-cyber text-destructive text-glow">GAME OVER</div>
              <div className="text-sm text-muted-foreground">
                Final Score: <span className="text-primary font-bold">{score}</span>
              </div>
              {score > 0 && score >= highScore && (
                <div className="text-xs text-accent font-cyber">★ NEW HIGH SCORE ★</div>
              )}
              <Button onClick={startGame} className="font-cyber gap-2 mt-2">
                <RotateCcw className="w-4 h-4" />
                Restart Game
              </Button>
            </div>
          )}

          {/* Falling icons */}
          {icons.map((icon) => (
            <button
              key={icon.id}
              onClick={() => catchIcon(icon.id)}
              className="absolute text-3xl select-none transition-transform hover:scale-125 active:scale-90"
              style={{
                left: `${icon.x}%`,
                top: `${icon.y}px`,
                transform: "translateX(-50%)",
                filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))",
              }}
              aria-label={`Catch ${icon.emoji}`}
            >
              {icon.emoji}
            </button>
          ))}

          {/* Bottom danger line */}
          <div
            className="absolute left-0 right-0 h-px bg-destructive/60"
            style={{ top: GAME_HEIGHT - 40, boxShadow: "0 0 8px hsl(var(--destructive))" }}
          />
        </div>

        <p className="text-[10px] text-muted-foreground text-center font-cyber">
          Tip: Sounds use your browser — make sure audio isn't muted.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default MiniGame;
