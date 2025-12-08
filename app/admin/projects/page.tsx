'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Link from 'next/link'
import { FaArrowLeft, FaSave } from 'react-icons/fa'

export default function AdminProjects() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const { data, loading, saveData } = usePortfolioData('projects')
  const [saving, setSaving] = useState(false)
  const [jsonData, setJsonData] = useState('')

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin')
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data) {
      setJsonData(JSON.stringify(data, null, 2))
    } else {
      setJsonData(JSON.stringify({ projects: [] }, null, 2))
    }
  }, [data])

  if (!isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      const parsed = JSON.parse(jsonData)
      await saveData(parsed)
      alert('✓ Projects saved!')
    } catch (error) {
      alert('✗ Invalid JSON or save failed')
    } finally {
      setSaving(false)
    }
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
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-4">
            <FaArrowLeft /> Back
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Projects</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Edit Projects (JSON)</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Format: {`{ "projects": [{ "title": "...", "titleZh": "...", "description": "...", "descriptionZh": "...", "technologies": ["..."], "github": "...", "demo": "..." }] }`}
            </p>
            <textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm resize-none"
            />
          </div>

          <button type="submit" disabled={saving} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
            <FaSave /> {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  )
}
