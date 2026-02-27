import type { AppState } from '../types';

// ─── Theme resolver ────────────────────────────────────────────────────────────
const resolveThemes = (githubTheme: 'dark' | 'light', statsTheme?: string) => {
  const isDark = githubTheme === 'dark';
  const finalTheme = statsTheme && statsTheme !== 'github_dark' && statsTheme !== 'default' ? statsTheme : (isDark ? 'github_dark' : 'default');
  
  return {
    stats:    finalTheme,
    streak:   finalTheme,
    activity: statsTheme === 'github-dark' || (isDark && !statsTheme) ? 'github-dark' : (statsTheme ?? 'default'),
    summary:  statsTheme === 'github_dark' || (isDark && !statsTheme) ? 'github_dark' : (statsTheme ?? 'github'),
    trophy:   isDark        ? 'dracula'                        : 'flat',
    quote:    isDark        ? 'dark'                           : 'light',
  };
};

// ─── Entry point ───────────────────────────────────────────────────────────────
export const generateMarkdown = (state: AppState): string => {
  const { userInfo, socials, categoricalSkills, statsConfig, templateId, aboutMe, featuredProject, funFact, bannerUrl, githubTheme } = state;
  const themes = resolveThemes(githubTheme, statsConfig.statsTheme);

  switch (templateId) {
    case 'nexus-pro':
      return generateNexusProTemplate(userInfo, socials, categoricalSkills, aboutMe, featuredProject, funFact, bannerUrl, statsConfig, themes);
    case 'tech-grid':
      return generateTechGridTemplate(userInfo, socials, categoricalSkills, bannerUrl, statsConfig, themes);
    case 'stats-pro':
      return generateStatsProTemplate(userInfo, socials, categoricalSkills, bannerUrl, statsConfig, themes);
    case 'modern-minimalist':
    default:
      return generateModernMinimalistTemplate(userInfo, socials, categoricalSkills, bannerUrl, statsConfig, themes);
  }
};

// ─── Social badges ─────────────────────────────────────────────────────────────
const getSocialBadges = (socials: any) => {
  const socialMeta: Record<string, { badge: string; urlFn: (v: string) => string }> = {
    github: {
      badge: 'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white',
      urlFn: (v) => `https://github.com/${v}`,
    },
    linkedin: {
      badge: 'https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white',
      urlFn: (v) => v,
    },
    twitter: {
      badge: 'https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white',
      urlFn: (v) => `https://twitter.com/${v}`,
    },
    devto: {
      badge: 'https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=devto&logoColor=white',
      urlFn: (v) => `https://dev.to/${v}`,
    },
    website: {
      badge: 'https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=google-chrome&logoColor=white',
      urlFn: (v) => v,
    },
    email: {
      badge: 'https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white',
      urlFn: (v) => `mailto:${v}`,
    },
    instagram: {
      badge: 'https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white',
      urlFn: (v) => `https://instagram.com/${v}`,
    },
    youtube: {
      badge: 'https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white',
      urlFn: (v) => v,
    },
    medium: {
      badge: 'https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white',
      urlFn: (v) => `https://medium.com/@${v}`,
    },
    hashnode: {
      badge: 'https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white',
      urlFn: (v) => `https://hashnode.com/@${v}`,
    },
    discord: {
      badge: 'https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white',
      urlFn: (v) => v,
    },
    reddit: {
      badge: 'https://img.shields.io/badge/Reddit-FF4500?style=for-the-badge&logo=reddit&logoColor=white',
      urlFn: (v) => `https://reddit.com/u/${v}`,
    },
    twitch: {
      badge: 'https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white',
      urlFn: (v) => `https://twitch.tv/${v}`,
    },
  };

  const badges = Object.entries(socials)
    .filter(([_, val]) => val !== '')
    .map(([key, val]) => {
      const meta = socialMeta[key];
      if (!meta) return null;
      return `<a href="${meta.urlFn(val as string)}" target="_blank"><img src="${meta.badge}" /></a>`;
    })
    .filter(Boolean) as string[];

  let result = "";
  for (let i = 0; i < badges.length; i++) {
    result += badges[i] + " ";
    if ((i + 1) % 4 === 0 && i !== badges.length - 1) {
      result += "<br>\n  ";
    }
  }
  return result.trim();
};

// ─── Skill icons ───────────────────────────────────────────────────────────────
const getSkillIcons = (categories: Record<string, string[]>) => {
  let md = '';
  Object.entries(categories).forEach(([category, skills]) => {
    if (skills.length > 0) {
      md += `#### ${category}\n`;
      md += `<img src="https://skillicons.dev/icons?i=${skills.join(',').toLowerCase()}" /><br>\n\n`;
    }
  });
  return md;
};

// ─── Stats section ─────────────────────────────────────────────────────────────
const getStatsSection = (username: string, config: any, themes: ReturnType<typeof resolveThemes>) => {
  if (!username) return '';
  let md = `### 📊 GitHub Stats\n\n<div align="center">\n\n`;

  if (config.showSummaryCards) {
    md += `  <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${username}&theme=${themes.summary}" width="65%" />\n  <br><br>\n`;
    md += `  <img src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${username}&theme=${themes.summary}&utcOffset=5" width="65%" />\n  <br><br>\n`;
    md += `  <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${username}&theme=${themes.summary}" width="65%" />\n`;
  } else {
    if (config.showStats) {
      md += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${themes.stats}&hide_border=true" />\n`;
    }
    if (config.showLanguages) {
      md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${themes.stats}&hide_border=true" />\n`;
    }
  }

  md += `\n</div>\n`;

  if (config.showStreak) {
    md += `\n<div align="center">\n\n`;
    md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${themes.streak}&hide_border=true" alt="GitHub Streak" />\n`;
    md += `\n</div>\n`;
  }

  if (config.showActivityGraph) {
    md += `\n<div align="center">\n\n`;
    md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${themes.activity}&hide_border=true" width="100%" alt="Activity Graph" />\n`;
    md += `\n</div>\n`;
  }

  return md;
};

// ─── Quote section ─────────────────────────────────────────────────────────────
const getQuoteSection = (config: any, themes: ReturnType<typeof resolveThemes>) => {
  let md = '';
  if (config.showQuote) {
    md += `\n### ✍️ Random Dev Quote\n\n<div align="center">\n\n  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${themes.quote}" alt="Dev Quote" />\n\n</div>\n\n`;
  }
  if (config.showJokes) {
    md += `\n### 🤣 Random Dev Joke\n\n<div align="center">\n\n  <img src="https://github-readme-joke-api.vercel.app/api?theme=${themes.quote}" alt="Dev Joke" />\n\n</div>\n\n`;
  }
  return md;
};

// ─── Banner section ────────────────────────────────────────────────────────────
const getBannerSection = (bannerUrl: string) => {
  if (!bannerUrl) return '';
  return `<p align="center">\n  <img src="${bannerUrl}" width="100%" alt="Banner" />\n</p>\n\n`;
};

// ─── Fun components ────────────────────────────────────────────────────────────
const getFunComponents = (username: string, config: any) => {
  if (!username) return '';
  let md = '';

  if (config.showBreakout) {
    md += `\n<div align="center">\n<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/cyprieng/github-breakout/main/example/dark.svg" />\n  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/cyprieng/github-breakout/main/example/light.svg" />\n  <img alt="Breakout Game" src="https://raw.githubusercontent.com/cyprieng/github-breakout/main/example/light.svg" />\n</picture>\n</div>\n\n`;
  }

  if (config.showSnake) {
    md += `\n<div align="center">\n<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tobiasmeyhoefer/tobiasmeyhoefer/output/github-snake-dark.svg" />\n  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/tobiasmeyhoefer/tobiasmeyhoefer/output/github-snake.svg" />\n  <img alt="github-snake" src="https://raw.githubusercontent.com/tobiasmeyhoefer/tobiasmeyhoefer/output/github-snake.svg" />\n</picture>\n</div>\n\n`;
  }

  if (config.showPacman) {
    md += `\n<div align="center">\n<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/abozanona/abozanona/output/pacman-contribution-graph-dark.svg">\n  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/abozanona/abozanona/output/pacman-contribution-graph.svg">\n  <img alt="pacman contribution graph" src="https://raw.githubusercontent.com/abozanona/abozanona/output/pacman-contribution-graph.svg">\n</picture>\n</div>\n\n`;
  }

  return md;
};


// ─── Templates ─────────────────────────────────────────────────────────────────

const generateNexusProTemplate = (
  userInfo: any,
  socials: any,
  categoricalSkills: any,
  aboutMe: string[],
  featuredProject: any,
  funFact: string,
  bannerUrl: string,
  config: any,
  themes: ReturnType<typeof resolveThemes>
) => {
  let md = getBannerSection(bannerUrl);
  md += `<h1 align="center">\n  Hey there! 👋 I'm <span style="color:#007acc;">${userInfo.name || 'Your Name'}</span>\n</h1>\n`;
  if (userInfo.title) md += `<h3 align="center">\n  🚀 ${userInfo.title}\n</h3>\n\n`;

  if (config.showViews && socials.github) {
    md += `<p align="center">\n  <img src="https://komarev.com/ghpvc/?username=${socials.github}&label=Profile%20Views&color=blueviolet&style=for-the-badge" alt="Profile Views" />\n</p>\n\n`;
  }

  if (config.showTrophies && socials.github) {
    md += `<p align="center">\n  <img src="https://github-profile-trophy.vercel.app/?username=${socials.github}&theme=${themes.trophy}&no-frame=true&row=1&margin-w=10" alt="GitHub Trophies" />\n</p>\n\n`;
  }

  md += `---\n\n### 🌟 About Me\n`;
  if (aboutMe.length > 0) {
    aboutMe.forEach((line) => {
      // Ensure specific bolding and icons for consistent look
      if (line.includes('Python') || line.includes('Django') || line.includes('API')) {
        md += `- ${line}\n`;
      } else {
        md += `- ${line}\n`;
      }
    });
  } else {
    md += `- 💼 Software Developer specializing in **Python**, **Django**, and **REST APIs**\n`;
    md += `- 🔭 Currently working on impactful open-source projects\n`;
    md += `- 🎯 Focused on delivering **clean**, **scalable**, and **maintainable** solutions\n`;
  }

  md += `\n---\n\n### 🚀 Tech Stack\n\n<div align="center">\n\n${getSkillIcons(categoricalSkills)}</div>\n\n---\n\n`;

  if (featuredProject.title) {
    md += `### 🧩 Featured Project\n\n#### 🔹 **${featuredProject.title}** – ${featuredProject.description}\n`;
    if (featuredProject.link)
      md += `> **🔗 Live Demo:** [${featuredProject.link.replace(/^https?:\/\//, '')}](${featuredProject.link}) \n\n`;
    
    if (featuredProject.features && featuredProject.features.length > 0) {
      md += `**Key Features:**\n`;
      featuredProject.features.forEach((feat: string) => (md += `- ${feat}\n`));
    }
    md += `\n---\n\n`;
  }

  md += getStatsSection(socials.github, config, themes);
  md += getQuoteSection(config, themes);
  md += `\n---\n\n### 🌐 Connect with Me\n\n<div align="center">\n  ${getSocialBadges(socials)}\n</div>\n\n`;

  if (funFact) {
    md += `---\n\n### 🧠 Fun Fact\n> ${funFact}\n`;
  }

  md += getFunComponents(socials.github, config);

  return md;
};

const generateModernMinimalistTemplate = (userInfo: any, socials: any, _categoricalSkills: any, bannerUrl: string, statsConfig: any, themes: ReturnType<typeof resolveThemes>) => {
  const skills = Object.values(_categoricalSkills).flat() as string[];
  let md = getBannerSection(bannerUrl);
  md += `<h1 align="center">Hi there, I'm ${userInfo.name || 'a Developer'} 👋</h1>\n`;
  if (userInfo.title) md += `<p align="center"><b>${userInfo.title}</b></p>\n\n`;
  if (userInfo.bio) md += `${userInfo.bio}\n\n`;
  md += `<hr />\n\n`;
  if (skills.length > 0) {
    md += `## 🛠️ Tech Stack\n\n`;
    md += `<img src="https://skillicons.dev/icons?i=${skills.join(',').toLowerCase()}" />\n\n`;
  }
  md += getStatsSection(socials.github, statsConfig, themes);
  md += getQuoteSection(statsConfig, themes);
  md += getFunComponents(socials.github, statsConfig);
  return md;
};

const generateTechGridTemplate = (userInfo: any, socials: any, _categoricalSkills: any, bannerUrl: string, statsConfig: any, themes: ReturnType<typeof resolveThemes>) => {
  const skills = Object.values(_categoricalSkills).flat() as string[];
  let md = getBannerSection(bannerUrl);
  md += `# ${userInfo.name || 'Developer'} | ${userInfo.title || 'Engineer'}\n\n`;
  md += `> ${userInfo.bio || 'Building things with code.'}\n\n`;
  md += `## 🚀 Projects & Skills\n\n`;
  if (skills.length > 0) {
    md += `<img src="https://skillicons.dev/icons?i=${skills.join(',').toLowerCase()}" />\n\n`;
  }
  md += getStatsSection(socials.github, statsConfig, themes);
  md += getQuoteSection(statsConfig, themes);
  md += getFunComponents(socials.github, statsConfig);
  return md;
};

const generateStatsProTemplate = (userInfo: any, socials: any, _categoricalSkills: any, bannerUrl: string, statsConfig: any, themes: ReturnType<typeof resolveThemes>) => {
  let md = getBannerSection(bannerUrl);
  md += `# ${userInfo.name || 'Developer'}'s GitHub Universe 🌌\n\n`;
  md += getStatsSection(socials.github, statsConfig, themes);
  md += getQuoteSection(statsConfig, themes);
  md += getFunComponents(socials.github, statsConfig);
  return md;
};
