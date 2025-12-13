'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'

export default function Contact() {
  const { t } = useLanguage()
  const { data, loading } = usePortfolioData('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(''), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(''), 3000)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (loading) {
    return (
      <section className="section-padding bg-white dark:bg-gray-900 pt-24">
        <div className="container-custom text-center">
          <div className="text-2xl font-bold text-gray-500">Loading contact info...</div>
        </div>
      </section>
    )
  }

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: t('contact.emailLabel'),
      value: data?.email || '',
      href: data?.email ? `mailto:${data.email}` : null,
    },
    {
      icon: <FaPhone />,
      label: t('contact.phone'),
      value: data?.phone || '',
      href: data?.phone ? `tel:${data.phone}` : null,
    },
    {
      icon: <FaMapMarkerAlt />,
      label: t('contact.location'),
      value: data?.location || '',
      href: null,
    },
  ].filter(item => item.value) // Only show items with values

  const socialLinks = [
    {
      icon: <FaGithub size={28} />,
      label: 'GitHub',
      href: data?.github || '',
    },
    {
      icon: <FaLinkedin size={28} />,
      label: 'LinkedIn',
      href: data?.linkedin || '',
    },
  ].filter(item => item.href) // Only show items with links

  return (
    <section className="section-padding bg-apple-gray-50 dark:bg-apple-gray-900 pt-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-semibold text-center mb-6 text-apple-gray-900 dark:text-white tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-center text-apple-gray-600 dark:text-apple-gray-400 mb-16 max-w-2xl mx-auto text-xl font-light">
            {t('contact.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-3xl font-semibold mb-8 text-apple-gray-900 dark:text-white">
                {t('contact.info')}
              </h3>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                  >
                    <div className="text-2xl text-apple-gray-600 dark:text-apple-gray-400">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm text-apple-gray-500 dark:text-apple-gray-500 font-light">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-apple-gray-900 dark:text-white hover:text-apple-gray-600 dark:hover:text-apple-gray-300 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-apple-gray-900 dark:text-white">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-3xl font-semibold mb-8 text-apple-gray-900 dark:text-white">
                {t('contact.connect')}
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="w-14 h-14 rounded-full bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white flex items-center justify-center hover:bg-apple-gray-200 dark:hover:bg-apple-gray-700 transition-all duration-200"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="card">
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white"
                  >
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-gray-400 dark:focus:ring-apple-gray-600"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white"
                  >
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-gray-400 dark:focus:ring-apple-gray-600"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white"
                  >
                    {t('contact.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-gray-400 dark:focus:ring-apple-gray-600"
                  />
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white"
                  >
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-apple-gray-400 dark:focus:ring-apple-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? t('contact.sending') : t('contact.send')}
                </button>

                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-green-600 dark:text-green-400 text-center"
                  >
                    {t('contact.success')}
                  </motion.p>
                )}
                
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-red-600 dark:text-red-400 text-center"
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
