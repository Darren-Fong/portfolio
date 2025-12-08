'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { FaLock } from 'react-icons/fa'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { isAuthenticated, login } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(password)
    
    if (success) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-md w-full mx-4">
        <div className="card">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <FaLock className="text-primary text-2xl" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            Admin Login
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Enter your password to access the admin panel
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter admin password"
                required
              />
              {error && (
                <p className="mt-2 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
            >
              Login
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Default Password:</strong> admin123
              <br />
              <span className="text-xs">Change this in context/AdminContext.tsx</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
