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
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-black pt-16">
      <div className="container-custom text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold mb-6 text-apple-gray-900 dark:text-white tracking-tight">
            {t('hero.greeting')} <span className="font-normal">{name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-apple-gray-600 dark:text-apple-gray-400 mb-8 font-light">
            {title}
          </p>
          <p className="text-lg text-apple-gray-500 dark:text-apple-gray-500 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
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
      </div>
    </section>
  )
}
