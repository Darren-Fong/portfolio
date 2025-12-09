'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Link from 'next/link'
import { FaArrowLeft, FaSave } from 'react-icons/fa'

export default function AdminContact() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const { data, loading, saveData, refetch } = usePortfolioData('contact')
  const [saving, setSaving] = useState(false)
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

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        github: data.github || '',
        linkedin: data.linkedin || '',
      })
    }
  }, [data])

  if (!isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await saveData(formData)
      alert('✓ Contact info saved!')
    } catch (error) {
      alert('✗ Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-4">
            <FaArrowLeft /> Back
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Info</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+852 1234 5678" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Hong Kong" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">GitHub</label>
              <input type="url" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/username" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">LinkedIn</label>
              <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/profile" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>
          </div>

          <button type="submit" disabled={saving} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
            <FaSave /> {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  )
}
