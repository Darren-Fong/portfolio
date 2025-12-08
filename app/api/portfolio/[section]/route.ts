import { NextRequest, NextResponse } from 'next/server'
import { put, head, del } from '@vercel/blob'

const BLOB_KEY = 'portfolio-data.json'

// Helper to get all data
async function getAllData() {
  try {
    const blobInfo = await head(BLOB_KEY).catch(() => null)
    if (!blobInfo) return {}
    
    const response = await fetch(blobInfo.url)
    return await response.json()
  } catch {
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
    console.error('Error reading section:', error)
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
    
    // Get existing data
    const portfolioData = await getAllData()
    
    // Update section
    portfolioData[section] = sectionData
    
    // Delete old blob if exists
    try {
      const oldBlob = await head(BLOB_KEY).catch(() => null)
      if (oldBlob) {
        await del(oldBlob.url)
      }
    } catch (e) {
      // Ignore deletion errors
    }
    
    // Save back to blob
    const blob = await put(BLOB_KEY, JSON.stringify(portfolioData, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    
    return NextResponse.json({ 
      success: true, 
      message: `${section} data saved successfully!` 
    })
  } catch (error) {
    console.error('Error saving section:', error)
    return NextResponse.json({ error: 'Failed to save section' }, { status: 500 })
  }
}
