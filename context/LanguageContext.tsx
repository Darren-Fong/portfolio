'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.competitions': 'Competitions',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.organisations': 'Organisations',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Hi, I\'m',
    'hero.name': 'Darren Fong',
    'hero.title': 'Student | Developer | Problem Solver',
    'hero.description': 'Passionate about technology, competitive programming, and making a difference through innovation.',
    'hero.viewWork': 'View My Work',
    'hero.getInTouch': 'Get In Touch',
    
    // About
    'about.title': 'About Me',
    'about.intro': 'I\'m a dedicated student with a passion for technology and innovation. My journey in the world of technology has been driven by curiosity and a desire to create meaningful solutions to real-world problems.',
    'about.journey': 'Throughout my academic journey, I\'ve participated in various competitions, earned certifications, and worked on diverse projects that have helped me develop both technical and soft skills. I\'m constantly learning and exploring new technologies to expand my knowledge and capabilities.',
    'about.beyond': 'Beyond academics, I\'m actively involved in organizations and initiatives that align with my interests and values. I believe in continuous growth, collaboration, and making a positive impact in my community.',
    
    // Projects
    'projects.title': 'GitHub Projects',
    'projects.subtitle': 'Here are some of my recent projects showcasing my skills in various technologies and domains.',
    'projects.code': 'Code',
    'projects.live': 'Live Demo',
    
    // Competitions
    'competitions.title': 'Competitions & Awards',
    'competitions.subtitle': 'Recognition and achievements from various academic and extracurricular competitions.',
    
    // Education
    'education.title': 'Education & Certifications',
    'education.subtitle': 'My academic journey and professional certifications.',
    'education.education': 'Education',
    'education.certifications': 'Licenses & Certifications',
    
    // Skills
    'skills.title': 'Skills & Technologies',
    'skills.subtitle': 'Technologies and tools I work with to build amazing projects.',
    
    // Organisations
    'organizations.title': 'Organisations & Experience',
    'organizations.subtitle': 'My involvement in various organisations and the experiences I\'ve gained.',
    'organizations.school': 'School Leadership',
    'organizations.clubs': 'Clubs & Societies',
    'organizations.external': 'External Organisations',
    'organizations.achievements': 'Key Achievements:',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Have a question or want to work together? Feel free to reach out!',
    'contact.info': 'Contact Information',
    'contact.connect': 'Connect With Me',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully! I\'ll get back to you soon.',
    'contact.emailLabel': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  zh: {
    // Navigation
    'nav.home': '首頁',
    'nav.about': '關於我',
    'nav.projects': '專案',
    'nav.competitions': '競賽',
    'nav.education': '教育',
    'nav.skills': '技能',
    'nav.organizations': '組織',
    'nav.contact': '聯絡',
    
    // Hero
    'hero.greeting': '你好，我是',
    'hero.name': '方子維',
    'hero.title': '學生 | 開發者 | 問題解決者',
    'hero.description': '熱衷於科技、競賽程式設計，並透過創新帶來改變。',
    'hero.viewWork': '查看作品',
    'hero.getInTouch': '聯絡我',
    
    // About
    'about.title': '關於我',
    'about.intro': '我是一名充滿熱情的學生，對科技和創新充滿熱愛。我在科技領域的旅程源於好奇心，以及創造有意義解決方案的渴望。',
    'about.journey': '在學術旅程中，我參加了各種競賽，獲得了認證，並參與了多元化的專案，這些經歷幫助我發展了技術和軟技能。我不斷學習和探索新技術，以擴展我的知識和能力。',
    'about.beyond': '除了學術之外，我積極參與符合我興趣和價值觀的組織和倡議。我相信持續成長、協作，並在社區中產生積極影響。',
    
    // Projects
    'projects.title': 'GitHub 專案',
    'projects.subtitle': '以下是我最近的一些專案，展示了我在各種技術和領域的技能。',
    'projects.code': '程式碼',
    'projects.live': '線上展示',
    
    // Competitions
    'competitions.title': '競賽與獎項',
    'competitions.subtitle': '來自各種學術和課外競賽的認可和成就。',
    
    // Education
    'education.title': '教育與認證',
    'education.subtitle': '我的學術歷程和專業認證。',
    'education.education': '教育背景',
    'education.certifications': '執照與認證',
    
    // Skills
    'skills.title': '技能與技術',
    'skills.subtitle': '我用來構建出色專案的技術和工具。',
    
    // Organizations
    'organizations.title': '組織與經驗',
    'organizations.subtitle': '我在各種組織中的參與以及所獲得的經驗。',
    'organizations.school': '學校領導',
    'organizations.clubs': '社團',
    'organizations.external': '校外組織',
    'organizations.achievements': '主要成就：',
    
    // Contact
    'contact.title': '聯絡我',
    'contact.subtitle': '有問題或想合作？歡迎與我聯絡！',
    'contact.info': '聯絡資訊',
    'contact.connect': '與我聯繫',
    'contact.name': '姓名',
    'contact.email': '電子郵件',
    'contact.subject': '主旨',
    'contact.message': '訊息',
    'contact.send': '發送訊息',
    'contact.sending': '發送中...',
    'contact.success': '訊息發送成功！我會盡快回覆您。',
    'contact.emailLabel': '電子郵件',
    'contact.phone': '電話',
    'contact.location': '地點',
    
    // Footer
    'footer.rights': '版權所有。',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'zh')) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
