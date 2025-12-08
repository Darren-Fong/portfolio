'use client'

import { motion } from 'framer-motion'
import { FaTrophy, FaMedal } from 'react-icons/fa'

interface Competition {
  category: string
  name: string
  year: string
  award?: string
  description?: string
}

export default function Competitions() {
  // Replace with your actual competitions
  const competitions: Competition[] = [
    {
      category: 'STEAM',
      name: 'Science Fair',
      year: '2024',
      award: '1st Place',
      description: 'Developed an innovative solution for renewable energy',
    },
    {
      category: 'STEAM',
      name: 'Robotics Competition',
      year: '2023',
      award: 'Gold Medal',
      description: 'Built and programmed an autonomous robot',
    },
    {
      category: 'MUN',
      name: 'International Model United Nations',
      year: '2024',
      award: 'Best Delegate',
      description: 'Represented country in Security Council',
    },
    {
      category: 'MUN',
      name: 'Regional MUN Conference',
      year: '2023',
      award: 'Outstanding Delegate',
      description: 'Participated in Economic and Social Council',
    },
    {
      category: 'Literature',
      name: 'Creative Writing Contest',
      year: '2024',
      award: 'Winner',
      description: 'Short story on climate change awareness',
    },
    {
      category: 'Literature',
      name: 'Debate Championship',
      year: '2023',
      award: 'Semi-Finalist',
      description: 'Advanced to regional semi-finals',
    },
  ]

  const categories = ['STEAM', 'MUN', 'Literature']

  return (
    <section id="competitions" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Competitions & Awards
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Recognition and achievements from various academic and extracurricular competitions.
          </p>
          
          {categories.map((category, categoryIndex) => {
            const categoryCompetitions = competitions.filter(c => c.category === category)
            
            if (categoryCompetitions.length === 0) return null
            
            return (
              <div key={category} className="mb-12 last:mb-0">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                  <FaTrophy className="text-primary" />
                  {category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryCompetitions.map((comp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="card"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {comp.name}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {comp.year}
                        </span>
                      </div>
                      
                      {comp.award && (
                        <div className="flex items-center gap-2 mb-3">
                          <FaMedal className="text-yellow-500" />
                          <span className="text-primary font-semibold">
                            {comp.award}
                          </span>
                        </div>
                      )}
                      
                      {comp.description && (
                        <p className="text-gray-700 dark:text-gray-300">
                          {comp.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
