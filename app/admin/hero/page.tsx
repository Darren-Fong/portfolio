'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Link from 'next/link'
import { FaArrowLeft, FaSave } from 'react-icons/fa'

export default function AdminHero() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const { data, loading, saveData, refetch } = usePortfolioData('hero')
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        title: data.title || '',
        description: data.description || '',
      })
    }
  }, [data])

  if (!isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await saveData(formData)
      await refetch()
      alert('✓ Hero saved! Refresh the homepage to see changes.')
    } catch (error) {
      console.error('Save error:', error)
      alert('✗ Save failed')
    } finally {
      setSaving(false)
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 flex items-center justify-center">
        <div className="text-gray-900 dark:text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-4"
          >
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Edit Hero Section
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Name
            </h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Darren Fong"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Title/Role
            </h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Student | Developer | Problem Solver"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Description
            </h2>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Passionate about technology, competitive programming, and making a difference through innovation."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaSave />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
