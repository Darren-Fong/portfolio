// Data storage interface
export interface PortfolioData {
  hero: {
    name: string
    nameZh: string
    title: string
    titleZh: string
    description: string
    descriptionZh: string
  }
  about: {
    intro: string
    introZh: string
    journey: string
    journeyZh: string
    beyond: string
    beyondZh: string
  }
  projects: Array<{
    title: string
    titleZh: string
    description: string
    descriptionZh: string
    technologies: string[]
    githubUrl: string
    liveUrl?: string
    stars?: number
    forks?: number
  }>
  competitions: {
    en: Array<{
      category: string
      items: Array<{
        name: string
        year: string
        award?: string
        description?: string
      }>
    }>
    zh: Array<{
      category: string
      items: Array<{
        name: string
        year: string
        award?: string
        description?: string
      }>
    }>
  }
  education: Array<{
    type: 'education' | 'certification'
    institution: string
    institutionZh: string
    degree: string
    degreeZh: string
    year: string
    details?: string
    detailsZh?: string
    score?: string
  }>
  skills: Array<{
    category: string
    categoryZh: string
    skills: Array<{
      name: string
      level: number
    }>
  }>
  organizations: Array<{
    type: 'school' | 'club' | 'external'
    name: string
    nameZh: string
    role: string
    roleZh: string
    period: string
    description: string
    descriptionZh: string
    achievements?: string[]
    achievementsZh?: string[]
  }>
  contact: {
    email: string
    phone: string
    location: string
    locationZh: string
    github: string
    linkedin: string
  }
}

// Default data structure
export const defaultData: PortfolioData = {
  hero: {
    name: 'Darren Fong',
    nameZh: '方俊賢',
    title: 'Student | Developer | Problem Solver',
    titleZh: '學生 | 開發者 | 問題解決者',
    description: 'Passionate about technology, competitive programming, and making a difference through innovation.',
    descriptionZh: '熱衷於科技、競賽程式設計，並透過創新帶來改變。',
  },
  about: {
    intro: 'I\'m a dedicated student with a passion for technology and innovation. My journey in the world of technology has been driven by curiosity and a desire to create meaningful solutions to real-world problems.',
    introZh: '我是一名充滿熱情的學生，對科技和創新充滿熱愛。我在科技領域的旅程源於好奇心，以及創造有意義解決方案的渴望。',
    journey: 'Throughout my academic journey, I\'ve participated in various competitions, earned certifications, and worked on diverse projects that have helped me develop both technical and soft skills. I\'m constantly learning and exploring new technologies to expand my knowledge and capabilities.',
    journeyZh: '在學術旅程中，我參加了各種競賽，獲得了認證，並參與了多元化的專案，這些經歷幫助我發展了技術和軟技能。我不斷學習和探索新技術，以擴展我的知識和能力。',
    beyond: 'Beyond academics, I\'m actively involved in organizations and initiatives that align with my interests and values. I believe in continuous growth, collaboration, and making a positive impact in my community.',
    beyondZh: '除了學術之外，我積極參與符合我興趣和價值觀的組織和倡議。我相信持續成長、協作，並在社區中產生積極影響。',
  },
  projects: [],
  competitions: {
    en: [],
    zh: [],
  },
  education: [],
  skills: [],
  organizations: [],
  contact: {
    email: 'darren.fong@example.com',
    phone: '+852 9123 4567',
    location: 'Hong Kong',
    locationZh: '香港',
    github: 'https://github.com/Darren-Fong',
    linkedin: 'https://linkedin.com/in/darren-fong',
  },
}
