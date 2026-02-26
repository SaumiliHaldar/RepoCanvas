import React from 'react';
import { useStore } from '../../store/useStore';
import { generateMarkdown } from '../../utils/markdownGenerator';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { ExternalLink, Terminal } from 'lucide-react';

interface LivePreviewProps {
  viewMode: 'visual' | 'code';
}

const LivePreview: React.FC<LivePreviewProps> = ({ viewMode }) => {
  const state = useStore();
  const markdown = generateMarkdown(state);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Content Area */}
      <div className="relative">
        <div className={`relative min-h-[500px] w-full bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden ${state.githubTheme === 'light' ? 'bg-white' : 'bg-[#0d1117]'}`}>
          {viewMode === 'visual' ? (
            <div className={`p-8 md:p-12 prose prose-invert max-w-none prose-img:rounded-lg prose-headings:border-b prose-headings:pb-2 prose-headings:border-white/10 ${state.githubTheme === 'light' ? 'prose-slate !text-black prose-headings:!text-black prose-a:!text-blue-600' : ''}`}>
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]} 
                remarkPlugins={[remarkGfm]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="p-0 flex flex-col h-full bg-[#0d1117]">
              <div className="flex items-center gap-2 px-6 py-4 bg-black/40 border-b border-white/5">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">README.md</span>
              </div>
              <pre className="p-8 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed h-[calc(100vh-300px)] custom-scrollbar selection:bg-blue-500/30">
                {markdown}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Help Note */}
      <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
          <ExternalLink className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h4 className="font-bold text-white mb-1">How to use this?</h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Copy the markdown code, go to your GitHub profile repository (e.g. <b>username/username</b>), and paste it into the <b>README.md</b> file. Your profile will be instantly updated!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
