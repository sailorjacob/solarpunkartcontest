import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://twejikjgxkzmphocbvpt.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'

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
    // First, delete any existing artwork for this frame_index
    const { error: deleteError } = await supabase
      .from('artworks')
      .delete()
      .eq('frame_index', artwork.frame_index)
    
    if (deleteError) {
      console.error('Error deleting old artwork:', deleteError)
    }

    // Then insert the new artwork
    const { data, error } = await supabase
      .from('artworks')
      .insert([artwork])
      .select()
      .single()

    if (error) throw error
    console.log('Artwork saved successfully:', data)
    return data
  } catch (error) {
    console.error('Error saving artwork to Supabase:', error)
    throw error
  }
}

export const getArtworksFromSupabase = async () => {
  try {
    // Get only the latest artwork for each frame_index
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    
    // Group by frame_index and keep only the latest for each
    const latestByFrame = data ? data.reduce((acc: Artwork[], artwork: Artwork) => {
      const existingIndex = acc.findIndex(a => a.frame_index === artwork.frame_index)
      if (existingIndex === -1) {
        acc.push(artwork)
      }
      return acc
    }, []) : []
    
    console.log('Loaded artworks from Supabase:', latestByFrame.length)
    return latestByFrame
  } catch (error) {
    console.error('Error fetching artworks from Supabase:', error)
    throw error
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
