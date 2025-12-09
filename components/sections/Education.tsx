'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap, FaCertificate } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'

interface EducationItem {
  type: 'education' | 'certification'
  institution: string
  degree: string
  year: string
  details?: string
  score?: string
}

export default function Education() {
  const { t } = useLanguage()
  const { data, loading } = usePortfolioData('education')

  if (loading) {
    return (
      <section className="section-padding bg-gray-50 dark:bg-gray-800 pt-24">
        <div className="container-custom text-center">
          <div className="text-2xl font-bold text-gray-500">Loading education...</div>
        </div>
      </section>
    )
  }

  // Convert single admin entry to array item if it exists
  const education: EducationItem[] = (data && Object.keys(data).length > 0) ? [{
    type: 'education',
    institution: data.school,
    degree: data.degree,
    year: data.period,
    details: data.description,
  }] : []

  // Currently admin doesn't support certifications, so we leave it empty or static
  const certifications: EducationItem[] = []

  return (
    <section id="education" className="section-padding bg-white dark:bg-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-semibold text-center mb-6 text-apple-gray-900 dark:text-white tracking-tight">
            Education & Certifications
          </h2>
          <p className="text-center text-apple-gray-600 dark:text-apple-gray-400 mb-16 max-w-2xl mx-auto text-xl font-light">
            My academic journey and professional certifications.
          </p>
          
          {/* Education Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-semibold mb-8 text-apple-gray-900 dark:text-white flex items-center gap-3">
              <FaGraduationCap className="text-apple-gray-600 dark:text-apple-gray-400" />
              Education
            </h3>
            
            <div className="space-y-6">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold text-apple-gray-900 dark:text-white">
                      {item.degree}
                    </h4>
                    <span className="text-sm text-apple-gray-500 dark:text-apple-gray-500 font-light">
                      {item.year}
                    </span>
                  </div>
                  
                  <p className="text-lg text-primary mb-2">
                    {item.institution}
                  </p>
                  
                  {item.details && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {item.details}
                    </p>
                  )}
                  
                  {item.score && (
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">
                      {item.score}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <FaCertificate className="text-secondary" />
              Licenses & Certifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                      {item.degree}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.year}
                    </span>
                  </div>
                  
                  <p className="text-secondary mb-2">
                    {item.institution}
                  </p>
                  
                  {item.details && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {item.details}
                    </p>
                  )}
                  
                  {item.score && (
                    <p className="text-gray-700 dark:text-gray-300 font-semibold">
                      {item.score}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
