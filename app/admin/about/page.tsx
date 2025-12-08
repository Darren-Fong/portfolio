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
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleChange}
                  placeholder="Darren Fong"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Name (Chinese)
                </label>
                <input
                  type="text"
                  name="nameZh"
                  value={formData.nameZh}
                  onChange={handleChange}
                  placeholder="方俊賢"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Title (English)
                </label>
                <input
                  type="text"
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={handleChange}
                  placeholder="Student | Developer | Problem Solver"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Title (Chinese)
                </label>
                <input
                  type="text"
                  name="titleZh"
                  value={formData.titleZh}
                  onChange={handleChange}
                  placeholder="學生 | 開發者 | 問題解決者"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About Content
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Introduction Paragraph (English)
                </label>
                <textarea
                  name="introEn"
                  value={formData.introEn}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write about yourself in English..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Introduction Paragraph (Chinese)
                </label>
                <textarea
                  name="introZh"
                  value={formData.introZh}
                  onChange={handleChange}
                  rows={4}
                  placeholder="用中文寫關於自己..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Academic Journey (English)
                </label>
                <textarea
                  name="journeyEn"
                  value={formData.journeyEn}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your academic journey..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Academic Journey (Chinese)
                </label>
                <textarea
                  name="journeyZh"
                  value={formData.journeyZh}
                  onChange={handleChange}
                  rows={4}
                  placeholder="描述你的學術歷程..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Beyond Academics (English)
                </label>
                <textarea
                  name="beyondEn"
                  value={formData.beyondEn}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your extracurricular activities..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                  Beyond Academics (Chinese)
                </label>
                <textarea
                  name="beyondZh"
                  value={formData.beyondZh}
                  onChange={handleChange}
                  rows={4}
                  placeholder="描述你的課外活動..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 btn-primary"
            >
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
