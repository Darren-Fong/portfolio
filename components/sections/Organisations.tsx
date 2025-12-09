'use client'

import { motion } from 'framer-motion'
import { FaSchool, FaUsers, FaBriefcase } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'

interface Organisation {
  type: 'school' | 'club' | 'external'
  name: string
  nameZh?: string
  role: string
  roleZh?: string
  period: string
  description: string
  descriptionZh?: string
  achievements?: string[]
  achievementsZh?: string[]
}

export default function Organisations() {
  const { t } = useLanguage()
  const { data, loading } = usePortfolioData('organisations')

  if (loading) {
    return (
      <section className="section-padding bg-gray-50 dark:bg-gray-800 pt-24">
        <div className="container-custom text-center">
          <div className="text-2xl font-bold text-gray-500">Loading organisations...</div>
        </div>
      </section>
    )
  }
  
  const organisations: Organisation[] = (data && Array.isArray(data)) ? data : []

  const schoolOrgs = organisations.filter(org => org.type === 'school')
  const clubOrgs = organisations.filter(org => org.type === 'club')
  const externalOrgs = organisations.filter(org => org.type === 'external')

  const renderOrganisations = (orgs: Organisation[], title: string, icon: React.ReactNode) => {
    if (orgs.length === 0) return null
    
    return (
      <div className="mb-12 last:mb-0">
        <h3 className="text-3xl font-semibold mb-8 text-apple-gray-900 dark:text-white flex items-center gap-3">
          {icon}
          {title}
        </h3>
        
        <div className="space-y-6">
          {orgs.map((org, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h4 className="text-xl font-semibold text-apple-gray-900 dark:text-white">
                  {org.name}
                </h4>
                <span className="text-sm text-apple-gray-500 dark:text-apple-gray-500 font-light">
                  {org.period}
                </span>
              </div>
              
              <p className="text-lg text-apple-gray-700 dark:text-apple-gray-300 font-medium mb-3">
                {org.role}
              </p>
              
              <p className="text-apple-gray-600 dark:text-apple-gray-400 mb-4 font-light">
                {org.description}
              </p>
              
              {org.achievements && org.achievements.length > 0 && (
                <div>
                  <p className="font-medium text-apple-gray-900 dark:text-white mb-2">
                    Key Achievements:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {org.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-apple-gray-600 dark:text-apple-gray-400 font-light">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section id="organisations" className="section-padding bg-apple-gray-50 dark:bg-apple-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-semibold text-center mb-6 text-apple-gray-900 dark:text-white tracking-tight">
            Organisations & Experience
          </h2>
          <p className="text-center text-apple-gray-600 dark:text-apple-gray-400 mb-16 max-w-2xl mx-auto text-xl font-light">
            My involvement in various organisations and the experiences I've gained.
          </p>
          
          {renderOrganisations(schoolOrgs, 'School Leadership', <FaSchool className="text-apple-gray-600 dark:text-apple-gray-400" />)}
          {renderOrganisations(clubOrgs, 'Clubs & Societies', <FaUsers className="text-apple-gray-600 dark:text-apple-gray-400" />)}
          {renderOrganisations(externalOrgs, 'External Organisations', <FaBriefcase className="text-apple-gray-600 dark:text-apple-gray-400" />)}
        </motion.div>
      </div>
    </section>
  )
}
