'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Link from 'next/link'
import { FaArrowLeft, FaPlus, FaTrash, FaChevronDown, FaChevronUp, FaSave } from 'react-icons/fa'

interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  stars?: number
  forks?: number
  image?: string
}

export default function AdminProjects() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const { data, loading, saveData } = usePortfolioData('projects')
  const [saving, setSaving] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin')
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setProjects(data)
    }
  }, [data])

  if (!isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await saveData(projects)
      alert('Projects saved successfully!')
    } catch (error) {
      alert('Failed to save projects.')
    } finally {
      setSaving(false)
    }
  }

  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: '',
        description: '',
        technologies: [],
        githubUrl: '',
      }
    ])
    setExpandedIndex(projects.length)
  }

  const removeProject = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((_, i) => i !== index))
      if (expandedIndex === index) setExpandedIndex(null)
    }
  }

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setProjects(newProjects)
  }

  const updateTechnologies = (index: number, value: string) => {
    const techs = value.split(',').map(t => t.trim()).filter(t => t)
    updateProject(index, 'technologies', techs)
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors mb-4">
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Projects</h1>
            <button onClick={addProject} className="btn-primary flex items-center gap-2">
              <FaPlus /> Add Project
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="card">
              <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {project.title || `Project ${index + 1}`}
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeProject(index); }}
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
                    <label className="block text-sm font-semibold mb-2">Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                      className="input-field w-full"
                      placeholder="Project Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      className="input-field w-full h-24"
                      placeholder="Project description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={project.technologies.join(', ')}
                      onChange={(e) => updateTechnologies(index, e.target.value)}
                      className="input-field w-full"
                      placeholder="React, Node.js, TypeScript"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">GitHub URL</label>
                      <input
                        type="text"
                        value={project.githubUrl}
                        onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                        className="input-field w-full"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Live URL (Optional)</label>
                      <input
                        type="text"
                        value={project.liveUrl || ''}
                        onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                        className="input-field w-full"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No projects yet. Click "Add Project" to create one.
            </div>
          )}

          <div className="fixed bottom-8 right-8">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2 px-6 py-3 rounded-full"
            >
              <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
