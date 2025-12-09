import { NextRequest, NextResponse } from 'next/server'
import { put, list, del } from '@vercel/blob'

const BLOB_KEY = 'portfolio-data.json'

// Helper to get all data
async function getAllData() {
  try {
    const { blobs } = await list()
    const blobInfo = blobs.find(b => b.pathname === BLOB_KEY)
    
    if (!blobInfo) return {}
    
    const response = await fetch(`${blobInfo.url}?t=${Date.now()}`, {
      cache: 'no-store'
    })
    return await response.json()
  } catch (error) {
    return {}
  }
}

// GET - Read specific section
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await context.params
    const portfolioData = await getAllData()
    return NextResponse.json(portfolioData[section] || {})
  } catch (error) {
    return NextResponse.json({})
  }
}

// POST - Save specific section
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await context.params
    const sectionData = await request.json()
    
    const portfolioData = await getAllData()
    portfolioData[section] = sectionData
    
    // Delete old blob
    try {
      const { blobs } = await list()
      const oldBlob = blobs.find(b => b.pathname === BLOB_KEY)
      if (oldBlob) await del(oldBlob.url)
    } catch (e) {}
    
    // Save new blob
    await put(BLOB_KEY, JSON.stringify(portfolioData, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    
    return NextResponse.json({ 
      success: true, 
      message: `${section} saved!` 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Save failed' }, { status: 500 })
  }
}