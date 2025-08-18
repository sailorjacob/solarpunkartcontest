# Sojourn — Life on Kepler-442b

*An immersive, award-worthy art project showcasing AI-generated visions of a sustainable future on a terraformed exoplanet*

---

![Sojourn City Banner](public/banner.jpg)

Welcome to **Sojourn**, an interactive web experience that combines stunning visuals, collaborative art creation, and atmospheric audio to imagine humanity's next chapter among the stars. This project envisions life on Kepler-442b, a terraformed exoplanet in the distant Kepler-442 system, where sustainable technology and natural beauty exist in perfect harmony.

---

## ✨ Experience Highlights

### 🖼 **Vision Gallery**
Step into a curated collection of AI-generated Kepler-442b solarpunk landscapes. Each image tells a story of our sustainable future:

- **Detailed exploration** with original Midjourney prompts
- **Smart filtering** by categories (architecture, nature, technology, community)
- **Immersive lightbox** with download options
- **Interactive navigation** with keyboard controls

### 🎨 **Creative Process**
Go behind the scenes and witness the artistic journey:

- **Timeline visualization** of the creative process
- **Step-by-step exploration** of concept evolution
- **Grid and timeline views** for different perspectives
- **Prompt evolution tracking** showing the iterative refinement

### 🎭 **Public Art Wall**
Join a collaborative digital graffiti canvas powered by advanced graphics:

- **Real-time collaboration** with other visitors
- **Professional brush tools** powered by PixiJS:
  - Spray paint with realistic particle effects
  - Solid marker for precise lines
  - Neon glow brush with stunning blur effects
- **Customizable tools** with color picker, brush size, and opacity controls
- **Save and share** your artistic contributions
- **Community showcase** of collaborative artwork

### 📻 **Sojourn Radio**
Immerse yourself in the soundscape of tomorrow with four themed stations:

- **🌌 Kepler Ambient** — Ethereal soundscapes for contemplation
- **🎵 Sojourn Beats** — Uplifting electronic rhythms
- **🔬 Terraform FM** — Progressive experimental sounds
- **🏛 Colony Classics** — Earth nostalgia meets interstellar innovation

Complete with real-time audio visualization, track queuing, and full playback controls.

---

## 🛠 Technical Excellence

Built with modern web technologies for an award-worthy experience:

**Frontend Architecture:**
- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type-safe development
- **Tailwind CSS** with custom animations and design system

**Interactive Features:**
- **Framer Motion** for smooth, cinematic transitions
- **PixiJS** for high-performance canvas graphics
- **Howler.js** for professional audio playback
- **Custom emoji system** and Lucide React icons

**Future-Ready Infrastructure:**
- **Supabase integration** ready for real-time collaboration
- **Responsive design** optimized for all devices
- **Performance-focused** rendering and optimization

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js 18+** and npm
- **Git** for version control

### Get Started in 3 Steps

**1. Clone the repository:**
```bash
git clone https://github.com/sailorjacob/solarpunkartcontest.git
cd solarpunkartcontest
```

**2. Install dependencies:**
```bash
npm install
```

**3. Launch the experience:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and step into the future.

### Production Deployment
```bash
npm run build
npm start
```

---

## 🎨 Customization Guide

### **Adding Your Midjourney Creations**

1. **Place images** in `public/images/`
2. **Update gallery data** in `src/components/sections/Gallery.tsx`
3. **Add metadata** including prompts and descriptions

### **Customizing Radio Stations**

Edit the `radioStations` array in `src/components/sections/SolarRadio.tsx` to create your own musical journey through space.

### **Design System Colors**

Update the color palette in `tailwind.config.ts`:

- **Mars palette:** `mars-red`, `mars-orange`, `mars-sand`, `mars-rust`
- **Solar spectrum:** `solar-gold`, `solar-bright`, `solar-warm`
- **Punk aesthetics:** `punk-green`, `punk-mint`, `punk-forest`, `punk-sage`
- **Neon accents:** `neon-blue`, `neon-pink`, `neon-green`

---

## 🌐 Real-Time Collaboration (Optional)

Enable collaborative features with Supabase integration:

### **1. Setup Supabase Project**
Create your project at [supabase.com](https://supabase.com)

### **2. Environment Configuration**
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### **3. Database Schema**
```sql
-- Collaborative artwork strokes
CREATE TABLE strokes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  path JSONB,
  color TEXT,
  width INTEGER,
  tool TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Community gallery submissions
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  artist TEXT,
  image_url TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🌱 Design Philosophy

**Sojourn** embodies the solarpunk aesthetic — a vision of the future that is:

- **🌍 Sustainable** — Showcasing renewable energy and green technology
- **✨ Optimistic** — Presenting a hopeful vision of human progress  
- **🤝 Community-focused** — Enabling collaborative creation and sharing
- **🎨 Beautiful** — Harmonizing nature and technology in visual poetry

---

## 🏆 Award-Worthy Features

Every detail has been crafted for excellence:

- **🎭 Smooth Animations** — Every interaction is carefully choreographed
- **📱 Responsive Design** — Flawless experience across all devices
- **⚡ Performance Optimized** — Advanced rendering with PixiJS and React best practices
- **♿ Accessibility First** — Semantic HTML and comprehensive keyboard navigation
- **✨ Visual Effects** — Particle systems, glow effects, and dynamic gradients
- **🔄 Loading States** — Beautiful transitions that enhance the experience
- **🎯 Microinteractions** — Delightful hover effects and visual feedback

---

## 📄 License & Contributing

This project is open source under the **MIT License**. 

**Contributions welcome!** Feel free to submit Pull Requests to help build the future of Kepler-442b.

---

## 🙏 Acknowledgments

- **Inspiration:** The solarpunk movement and interstellar colonization concepts
- **Community:** Built with love for the intersection of art, technology, and sustainability  
- **Recognition:** Special thanks to the Midjourney community for AI art inspiration

---

<div align="center">

**🪐 Created for a sustainable future on Kepler-442b 🪐**

*"The future is not a destination, but a creation."*

</div>