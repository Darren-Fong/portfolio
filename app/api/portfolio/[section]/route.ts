import { NextRequest, NextResponse } from 'next/server'
import { put, head, del } from '@vercel/blob'

const BLOB_KEY = 'portfolio-data.json'

// Helper to get all data
async function getAllData() {
  try {
    const blobInfo = await head(BLOB_KEY).catch(() => null)
    if (!blobInfo) {
      console.log('No blob found')
      return {}
    }
    
    // Add cache-busting to blob fetch
    const response = await fetch(`${blobInfo.url}?t=${Date.now()}`, {
      cache: 'no-store'
    })
    const data = await response.json()
    console.log('Fetched data from blob:', data)
    return data
  } catch (error) {
    console.error('Error in getAllData:', error)
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
    
    console.log(`Returning data for section ${section}:`, portfolioData[section])
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
    
    console.log(`Saving data for section ${section}:`, sectionData)
    
    // Get existing data
    const portfolioData = await getAllData()
    
    // Update section
    portfolioData[section] = sectionData
    
    console.log('Full portfolio data after update:', portfolioData)
    
    // Delete old blob if exists
    try {
      const oldBlob = await head(BLOB_KEY).catch(() => null)
      if (oldBlob) {
        await del(oldBlob.url)
        console.log('Deleted old blob')
      }
    } catch (e) {
      console.error('Error deleting old blob:', e)
    }
    
    // Save back to blob
    const blob = await put(BLOB_KEY, JSON.stringify(portfolioData, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    
    console.log('Saved new blob at:', blob.url)
    
    return NextResponse.json({ 
      success: true, 
      message: `${section} data saved successfully!` 
    })
  } catch (error) {
    console.error('Error saving section:', error)
    return NextResponse.json({ error: 'Failed to save section' }, { status: 500 })
  }
}

