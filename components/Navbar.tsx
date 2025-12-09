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
  const { t } = useLanguage()
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
    <nav className="fixed w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-semibold text-apple-gray-900 dark:text-white tracking-tight">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-gray-900 dark:hover:text-white transition-colors duration-200 ${
                  pathname === item.href ? 'text-apple-gray-900 dark:text-white font-medium' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <FaMoon className="text-apple-gray-600 dark:text-apple-gray-300" size={18} />
                ) : (
                  <FaSun className="text-apple-gray-600 dark:text-apple-gray-300" size={18} />
                )}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <FaMoon className="text-apple-gray-600 dark:text-apple-gray-300" size={18} />
                ) : (
                  <FaSun className="text-apple-gray-600 dark:text-apple-gray-300" size={18} />
                )}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-apple-gray-600 dark:text-apple-gray-300"
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
                className={`block py-3 text-sm text-apple-gray-600 dark:text-apple-gray-300 hover:text-apple-gray-900 dark:hover:text-white transition-colors duration-200 ${
                  pathname === item.href ? 'text-apple-gray-900 dark:text-white font-medium' : ''
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
