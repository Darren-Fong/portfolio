'use client'

import { motion } from 'framer-motion'
import { FaTrophy, FaMedal } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { competitionsData } from '@/data/competitions'
import { usePortfolioData } from '@/hooks/usePortfolioData'

export default function Competitions() {
  const { t, language } = useLanguage()
  const { data } = usePortfolioData('competitions')
  
  let categories = competitionsData[language]

  if (data) {
    if (Array.isArray(data)) {
      // New structure (merged languages)
      categories = data.map((cat: any) => ({
        category: language === 'zh' ? (cat.categoryZh || cat.category) : cat.category,
        items: cat.items.map((item: any) => ({
          name: language === 'zh' ? (item.nameZh || item.name) : item.name,
          year: item.year,
          award: language === 'zh' ? (item.awardZh || item.award) : item.award,
          description: language === 'zh' ? (item.descriptionZh || item.description) : item.description,
        }))
      }))
    } else if (data[language]) {
      // Old structure (separated languages)
      categories = data[language]
    }
  }

  return (
    <section className="section-padding bg-white dark:bg-gray-900 pt-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            {t('competitions.title')}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            {t('competitions.subtitle')}
          </p>
          
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12 last:mb-0">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <FaTrophy className="text-primary" />
                {category.category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((comp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {comp.name}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                        {comp.year}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <FaMedal className="text-yellow-500" />
                      <span className="text-primary font-semibold">
                        {comp.award}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300">
                      {comp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
