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
      return generateNexusProTemplate(userInfo, socials, categoricalSkills, aboutMe, featuredProject, funFact, bannerUrl, statsConfig, themes, githubTheme);
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
    stackoverflow: {
      badge: 'https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white',
      urlFn: (v) => `https://stackoverflow.com/users/${v}`,
    },
  };

  const activeSocials = Object.entries(socials).filter(([_, val]) => val !== '');
  
  // Fallback to a generic GitHub badge if no socials are configured
  if (activeSocials.length === 0) {
    const meta = socialMeta['github'];
    return `<a href="${meta.urlFn('octocat')}" target="_blank"><img src="${meta.badge}" /></a>`;
  }

  const badges = activeSocials
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
  let hasSkills = false;

  Object.entries(categories).forEach(([category, skills]) => {
    if (skills.length > 0) {
      hasSkills = true;
      md += `#### ${category}\n`;
      md += `<img src="https://skillicons.dev/icons?i=${skills.join(',').toLowerCase()}" />\n<br>\n\n`;
    }
  });

  if (!hasSkills) {
    // Fallback: Ascending order of popularity (rough estimate), with github included and html/css grouped.
    md += `#### Frontend\n`;
    md += `<img src="https://skillicons.dev/icons?i=svelte,vue,react,css,html" />\n<br>\n\n`;
    md += `#### Backend\n`;
    md += `<img src="https://skillicons.dev/icons?i=rust,go,python,nodejs" />\n<br>\n\n`;
    md += `#### Tools\n`;
    md += `<img src="https://skillicons.dev/icons?i=docker,github,git" />\n<br>\n\n`;
  }

  return md;
};

// ─── Stats section ─────────────────────────────────────────────────────────────
const getStatsSection = (username: string, config: any, themes: ReturnType<typeof resolveThemes>) => {
  const displayUsername = username || 'octocat';
  let md = `### 📊 GitHub Stats\n\n<div align="center">\n\n`;

  if (config.showSummaryCards) {
    md += `  <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${displayUsername}&theme=${themes.summary}" width="65%" />\n  <br><br>\n`;
    md += `  <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${displayUsername}&theme=${themes.summary}" width="65%" />\n`;
  } else {
    if (config.showStats) {
      md += `  <img src="https://github-readme-stats.vercel.app/api?username=${displayUsername}&show_icons=true&theme=${themes.stats}&hide_border=true" />\n`;
    }
    if (config.showStats && config.showLanguages) {
      md += `  <br><br>\n`;
    }
    if (config.showLanguages) {
      md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${displayUsername}&layout=compact&theme=${themes.stats}&hide_border=true" />\n`;
    }
  }

  md += `\n</div>\n\n<br><br>\n\n`;

  if (config.showStreak) {
    md += `<div align="center">\n\n`;
    md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${displayUsername}&theme=${themes.streak}&hide_border=true" alt="GitHub Streak" />\n`;
    md += `\n</div>\n\n<br><br>\n\n`;
  }

  if (config.showActivityGraph) {
    md += `<div align="center">\n\n`;
    md += `  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${displayUsername}&theme=${themes.activity}&hide_border=true" width="100%" alt="Activity Graph" />\n`;
    md += `\n</div>\n\n<br><br>\n\n`;
  }

  return md;
};

// ─── Quote section ─────────────────────────────────────────────────────────────
const getQuoteSection = (config: any, themes: ReturnType<typeof resolveThemes>) => {
  let md = '';
  if (config.showQuote) {
    md += `\n### ✍️ Random Dev Quote\n\n<div align="center">\n\n  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${themes.quote}" alt="Dev Quote" />\n\n</div>\n<br>\n\n`;
  }
  if (config.showJokes) {
    md += `\n### 🤣 Random Dev Joke\n\n<div align="center">\n\n  <img src="https://github-readme-joke-api.vercel.app/api?theme=${themes.quote}" alt="Dev Joke" />\n\n</div>\n<br>\n\n`;
  }
  return md;
};

// ─── Banner section ────────────────────────────────────────────────────────────
const getBannerSection = (bannerUrl: string) => {
  if (!bannerUrl) return '';
  return `<p align="center">\n  <img src="${bannerUrl}" width="100%" alt="Banner" />\n</p>\n\n<br><br>\n\n`;
};

// ─── Fun components ────────────────────────────────────────────────────────────
const getFunComponents = (username: string, config: any) => {
  const displayUsername = username || 'octocat';
  let md = '';

  if (config.showBreakout) {
    md += `\n<div align="center">\n<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/cyprieng/github-breakout/main/example/dark.svg" />\n  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/cyprieng/github-breakout/main/example/light.svg" />\n  <img alt="Breakout Game" src="https://raw.githubusercontent.com/cyprieng/github-breakout/main/example/light.svg" />\n</picture>\n</div>\n\n`;
  }

  if (config.showSnake) {
    // using user github action generated snake image or generic default if empty
    md += `\n<div align="center">\n<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${displayUsername}/${displayUsername}/output/github-snake-dark.svg" />\n  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${displayUsername}/${displayUsername}/output/github-snake.svg" />\n  <img alt="github-snake" src="https://raw.githubusercontent.com/${displayUsername}/${displayUsername}/output/github-snake.svg" onerror="this.src='https://raw.githubusercontent.com/tobiasmeyhoefer/tobiasmeyhoefer/output/github-snake.svg'" />\n</picture>\n</div>\n\n`;
  }

  if (config.showPacman) {
    md += `\n<div align="center">\n<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${displayUsername}/${displayUsername}/output/pacman-contribution-graph-dark.svg">\n  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${displayUsername}/${displayUsername}/output/pacman-contribution-graph.svg">\n  <img alt="pacman contribution graph" src="https://raw.githubusercontent.com/${displayUsername}/${displayUsername}/output/pacman-contribution-graph.svg" onerror="this.src='https://raw.githubusercontent.com/abozanona/abozanona/output/pacman-contribution-graph.svg'" />\n</picture>\n</div>\n\n`;
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
  themes: ReturnType<typeof resolveThemes>,
  githubTheme: 'dark' | 'light'
) => {
  let md = getBannerSection(bannerUrl);
  const nameColor = githubTheme === 'dark' ? '#58a6ff' : '#0969da';
  const textColor = githubTheme === 'dark' ? '#e6edf3' : '#1f2328';
  md += `<h1 align="center" style="color:${textColor};">\n  Hey there! 👋 I'm <span style="color:${nameColor};">${userInfo.name || 'Your Name'}</span>\n</h1>\n`;
  if (userInfo.title) md += `<h3 align="center">\n  🚀 ${userInfo.title}\n</h3>\n\n`;
  else md += `<h3 align="center">\n  🚀 Software Engineer | Open Source Contributor\n</h3>\n\n`;
  
  if (userInfo.location || userInfo.company) {
    const locStr = userInfo.location ? `📍 ${userInfo.location}` : '';
    const compStr = userInfo.company ? `🏢 ${userInfo.company}` : '';
    const divider = locStr && compStr ? ' | ' : '';
    md += `<p align="center">\n  ${locStr}${divider}${compStr}\n</p>\n\n`;
  } else {
    md += `<p align="center">\n  📍 Earth | 🏢 Remote\n</p>\n\n`;
  }


  if (config.showViews) {
    const displayGithub = socials.github || 'octocat';
    md += `<p align="center">\n  <img src="https://komarev.com/ghpvc/?username=${displayGithub}&label=Profile%20Views&color=blueviolet&style=for-the-badge" alt="Profile Views" />\n</p>\n\n<br><br>\n\n`;
  }

  if (config.showTrophies) {
    const displayGithub = socials.github || 'octocat';
    md += `<p align="center">\n  <img src="https://github-profile-trophy.vercel.app/?username=${displayGithub}&theme=${themes.trophy}&no-frame=true&row=1&margin-w=10" alt="GitHub Trophies" />\n</p>\n\n<br><br>\n\n`;
  }

  if (userInfo.bio) {
    md += `---\n\n### 🌟 About Me\n\n${userInfo.bio}\n\n`;
  } else if (aboutMe && aboutMe.length > 0) {
    md += `---\n\n### 🌟 About Me\n`;
    aboutMe.forEach((line: string) => {
      md += `- ${line}\n`;
    });
  } else {
    md += `---\n\n### 🌟 About Me\n\n`;
    md += `- 💼 Software Developer specializing in **Full Stack Development**\n`;
    md += `- 🔭 Currently working on impactful open-source projects\n`;
    md += `- 🎯 Focused on delivering **clean**, **scalable**, and **maintainable** solutions\n`;
  }

  md += `\n---\n\n### 🚀 Tech Stack\n\n<div align="center">\n\n${getSkillIcons(categoricalSkills)}</div>\n\n---\n\n`;

  md += `### 🧩 Featured Project\n`;
  if (featuredProject.title) {
    md += `🔹 **${featuredProject.title}** – ${featuredProject.description}\n\n`;
    
    if (featuredProject.link)
      md += `🔗 **Live Demo:** [${featuredProject.link.replace(/^https?:\/\//, '')}](${featuredProject.link}) \n\n`;
    

    if (featuredProject.features && featuredProject.features.length > 0) {
      md += `**Key Features:**\n\n`;
      featuredProject.features.forEach((feat: string) => {
        if (feat.trim() !== '') {
          md += `${feat}\n`;
        }
      });
    }
  } else {
    md += `🔹 **Awesome Placeholder Project** – An innovative project solving real-world problems.\n\n`;
    md += `🔗 **Live Demo:** [example.com](https://example.com) \n\n`;
    md += `**Key Features:**\n\n`;
    md += `- Scalable architecture\n`;
    md += `- Beautiful and responsive UI\n`;
    md += `- Comprehensive test coverage\n`;
  }
  md += `\n---\n\n`;

  md += getStatsSection(socials.github, config, themes);
  md += getQuoteSection(config, themes);
  md += `\n---\n\n### 🌐 Connect with Me\n\n<div align="center">\n  ${getSocialBadges(socials)}\n</div>\n\n`;

  md += `---\n\n### 🧠 Fun Fact\n> ${funFact || 'I once wrote a script to automate writing my scripts!'}\n`;

  md += getFunComponents(socials.github, config);

  return md;
};

const generateModernMinimalistTemplate = (userInfo: any, socials: any, _categoricalSkills: any, bannerUrl: string, statsConfig: any, themes: ReturnType<typeof resolveThemes>) => {
  let md = getBannerSection(bannerUrl);
  md += `<h1 align="center">Hi there, I'm ${userInfo.name || 'a Developer'} 👋</h1>\n`;
  if (userInfo.title) md += `<p align="center"><b>${userInfo.title}</b></p>\n`;
  else md += `<p align="center"><b>Software Engineer</b></p>\n`;
  
  if (userInfo.location || userInfo.company) {
    const locStr = userInfo.location ? `🌍 ${userInfo.location}` : '';
    const compStr = userInfo.company ? `💼 ${userInfo.company}` : '';
    const divider = locStr && compStr ? ' | ' : '';
    md += `<p align="center">${locStr}${divider}${compStr}</p>\n\n`;
  } else {
    md += `<p align="center">🌍 Earth | 💼 Remote</p>\n\n`;
  }

  if (userInfo.bio) md += `${userInfo.bio}\n\n`;
  else md += `Passionate about building cool things for the web.\n\n`;
  
  md += `<hr />\n\n`;
  
  md += `## 🛠️ Tech Stack\n\n`;
  const skillsList = Object.values(_categoricalSkills).flat() as string[];
  if (skillsList.length > 0) {
    md += `<img src="https://skillicons.dev/icons?i=${skillsList.join(',').toLowerCase()}" />\n\n`;
  } else {
    md += `<img src="https://skillicons.dev/icons?i=svelte,vue,react,css,html,rust,go,python,nodejs,docker,github,git" />\n\n`;
  }

  md += getStatsSection(socials.github, statsConfig, themes);
  md += getQuoteSection(statsConfig, themes);
  md += getFunComponents(socials.github, statsConfig);
  return md;
};

const generateTechGridTemplate = (userInfo: any, socials: any, _categoricalSkills: any, bannerUrl: string, statsConfig: any, themes: ReturnType<typeof resolveThemes>) => {
  let md = getBannerSection(bannerUrl);
  md += `# ${userInfo.name || 'Developer'} | ${userInfo.title || 'Software Engineer'}\n\n`;
  
  if (userInfo.location || userInfo.company) {
    const locStr = userInfo.location ? `📍 ${userInfo.location}` : '';
    const compStr = userInfo.company ? `🏢 ${userInfo.company}` : '';
    const divider = locStr && compStr ? ' • ' : '';
    md += `**${locStr}${divider}${compStr}**\n\n`;
  } else {
    md += `**📍 Earth • 🏢 Remote**\n\n`;
  }

  md += `> ${userInfo.bio || 'Building things with code.'}\n\n`;
  md += `## 🚀 Projects & Skills\n\n`;
  
  const skillsList = Object.values(_categoricalSkills).flat() as string[];
  if (skillsList.length > 0) {
    md += `<img src="https://skillicons.dev/icons?i=${skillsList.join(',').toLowerCase()}" />\n\n`;
  } else {
    md += `<img src="https://skillicons.dev/icons?i=svelte,vue,react,css,html,rust,go,python,nodejs,docker,github,git" />\n\n`;
  }

  md += getStatsSection(socials.github, statsConfig, themes);
  md += getQuoteSection(statsConfig, themes);
  md += getFunComponents(socials.github, statsConfig);
  return md;
};

const generateStatsProTemplate = (userInfo: any, socials: any, _categoricalSkills: any, bannerUrl: string, statsConfig: any, themes: ReturnType<typeof resolveThemes>) => {
  let md = getBannerSection(bannerUrl);
  md += `# ${userInfo.name || 'Developer'}'s GitHub Universe 🌌\n\n`;
  if (userInfo.title) md += `### ${userInfo.title}\n\n`;
  else md += `### Software Engineer\n\n`;
  
  if (userInfo.location || userInfo.company) {
    const locStr = userInfo.location ? `📍 ${userInfo.location}` : '';
    const compStr = userInfo.company ? `🏢 ${userInfo.company}` : '';
    const divider = locStr && compStr ? ' • ' : '';
    md += `<p>${locStr}${divider}${compStr}</p>\n\n`;
  } else {
    md += `<p>📍 Earth • 🏢 Remote</p>\n\n`;
  }
  
  if (userInfo.bio) md += `> ${userInfo.bio}\n\n`;
  else md += `> Transforming coffee into code.\n\n`;
  
  md += `## 🚀 Tech Stack\n\n`;
  const skillsList = Object.values(_categoricalSkills).flat() as string[];
  if (skillsList.length > 0) {
    md += `<img src="https://skillicons.dev/icons?i=${skillsList.join(',').toLowerCase()}" />\n\n`;
  } else {
    md += `<img src="https://skillicons.dev/icons?i=svelte,vue,react,css,html,rust,go,python,nodejs,docker,github,git" />\n\n`;
  }

  md += getStatsSection(socials.github, statsConfig, themes);
  md += getQuoteSection(statsConfig, themes);
  md += getFunComponents(socials.github, statsConfig);
  return md;
};
