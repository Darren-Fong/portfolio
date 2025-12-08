'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Link from 'next/link'
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa'

export default function AdminSkills() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const { data, loading, saveData } = usePortfolioData('skills')
  const [saving, setSaving] = useState(false)
  const [skills, setSkills] = useState<string[]>([])

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin')
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data && data.skills) {
      setSkills(data.skills)
    }
  }, [data])

  if (!isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await saveData({ skills: skills.filter(s => s.trim()) })
      alert('✓ Skills saved!')
    } catch (error) {
      alert('✗ Save failed')
    } finally {
      setSaving(false)
    }
  }

  const addSkill = () => setSkills([...skills, ''])
  const removeSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index))
  const updateSkill = (index: number, value: string) => {
    const newSkills = [...skills]
    newSkills[index] = value
    setSkills(newSkills)
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Skills</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Skills</h2>
              <button type="button" onClick={addSkill} className="btn-primary flex items-center gap-2">
                <FaPlus /> Add Skill
              </button>
            </div>
            
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    placeholder="e.g., React, Python, iOS Development"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              
              {skills.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No skills added yet. Click "Add Skill" to get started.
                </p>
              )}
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
