import React from 'react';
import { useStore } from '../../store/useStore';
import { User } from 'lucide-react';

const ProfileSection: React.FC = () => {
  const { userInfo, setUserInfo } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo({ [name]: value });
  };

  const inputClasses = "w-full bg-[#0a0a0a] border border-white/10 rounded-none px-4 py-3 text-xs text-gray-300 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 font-mono";
  const labelClasses = "flex items-center gap-2 text-[9px] font-black text-gray-500 mb-2 ml-1 uppercase tracking-[0.2em] font-mono";

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between border-b border-white/10 pb-6 relative">
        <div>
          <h3 className="text-lg font-black text-white tracking-[0.2em] uppercase">Profile Details</h3>
          <p className="text-[8px] text-cyan-500/50 uppercase tracking-[0.4em] font-bold">Your basic information</p>
        </div>
        <div className="p-3 tech-border bg-white/[0.02] text-gray-500">
          <User className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
        {/* Name */}
        <div className="space-y-3 group">
          <label className={labelClasses}>
            <span className="text-cyan-500/40">[01]</span> Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputClasses}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-500" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3 group">
          <label className={labelClasses}>
            <span className="text-cyan-500/40">[02]</span> Current Title
          </label>
          <div className="relative">
            <input
              type="text"
              name="title"
              value={userInfo.title}
              onChange={handleChange}
              placeholder="Senior Fullstack Engineer"
              className={inputClasses}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-500" />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3 group">
          <label className={labelClasses}>
            <span className="text-cyan-500/40">[03]</span> Location
          </label>
          <div className="relative">
            <input
              type="text"
              name="location"
              value={userInfo.location}
              onChange={handleChange}
              placeholder="San Francisco, CA"
              className={inputClasses}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-500" />
          </div>
        </div>

        {/* Company */}
        <div className="space-y-3 group">
          <label className={labelClasses}>
            <span className="text-cyan-500/40">[04]</span> Company / Org
          </label>
          <div className="relative">
            <input
              type="text"
              name="company"
              value={userInfo.company}
              onChange={handleChange}
              placeholder="Google / Freelance / MIT"
              className={inputClasses}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-500" />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-3 group md:col-span-2">
          <label className={labelClasses}>
            <span className="text-cyan-500/40">[05]</span> Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              placeholder="hello@johndoe.dev"
              className={inputClasses}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-500 group-focus-within:w-full transition-all duration-500" />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-4 group md:col-span-2 pt-4">
          <div className="flex items-center gap-4">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] font-mono whitespace-nowrap">
              About Me // BRIEF_SUMMARY
            </label>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
          <div className="relative">
            <textarea
              name="bio"
              value={userInfo.bio}
              onChange={handleChange}
              placeholder="INITIATE_NARRATIVE_SEQUENCE..."
              rows={5}
              className={`${inputClasses} resize-none group-focus-within:border-cyan-500/30`}
            />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/40 opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/40 opacity-0 group-focus-within:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
