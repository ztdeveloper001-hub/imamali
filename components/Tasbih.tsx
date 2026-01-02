
import React, { useState } from 'react';
import { Fingerprint } from 'lucide-react';
import { SoundEngine } from '../utils/SoundEngine';

const Tasbih: React.FC = () => {
  const [count, setCount] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handlePress = (e: React.PointerEvent) => {
    // Basic Haptics
    if ('vibrate' in navigator) {
      navigator.vibrate(count % 33 === 0 ? 50 : 15);
    }

    // Programmatic Sound
    if (count % 33 === 0 && count !== 0) {
      SoundEngine.playShimmer();
    } else {
      SoundEngine.playChime();
    }
    
    setCount(prev => prev + 1);

    const id = Date.now();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 800);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 sm:p-8 bg-slate-900/40 backdrop-blur-3xl border border-emerald-500/20 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="mb-4 text-center">
        <h3 className="text-emerald-400 font-black tracking-widest uppercase text-[10px] mb-1">Soul Connection</h3>
        <p className="text-slate-500 text-[10px] max-w-[180px]">Touch to send a digital Salawat.</p>
      </div>

      <div 
        className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center cursor-pointer active:scale-95 transition-transform touch-none"
        onPointerDown={handlePress}
      >
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-[spin_15s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border border-gold-500/10 animate-[spin_10s_linear_infinite_reverse]" />
        
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-active:shadow-[0_0_40px_rgba(16,185,129,0.8)] transition-all">
          <Fingerprint className="text-white w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        {ripples.map(ripple => (
          <div 
            key={ripple.id}
            className="absolute bg-white/40 rounded-full animate-ping pointer-events-none"
            style={{ 
              left: ripple.x, 
              top: ripple.y, 
              width: '20px', 
              height: '20px', 
              marginLeft: '-10px', 
              marginTop: '-10px' 
            }}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
        <div className="text-3xl sm:text-4xl font-black text-white tabular-nums drop-shadow-md">
          {count}
        </div>
        <div className="text-[8px] uppercase tracking-[0.3em] text-emerald-500 font-bold mt-1">Blessings Sent</div>
      </div>
    </div>
  );
};

export default Tasbih;
