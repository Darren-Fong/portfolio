import { NextRequest, NextResponse } from 'next/server'
import { put, head } from '@vercel/blob'

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
  { params }: { params: { section: string } }
) {
  try {
    const section = params.section
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
  { params }: { params: { section: string } }
) {
  try {
    const section = params.section
    const sectionData = await request.json()
    
    // Get existing data
    const portfolioData = await getAllData()
    
    // Update section
    portfolioData[section] = sectionData
    
    // Save back to blob
    await put(BLOB_KEY, JSON.stringify(portfolioData, null, 2), {
      access: 'public',
      contentType: 'application/json',
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
