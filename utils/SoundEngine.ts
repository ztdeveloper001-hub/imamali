
export class SoundEngine {
  private static context: AudioContext | null = null;

  private static getContext() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.context;
  }

  private static createGain(ctx: AudioContext, duration: number, volume: number = 0.1) {
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    return gain;
  }

  static playChime() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = this.createGain(ctx, 0.4, 0.05);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }

  static playShimmer() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    frequencies.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = this.createGain(ctx, 0.8, 0.02);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + (i * 0.05));
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + (i * 0.05));
      osc.stop(ctx.currentTime + 0.8 + (i * 0.05));
    });
  }

  static playHum() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = this.createGain(ctx, 1.5, 0.08);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(115, ctx.currentTime + 1.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  }
}
