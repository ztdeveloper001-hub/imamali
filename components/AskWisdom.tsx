
import React, { useState } from 'react';
import { GoogleAI } from "@google/genai";
import { Sparkles, Loader2, Send } from 'lucide-react';
import { SoundEngine } from '../utils/SoundEngine';

const AskWisdom: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const getWisdom = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    SoundEngine.playChime();
    
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(`Reflect on the following question using the teachings and philosophy of Hazrat Imam Ali (a.s). Provide a response that is poetic, wise, and grounded in his legacy of justice and knowledge. Question: ${prompt}`);
      const response = await result.response;
      setResponse(response.text() || 'The light of wisdom is momentarily veiled. Try again.');
      SoundEngine.playShimmer();
    } catch (error) {
      console.error(error);
      setResponse('Connection to the divine knowledge was interrupted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-emerald-500/20 rounded-[3rem] p-6 sm:p-12 md:p-16 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 text-center sm:text-left">
          <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400">
            <Sparkles size={28} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Seek a Reflection</h2>
            <p className="text-slate-400 text-sm">Apply the wisdom of Ali (a.s) to your modern questions.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => SoundEngine.playChime()}
            placeholder="How should I treat those who oppose me?"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all text-sm sm:text-base placeholder:text-slate-600"
            onKeyDown={(e) => e.key === 'Enter' && getWisdom()}
          />
          <button 
            onClick={getWisdom}
            disabled={loading}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs text-white transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
            Seek Guidance
          </button>
        </div>

        {response && (
          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 sm:p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-base sm:text-lg leading-relaxed text-emerald-50 font-light italic">
              {response}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AskWisdom;
