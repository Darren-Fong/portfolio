'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Image from 'next/image'

export default function About() {
  const { t } = useLanguage()
  const { data, loading } = usePortfolioData('about')

  const intro = (data && Object.keys(data).length > 0)
    ? data.intro || t('about.intro')
    : t('about.intro')
  
  const journey = (data && Object.keys(data).length > 0)
    ? data.journey || t('about.journey')
    : t('about.journey')
    
  const beyond = (data && Object.keys(data).length > 0)
    ? data.beyond || t('about.beyond')
    : t('about.beyond')

  if (loading) {
    return (
      <section className="section-padding bg-white dark:bg-gray-900 pt-24">
        <div className="container-custom text-center">
          <div className="text-2xl font-bold text-gray-500">Loading about info...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-apple-gray-50 dark:bg-apple-gray-900 pt-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-semibold text-center mb-16 text-apple-gray-900 dark:text-white tracking-tight">
            {t('about.title')}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-80 h-80 rounded-full overflow-hidden">
                {data?.photoUrl ? (
                  <Image
                    src={data.photoUrl}
                    alt="Profile Photo"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                ) : (
                  <div className="w-full h-full bg-apple-gray-200 dark:bg-apple-gray-800 flex items-center justify-center">
                    <span className="text-6xl">👨‍💻</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* About Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="card"
              >
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {intro}
                </p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  {journey}
                </p>
                
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {beyond}
                </p>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="card text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('nav.projects')}
                  </div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('nav.competitions')}
                  </div>
                </div>
                <div className="card text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {t('education.certifications')}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
