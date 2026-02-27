import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  Github, Linkedin, Twitter, Globe, Mail, 
  Instagram, Youtube, MessageSquare, Twitch,
  Layout, BookOpen, Share2, Code2, Coffee, Hash
} from 'lucide-react';

const SocialsSection: React.FC = () => {
  const { socials, setSocials } = useStore();

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocials({ [name]: value });
  };

  const socialFields = [
    { name: 'github', label: 'GitHub', icon: Github, placeholder: 'yourname' },
    { name: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/...' },
    { name: 'twitter', label: 'Twitter (X)', icon: Twitter, placeholder: 'yourname' },
    { name: 'website', label: 'Portfolio', icon: Globe, placeholder: 'https://...' },
    { name: 'email', label: 'Email', icon: Mail, placeholder: 'hello@...' },
    { name: 'stackoverflow', label: 'Stack Overflow', icon: Code2, placeholder: 'UserID' },
    { name: 'medium', label: 'Medium', icon: Coffee, placeholder: '@yourname' },
    { name: 'devto', label: 'Dev.to', icon: BookOpen, placeholder: 'yourname' },
    { name: 'hashnode', label: 'Hashnode', icon: Hash, placeholder: '@yourname' },
    { name: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'yourname' },
    { name: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'Channel URL' },
    { name: 'discord', label: 'Discord', icon: MessageSquare, placeholder: 'yourname#1234' },
  ];


  const inputClasses = "w-full bg-[#0a0a0a] border border-white/10 rounded-none px-4 py-3 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 font-mono";
  const labelClasses = "flex items-center gap-2 text-[9px] font-black text-gray-500 mb-2 ml-1 uppercase tracking-[0.2em] font-mono";

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 relative">
        <div>
          <h3 className="text-lg font-black text-white tracking-[0.2em] uppercase">Social Profiles</h3>
          <p className="text-[8px] text-cyan-500/50 uppercase tracking-[0.4em] font-bold">Links to your social presence</p>
        </div>
        <div className="p-3 tech-border bg-white/[0.02] text-gray-500">
          <Share2 className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {socialFields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.name} className="space-y-3 group">
              <label className={labelClasses}>
                {field.label}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 text-gray-600 group-focus-within:text-cyan-500/50 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  name={field.name}
                  value={(socials as any)[field.name]}
                  onChange={handleSocialChange}
                  placeholder={field.placeholder}
                  className={`${inputClasses} pl-10`}
                />
                <div className="absolute right-0 top-0 w-[1px] h-full bg-cyan-500/0 group-focus-within:bg-cyan-500/40 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialsSection;
