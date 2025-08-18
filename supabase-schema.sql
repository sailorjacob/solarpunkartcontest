-- Create artworks table for storing gallery submissions
CREATE TABLE IF NOT EXISTS artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  base_image TEXT NOT NULL,
  artwork_data TEXT NOT NULL, -- Base64 encoded image data
  frame_index INTEGER NOT NULL CHECK (frame_index >= 0 AND frame_index <= 3),
  artist_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read artworks
CREATE POLICY "Artworks are publicly readable" ON artworks
  FOR SELECT USING (true);

-- Allow anyone to insert artworks  
CREATE POLICY "Anyone can create artworks" ON artworks
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for artwork images (optional - for storing actual image files)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-artworks', 'gallery-artworks', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to gallery-artworks bucket
CREATE POLICY "Public can upload gallery artwork images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-artworks');

-- Allow public to view gallery artwork images  
CREATE POLICY "Public can view gallery artwork images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-artworks');

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_artworks_created_at ON artworks (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_artworks_frame_index ON artworks (frame_index);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_artworks_updated_at 
  BEFORE UPDATE ON artworks 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
