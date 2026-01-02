
import React, { useState, useEffect, memo } from 'react';
import { CELEBRATION_TARGET } from '../constants';
import Shrine3D from './Shrine3D';

const Hero: React.FC<{ onCelebrationStart?: () => void; isCelebrated: boolean }> = memo(({ onCelebrationStart, isCelebrated }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const difference = CELEBRATION_TARGET - now;

      if (difference <= 0) {
        if (!isCelebrated) {
          onCelebrationStart?.();
        }
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [isCelebrated, onCelebrationStart]);

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden transform-gpu">
      {/* Radiant Light Rays Background */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${isCelebrated ? 'opacity-30' : 'opacity-10'}`}>
        <div className="w-[1000px] h-[1000px] md:w-[1500px] md:h-[1500px] bg-[conic-gradient(from_0deg,transparent,rgba(52,211,153,0.05),transparent,rgba(251,191,36,0.1),transparent,rgba(59,130,246,0.05),transparent)] animate-[spin_180s_linear_infinite] will-change-transform" />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <div className="mb-4 inline-block py-1.5 px-4 md:px-6 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-[10px] md:text-xs font-black tracking-[0.2em] uppercase shadow-lg backdrop-blur-xl">
            {isCelebrated ? 'Maula Ali (a.s) Wiladat Mubarak' : 'The Light Arrives • Jan 3rd'}
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 tracking-tighter gradient-text leading-[1.1] drop-shadow-2xl">
            Hazrat Imam Ali <span className="text-white opacity-30 text-2xl md:text-4xl block md:inline md:ml-4">(a.s)</span>
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
            {['Lion of Allah', 'Gate of Knowledge'].map((title, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em] text-slate-300">
                {title}
              </span>
            ))}
          </div>

          <p className="text-sm md:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light mb-8 px-2">
            {isCelebrated 
              ? "Rejoice! The Commander of the Faithful is born. May his light guide your path."
              : "Counting down to the birth of the Peak of Eloquence. Prepare for the grand reveal."
            }
          </p>

          {/* Countdown / Status Section */}
          <div className="flex flex-col gap-6 items-center lg:items-start">
             {!isCelebrated ? (
                <div className="flex gap-2 sm:gap-4 p-4 sm:p-6 bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-xl">
                  {[
                    { l: 'D', v: timeLeft.days },
                    { l: 'H', v: timeLeft.hours },
                    { l: 'M', v: timeLeft.minutes },
                    { l: 'S', v: timeLeft.seconds }
                  ].map(unit => (
                    <div key={unit.l} className="flex flex-col items-center min-w-[55px] sm:min-w-[70px]">
                      <span className="text-3xl sm:text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-md">
                        {unit.v.toString().padStart(2, '0')}
                      </span>
                      <span className="text-[9px] text-emerald-400/80 font-black uppercase tracking-[0.2em] mt-1">{unit.l}</span>
                    </div>
                  ))}
                </div>
             ) : (
                <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-3xl animate-pulse">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg transform rotate-45">
                    <span className="-rotate-45">★</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-black text-white uppercase tracking-wider">Mubarak!</div>
                    <div className="text-gold-400 text-[8px] font-bold uppercase tracking-widest">Divine Light has arrived</div>
                  </div>
                </div>
             )}
             
             <button 
              onClick={onCelebrationStart}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm bg-gradient-to-r from-emerald-600 to-blue-700 text-white shadow-xl active:scale-95 transition-transform"
            >
              {isCelebrated ? 'Magnify Show' : 'Celebration Now'}
            </button>
          </div>
        </div>

        {/* 3D Hologram Assembly */}
        <div className="flex-1 flex flex-col items-center relative transform-gpu order-1 lg:order-2 scale-75 sm:scale-90 md:scale-100">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5 scale-125 blur-[2px]">
              <h1 className="text-[12rem] md:text-[22rem] font-kufi font-bold text-white whitespace-nowrap">يا علي</h1>
           </div>
           <Shrine3D />
           <div className="mt-6 text-center animate-glow select-none pointer-events-none">
              <span className={`text-7xl md:text-[9rem] font-kufi transition-colors duration-1000 ${isCelebrated ? 'text-gold-400' : 'text-emerald-400'} drop-shadow-xl`}>يا علي</span>
           </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
