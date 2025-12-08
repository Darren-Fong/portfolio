'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'

interface Project {
  title: string
  titleZh: string
  description: string
  descriptionZh: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  stars?: number
  forks?: number
  image?: string
}

export default function Projects() {
  const { t, language } = useLanguage()

  // Replace this with your actual projects
  const projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      titleZh: '電子商務平台',
      description: 'A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration using Stripe.',
      descriptionZh: '全端電子商務平台，具備用戶認證、產品管理、購物車和 Stripe 支付整合功能。',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
      githubUrl: 'https://github.com/Darren-Fong/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.vercel.app',
      stars: 45,
      forks: 12,
    },
    {
      title: 'AI Chat Application',
      titleZh: 'AI 聊天應用',
      description: 'Real-time chat application powered by OpenAI API with features like conversation history, code highlighting, and markdown support.',
      descriptionZh: '由 OpenAI API 驅動的即時聊天應用，具有對話歷史、程式碼高亮和 Markdown 支援功能。',
      technologies: ['React', 'Node.js', 'Socket.io', 'OpenAI API', 'MongoDB'],
      githubUrl: 'https://github.com/Darren-Fong/ai-chat-app',
      liveUrl: 'https://ai-chat-demo.vercel.app',
      stars: 78,
      forks: 23,
    },
    {
      title: 'Task Management System',
      titleZh: '任務管理系統',
      description: 'Collaborative task management tool with drag-and-drop functionality, real-time updates, and team collaboration features.',
      descriptionZh: '協作任務管理工具，具有拖放功能、即時更新和團隊協作功能。',
      technologies: ['React', 'Redux', 'Firebase', 'Material-UI'],
      githubUrl: 'https://github.com/Darren-Fong/task-manager',
      liveUrl: 'https://task-manager-demo.vercel.app',
      stars: 34,
      forks: 8,
    },
    {
      title: 'Weather Forecast App',
      titleZh: '天氣預報應用',
      description: 'Mobile-first weather application with detailed forecasts, weather maps, and location-based alerts built with React Native.',
      descriptionZh: '移動優先的天氣應用，提供詳細預報、天氣地圖和基於位置的警報，使用 React Native 構建。',
      technologies: ['React Native', 'TypeScript', 'OpenWeather API', 'Redux'],
      githubUrl: 'https://github.com/Darren-Fong/weather-app',
      stars: 56,
      forks: 15,
    },
    {
      title: 'Portfolio CMS',
      titleZh: '作品集內容管理系統',
      description: 'Headless CMS for managing portfolio content with admin dashboard, content versioning, and API endpoints.',
      descriptionZh: '用於管理作品集內容的無頭 CMS，具有管理儀表板、內容版本控制和 API 端點。',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
      githubUrl: 'https://github.com/Darren-Fong/portfolio-cms',
      stars: 29,
      forks: 7,
    },
    {
      title: 'Fitness Tracker iOS App',
      titleZh: 'iOS 健身追蹤應用',
      description: 'Native iOS fitness tracking app with workout logging, progress charts, and integration with Apple HealthKit.',
      descriptionZh: '原生 iOS 健身追蹤應用，具有鍛煉記錄、進度圖表和與 Apple HealthKit 的整合。',
      technologies: ['Swift', 'SwiftUI', 'CoreData', 'HealthKit'],
      githubUrl: 'https://github.com/Darren-Fong/fitness-tracker',
      liveUrl: 'https://apps.apple.com/app/fitness-tracker',
      stars: 42,
      forks: 11,
    },
  ]

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-800 pt-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            {t('projects.title')}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card h-full flex flex-col hover:scale-105 transition-transform duration-300"
              >
                {/* Project Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {language === 'en' ? project.title : project.titleZh}
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                  {language === 'en' ? project.description : project.descriptionZh}
                </p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                {(project.stars || project.forks) && (
                  <div className="flex gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {project.stars && (
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    {project.forks && (
                      <div className="flex items-center gap-1">
                        <FaCodeBranch />
                        <span>{project.forks}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                  >
                    <FaGithub size={20} />
                    <span>{t('projects.code')}</span>
                  </a>
                  
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      <FaExternalLinkAlt size={18} />
                      <span>{t('projects.live')}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
