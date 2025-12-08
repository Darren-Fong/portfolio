'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export default function AdminEducation() {
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
          Edit Education & Certifications
        </h1>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Education
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add your educational background:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>School/Institution name</li>
              <li>Degree/Program</li>
              <li>Years attended</li>
              <li>GPA or scores (HKDSE, IAL, etc.)</li>
              <li>Notable achievements</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Licenses & Certifications
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add professional certifications and test scores:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>IELTS, TOEFL scores</li>
              <li>Coursera certificates</li>
              <li>Other online course completions</li>
              <li>Professional licenses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
