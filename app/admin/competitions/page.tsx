'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export default function AdminCompetitions() {
  const { isAuthenticated } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin')
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container-custom max-w-6xl">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Edit Competitions & Awards
        </h1>

        <div className="card">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Manage your competition achievements organized by category:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
            <li>STEAM Competitions (Science, Technology, Engineering, Arts, Mathematics)</li>
            <li>Model United Nations (MUN)</li>
            <li>Literature & Debate</li>
            <li>Other categories as needed</li>
          </ul>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-4">
            Current data structure: data/competitions.ts
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Each competition entry includes:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
              <li>Competition name (English & Chinese)</li>
              <li>Year</li>
              <li>Award received</li>
              <li>Description (English & Chinese)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
