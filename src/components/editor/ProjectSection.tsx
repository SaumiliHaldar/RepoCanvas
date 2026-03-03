import React from 'react';
import { useStore } from '../../store/useStore';
import { Briefcase } from 'lucide-react';

const ProjectSection: React.FC = () => {
  const { featuredProject, setFeaturedProject } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeaturedProject({ [name]: value });
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split('\n');
    setFeaturedProject({ features });
  };

  const inputClasses = "w-full bg-[#0a0a0a] border border-white/10 rounded-none px-4 py-3 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 font-mono";
  const labelClasses = "flex items-center gap-2 text-[11px] font-black text-gray-500 mb-2 ml-1 uppercase tracking-[0.2em] font-mono";

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 relative">
        <div>
          <h3 className="text-lg font-black text-white tracking-[0.2em] uppercase">Featured Project</h3>
          <p className="text-[10px] text-cyan-500/50 uppercase tracking-[0.4em] font-bold">Showcase your best work</p>
        </div>
        <div className="p-3 tech-border bg-white/[0.02] text-gray-500">
          <Briefcase className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {/* Project Title */}
        <div className="space-y-3 group md:col-span-2">
          <label className={labelClasses}>
            <span className="text-cyan-500/40">[01]</span> Project Title
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              value={featuredProject.title}
              onChange={handleChange}
              placeholder="Project Alpha / NextGen System"
              className={inputClasses}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-500" />
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-4 group md:col-span-2">
          <div className="flex items-center gap-4">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] font-mono whitespace-nowrap">
              Description
            </label>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
          <div className="relative">
            <textarea
              name="description"
              value={featuredProject.description}
              onChange={handleChange}
              placeholder="A revolutionary robust suite designed to synergize paradigms..."
              rows={3}
              className={`${inputClasses} resize-none group-focus-within:border-cyan-500/30`}
            />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/40 opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/40 opacity-0 group-focus-within:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Live Demo Link */}
        <div className="space-y-3 group md:col-span-2">
          <label className={labelClasses}>
            <span className="text-cyan-500/40">[02]</span> Live Demo Link
          </label>
          <div className="relative">
            <input
              type="text"
              name="link"
              value={featuredProject.link}
              onChange={handleChange}
              placeholder="https://project-alpha.demo.com"
              className={inputClasses}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-500" />
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-4 group md:col-span-2">
          <div className="flex items-center gap-4">
            <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] font-mono whitespace-nowrap">
              Key Features
            </label>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
          <div className="relative">
            <textarea
              name="features"
              value={featuredProject.features.join('\n')}
              onChange={handleFeaturesChange}
              placeholder="💬 Seamless chat integration&#10;🎯 Accurate predictive modeling&#10;⚡ Blazing fast execution"
              rows={4}
              className={`${inputClasses} resize-none group-focus-within:border-cyan-500/30 leading-loose`}
            />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/40 opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/40 opacity-0 group-focus-within:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
