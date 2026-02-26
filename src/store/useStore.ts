import { create } from 'zustand';
import type { AppState } from '../types';

export const useStore = create<AppState>((set) => ({
  userInfo: {
    name: '',
    title: '',
    bio: '',
    location: '',
    company: '',
    email: '',
  },
  socials: {
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    devto: '',
    instagram: '',
    youtube: '',
    medium: '',
    hashnode: '',
    discord: '',
    reddit: '',
    twitch: '',
  },
  aboutMe: [],
  categoricalSkills: {
    'Frontend': [],
    'Backend': [],
    'Languages': [],
    'Databases': [],
    'DevOps & Cloud': [],
    'Data Science & AI': [],
    'Mobile': [],
    'Tools & IDEs': [],
  },
  featuredProject: {
    title: '',
    description: '',
    link: '',
    features: [],
  },
  funFact: '',
  statsConfig: {
    showStats: true,
    showLanguages: true,
    showTrophies: true,
    showViews: true,
    showSummaryCards: true,
    showStreak: true,
    showActivityGraph: false,
    showQuote: false,
    showJokes: false,
    showSnake: false,
    showBreakout: false,
    showPacman: false,
    theme: 'tokyonight',

    statsTheme: 'tokyonight',
    layout: 'horizontal',
  },
  templateId: 'nexus-pro',
  colorPalette: 'nebula',
  githubTheme: 'dark' as 'dark' | 'light',
  bannerUrl: '',

  setUserInfo: (info: Partial<AppState['userInfo']>) =>
    set((state: AppState) => ({ userInfo: { ...state.userInfo, ...info } })),
    
  setSocials: (socials: Partial<AppState['socials']>) =>
    set((state: AppState) => ({ socials: { ...state.socials, ...socials } })),

  setAboutMe: (aboutMe: string[]) => set({ aboutMe }),

  setCategoricalSkills: (categoricalSkills: AppState['categoricalSkills']) => set({ categoricalSkills }),

  setFeaturedProject: (project: Partial<AppState['featuredProject']>) =>
    set((state: AppState) => ({ featuredProject: { ...state.featuredProject, ...project } })),

  setFunFact: (funFact: string) => set({ funFact }),

  setBannerUrl: (bannerUrl: string) => set({ bannerUrl }),
  
  setStatsConfig: (config: Partial<AppState['statsConfig']>) =>
    set((state: AppState) => ({ statsConfig: { ...state.statsConfig, ...config } })),
    
  setTemplateId: (templateId: string) => set({ templateId }),
  
  setColorPalette: (colorPalette: string) => set({ colorPalette }),

  setGithubTheme: (githubTheme: 'dark' | 'light') => set({ githubTheme }),
}));
