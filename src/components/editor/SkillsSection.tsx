import React from 'react';
import { useStore } from '../../store/useStore';
import { Search } from 'lucide-react';

const SKILLS_DATABASE = {
  'Languages': ['javascript', 'typescript', 'python', 'java', 'cpp', 'go', 'rust', 'php', 'swift', 'kotlin', 'ruby', 'dart', 'html', 'css', 'sass', 'c', 'cs', 'elixir', 'haskell', 'lua', 'matlab', 'r', 'solidity', 'zig'],
  'Frontend': ['react', 'vue', 'angular', 'svelte', 'nextjs', 'tailwind', 'bootstrap', 'sass', 'redux', 'materialui', 'jquery', 'styledcomponents', 'vite', 'webpack', 'babel', 'astro', 'remix', 'threejs'],
  'Backend': ['nodejs', 'express', 'django', 'flask', 'spring', 'laravel', 'graphql', 'nestjs', 'fastapi', 'dotnet', 'go', 'ruby', 'php', 'elixir', 'strapi', 'prisma', 'apollo'],
  'Databases': ['mongodb', 'postgres', 'mysql', 'sqlite', 'redis', 'firebase', 'supabase', 'cassandra', 'dynamodb', 'planetscale', 'mariadb', 'oracle'],
  'Mobile': ['reactnative', 'flutter', 'android', 'apple', 'kotlin', 'swift', 'dart', 'ionic', 'capacitor'],
  'AI & ML': ['tensorflow', 'pytorch', 'scikitlearn', 'opencv', 'pandas', 'numpy', 'jupyter', 'anaconda', 'matplotlib'],
  'Cloud & DevOps': ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'jenkins', 'githubactions', 'terraform', 'nginx', 'vercel', 'netlify', 'digitalocean', 'heroku', 'linux', 'bash', 'ansible', 'prometheus', 'grafana'],
  'Design': ['figma', 'sketch', 'adobephotoshop', 'adobeillustrator', 'aftereffects', 'premiere', 'blender', 'canva'],
  'Tools': ['git', 'vscode', 'postman', 'notion', 'jest', 'vitest', 'npm', 'yarn', 'pnpm', 'obs', 'discord', 'slack', 'trello', 'jira'],
};


const SkillsSection: React.FC = () => {
  const { categoricalSkills, setCategoricalSkills } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');

  const toggleSkill = (category: string, skill: string) => {
    const currentSkills = categoricalSkills[category] || [];
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s: string) => s !== skill)
      : [...currentSkills, skill];
    
    setCategoricalSkills({
      ...categoricalSkills,
      [category]: newSkills
    });
  };

  const isSelected = (category: string, skill: string) => {
    return categoricalSkills[category]?.includes(skill);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 relative">
        <div>
          <h3 className="text-lg font-black text-white tracking-[0.2em] uppercase">Technologies</h3>
          <p className="text-[8px] text-cyan-500/50 uppercase tracking-[0.4em] font-bold">Select your technical skills</p>
        </div>
        
        <div className="relative group w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-cyan-500 transition-all duration-300" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-none pl-12 pr-5 py-3 text-xs text-gray-200 focus:outline-none focus:border-cyan-500/50 font-mono transition-all placeholder:text-gray-700"
          />
        </div>
      </div>

      <div className="space-y-12">
        {Object.entries(SKILLS_DATABASE).map(([category, skills]) => {
          const filteredSkills = skills.filter(s => 
            s.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredSkills.length === 0) return null;

          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-gray-800" />
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] font-mono">
                  {category} <span className="text-gray-700 ml-2">// COUNT: {filteredSkills.length}</span>
                </h3>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              
              <div className="flex flex-wrap gap-4">
                {filteredSkills.map((skill) => {
                  const active = isSelected(category, skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(category, skill)}
                      className={`relative px-4 py-2.5 flex items-center gap-3 transition-all duration-300 border font-mono text-[10px] uppercase tracking-wider ${
                        active
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                          : 'bg-white/2 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'
                      }`}
                    >
                      {active && <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-500" />}
                      <div className="relative">
                        <img 
                          src={`https://skillicons.dev/icons?i=${skill === 'reactnative' ? 'react' : skill}`} 
                          className={`w-4 h-4 transition-all duration-500 ${active ? 'scale-110' : 'grayscale opacity-40 group-hover:grayscale-0'}`}
                          alt={skill}
                        />
                      </div>
                      {skill.replace(/-/g, '_')}
                      {active && <div className="absolute bottom-0 right-0 w-1 h-1 bg-cyan-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {searchTerm && (
        <div className="text-center py-8 text-gray-600 font-mono text-[9px] uppercase tracking-widest opacity-40">
          STK_SCAN_INCOMPLETE // MORE_IDENTS_AVAILABLE
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
