'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export default function AdminOrganizations() {
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
          Edit Organizations & Experience
        </h1>

        <div className="card">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Document your involvement in various organizations:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                School Leadership
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Student Council positions</li>
                <li>Prefect team roles</li>
                <li>Class monitor/representative</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Clubs & Societies
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Academic clubs (Coding, Debate, etc.)</li>
                <li>Sports teams</li>
                <li>Arts & culture groups</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                External Organizations
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Volunteer work</li>
                <li>Internships</li>
                <li>Community service</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>For each organization, include:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
              <li>Organization name</li>
              <li>Your role/position</li>
              <li>Time period</li>
              <li>Description of responsibilities</li>
              <li>Key achievements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
