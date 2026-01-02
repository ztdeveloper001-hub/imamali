
import React, { useEffect, useRef, memo } from 'react';

const Background: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number, y: number, size: number, speedX: number, speedY: number, color: string, opacity: number }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 12), 100); // Capped for performance
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.2 + 0.3,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          color: Math.random() > 0.6 ? '#34d399' : (Math.random() > 0.4 ? '#fbbf24' : '#3b82f6'),
          opacity: Math.random() * 0.3 + 0.1
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = '#010413';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#010413]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 opacity-[0.03] islamic-pattern scale-150 transform-gpu" />
      
      {/* Aurora Effects - Hardware Accelerated */}
      <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[60%] bg-blue-900/15 blur-[120px] animate-[pulse_10s_ease-in-out_infinite] rotate-[-5deg] will-change-[opacity]" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[50%] bg-emerald-900/15 blur-[120px] animate-[pulse_12s_ease-in-out_infinite_reverse] rotate-[10deg] will-change-[opacity]" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-[#010413]" />
    </div>
  );
});

export default Background;
