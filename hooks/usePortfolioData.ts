'use client'

import { useState, useEffect } from 'react'

export function usePortfolioData(section?: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [section])

  const fetchData = async () => {
    try {
      setLoading(true)
      const url = section ? `/api/portfolio/${section}` : '/api/portfolio'
      // Add cache-busting parameter
      const response = await fetch(`${url}?t=${Date.now()}`, {
        cache: 'no-store'
      })
      if (!response.ok) throw new Error('Failed to fetch data')
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const saveData = async (newData: any) => {
    try {
      const url = section ? `/api/portfolio/${section}` : '/api/portfolio'
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      })
      
      if (!response.ok) throw new Error('Failed to save data')
      
      const result = await response.json()
      // Immediately update local state
      setData(newData)
      // Force refetch to confirm server state
      setTimeout(() => fetchData(), 100)
      return result
    } catch (err) {
      throw err
    }
  }

  return { data, loading, error, saveData, refetch: fetchData }
}
