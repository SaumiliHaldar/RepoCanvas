import React from 'react';
import { Layout } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#020202] text-gray-400 selection:bg-cyan-500/30 selection:text-white relative overflow-hidden font-mono">
      {/* Background Blueprint Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-dot-grid opacity-10" />
        <div className="scanline" />
      </div>

      {/* HUD Top bar */}
      <header className="h-16 border-b border-white/10 bg-black/60 flex items-center justify-between px-6 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 tech-border tech-border-accent flex items-center justify-center bg-cyan-500/5 group cursor-pointer transition-all hover:bg-cyan-500/10">
            <Layout className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-widest uppercase">
                Repo_Canvas
              </span>
              <div className="status-light status-online" />
            </div>
            <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.2em] opacity-80">Readme_Generator_v1.0.1</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-6 text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em]">
            <div className="flex flex-col items-center">
              <span className="opacity-40">CPU_LOAD</span>
              <span className="text-gray-300">12.4%</span>
            </div>
            <div className="flex flex-col items-center border-l border-white/5 pl-6">
              <span className="opacity-40">MEM_ALLOC</span>
              <span className="text-gray-300">2.8GB</span>
            </div>
            <div className="flex flex-col items-center border-l border-white/5 pl-6">
              <span className="opacity-40">SATELLITE_LINK</span>
              <span className="text-cyan-500">ACTIVE</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden relative z-10">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
