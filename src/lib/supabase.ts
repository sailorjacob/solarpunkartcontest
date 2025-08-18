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
    const { data, error } = await supabase
      .from('artworks')
      .insert([artwork])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving artwork to Supabase:', error)
    throw error
  }
}

export const getArtworksFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
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
