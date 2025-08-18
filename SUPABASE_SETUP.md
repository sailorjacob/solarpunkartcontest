# Supabase Setup Instructions

## 1. Database Setup

Run the SQL from `supabase-schema.sql` in your Supabase SQL editor:

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the sidebar
3. Copy and paste the entire content of `supabase-schema.sql`
4. Click "Run" to create the tables and policies

## 2. Environment Variables

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://twejikjgxkzmphocbvpt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

To get your anon key:
1. Go to your Supabase project dashboard
2. Click on "Settings" → "API"
3. Copy the "anon public" key

## 3. Test the Integration

1. Start the dev server: `npm run dev`
2. Go to the Gallery section
3. Click on "Create Art" tab
4. Paint something on the canvas
5. Click "Submit to Gallery"
6. Check your Supabase database to see if the artwork was saved

## 4. Storage Setup (Optional)

For storing actual image files instead of base64:

1. In Supabase, go to "Storage"
2. The bucket `gallery-artworks` should be created automatically
3. You can then modify the upload functions to store files instead of base64

## Features Available

- ✅ Real-time artwork saving to Supabase
- ✅ Automatic loading of saved artworks
- ✅ Frame management system
- ✅ Download functionality
- ✅ Loading states and error handling
- ✅ Public gallery viewing

## Database Schema

The `artworks` table includes:
- `id` (UUID, primary key)
- `title` (text)
- `base_image` (text, URL of original image)
- `artwork_data` (text, base64 encoded artwork)
- `frame_index` (integer, 0-3)
- `artist_name` (text, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)
