'use client'

import { createContext, useContext, ReactNode } from 'react'

interface LanguageContextType {
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
    'nav.education': 'Certifications',
    'nav.skills': 'Skills',
    'nav.organisations': 'Organisations',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Hey there! I\'m',
    'hero.name': 'Darren Fong',
    'hero.title': 'Student | Developer | Problem Solver',
    'hero.description': 'I love building things with code and solving interesting problems.',
    'hero.viewWork': 'Check Out My Work',
    'hero.getInTouch': 'Let\'s Talk',
    
    // About
    'about.title': 'About Me',
    'about.intro': 'I\'m a student who loves technology and building cool stuff. I got into coding because I wanted to create solutions that actually help people.',
    'about.journey': 'I\'ve competed in hackathons, built various projects, and picked up new skills along the way. Every project teaches me something new, and I\'m always looking for the next challenge.',
    'about.beyond': 'Outside of classes, I\'m involved in tech communities and organizations where I can learn from others and contribute. I believe in sharing knowledge and helping others grow.',
    
    // Projects
    'projects.title': 'My Projects',
    'projects.subtitle': 'Some things I\'ve built recently.',
    'projects.code': 'View Code',
    'projects.live': 'See It Live',
    
    // Competitions
    'competitions.title': 'Competitions & Awards',
    'competitions.subtitle': 'Highlights from competitions and challenges I\'ve participated in.',
    
    // Education
    'education.title': 'Education',
    'education.subtitle': 'Where I\'ve studied and what I\'ve learned.',
    'education.education': 'Education',
    'education.certifications': 'Certifications',
    
    // Skills
    'skills.title': 'What I Work With',
    'skills.subtitle': 'Technologies and tools I use regularly.',
    
    // Organisations
    'organizations.title': 'Experience & Involvement',
    'organizations.subtitle': 'Organizations and communities I\'m part of.',
    'organizations.school': 'School',
    'organizations.clubs': 'Clubs',
    'organizations.external': 'Organizations',
    'organizations.achievements': 'Highlights:',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Want to chat? Drop me a message!',
    'contact.info': 'Contact Info',
    'contact.connect': 'Connect',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.sending': 'Sending...',
    'contact.success': 'Thanks! I\'ll get back to you soon.',
    'contact.emailLabel': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    return translations['en'][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ t }}>
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
