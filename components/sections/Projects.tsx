'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
}

export default function Projects() {
  // Replace this with your actual projects
  const projects: Project[] = [
    {
      title: 'Project Name 1',
      description: 'A brief description of your project, what it does, and the problem it solves. This should be engaging and showcase your skills.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/yourusername/project1',
      liveUrl: 'https://project1.vercel.app',
    },
    {
      title: 'Project Name 2',
      description: 'Another project description highlighting the key features and your role in development.',
      technologies: ['Python', 'Flask', 'PostgreSQL'],
      githubUrl: 'https://github.com/yourusername/project2',
    },
    {
      title: 'Project Name 3',
      description: 'Description of a third project showcasing different skills and technologies.',
      technologies: ['Swift', 'SwiftUI', 'Firebase'],
      githubUrl: 'https://github.com/yourusername/project3',
      liveUrl: 'https://apps.apple.com/app/yourapp',
    },
  ]

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            GitHub Projects
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects showcasing my skills in various technologies and domains.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card h-full flex flex-col"
              >
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
                
                <div className="flex gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                  >
                    <FaGithub size={20} />
                    <span>Code</span>
                  </a>
                  
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      <FaExternalLinkAlt size={18} />
                      <span>Live Demo</span>
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
