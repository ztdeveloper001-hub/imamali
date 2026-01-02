
import React, { useState } from 'react';
import Background from './components/Background';
import Hero from './components/Hero';
import LegacyTimeline from './components/LegacyTimeline';
import WisdomCarousel from './components/WisdomCarousel';
import CelebrationBanner from './components/CelebrationBanner';
import AskWisdom from './components/AskWisdom';
import MusicToggle from './components/MusicToggle';
import Fireworks from './components/Fireworks';
import GlobalConnection from './components/GlobalConnection';
import Tasbih from './components/Tasbih';
import { SoundEngine } from './utils/SoundEngine';

const App: React.FC = () => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [intensity, setIntensity] = useState<'normal' | 'majestic'>('normal');

  const startCelebration = () => {
    SoundEngine.playShimmer();
    setShowFireworks(true);
    setIntensity('majestic');
    setTimeout(() => setIntensity('normal'), 60000);
  };

  const playNavClick = () => SoundEngine.playChime();

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-emerald-500/30 overflow-x-hidden bg-slate-950">
      <Background />
      <Fireworks active={showFireworks} intensity={intensity} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[150] px-4 py-4 md:px-6 md:py-8 flex justify-between items-center bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-12 md:h-12 bg-emerald-500 rounded-lg md:rounded-2xl rotate-45 flex items-center justify-center shadow-lg transform active:scale-90 transition-transform cursor-pointer" onClick={playNavClick}>
            <span className="text-white text-lg md:text-2xl font-bold -rotate-45 font-arabic">ع</span>
          </div>
          <span className="font-black tracking-tighter text-base md:text-2xl uppercase bg-gradient-to-r from-emerald-400 to-gold-400 bg-clip-text text-transparent pointer-events-none">Celestial Ali</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-emerald-400 transition-colors" onClick={playNavClick}>Home</a>
            <a href="#legacy" className="hover:text-emerald-400 transition-colors" onClick={playNavClick}>Legacy</a>
            <a href="#teachings" className="hover:text-emerald-400 transition-colors" onClick={playNavClick}>Wisdom</a>
          </div>
          <button 
            onClick={startCelebration}
            className="px-5 py-2 md:px-6 md:py-2.5 rounded-full border border-gold-500/30 text-gold-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 hover:text-slate-950 transition-all active:scale-95 shadow-lg"
          >
            Reveal
          </button>
        </div>
      </nav>

      <main className="relative z-10 w-full">
        <Hero onCelebrationStart={startCelebration} isCelebrated={intensity === 'majestic'} />
        
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <LegacyTimeline />
          </div>
          <div className="flex items-center justify-center pt-8 md:pt-24 order-1 lg:order-2">
            <Tasbih />
          </div>
        </div>

        <WisdomCarousel />
        <GlobalConnection />
        <AskWisdom />
        <CelebrationBanner />
      </main>

      {/* Footer */}
      <footer className="py-16 px-4 text-center border-t border-white/5 bg-slate-950 relative z-10 pb-32 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-7xl font-kufi text-emerald-400 mb-4 animate-glow">يا علي مدد</h2>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed text-sm md:text-lg font-light px-4">
              Honoring the Gateway to Knowledge and the symbol of Divine Justice.
            </p>
          </div>

          {/* DEVELOPER SIGNATURE - MOBILE OPTIMIZED */}
          <div className="group relative max-w-xs mx-auto mb-12 p-6 bg-white/5 rounded-[2rem] border border-emerald-500/10 backdrop-blur-xl transition-all active:bg-white/10 active:scale-95 cursor-pointer" onClick={() => SoundEngine.playShimmer()}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 rounded-full text-[7px] font-black uppercase tracking-widest text-slate-950 shadow-emerald-500/20 shadow-lg">
              Architect
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Designed By</span>
              <span className="text-xl font-black bg-gradient-to-r from-emerald-400 via-white to-gold-400 bg-clip-text text-transparent tracking-tighter">
                Zaigham Abbas
              </span>
              <div className="flex gap-1.5 mt-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                <div className="w-1 h-1 rounded-full bg-emerald-500/10" />
              </div>
            </div>
          </div>

          <p className="text-slate-600 text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-medium px-4">
            &copy; {new Date().getFullYear()} Celestial Legacy • 3rd Jan Celebration
          </p>
        </div>
      </footer>

      <MusicToggle />
    </div>
  );
};

export default App;
