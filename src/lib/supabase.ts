import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://twejikjgxkzmphocbvpt.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', supabaseAnonKey !== 'your-anon-key-here')

// Configure Supabase client 
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Artwork {
  id: string
  title: string
  base_image: string
  artwork_data: string
  frame_index: number
  created_at: string
  artist_name?: string
}

// Artwork functions
export const saveArtworkToSupabase = async (artwork: Omit<Artwork, 'id' | 'created_at'>) => {
  try {
    console.log('Saving artwork via API route...')
    console.log('Frame index:', artwork.frame_index)
    console.log('Title:', artwork.title)
    console.log('Data length:', artwork.artwork_data?.length)
    
    const response = await fetch('/api/artworks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artwork),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Artwork saved successfully via API:', data)
    return data
  } catch (error: any) {
    console.error('Error saving artwork via API:', error)
    throw error
  }
}

export const getArtworksFromSupabase = async () => {
  try {
    console.log('Fetching artworks via API route...')
    const response = await fetch('/api/artworks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const artworks = await response.json()
    console.log('Loaded artworks via API:', artworks.length)
    return artworks
  } catch (error) {
    console.error('Error fetching artworks via API:', error)
    // Return empty array on error to prevent app breaking
    return []
  }
}

export const uploadImageToSupabase = async (file: File, path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from('gallery-artworks')
      .upload(path, file)

    if (error) throw error
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('gallery-artworks')
      .getPublicUrl(path)

    return urlData.publicUrl
  } catch (error) {
    console.error('Error uploading image to Supabase:', error)
    throw error
  }
}
