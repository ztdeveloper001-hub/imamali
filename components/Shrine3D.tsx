
import React, { memo } from 'react';

const Shrine3D: React.FC = memo(() => {
  return (
    <div className="relative w-80 h-80 md:w-[600px] md:h-[600px] perspective-2000 flex items-center justify-center transform-gpu">
      
      {/* 1. PRIMARY DIVINE SOURCE (Bloom/Emissive Core) */}
      {/* This layer provides the deep atmospheric wash */}
      <div className="absolute inset-0 bg-gold-500/15 rounded-full blur-[160px] animate-pulse" />
      <div className="absolute inset-20 bg-emerald-500/10 rounded-full blur-[100px] animate-glow" />
      
      {/* 2. ENHANCED GOD RAYS (Volumetric Shafts) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen">
        {[...Array(16)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 md:w-3 h-[1000px] bg-gradient-to-t from-transparent via-gold-200/40 to-transparent blur-xl opacity-20"
            style={{ 
              transform: `rotate(${i * 22.5}deg)`,
              animation: `pulse ${4 + i % 3}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* 3. MULTI-LAYERED CORONA (The Holy Shine Halo) */}
      <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border-[20px] border-gold-400/10 blur-2xl animate-[spin_25s_linear_infinite] mix-blend-screen" />
      <div className="absolute w-72 h-72 md:w-[420px] md:h-[420px] rounded-full border-[1px] border-white/10 blur-sm animate-[spin_40s_linear_infinite_reverse]" />
      <div className="absolute w-40 h-40 md:w-72 md:h-72 rounded-full bg-gold-400/5 blur-3xl animate-pulse" />

      {/* 3D Assembly Container */}
      <div className="relative w-full h-full preserve-3d animate-[spin_45s_linear_infinite] will-change-transform">
        
        {/* Divine Orbitals with Refined Gradients */}
        {[...Array(4)].map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 border border-emerald-400/20 rounded-full"
            style={{ 
              transform: `rotateX(${80 + i}deg) rotateY(${i * 90}deg) scale(${1.35 + i * 0.05})`,
              borderTopColor: i % 2 === 0 ? '#fbbf24' : '#0ea5e9',
              boxShadow: i % 2 === 0 ? '0 0 30px rgba(251, 191, 36, 0.2)' : '0 0 30px rgba(14, 165, 233, 0.2)',
              animation: `glow 10s ease-in-out infinite ${i * 0.5}s`
            }}
          />
        ))}

        {/* Central Shrine Structure */}
        <div className="absolute inset-0 flex items-center justify-center preserve-3d scale-90 md:scale-100">
          
          {/* Main Rectangular Courtyard / Base */}
          <div className="absolute bottom-1/4 w-60 h-60 md:w-96 md:h-96 bg-slate-900 border-2 border-blue-500/50 rounded-lg preserve-3d shadow-[0_0_80px_rgba(14,165,233,0.4)]" style={{ transform: 'rotateX(90deg) translateZ(-100px)' }}>
            <div className="absolute inset-0 opacity-50 islamic-pattern bg-blue-900/70 rounded-lg" />
            <div className="absolute inset-0 border border-blue-300/40 animate-pulse shadow-[inset_0_0_30px_rgba(30,58,138,0.5)]" />
          </div>

          {/* The Grand Iwan (Golden Entrance) */}
          <div className="absolute w-36 h-48 md:w-48 md:h-72 bg-gradient-to-t from-gold-950 via-gold-600 to-gold-300 border-2 border-gold-200/70 preserve-3d transform-gpu shadow-[0_20px_50px_rgba(0,0,0,0.8)]" style={{ transform: 'translateZ(140px) translateY(40px)' }}>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-4/5 bg-slate-950 rounded-t-full border-t-4 border-x-4 border-gold-300/60 overflow-hidden shadow-[inset_0_40px_80px_rgba(0,0,0,1)]">
                <div className="absolute inset-0 islamic-pattern opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gold-400/20 blur-2xl" />
             </div>
             <div className="absolute top-6 left-0 w-full text-center">
                <div className="text-[8px] md:text-[10px] font-kufi text-gold-100 font-bold tracking-[0.5em] drop-shadow-[0_0_10px_rgba(251,191,36,1)]">يا مظهر العجائب</div>
             </div>
          </div>

          {/* The Iconic Golden Dome - MAXIMIZED HOLY SHINE */}
          <div className="relative w-44 h-44 md:w-72 md:h-72 preserve-3d -translate-y-20">
            {/* 1. INTENSE EMISSIVE BLOOM LAYERS */}
            {/* The "Supernova" Core - creates the hot center effect */}
            <div className="absolute inset-0 bg-white rounded-full blur-[15px] opacity-30 scale-95" />
            <div className="absolute inset-0 bg-gold-300 rounded-full blur-[35px] opacity-50 scale-110 animate-pulse" />
            <div className="absolute inset-0 bg-gold-500 rounded-full blur-[60px] opacity-40 scale-150 animate-[pulse_2s_ease-in-out_infinite]" />
            
            {/* 2. THE DOME SHELL (Gold Leaf Texture) */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gold-400 to-gold-950 rounded-full shadow-[inset_-20px_-20px_80px_rgba(0,0,0,0.8),0_0_150px_rgba(251,191,36,1)] preserve-3d overflow-hidden ring-4 ring-white/50 ring-offset-4 ring-offset-gold-600/20">
               {/* High-Definition "Gold Brick" Grid */}
               <div className="absolute inset-0 opacity-20 grid grid-cols-16 grid-rows-16">
                  {[...Array(256)].map((_, i) => <div key={i} className="border-[0.5px] border-gold-900/50" />)}
               </div>
               {/* High-Frequency Reflection Shimmer */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent animate-[shimmer_2.5s_linear_infinite]" />
            </div>

            {/* 3. DOME FINIAL (The Divine Antenna) */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center preserve-3d">
               <div className="w-2.5 h-24 bg-gradient-to-b from-white via-gold-200 to-gold-800 shadow-[0_0_40px_rgba(255,255,255,0.8)]" />
               
               {/* Expanding Light Rings */}
               <div className="absolute -top-8 w-12 h-12 border-4 border-white rounded-full opacity-0 animate-[ping_3s_linear_infinite]" />
               <div className="absolute -top-8 w-12 h-12 border-2 border-gold-200 rounded-full opacity-0 animate-[ping_3s_linear_infinite_1s]" />
               
               {/* PRIMARY DIVINE BEAM (Central Light Shaft) */}
               <div className="absolute -top-[600px] w-2 h-[600px] bg-gradient-to-t from-white via-gold-300/60 to-transparent blur-md opacity-90 shadow-[0_0_30px_#fff]" />
               <div className="absolute -top-[600px] w-20 h-[600px] bg-gradient-to-t from-gold-500/30 to-transparent blur-3xl opacity-50" />
            </div>
          </div>
          
          {/* Twin Golden Minarets - Symmetrically Enhanced */}
          {[-1, 1].map((side) => (
            <div 
              key={side}
              className="absolute bottom-0 w-12 h-80 md:w-16 md:h-[450px] preserve-3d transform-gpu" 
              style={{ transform: `translateX(${side * 140}px) translateZ(${side * 60}px)` }}
            >
               {/* Minaret Shaft */}
               <div className="absolute inset-0 bg-gradient-to-r from-gold-950 via-gold-400 to-gold-800 border-x border-white/20 shadow-2xl" />
               
               {/* Signature Azure Tile Band */}
               <div className="absolute top-1/4 w-full h-8 bg-blue-800 border-y-2 border-white/40 shadow-[0_0_30px_rgba(30,64,175,0.6)]" />
               
               {/* The Luminous Balcony */}
               <div className="absolute top-16 md:top-24 -left-4 -right-4 h-10 md:h-12 bg-gold-200 border-y-2 border-gold-950 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <div className="w-full h-2 bg-gold-950/50" />
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
               </div>
               
               {/* Top Golden Cupola (The Beacon) */}
               <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-14 h-18 md:w-18 md:h-24 bg-gradient-to-b from-white via-gold-300 to-gold-800 rounded-t-full shadow-[0_0_50px_rgba(251,191,36,0.7)] border-t-2 border-white/50" />
               
               {/* Foot Radiation */}
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-8 bg-gold-400/40 blur-2xl rounded-full" />
            </div>
          ))}
        </div>

        {/* 4. SACRED LIGHT PARTICLES (Floating Blessings) */}
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_#fff] animate-pulse"
            style={{
              transform: `rotateY(${i * 12}deg) translateZ(${250 + (i % 8) * 30}px) translateY(${(i % 12) * 45 - 250}px)`,
              // Fix: Corrected template literal to correctly place 's' unit outside the expression block
              animationDelay: `${i * 0.1}s`,
              opacity: 0.7 + Math.random() * 0.3
            }}
          />
        ))}
      </div>

      {/* 5. DYNAMIC REFRACTIVE GROUND ILLUMINATION */}
      <div className="absolute -bottom-32 w-full h-40 bg-gold-500/25 blur-[120px] rounded-[100%] animate-pulse" />
      <div className="absolute -bottom-36 w-3/4 h-16 bg-blue-400/15 blur-[80px] rounded-[100%] animate-glow" />
    </div>
  );
});

export default Shrine3D;
