'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'

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
  const { t } = useLanguage()
  const { data, loading } = usePortfolioData('projects')

  if (loading) {
    return (
      <section className="section-padding bg-gray-50 dark:bg-gray-800 pt-24">
        <div className="container-custom text-center">
          <div className="text-2xl font-bold text-gray-500">Loading projects...</div>
        </div>
      </section>
    )
  }

  const projects: Project[] = (data && Array.isArray(data)) ? data : []

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
                  {project.title}
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                  {project.description}
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
