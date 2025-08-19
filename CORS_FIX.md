# 🚨 URGENT: Fix CORS Error for Production

## The Problem
Supabase is blocking requests from `www.sojourn.city` due to CORS policy.

## The Solution - EXACT STEPS:

### Method 1: API Settings (MOST LIKELY)
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `twejikjgxkzmphocbvpt`
3. In the left sidebar, click **Settings** (gear icon at bottom)
4. Click **API** in the settings menu
5. Scroll down until you see **"Additional URLs"** or **"Site URL"** or **"CORS"**
6. Add these domains:
   ```
   https://www.sojourn.city
   https://sojourn.city
   ```

### Method 2: Authentication Settings  
1. Go to **Authentication** → **Settings** 
2. Look for **"Site URL"** or **"Additional redirect URLs"**
3. Add: `https://www.sojourn.city`

### Method 3: If Above Don't Work
1. Go to **Settings** → **General**
2. Look for **"Custom domain"** or **"Allowed origins"**

## Why This Happened
- Your app works on localhost (http://localhost:3000) 
- But production domain (https://www.sojourn.city) wasn't added to allowed origins
- Supabase blocks cross-origin requests by default

## After Fixing CORS:
- The 500/503 errors should disappear
- Artwork loading will be much faster
- Save process will work smoothly

⚡ **This is the #1 priority fix for making the gallery work in production!**
