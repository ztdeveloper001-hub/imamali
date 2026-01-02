
import React, { useState } from 'react';
import { Flame, Star } from 'lucide-react';
import { SoundEngine } from '../utils/SoundEngine';

const GlobalConnection: React.FC = () => {
  const [lit, setLit] = useState(false);
  const [totalBlessings, setTotalBlessings] = useState(313110); // Simulated count

  const handleLight = () => {
    if (lit) return;
    setLit(true);
    setTotalBlessings(prev => prev + 1);
    
    // SFX and Haptics
    SoundEngine.playHum();
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 50, 100]);
    }
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block p-4 bg-emerald-500/10 rounded-3xl mb-8">
          <Star className="text-gold-400 w-12 h-12 animate-[spin_5s_linear_infinite]" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Light Your Blessing</h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">
          Join a global constellation of devotees. Light your virtual lantern to send blessings and contribute to the collective light.
        </p>

        <div className="relative flex flex-col items-center">
          <button 
            onClick={handleLight}
            disabled={lit}
            className={`
              relative w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center transition-all duration-700 transform hover:scale-110 active:scale-95
              ${lit ? 'bg-gold-500 shadow-[0_0_100px_rgba(251,191,36,0.8)]' : 'bg-slate-900 border border-white/20 hover:border-gold-500/50'}
            `}
          >
            <Flame className={`w-16 h-16 md:w-24 md:h-24 transition-colors ${lit ? 'text-white' : 'text-slate-700'}`} />
            {lit && (
              <div className="absolute inset-0 rounded-full animate-ping bg-gold-400 opacity-20" />
            )}
          </button>
          
          <div className="mt-12">
            <div className="text-gold-500 font-black text-4xl md:text-6xl tracking-tighter mb-2 font-mono">
              {totalBlessings.toLocaleString()}
            </div>
            <div className="text-slate-500 uppercase tracking-widest text-sm font-bold">Blessings Shared Worldwide</div>
          </div>
        </div>

        {/* Constellation Grid Simulation */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-4 mt-20 opacity-20 px-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className={`h-1 w-1 rounded-full bg-white animate-pulse mx-auto`} style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalConnection;
