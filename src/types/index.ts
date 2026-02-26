export interface UserInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  company: string;
  email: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  devto: string;
  instagram: string;
  youtube: string;
  medium: string;
  hashnode: string;
  discord: string;
  reddit: string;
  twitch: string;
}

export interface FeaturedProject {
  title: string;
  description: string;
  link: string;
  features: string[];
}

export interface CategoricalSkills {
  [category: string]: string[];
}

export interface StatsConfig {
  showStats: boolean;
  showLanguages: boolean;
  showTrophies: boolean;
  showViews: boolean;
  showSummaryCards: boolean;
  showStreak: boolean;
  showActivityGraph: boolean;
  showQuote: boolean;
  showJokes: boolean;
  showSnake: boolean;
  showBreakout: boolean;
  showPacman: boolean;
  theme: string;

  statsTheme: string;
  layout: 'vertical' | 'horizontal';
}

export interface AppState {
  userInfo: UserInfo;
  socials: SocialLinks;
  aboutMe: string[];
  categoricalSkills: CategoricalSkills;
  featuredProject: FeaturedProject;
  funFact: string;
  bannerUrl: string;
  statsConfig: StatsConfig;
  templateId: string;
  colorPalette: string;
  githubTheme: 'dark' | 'light';
  
  // Actions
  setUserInfo: (info: Partial<UserInfo>) => void;
  setSocials: (socials: Partial<SocialLinks>) => void;
  setAboutMe: (about: string[]) => void;
  setCategoricalSkills: (skills: CategoricalSkills) => void;
  setFeaturedProject: (project: Partial<FeaturedProject>) => void;
  setFunFact: (fact: string) => void;
  setBannerUrl: (url: string) => void;
  setStatsConfig: (config: Partial<StatsConfig>) => void;
  setTemplateId: (id: string) => void;
  setColorPalette: (palette: string) => void;
  setGithubTheme: (theme: 'dark' | 'light') => void;
}
