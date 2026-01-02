
import React from 'react';
import { MILESTONES, getIcon } from '../constants';

const LegacyTimeline: React.FC = () => {
  return (
    <section id="legacy" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-emerald-400 font-bold tracking-widest uppercase mb-2">Historical Footprint</h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The Eternal Journey</h2>
          <p className="text-slate-400 max-w-xl mx-auto">A glimpse into the monumental life of the man who defined Islamic history through courage and compassion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((item, idx) => (
            <div 
              key={idx}
              className="group relative bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:border-emerald-500/50 transition-all transform hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                {getIcon(item.icon)}
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                {getIcon(item.icon)}
              </div>
              <div className="text-gold-500 font-bold mb-2">{item.year}</div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegacyTimeline;
