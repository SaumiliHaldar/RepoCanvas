import React from 'react';
import { useStore } from '../../store/useStore';
import { ImageIcon, MousePointer2, Sparkles, Brain } from 'lucide-react';

const ExtraSection: React.FC = () => {
  const { bannerUrl, setBannerUrl, funFact, setFunFact, statsConfig, setStatsConfig } = useStore();


  const inputClasses = "w-full bg-[#0a0a0a] border border-white/10 rounded-none px-4 py-3 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/50 transition-all font-mono placeholder:text-gray-700";
  const labelClasses = "flex items-center gap-2 text-[9px] font-black text-gray-500 mb-2 ml-1 uppercase tracking-[0.2em] font-mono";

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 relative">
        <div>
          <h3 className="text-lg font-black text-white tracking-[0.2em] uppercase">Customizations</h3>
          <p className="text-[8px] text-cyan-500/50 uppercase tracking-[0.4em] font-bold">Additional profile features</p>
        </div>
        <div className="p-3 tech-border bg-white/[0.02] text-gray-500">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-10">
        {/* Banner URL */}
        <div className="space-y-3 group">
          <label className={labelClasses}>
            Profile Banner
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 text-gray-600 group-focus-within:text-cyan-500/50 transition-colors">
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              placeholder="https://raw.githubusercontent.com/..."
              className={`${inputClasses} pl-10`}
            />
          </div>
          <div className="flex items-center gap-2 px-1">
            <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest opacity-60 font-mono">Status: Asset Linked</p>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="space-y-4 group">
          <label className={labelClasses}>
            Fun Fact
          </label>
          <div className="relative">
            <textarea
              value={funFact}
              onChange={(e) => setFunFact(e.target.value)}
              placeholder="I once built a neural network that could play chess with only 128MB of RAM..."
              rows={3}
              className={`${inputClasses} resize-none group-focus-within:border-cyan-500/30`}
            />
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/5" />

        {/* Contribution Games */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-2 h-2 bg-gray-800" />
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] font-mono whitespace-nowrap">
              Interactive Games
            </label>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { id: 'showBreakout', name: 'Breakout', icon: MousePointer2, color: 'text-orange-500', bg: 'bg-orange-500/5', desc: 'Arcade Mini-game' },
              { id: 'showSnake', name: 'Snake', icon: Sparkles, color: 'text-green-500', bg: 'bg-green-500/5', desc: 'Classic Retro Game' },
              { id: 'showPacman', name: 'Pacman', icon: Brain, color: 'text-yellow-500', bg: 'bg-yellow-500/5', desc: 'Retro Arcade Experience' },
            ].map((game) => {
              //@ts-ignore
              const active = statsConfig[game.id];
              return (
                <div key={game.id} className="tech-border bg-[#0a0a0a] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 hover:bg-white/[0.01]">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 tech-border ${active ? 'bg-cyan-500/10 text-cyan-400' : 'bg-white/5 text-gray-600'}`}>
                      <game.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black text-white uppercase tracking-widest">{game.name}</h3>
                      <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">{game.desc}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (active) {
                        setStatsConfig({ [game.id]: false });
                      } else {
                        setStatsConfig({
                          showBreakout: false,
                          showSnake: false,
                          showPacman: false,
                          [game.id]: true
                        });
                      }
                    }}
                    className={`w-full sm:w-auto px-6 h-10 tech-border text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                      active
                        ? 'bg-cyan-500 text-[#020202] border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/10 hover:text-gray-300'
                    }`}
                  >
                    {active ? 'ACTIVE' : 'ENABLE'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
