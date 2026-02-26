import { useState } from 'react';
import { Eye, Code, Sun, Moon, Copy, Check } from 'lucide-react';
import { useStore } from './store/useStore';
import { generateMarkdown } from './utils/markdownGenerator';
import ProfileSection from './components/editor/ProfileSection';
import SocialsSection from './components/editor/SocialsSection';
import SkillsSection from './components/editor/SkillsSection';
import StatsSection from './components/editor/StatsSection';
import ExtraSection from './components/editor/ExtraSection';
import LivePreview from './components/preview/LivePreview';
import MainLayout from './components/layout/MainLayout';

function App() {
  const state = useStore();
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const markdown = generateMarkdown(state);
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MainLayout>
      {/* Left Pane: Editor Module */}
      <div className="w-full lg:w-1/2 h-full flex flex-col border-r border-white/10 bg-black/40 relative">
        <div className="h-14 border-b border-white/10 flex items-center px-4 justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
            <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/80">Input_Buffer // MODULE_01</h2>
          </div>
          <span className="text-[8px] font-bold text-gray-600 tracking-tighter">SECURED_LINK_v2</span>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10 pb-24">
          <section id="profile" className="scroll-mt-6 tech-border p-6 bg-white/[0.01]">
            <div className="absolute -top-3 left-4 px-2 bg-[#020202] text-[8px] font-bold text-gray-500 uppercase tracking-widest border border-white/10">ID: PRF_ESS</div>
            <ProfileSection />
          </section>
          
          <section id="socials" className="scroll-mt-6 tech-border p-6 bg-white/[0.01]">
            <div className="absolute -top-3 left-4 px-2 bg-[#020202] text-[8px] font-bold text-gray-500 uppercase tracking-widest border border-white/10">ID: SOC_PRZ</div>
            <SocialsSection />
          </section>

          <section id="skills" className="scroll-mt-6 tech-border p-6 bg-white/[0.01]">
            <div className="absolute -top-3 left-4 px-2 bg-[#020202] text-[8px] font-bold text-gray-500 uppercase tracking-widest border border-white/10">ID: TCH_STK</div>
            <SkillsSection />
          </section>

          <section id="stats" className="scroll-mt-6 tech-border p-6 bg-white/[0.01]">
            <div className="absolute -top-3 left-4 px-2 bg-[#020202] text-[8px] font-bold text-gray-500 uppercase tracking-widest border border-white/10">ID: GITHUB_ANA</div>
            <StatsSection />
          </section>

          <section id="extra" className="scroll-mt-6 tech-border p-6 bg-white/[0.01]">
            <div className="absolute -top-3 left-4 px-2 bg-[#020202] text-[8px] font-bold text-gray-500 uppercase tracking-widest border border-white/10">ID: SYS_XTRA</div>
            <ExtraSection />
          </section>
        </div>
      </div>

      {/* Right Pane: Live Preview Module */}
      <div className="w-full lg:w-1/2 h-full flex flex-col bg-black/60">
        <div className="h-14 border-b border-white/10 flex items-center px-4 justify-between bg-white/[0.02]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 animate-pulse" />
              <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-500/80">Output_Stream // RENDER_VIEW</h2>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-black/40 border border-white/10 rounded-lg p-1 gap-1">
              <button 
                onClick={() => setViewMode('visual')}
                className={`flex items-center gap-2 px-3 py-1 text-[9px] font-black uppercase tracking-widest transition-all rounded ${viewMode === 'visual' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <Eye className="w-3 h-3" />
                Visual
              </button>
              <button 
                onClick={() => setViewMode('code')}
                className={`flex items-center gap-2 px-3 py-1 text-[9px] font-black uppercase tracking-widest transition-all rounded ${viewMode === 'code' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <Code className="w-3 h-3" />
                Code
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => state.setGithubTheme(state.githubTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 border border-white/10 rounded-lg bg-black/40 text-gray-500 hover:text-cyan-400 transition-colors"
            >
              {state.githubTheme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy README'}
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#020202]">
          <div className="max-w-3xl mx-auto bg-[#0d1117] p-12 min-h-full border border-[#30363d] rounded-md shadow-sm">
            <LivePreview viewMode={viewMode} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
