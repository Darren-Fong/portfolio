'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Link from 'next/link'
import { FaArrowLeft, FaSave } from 'react-icons/fa'

export default function AdminAbout() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const { data, loading, saveData } = usePortfolioData('about')
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    intro: '',
    introZh: '',
    journey: '',
    journeyZh: '',
    beyond: '',
    beyondZh: '',
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data) {
      setFormData({
        intro: data.intro || '',
        introZh: data.introZh || '',
        journey: data.journey || '',
        journeyZh: data.journeyZh || '',
        beyond: data.beyond || '',
        beyondZh: data.beyondZh || '',
      })
    }
  }, [data])

  if (!isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await saveData(formData)
      alert('About section saved successfully!')
    } catch (error) {
      alert('Failed to save data. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            Edit About Section
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Introduction Paragraph
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Introduction (English)
              </label>
              <textarea
                name="intro"
                value={formData.intro}
                onChange={handleChange}
                rows={4}
                placeholder="I'm a dedicated student with a passion for technology..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Introduction (Chinese)
              </label>
              <textarea
                name="introZh"
                value={formData.introZh}
                onChange={handleChange}
                rows={4}
                placeholder="我是一名充滿熱情的學生..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Academic Journey
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Journey (English)
              </label>
              <textarea
                name="journey"
                value={formData.journey}
                onChange={handleChange}
                rows={4}
                placeholder="Throughout my academic journey..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Journey (Chinese)
              </label>
              <textarea
                name="journeyZh"
                value={formData.journeyZh}
                onChange={handleChange}
                rows={4}
                placeholder="在學術旅程中..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Beyond Academics
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Beyond (English)
              </label>
              <textarea
                name="beyond"
                value={formData.beyond}
                onChange={handleChange}
                rows={4}
                placeholder="Beyond academics..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                Beyond (Chinese)
              </label>
              <textarea
                name="beyondZh"
                value={formData.beyondZh}
                onChange={handleChange}
                rows={4}
                placeholder="除了學術之外..."
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
