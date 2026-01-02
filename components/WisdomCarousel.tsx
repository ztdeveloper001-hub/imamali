
import React, { useState, useEffect } from 'react';
import { QUOTES } from '../constants';
import { ChevronLeft, ChevronRight, Quote as QuoteIcon } from 'lucide-react';

const WisdomCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActiveIndex((prev) => (prev + 1) % QUOTES.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);

  return (
    <section id="teachings" className="py-24 px-4 bg-gradient-to-b from-transparent to-blue-900/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-gold-500 font-bold tracking-widest uppercase mb-2">Golden Sayings</h3>
          <h2 className="text-4xl md:text-5xl font-bold">Divine Wisdom</h2>
        </div>

        <div className="relative bg-slate-900/40 backdrop-blur-xl border border-gold-500/20 p-12 md:p-20 rounded-[3rem] shadow-[0_0_50px_rgba(251,191,36,0.05)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
          
          <div className="absolute top-8 left-8 text-gold-500/20">
            <QuoteIcon size={80} />
          </div>

          <div className="relative z-10">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 italic">
              "{QUOTES[activeIndex].text}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-gold-500/50" />
              <span className="text-gold-500 font-bold uppercase tracking-widest">{QUOTES[activeIndex].source}</span>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 flex gap-2">
            <button 
              onClick={prev}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-10 gap-2">
          {QUOTES.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WisdomCarousel;
