import { NextRequest, NextResponse } from 'next/server'
import { put, head, del } from '@vercel/blob'

const BLOB_KEY = 'portfolio-data.json'

// GET - Read portfolio data
export async function GET() {
  try {
    const blobInfo = await head(BLOB_KEY).catch(() => null)
    if (!blobInfo) return NextResponse.json({})
    
    const response = await fetch(`${blobInfo.url}?t=${Date.now()}`, {
      cache: 'no-store'
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({})
  }
}

// POST - Save portfolio data
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Delete old blob if exists
    try {
      const oldBlob = await head(BLOB_KEY).catch(() => null)
      if (oldBlob) {
        await del(oldBlob.url)
      }
    } catch (e) {
      // Ignore deletion errors
    }
    
    // Upload to Vercel Blob
    const blob = await put(BLOB_KEY, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Data saved successfully!',
      url: blob.url 
    })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
