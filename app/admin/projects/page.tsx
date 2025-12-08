'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export default function AdminProjects() {
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
          Edit Projects
        </h1>

        <div className="card">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add and manage your project portfolio. Each project can include:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
            <li>Project title (English & Chinese)</li>
            <li>Description (English & Chinese)</li>
            <li>Technologies used</li>
            <li>GitHub repository URL</li>
            <li>Live demo URL (optional)</li>
            <li>Project images</li>
          </ul>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            Note: Implement your backend storage solution (JSON file, database, CMS, etc.) to persist this data.
            See data/competitions.ts for an example data structure.
          </p>
        </div>
      </div>
    </div>
  )
}
