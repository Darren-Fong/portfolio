'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Link from 'next/link'
import { 
  FaUser, FaProjectDiagram, FaTrophy, FaGraduationCap, 
  FaCode, FaUsers, FaEnvelope, FaSignOutAlt 
} from 'react-icons/fa'

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/admin')
  }

  const sections = [
    {
      title: 'About Me',
      icon: <FaUser size={32} />,
      href: '/admin/about',
      color: 'bg-blue-500',
    },
    {
      title: 'Projects',
      icon: <FaProjectDiagram size={32} />,
      href: '/admin/projects',
      color: 'bg-green-500',
    },
    {
      title: 'Competitions',
      icon: <FaTrophy size={32} />,
      href: '/admin/competitions',
      color: 'bg-yellow-500',
    },
    {
      title: 'Education',
      icon: <FaGraduationCap size={32} />,
      href: '/admin/education',
      color: 'bg-purple-500',
    },
    {
      title: 'Skills',
      icon: <FaCode size={32} />,
      href: '/admin/skills',
      color: 'bg-red-500',
    },
    {
      title: 'Organizations',
      icon: <FaUsers size={32} />,
      href: '/admin/organizations',
      color: 'bg-indigo-500',
    },
    {
      title: 'Contact Info',
      icon: <FaEnvelope size={32} />,
      href: '/admin/contact',
      color: 'bg-pink-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your portfolio content
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <Link
              key={index}
              href={section.href}
              className="card hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className={`${section.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {section.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Edit {section.title.toLowerCase()} content
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
