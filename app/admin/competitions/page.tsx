'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import Link from 'next/link'
import { FaArrowLeft, FaPlus, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface CompetitionItem {
  name: string
  nameZh: string
  year: string
  award: string
  awardZh: string
  description: string
  descriptionZh: string
}

interface CompetitionCategory {
  category: string
  categoryZh: string
  items: CompetitionItem[]
}

export default function AdminCompetitions() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()
  const { data, loading, saveData } = usePortfolioData('competitions')
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState<CompetitionCategory[]>([])
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0)

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin')
  }, [isAuthenticated, router])

  useEffect(() => {
    if (data) {
      // Check if data is in the new format (array) or old format (object with en/zh)
      if (Array.isArray(data)) {
        setCategories(data)
      } else if (data.en && data.zh) {
        // Convert old format to new format
        const newCategories = data.en.map((cat: any, index: number) => ({
          category: cat.category,
          categoryZh: data.zh[index]?.category || '',
          items: cat.items.map((item: any, itemIndex: number) => ({
            name: item.name,
            nameZh: data.zh[index]?.items[itemIndex]?.name || '',
            year: item.year,
            award: item.award,
            awardZh: data.zh[index]?.items[itemIndex]?.award || '',
            description: item.description,
            descriptionZh: data.zh[index]?.items[itemIndex]?.description || '',
          }))
        }))
        setCategories(newCategories)
      }
    }
  }, [data])

  if (!isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await saveData(categories)
      alert('Competitions saved successfully!')
    } catch (error) {
      alert('Failed to save competitions.')
    } finally {
      setSaving(false)
    }
  }

  const addCategory = () => {
    setCategories([...categories, { category: '', categoryZh: '', items: [] }])
    setExpandedCategory(categories.length)
  }

  const removeCategory = (index: number) => {
    if (confirm('Delete this category and all its items?')) {
      setCategories(categories.filter((_, i) => i !== index))
      if (expandedCategory === index) setExpandedCategory(null)
    }
  }

  const updateCategory = (index: number, field: 'category' | 'categoryZh', value: string) => {
    const newCategories = [...categories]
    newCategories[index][field] = value
    setCategories(newCategories)
  }

  const addItem = (categoryIndex: number) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].items.push({
      name: '', nameZh: '', year: new Date().getFullYear().toString(),
      award: '', awardZh: '', description: '', descriptionZh: ''
    })
    setCategories(newCategories)
  }

  const removeItem = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].items = newCategories[categoryIndex].items.filter((_, i) => i !== itemIndex)
    setCategories(newCategories)
  }

  const updateItem = (categoryIndex: number, itemIndex: number, field: keyof CompetitionItem, value: string) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].items[itemIndex] = {
      ...newCategories[categoryIndex].items[itemIndex],
      [field]: value
    }
    setCategories(newCategories)
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Competitions</h1>
            <button onClick={addCategory} className="btn-primary flex items-center gap-2">
              <FaPlus /> Add Category
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {categories.map((cat, catIndex) => (
            <div key={catIndex} className="card border-2 border-transparent hover:border-primary/20 transition-colors">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mr-4">
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => updateCategory(catIndex, 'category', e.target.value)}
                    className="input-field font-bold text-lg"
                    placeholder="Category Name (English)"
                  />
                  <input
                    type="text"
                    value={cat.categoryZh}
                    onChange={(e) => updateCategory(catIndex, 'categoryZh', e.target.value)}
                    className="input-field font-bold text-lg"
                    placeholder="類別名稱 (中文)"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => removeCategory(catIndex)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <FaTrash />
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpandedCategory(expandedCategory === catIndex ? null : catIndex)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                  >
                    {expandedCategory === catIndex ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </div>

              {expandedCategory === catIndex && (
                <div className="space-y-6">
                  {cat.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg relative group">
                      <button
                        type="button"
                        onClick={() => removeItem(catIndex, itemIndex)}
                        className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Name (EN)</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(catIndex, itemIndex, 'name', e.target.value)}
                            className="input-field w-full"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Name (ZH)</label>
                          <input
                            type="text"
                            value={item.nameZh}
                            onChange={(e) => updateItem(catIndex, itemIndex, 'nameZh', e.target.value)}
                            className="input-field w-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Year</label>
                          <input
                            type="text"
                            value={item.year}
                            onChange={(e) => updateItem(catIndex, itemIndex, 'year', e.target.value)}
                            className="input-field w-full"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Award (EN)</label>
                          <input
                            type="text"
                            value={item.award}
                            onChange={(e) => updateItem(catIndex, itemIndex, 'award', e.target.value)}
                            className="input-field w-full"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Award (ZH)</label>
                          <input
                            type="text"
                            value={item.awardZh}
                            onChange={(e) => updateItem(catIndex, itemIndex, 'awardZh', e.target.value)}
                            className="input-field w-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Description (EN)</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => updateItem(catIndex, itemIndex, 'description', e.target.value)}
                            className="input-field w-full h-20"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Description (ZH)</label>
                          <textarea
                            value={item.descriptionZh}
                            onChange={(e) => updateItem(catIndex, itemIndex, 'descriptionZh', e.target.value)}
                            className="input-field w-full h-20"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addItem(catIndex)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <FaPlus /> Add Competition Item
                  </button>
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
