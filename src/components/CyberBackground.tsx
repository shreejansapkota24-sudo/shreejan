import { useEffect, useRef } from "react";

const CyberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const chars = "01アイウエオカキクケコサシスセソ";
    const fontSize = 14;
    let columns: number[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colCount = Math.floor(canvas.width / fontSize);
      columns = Array(colCount).fill(0).map(() => Math.random() * canvas.height / fontSize);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(245, 245, 247, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(107, 91, 255, 0.06)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, columns[i] * fontSize);
        if (columns[i] * fontSize > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 opacity-30 pointer-events-none"
    />
  );
};

export default CyberBackground;
