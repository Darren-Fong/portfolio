'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Link from 'next/link'
import { FaArrowLeft, FaSave } from 'react-icons/fa'

export default function AdminContact() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
  })

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin')
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Saving contact data:', formData)
    alert('Contact information saved! (Implement backend storage)')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Contact Information
        </h1>

        <form onSubmit={handleSubmit} className="card">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+852 1234 5678"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Hong Kong"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                GitHub Username
              </label>
              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="Darren-Fong"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                LinkedIn Username
              </label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="darren-fong"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button type="submit" className="flex items-center gap-2 btn-primary">
              <FaSave /> Save Changes
            </button>
            
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
