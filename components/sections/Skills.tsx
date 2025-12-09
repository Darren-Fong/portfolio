'use client'

import { motion } from 'framer-motion'
import { FaCode } from 'react-icons/fa'
import { usePortfolioData } from '@/hooks/usePortfolioData'

export default function Skills() {
  const { data, loading } = usePortfolioData('skills')

  if (loading) {
    return (
      <section className="section-padding bg-white dark:bg-gray-900 pt-24">
        <div className="container-custom text-center">
          <div className="text-2xl font-bold text-gray-500">Loading skills...</div>
        </div>
      </section>
    )
  }

  const skills: string[] = (data && data.skills && Array.isArray(data.skills)) ? data.skills : []

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Skills & Technologies
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Technologies and tools I work with.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200 font-semibold shadow-sm hover:shadow-md transition-shadow flex items-center gap-2"
              >
                <FaCode className="text-primary" />
                {skill}
              </motion.div>
            ))}
            
            {skills.length === 0 && (
              <div className="text-gray-500">No skills added yet.</div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
