import React from 'react';
import { useStore } from '../../store/useStore';
import { BarChart3, PieChart, Trophy, Eye, Zap, Activity, Quote, Smile } from 'lucide-react';

const STATS_THEMES = [
  { id: 'tokyonight', name: 'Tokyo Night', color: '#7aa2f7' },
  { id: 'dracula', name: 'Dracula', color: '#bd93f9' },
  { id: 'radical', name: 'Radical', color: '#ff3e64' },
  { id: 'merko', name: 'Merko', color: '#abd200' },
  { id: 'gruvbox', name: 'Gruvbox', color: '#fabd2f' },
  { id: 'github_dark', name: 'GitHub Dark', color: '#1f2328' },
];

const StatsSection: React.FC = () => {
  const { statsConfig, setStatsConfig } = useStore();

  const toggleConfig = (key: keyof typeof statsConfig) => {
    setStatsConfig({ [key]: !statsConfig[key] });
  };

  const configOptions = [
    { key: 'showStats', label: 'Stats Card', icon: BarChart3, desc: 'Overall stats like stars, commits, etc.' },
    { key: 'showLanguages', label: 'Top Languages', icon: PieChart, desc: 'Your most used programming languages.' },
    { key: 'showTrophies', label: 'GitHub Trophies', icon: Trophy, desc: 'Display your achievements as trophies.' },
    { key: 'showViews', label: 'Profile Views', icon: Eye, desc: 'Track how many people visit your profile.' },
    { key: 'showStreak', label: 'GitHub Streak', icon: Zap, desc: 'Display your current contribution streak.' },
    { key: 'showActivityGraph', label: 'Activity Graph', icon: Activity, desc: 'Visual representation of your activity.' },
    { key: 'showQuote', label: 'Daily Quote', icon: Quote, desc: 'A random developer quote every day.' },
    { key: 'showJokes', label: 'Dev Jokes', icon: Smile, desc: 'Lighten up your profile with a joke.' },
  ];


  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 relative">
        <div>
          <h3 className="text-lg font-black text-white tracking-[0.2em] uppercase">GitHub Stats</h3>
          <p className="text-[8px] text-cyan-500/50 uppercase tracking-[0.4em] font-bold">Visualize your activity and achievements</p>
        </div>
        <div className="p-3 tech-border bg-white/[0.02] text-gray-500">
          <BarChart3 className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {configOptions.map((opt) => {
          const Icon = opt.icon;
          //@ts-ignore
          const active = statsConfig[opt.key];
          return (
            <button
              key={opt.key}
              onClick={() => toggleConfig(opt.key as any)}
              className={`p-4 border text-left transition-all duration-300 flex items-center gap-4 group relative overflow-hidden font-mono ${
                active
                  ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                  : 'bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'
              }`}
            >
              {active && <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-cyan-500" />}
              <div className={`p-2 transition-all duration-300 ${active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-600'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest">{opt.label}</h3>
                <p className="text-[8px] opacity-40 uppercase tracking-tighter mt-0.5">{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-gray-800" />
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] font-mono">
            Stats Theme
          </h4>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {STATS_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setStatsConfig({ statsTheme: t.id })}
              className={`p-3 border text-center transition-all duration-300 group relative font-mono ${
                statsConfig.statsTheme === t.id
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                  : 'bg-white/[0.02] border-white/5 text-gray-600 hover:border-white/20 hover:text-gray-400'
              }`}
            >
              <div 
                className={`w-full h-1.5 mb-2 transition-opacity duration-300 ${statsConfig.statsTheme === t.id ? 'opacity-100' : 'opacity-20'}`} 
                style={{ backgroundColor: t.color }}
              />
              <span className="text-[8px] font-black uppercase tracking-widest">{t.name.substring(0, 10)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
