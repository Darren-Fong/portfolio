'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import { useLanguage } from '@/context/LanguageContext'
import { useTheme } from '@/context/ThemeContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme, mounted } = useTheme()

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.competitions'), href: '/competitions' },
    { name: t('nav.education'), href: '/education' },
    { name: t('nav.skills'), href: '/skills' },
    { name: t('nav.organisations'), href: '/organisations' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            {language === 'en' ? 'Portfolio' : '作品集'}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300 ${
                  pathname === item.href ? 'text-primary font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <FaMoon className="text-gray-700 dark:text-gray-300" size={20} />
                ) : (
                  <FaSun className="text-gray-700 dark:text-gray-300" size={20} />
                )}
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <FaMoon className="text-gray-700 dark:text-gray-300" size={20} />
                ) : (
                  <FaSun className="text-gray-700 dark:text-gray-300" size={20} />
                )}
              </button>
            )}

            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="px-3 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-sm"
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300 ${
                  pathname === item.href ? 'text-primary font-semibold' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
