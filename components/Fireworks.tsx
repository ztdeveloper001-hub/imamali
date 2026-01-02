
import React, { useEffect, useRef, memo } from 'react';

interface FireworksProps {
  active: boolean;
  intensity?: 'normal' | 'majestic';
}

const Fireworks: React.FC<FireworksProps> = memo(({ active, intensity = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let fireworks: FireworkLaunch[] = [];
    const colors = ['#fbbf24', '#34d399', '#3b82f6', '#ffffff', '#ec4899', '#6366f1'];

    class Particle {
      x: number; y: number; vx: number; vy: number; radius: number;
      color: string; life: number; decay: number; friction: number;
      gravity: number; sparkle: boolean;

      constructor(x: number, y: number, color: string, vx: number, vy: number, sparkle = false) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = sparkle ? Math.random() * 1.8 + 0.4 : Math.random() * 2.8 + 0.5;
        this.color = color;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.005;
        this.friction = intensity === 'majestic' ? 0.988 : 0.975;
        this.gravity = 0.08;
        this.sparkle = sparkle;
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        if (this.sparkle && Math.random() > 0.5) ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      update(dt: number) {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= this.decay * dt;
      }
    }

    class FireworkLaunch {
      x: number; y: number; targetY: number; vx: number; vy: number; 
      color: string; exploded: boolean;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * (canvas.height * 0.4);
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = -Math.random() * 14 - 10;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.exploded = false;
      }

      update(dt: number) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.vy += 0.12 * dt;
        
        if (this.vy >= 0 || this.y <= this.targetY) {
          this.explode();
          this.exploded = true;
        }
      }

      explode() {
        const count = intensity === 'majestic' ? 220 : 100;
        
        if (intensity === 'majestic' && Math.random() > 0.4) {
          document.body.classList.add('animate-shake');
          setTimeout(() => document.body.classList.remove('animate-shake'), 120);
        }

        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i;
          const power = Math.random() * 12 + 4;
          const vx = Math.cos(angle) * power;
          const vy = Math.sin(angle) * power;
          particles.push(new Particle(this.x, this.y, this.color, vx, vy));
          
          if (intensity === 'majestic' && i % 4 === 0) {
            particles.push(new Particle(this.x, this.y, '#ffffff', vx * 1.3, vy * 1.3, true));
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = 1;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    let lastTime = performance.now();
    let animationId: number;
    
    const animate = (time: number) => {
      const dt = (time - lastTime) / 16.67; // Normalized to 60fps base
      lastTime = time;

      ctx.globalAlpha = 1;
      ctx.fillStyle = intensity === 'majestic' ? 'rgba(1, 4, 19, 0.2)' : 'rgba(1, 4, 19, 0.3)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const launchLimit = intensity === 'majestic' ? 25 : 12;
      const launchProb = intensity === 'majestic' ? 0.35 : 0.08;
      
      if (Math.random() < launchProb && fireworks.length < launchLimit) {
        fireworks.push(new FireworkLaunch());
      }

      fireworks = fireworks.filter(f => !f.exploded);
      fireworks.forEach(f => {
        f.update(dt);
        f.draw();
      });

      // Maintain peak performance by capping particles strictly
      const particleCap = intensity === 'majestic' ? 2000 : 1000;
      if (particles.length > particleCap) {
        particles.splice(0, particles.length - particleCap);
      }

      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.update(dt);
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [active, intensity]);

  if (!active) return null;

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-[200] pointer-events-none mix-blend-screen transform-gpu" />
      {intensity === 'majestic' && (
        <div className="fixed inset-0 pointer-events-none z-[199] bg-white/5 animate-pulse transition-opacity duration-500" />
      )}
    </>
  );
});

export default Fireworks;
