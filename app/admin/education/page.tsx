'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Link from 'next/link'
import { FaArrowLeft, FaSave } from 'react-icons/fa'

export default function AdminEducation() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const { data, loading, saveData } = usePortfolioData('education')
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    period: '',
    description: '',
  })

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin')
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        school: data.school || '',
        degree: data.degree || '',
        period: data.period || '',
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
      alert('✓ Education saved!')
    } catch (error) {
      alert('✗ Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Education</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">School</label>
              <input type="text" name="school" value={formData.school} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Degree</label>
              <input type="text" name="degree" value={formData.degree} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Period</label>
              <input type="text" name="period" value={formData.period} onChange={handleChange} placeholder="2020 - 2024" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none" />
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
