'use client'

import { motion } from 'framer-motion'
import { FaGraduationCap, FaCertificate } from 'react-icons/fa'

interface EducationItem {
  type: 'education' | 'certification'
  institution: string
  degree: string
  year: string
  details?: string
  score?: string
}

export default function Education() {
  // Replace with your actual education and certifications
  const items: EducationItem[] = [
    {
      type: 'education',
      institution: 'Your High School',
      degree: 'High School Diploma',
      year: '2020 - 2024',
      details: 'GPA: 4.0/4.0',
    },
    {
      type: 'education',
      institution: 'HKDSE',
      degree: 'Hong Kong Diploma of Secondary Education',
      year: '2024',
      score: 'Overall: 5** in Mathematics, Physics, Chemistry',
    },
    {
      type: 'education',
      institution: 'IAL',
      degree: 'International Advanced Levels',
      year: '2024',
      score: 'A* in Mathematics, A* in Physics, A in Chemistry',
    },
    {
      type: 'certification',
      institution: 'IELTS',
      degree: 'International English Language Testing System',
      year: '2024',
      score: 'Overall Band: 8.5',
    },
    {
      type: 'certification',
      institution: 'Coursera',
      degree: 'Machine Learning Specialization',
      year: '2024',
      details: 'Offered by Stanford University & DeepLearning.AI',
    },
    {
      type: 'certification',
      institution: 'Coursera',
      degree: 'Full Stack Web Development',
      year: '2023',
      details: 'Offered by The Hong Kong University of Science and Technology',
    },
    {
      type: 'certification',
      institution: 'Coursera',
      degree: 'iOS App Development with Swift',
      year: '2023',
      details: 'Offered by University of Toronto',
    },
  ]

  const education = items.filter(item => item.type === 'education')
  const certifications = items.filter(item => item.type === 'certification')

  return (
    <section id="education" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Education & Certifications
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            My academic journey and professional certifications.
          </p>
          
          {/* Education Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <FaGraduationCap className="text-primary" />
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
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.degree}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
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
