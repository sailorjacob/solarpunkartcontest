# 🚨 URGENT: Fix CORS Error for Production

## The Problem
Supabase is blocking requests from `www.sojourn.city` due to CORS policy.

## The Solution
Add your production domain to Supabase's allowed origins:

### Steps:
1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `twejikjgxkzmphocbvpt`
3. Go to **Settings** → **API**
4. Scroll down to **CORS Configuration**
5. Add these domains to the allowed origins:
   ```
   https://www.sojourn.city
   https://sojourn.city
   ```

### Alternative Quick Fix:
If you can't find CORS settings, go to:
**Settings** → **Database** → **Extensions** → Find `pg_net` or similar and check CORS settings there.

## Why This Happened
- Your app works on localhost (http://localhost:3000) 
- But production domain (https://www.sojourn.city) wasn't added to allowed origins
- Supabase blocks cross-origin requests by default

## After Fixing CORS:
- The 500/503 errors should disappear
- Artwork loading will be much faster
- Save process will work smoothly

⚡ **This is the #1 priority fix for making the gallery work in production!**
