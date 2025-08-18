# 🌱 Sojourn - Life on Kepler-442b

An immersive, award-worthy art project showcasing AI-generated visions of a sustainable future on a terraformed exoplanet in the Kepler-442 system. This interactive web experience combines stunning visuals, collaborative art creation, and atmospheric audio to imagine humanity's next chapter among the stars.

![SolarPunk City Banner](public/banner.jpg)

## ✨ Features

### 🎨 **Vision Gallery**
- Curated collection of AI-generated Kepler-442b solarpunk landscapes
- Detailed view with Midjourney prompts
- Filterable by categories (architecture, nature, technology, community)
- Lightbox modal with download options

### 🚀 **Creative Process**
- Behind-the-scenes showcase of Midjourney iterations
- Timeline and grid view options
- Step-by-step visualization of the creative journey
- Prompt evolution tracking

### 🎭 **Public Art Wall**
- Real-time collaborative digital graffiti canvas
- Advanced brush tools powered by PixiJS:
  - Spray paint with realistic particle effects
  - Solid marker tool
  - Neon glow brush with blur effects
- Color palette with custom color picker
- Adjustable brush size and opacity
- Save and share artwork functionality
- Community gallery showcase

### 📻 **Sojourn Radio**
- Four themed radio stations:
  - Kepler Ambient - Ethereal soundscapes
  - Sojourn Beats - Uplifting electronic rhythms
  - Terraform FM - Progressive experimental sounds
  - Colony Classics - Earth nostalgia meets interstellar innovation
- Real-time audio visualizer
- Track queue and playlist management
- Volume control and playback controls

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom animations
- **Animation:** Framer Motion for smooth transitions
- **Canvas:** PixiJS for high-performance graphics
- **Audio:** Howler.js for audio playback
- **Real-time:** Ready for Supabase integration
- **Icons:** Custom emoji and Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solarpunk-mars.git
cd solarpunk-mars
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🎨 Adding Your Own Content

### Adding Midjourney Images

1. Place your generated images in `public/images/`
2. Update the gallery data in `src/components/sections/Gallery.tsx`
3. Add corresponding prompts and metadata

### Customizing Radio Stations

Edit the `radioStations` array in `src/components/sections/SolarRadio.tsx` to add your own stations and tracks.

### Modifying Color Themes

Update the custom colors in `tailwind.config.ts`:
- Mars colors: `mars-red`, `mars-orange`, `mars-sand`, `mars-rust`
- Solar colors: `solar-gold`, `solar-bright`, `solar-warm`
- Punk colors: `punk-green`, `punk-mint`, `punk-forest`, `punk-sage`
- Neon colors: `neon-blue`, `neon-pink`, `neon-green`

## 🔧 Optional: Supabase Integration

To enable real-time collaboration and data persistence:

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Set up database tables:
```sql
-- Artwork strokes table
CREATE TABLE strokes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  path JSONB,
  color TEXT,
  width INTEGER,
  tool TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gallery submissions
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  artist TEXT,
  image_url TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Initialize Supabase client in your components (example provided in comments)

## 🎯 Design Philosophy

This project embodies the solarpunk aesthetic - a vision of the future that's:
- **Sustainable:** Showcasing renewable energy and green technology
- **Optimistic:** Presenting a hopeful vision of human progress
- **Community-focused:** Enabling collaborative creation and sharing
- **Beautiful:** Combining nature and technology in harmony

## 🏆 Awwwards-Level Features

- **Smooth Animations:** Every interaction is carefully animated
- **Responsive Design:** Fully optimized for all screen sizes
- **Performance:** Optimized rendering with PixiJS and React best practices
- **Accessibility:** Semantic HTML and keyboard navigation support
- **Visual Effects:** Particle systems, glow effects, and dynamic gradients
- **Loading States:** Beautiful loading animations and transitions
- **Microinteractions:** Hover effects, button animations, and visual feedback

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🌟 Acknowledgments

- Inspired by the solarpunk movement and Mars colonization concepts
- Built with love for the intersection of art, technology, and sustainability
- Special thanks to the Midjourney community for AI art inspiration

---

**Created with 💚 for a sustainable future on the Red Planet**

*"The future is not a destination, but a creation."*