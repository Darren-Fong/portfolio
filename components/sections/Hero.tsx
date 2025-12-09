'use client'

import { motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'

export default function Hero() {
  const { t } = useLanguage()
  const { data, loading } = usePortfolioData('hero')
  
  // Use saved data if available, otherwise use translations
  const name = (data && Object.keys(data).length > 0) 
    ? data.name || t('hero.name')
    : t('hero.name')
  const title = (data && Object.keys(data).length > 0)
    ? data.title || t('hero.title')
    : t('hero.title')
  const description = (data && Object.keys(data).length > 0)
    ? data.description || t('hero.description')
    : t('hero.description')

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-16">
        <div className="text-gray-900 dark:text-white">Loading...</div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="container-custom text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('hero.greeting')} <span className="text-primary">{name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            {title}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="btn-primary">
              {t('hero.viewWork')}
            </Link>
            <Link href="/contact" className="btn-secondary">
              {t('hero.getInTouch')}
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
        </motion.div>
      </div>
    </section>
  )
}
