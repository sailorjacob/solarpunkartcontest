import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// GET - Fetch artworks
export async function GET() {
  try {
    // Simplified query - get recent artworks with basic filter only
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .gte('frame_index', 0)
      .lte('frame_index', 3)
      .order('created_at', { ascending: false })
      .limit(12) // Smaller limit for faster query

    if (error) throw error
    
    // Group by frame_index and keep only the latest for each
    const latestByFrame = data ? data.reduce((acc: any[], artwork: any) => {
      const existingIndex = acc.findIndex(a => a.frame_index === artwork.frame_index)
      if (existingIndex === -1) {
        acc.push(artwork)
      }
      return acc
    }, []) : []
    
    return NextResponse.json(latestByFrame)
  } catch (error) {
    console.error('API Error fetching artworks:', error)
    return NextResponse.json([], { status: 200 }) // Return empty array instead of error
  }
}

// POST - Save artwork
export async function POST(request: NextRequest) {
  try {
    const artwork = await request.json()
    
    console.log('API: Attempting to save artwork to Supabase...')
    console.log('API: Frame index:', artwork.frame_index)
    console.log('API: Title:', artwork.title)
    console.log('API: Data length:', artwork.artwork_data?.length)
    
    // First, delete any existing artwork for this frame_index
    const { error: deleteError } = await supabase
      .from('artworks')
      .delete()
      .eq('frame_index', artwork.frame_index)
    
    if (deleteError) {
      console.error('API: Error deleting old artwork:', deleteError)
      // Continue anyway - might be no existing artwork
    }

    // Then insert the new artwork
    const { data, error } = await supabase
      .from('artworks')
      .insert([artwork])
      .select()
      .single()

    if (error) {
      console.error('API: Supabase insert error:', error)
      throw error
    }
    
    console.log('API: Artwork saved successfully to Supabase:', data)
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('API: Error saving artwork to Supabase:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
