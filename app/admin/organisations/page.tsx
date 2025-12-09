'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Link from 'next/link'
import { FaArrowLeft, FaPlus, FaTrash, FaChevronDown, FaChevronUp, FaSave } from 'react-icons/fa'

interface Organisation {
  type: 'school' | 'club' | 'external'
  name: string
  role: string
  period: string
  description: string
  achievements: string[]
}

export default function AdminOrganisations() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const { data, loading, saveData } = usePortfolioData('organisations')
  const [saving, setSaving] = useState(false)
  const [organisations, setOrganisations] = useState<Organisation[]>([])
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin')
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setOrganisations(data)
    }
  }, [data])

  if (!isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await saveData(organisations)
      alert('Organisations saved successfully!')
    } catch (error) {
      alert('Failed to save organisations.')
    } finally {
      setSaving(false)
    }
  }

  const addOrganisation = () => {
    setOrganisations([
      ...organisations,
      {
        type: 'school',
        name: '',
        role: '',
        period: '',
        description: '',
        achievements: []
      }
    ])
    setExpandedIndex(organisations.length)
  }

  const removeOrganisation = (index: number) => {
    if (confirm('Delete this organisation?')) {
      setOrganisations(organisations.filter((_, i) => i !== index))
      if (expandedIndex === index) setExpandedIndex(null)
    }
  }

  const updateOrganisation = (index: number, field: keyof Organisation, value: any) => {
    const newOrgs = [...organisations]
    newOrgs[index] = { ...newOrgs[index], [field]: value }
    setOrganisations(newOrgs)
  }

  const updateAchievements = (index: number, value: string) => {
    const list = value.split('\n').map(item => item.trim()).filter(item => item)
    updateOrganisation(index, 'achievements', list)
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-4">
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Organisations</h1>
            <button onClick={addOrganisation} className="btn-primary flex items-center gap-2">
              <FaPlus /> Add Organisation
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {organisations.map((org, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {org.name || `Organisation ${index + 1}`}
                </h3>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    org.type === 'school' ? 'bg-blue-100 text-blue-800' :
                    org.type === 'club' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {org.type}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeOrganisation(index); }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                  {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>

              {expandedIndex === index && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Type</label>
                    <select
                      value={org.type}
                      onChange={(e) => updateOrganisation(index, 'type', e.target.value)}
                      className="input-field w-full"
                    >
                      <option value="school">School</option>
                      <option value="club">Club</option>
                      <option value="external">External</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      value={org.name}
                      onChange={(e) => updateOrganisation(index, 'name', e.target.value)}
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Role</label>
                    <input
                      type="text"
                      value={org.role}
                      onChange={(e) => updateOrganisation(index, 'role', e.target.value)}
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Period</label>
                    <input
                      type="text"
                      value={org.period}
                      onChange={(e) => updateOrganisation(index, 'period', e.target.value)}
                      className="input-field w-full"
                      placeholder="e.g., 2023 - 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                      value={org.description}
                      onChange={(e) => updateOrganisation(index, 'description', e.target.value)}
                      className="input-field w-full h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Achievements - One per line</label>
                    <textarea
                      value={org.achievements.join('\n')}
                      onChange={(e) => updateAchievements(index, e.target.value)}
                      className="input-field w-full h-32"
                      placeholder="Achievement 1&#10;Achievement 2"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="fixed bottom-8 right-8">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary shadow-lg flex items-center gap-2 px-6 py-3 rounded-full"
            >
              <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
