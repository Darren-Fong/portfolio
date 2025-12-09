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
