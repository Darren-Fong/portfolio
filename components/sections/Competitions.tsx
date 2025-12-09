'use client'

import { motion } from 'framer-motion'
import { FaTrophy, FaMedal } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { competitionsData } from '@/data/competitions'
import { usePortfolioData } from '@/hooks/usePortfolioData'

export default function Competitions() {
  const { t } = useLanguage()
  const { data, loading } = usePortfolioData('competitions')
  
  if (loading) {
    return (
      <section className="section-padding bg-white dark:bg-gray-900 pt-24">
        <div className="container-custom text-center">
          <div className="text-2xl font-bold text-gray-500">Loading competitions...</div>
        </div>
      </section>
    )
  }

  let categories: any[] = []

  if (data) {
    if (Array.isArray(data)) {
      // New structure (merged languages)
      categories = data.map((cat: any) => ({
        category: cat.category,
        items: cat.items.map((item: any) => ({
          name: item.name,
          year: item.year,
          award: item.award,
          description: item.description,
        }))
      }))
    } else if (data['en']) {
      // Old structure (separated languages)
      categories = data['en']
    }
  }

  return (
    <section className="section-padding bg-white dark:bg-black pt-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-semibold text-center mb-6 text-apple-gray-900 dark:text-white tracking-tight">
            {t('competitions.title')}
          </h2>
          <p className="text-center text-apple-gray-600 dark:text-apple-gray-400 mb-16 max-w-2xl mx-auto text-xl font-light">
            {t('competitions.subtitle')}
          </p>
          
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12 last:mb-0">
              <h3 className="text-3xl font-semibold mb-8 text-apple-gray-900 dark:text-white flex items-center gap-3">
                <FaTrophy className="text-apple-gray-600 dark:text-apple-gray-400" />
                {category.category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((comp: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-semibold text-apple-gray-900 dark:text-white">
                        {comp.name}
                      </h4>
                      <span className="text-sm text-apple-gray-500 dark:text-apple-gray-500 ml-2 flex-shrink-0">
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
