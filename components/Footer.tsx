'use client'

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-apple-gray-50 dark:bg-apple-gray-900 py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-apple-gray-600 dark:text-apple-gray-400 mb-4 md:mb-0 font-light">
            © {new Date().getFullYear()} Darren Fong. {t('footer.rights')}
          </p>
          
          <div className="flex space-x-6">
            <a
              href="https://github.com/Darren-Fong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apple-gray-600 dark:text-apple-gray-400 hover:text-apple-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/darren-fong-552188314/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apple-gray-600 dark:text-apple-gray-400 hover:text-apple-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="mailto:mail@darrenfong.net"
              className="text-apple-gray-600 dark:text-apple-gray-400 hover:text-apple-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
