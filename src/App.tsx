import { useState } from 'react';
import { Eye, Code, Copy, Check } from 'lucide-react';
import { useStore } from './store/useStore';
import { generateMarkdown } from './utils/markdownGenerator';
import ProfileSection from './components/editor/ProfileSection';
import SocialsSection from './components/editor/SocialsSection';
import SkillsSection from './components/editor/SkillsSection';
import ProjectSection from './components/editor/ProjectSection';
import StatsSection from './components/editor/StatsSection';
import ExtraSection from './components/editor/ExtraSection';
import LivePreview from './components/preview/LivePreview';
import MainLayout from './components/layout/MainLayout';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const state = useStore();
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [copied, setCopied] = useState(false);
  const [mobilePane, setMobilePane] = useState<'edit' | 'preview'>('edit');
  const [toast, setToast] = useState<{ msg: string; type: 'error' | 'success' } | null>(null);

  const showToast = (msg: string, type: 'error' | 'success' = 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopy = () => {
    const markdown = generateMarkdown(state);
    if (!markdown.trim()) {
      showToast('✏️  Your README is empty — fill in some details first!');
      return;
    }
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    showToast('README copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MainLayout>

      {/* ── Mobile-only: Split Tab Row (sits between main header and content) ── */}
      <div className="lg:hidden flex-shrink-0 flex w-full border-b border-white/10 bg-black/60 z-40">
        {/* Editor Tab */}
        <button
          onClick={() => setMobilePane('edit')}
          className={`flex-1 h-12 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] border-r border-white/10 transition-all ${
            mobilePane === 'edit'
              ? 'text-cyan-400 bg-cyan-500/8 border-b-2 border-b-cyan-400'
              : 'text-gray-600 hover:text-gray-400 bg-transparent'
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${mobilePane === 'edit' ? 'bg-cyan-500 shadow-[0_0_6px_rgba(0,242,255,0.8)]' : 'bg-gray-700'} transition-all`} />
          Build your README
        </button>

        {/* Preview Tab */}
        <button
          onClick={() => setMobilePane('preview')}
          className={`flex-1 h-12 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] transition-all ${
            mobilePane === 'preview'
              ? 'text-purple-400 bg-purple-500/8 border-b-2 border-b-purple-400'
              : 'text-gray-600 hover:text-gray-400 bg-transparent'
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${mobilePane === 'preview' ? 'bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.8)]' : 'bg-gray-700'} transition-all`} />
          Readme Preview
        </button>
      </div>

      {/* ── Panes wrapper — fills remaining height ── */}
      <div className="flex flex-1 min-h-0 w-full overflow-hidden">

        {/* ── Left Pane: Editor ── */}
        <div className={`${mobilePane === 'edit' ? 'flex' : 'hidden'} lg:flex w-full lg:w-1/2 h-full flex-col border-r border-white/10 bg-black/40 relative`}>

          {/* Desktop-only pane header */}
          <div className="hidden lg:flex h-14 border-b border-white/10 items-center px-4 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 animate-pulse" />
              <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-500/80">Build your README</h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10 pb-10">
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

            <section id="project" className="scroll-mt-6 tech-border p-6 bg-white/[0.01]">
              <div className="absolute -top-3 left-4 px-2 bg-[#020202] text-[8px] font-bold text-gray-500 uppercase tracking-widest border border-white/10">ID: PRJ_WRK</div>
              <ProjectSection />
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

        {/* ── Right Pane: Preview ── */}
        <div className={`${mobilePane === 'preview' ? 'flex' : 'hidden'} lg:flex w-full lg:w-1/2 h-full flex-col bg-black/60 relative`}>

          {/* Desktop-only pane header */}
          <div className="hidden lg:flex h-14 border-b border-white/10 items-center px-4 justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 animate-pulse" />
              <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-500/80">Readme Preview</h2>
            </div>
            {/* Desktop action row */}
            <div className="flex items-center gap-2">
              <div className="flex bg-black/40 border border-white/10 rounded-lg p-1 gap-1">
                <button
                  onClick={() => setViewMode('visual')}
                  className={`flex items-center gap-2 px-3 py-1 text-[9px] font-black uppercase tracking-widest transition-all rounded ${viewMode === 'visual' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Eye className="w-3 h-3" />Visual
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`flex items-center gap-2 px-3 py-1 text-[9px] font-black uppercase tracking-widest transition-all rounded ${viewMode === 'code' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Code className="w-3 h-3" />Code
                </button>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy README'}
              </button>
            </div>
          </div>

          {/* Preview content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8 bg-[#020202]">
            <LivePreview viewMode={viewMode} />
          </div>

          {/* ── Mobile-only: Vertical action panel — right edge of preview ── */}
          <div className="lg:hidden absolute right-0 top-0 bottom-0 flex flex-col items-center justify-end gap-2 pb-6 pr-3 pointer-events-none">
            <div className="flex flex-col items-center gap-2 pointer-events-auto">

              {/* Visual / Code toggle */}
              <div className="flex flex-col bg-black/70 border border-white/10 rounded-lg p-1 gap-1 backdrop-blur-md">
                <button
                  onClick={() => setViewMode('visual')}
                  title="Visual"
                  className={`flex flex-col items-center justify-center gap-1 w-12 h-12 text-[7px] font-black uppercase tracking-widest transition-all rounded ${viewMode === 'visual' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Visual
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  title="Code"
                  className={`flex flex-col items-center justify-center gap-1 w-12 h-12 text-[7px] font-black uppercase tracking-widest transition-all rounded ${viewMode === 'code' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  <Code className="w-3.5 h-3.5" />
                  Code
                </button>
              </div>


              {/* Copy button */}
              <button
                onClick={handleCopy}
                title="Copy README"
                className="flex flex-col items-center justify-center gap-1 w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[7px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/30 active:scale-95 backdrop-blur-md"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Done' : 'Copy'}
              </button>

            </div>
          </div>

        </div>
      </div>

      <Analytics />
      <SpeedInsights />

      {/* ── Toast notification ── */}
      {toast && (
        <div
          className={`fixed bottom-4 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-sm z-[9999] flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border backdrop-blur-md shadow-2xl text-xs sm:text-sm font-bold tracking-wide animate-fade-in-up
            ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-300 shadow-emerald-900/40'
                : 'bg-red-950/90 border-red-500/30 text-red-300 shadow-red-900/40'
            }`}
        >
          <span className="flex-1 leading-snug">{toast.msg}</span>
          <button
            onClick={() => setToast(null)}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity text-sm sm:text-base leading-none"
          >
            ✕
          </button>
        </div>
      )}
    </MainLayout>
  );
}

export default App;


