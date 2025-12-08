'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export default function AdminSkills() {
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
          Edit Skills & Technologies
        </h1>

        <div className="card">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Organize your technical skills by category:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-6">
            <li>Web Development (React, Next.js, TypeScript, etc.)</li>
            <li>iOS Development (Swift, SwiftUI, etc.)</li>
            <li>Backend & Database (Python, Node.js, PostgreSQL, etc.)</li>
            <li>Tools & Others (Git, Docker, etc.)</li>
          </ul>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>For each skill, set:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
              <li>Skill name</li>
              <li>Icon (from react-icons library)</li>
              <li>Proficiency level (0-100%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
