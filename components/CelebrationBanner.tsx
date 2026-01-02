
import React from 'react';

const CelebrationBanner: React.FC = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-emerald-900/40 via-blue-900/40 to-emerald-900/40 backdrop-blur-md rounded-[2.5rem] p-12 text-center border border-white/10 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none islamic-pattern" />
        
        <h2 className="text-4xl md:text-6xl font-bold mb-4 font-kufi">
          <span className="text-gold-500">عيد ميلاد سعيد</span>
        </h2>
        
        <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-8">
          Happy Birthday Hazrat Imam Ali (a.s)
        </h3>
        
        <p className="text-slate-300 max-w-2xl mx-auto mb-8 font-light italic">
          "The most complete gift of God is a life based on knowledge."
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-emerald-400 font-bold tracking-widest text-sm uppercase">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
            Justice
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
            Courage
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
            Eloquence
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
            Compassion
          </span>
        </div>
      </div>
    </section>
  );
};

export default CelebrationBanner;
