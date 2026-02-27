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
  const isDark = state.githubTheme === 'dark';

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-6">
      <div className={`
        relative min-h-[600px] w-full border rounded-lg overflow-hidden transition-colors duration-200
        ${isDark 
          ? 'bg-[#0d1117] border-[#30363d] text-[#e6edf3]' 
          : 'bg-white border-[#d0d7de] text-[#1f2328]'
        }
      `}>
        {viewMode === 'visual' ? (
          <div className={`p-8 md:p-12 prose max-w-none transition-colors duration-200
            ${isDark 
              ? 'prose-invert prose-headings:text-[#e6edf3] prose-p:text-[#e6edf3]/90 prose-a:text-[#2f81f7] prose-hr:border-[#30363d] prose-strong:text-[#e6edf3] prose-li:text-[#e6edf3]/90' 
              : 'prose-slate prose-headings:text-[#1f2328] prose-p:text-[#1f2328] prose-a:text-[#0969da] prose-hr:border-[#d0d7de] prose-strong:text-[#1f2328] prose-li:text-[#1f2328]'
            }
            prose-headings:border-b prose-headings:pb-2 prose-headings:font-semibold
            prose-p:leading-relaxed prose-img:rounded-md
          `}>
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]} 
              remarkPlugins={[remarkGfm]}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col h-full bg-[#0d1117]">
            <div className="flex items-center gap-2 px-6 py-4 bg-[#161b22] border-b border-[#30363d]">
              <Terminal className="w-4 h-4 text-[#7d8590]" />
              <span className="text-xs font-mono text-[#7d8590] uppercase tracking-widest font-bold">README.md</span>
            </div>
            <pre className="p-8 text-sm font-mono text-[#e6edf3] overflow-x-auto leading-relaxed h-[calc(100vh-350px)] whitespace-pre-wrap selection:bg-[#388bfd]/30">
              {markdown}
            </pre>
          </div>
        )}
      </div>

      {/* Help Note - Styled as a GitHub callout/alert style */}
      <div className={`p-4 rounded-md border flex gap-4 transition-colors duration-200 ${
        isDark 
          ? 'bg-[#161b22] border-[#30363d]' 
          : 'bg-[#f6f8fa] border-[#d0d7de]'
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isDark ? 'bg-[#1f6feb]/20' : 'bg-[#afcfef]'
        }`}>
          <ExternalLink className={`w-4 h-4 ${isDark ? 'text-[#58a6ff]' : 'text-[#0969da]'}`} />
        </div>
        <div>
          <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#e6edf3]' : 'text-[#1f2328]'}`}>
            How to use this?
          </h4>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-[#8b949e]' : 'text-[#636c76]'}`}>
            Copy the markdown code, go to your GitHub profile repository (e.g. <b>username/username</b>), and paste it into the <b>README.md</b> file. Your profile will be instantly updated!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
