
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, Music, Loader2, Activity, Sparkles } from 'lucide-react';

const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);
  const [visualData, setVisualData] = useState<number[]>(new Array(12).fill(0));
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const AUDIO_SOURCE = "/ali mola.mp3";

  useEffect(() => {
    const audio = new Audio(AUDIO_SOURCE);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsReady(true);
      // Auto-play after a short delay
      setTimeout(async () => {
        if (!isPlaying && audioRef.current) {
          initVisualizer();
          if (audioContextRef.current?.state === 'suspended') await audioContextRef.current.resume();
          await audioRef.current.play();
          setIsPlaying(true);
          draw();
        }
      }, 100);
    };
    audio.addEventListener('canplaythrough', handleCanPlay);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const initVisualizer = () => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      analyser.fftSize = 64;
      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }
  };

  const draw = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const reducedData = Array.from(dataArrayRef.current).slice(0, 12).map((v: number) => v / 255);
      setVisualData(reducedData);
    }
    animationRef.current = requestAnimationFrame(draw);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (!isPlaying) {
      initVisualizer();
      if (audioContextRef.current?.state === 'suspended') await audioContextRef.current.resume();
      audioRef.current.play();
      setIsPlaying(true);
      draw();
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[250] flex flex-col items-end gap-4 pointer-events-none">
      {/* visualizer tool - smaller for mobile */}
      {isPlaying && (
        <div className="px-4 py-3 bg-slate-950/90 backdrop-blur-3xl border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col items-center gap-2 animate-in slide-in-from-bottom-4 pointer-events-auto">
          <div className="flex gap-1 h-10 items-end">
            {visualData.map((val, i) => (
              <div 
                key={i} 
                className="w-1 bg-gradient-to-t from-emerald-600 to-gold-400 rounded-full transition-all duration-75" 
                style={{ height: `${Math.max(10, val * 100)}%` }}
              />
            ))}
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-400">Syncing Soul</span>
        </div>
      )}
      
      <div className="flex items-center gap-3 pointer-events-auto">
        {!isReady && (
          <div className="bg-slate-900/90 px-3 py-1.5 rounded-full border border-white/5 shadow-xl flex items-center gap-2">
             <Loader2 size={10} className="animate-spin text-emerald-400" />
             <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Loading...</span>
          </div>
        )}
        
        <button
          ref={buttonRef}
          onClick={togglePlay}
          disabled={!isReady}
          className={`relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-slate-950 border-2 rounded-full text-white transition-all duration-700 shadow-2xl active:scale-90 ${
            !isReady ? 'opacity-30' : isPlaying ? 'border-emerald-500 text-emerald-400' : 'border-gold-500 text-gold-500'
          }`}
        >
          {isPlaying ? <Volume2 size={24} className="md:size-32" /> : <Music size={24} className="md:size-32 animate-pulse" />}
          
          {!isPlaying && isReady && (
            <div className="absolute -top-10 right-0 bg-gold-500 text-slate-950 text-[8px] font-black py-1 px-3 rounded-md uppercase tracking-widest animate-bounce">
              Play Sound
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default MusicToggle;
