'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Info, Download, X } from 'lucide-react';

// Stunning visions of Sojourn on Kepler-442b
const visionImages = [
  {
    id: 1,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/cityoverheadview.png',
    title: 'Metropolitan Overview',
    description: 'Aerial perspective of the complete Sojourn metropolis, showcasing the integrated harmony between advanced sustainable technology and natural ecosystem restoration.',
    category: 'urban'
  },
  {
    id: 2,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/lushcityview2.png',
    title: 'Verdant Cityscape',
    description: 'Lush vegetation cascades through architectural marvels, demonstrating the successful integration of Terran flora with Keplerian soil enhancement protocols.',
    category: 'nature'
  },
  {
    id: 3,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/Capital%20Building.png',
    title: 'Governance Spire',
    description: 'The Capital Building serves as the democratic heart of Sojourn, designed with bio-integrated architecture that reflects our collective commitment to ecological stewardship.',
    category: 'civic'
  },
  {
    id: 4,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/Capital%20City%201.png',
    title: 'Capital District',
    description: 'The administrative center of Sojourn showcases advanced urban planning, with atmospheric processors seamlessly integrated into the civic landscape.',
    category: 'urban'
  },
  {
    id: 5,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/City%20neighborhood%20river.png',
    title: 'Riverside Commons',
    description: 'Engineered waterways flow through residential districts, providing both ecological balance and communal gathering spaces for the citizens of Sojourn.',
    category: 'residential'
  },
  {
    id: 6,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/Composting%20eco%20sewage.png',
    title: 'Cycle Processing Center',
    description: 'Advanced composting and waste processing facilities transform organic matter into fertile soil, maintaining the closed-loop ecosystem that sustains all life in Sojourn.',
    category: 'infrastructure'
  },
  {
    id: 7,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/early%20farm.png',
    title: 'Pioneer Agricultural Station',
    description: 'Early farming installations that established the foundation for Sojourn\'s food security, using innovative hydroponic and soil regeneration techniques.',
    category: 'agriculture'
  },
  {
    id: 8,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/lush%20rocket%20station.png',
    title: 'Verdant Spaceport',
    description: 'The interplanetary transit hub seamlessly blends transportation infrastructure with abundant botanical life, welcoming visitors to our green sanctuary.',
    category: 'transportation'
  },
  {
    id: 9,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/Lush%20Wetlands%20Neighborhood.png',
    title: 'Wetlands Habitat',
    description: 'Restored wetland ecosystems provide natural water filtration while creating diverse habitats for both Terran and indigenous Keplerian species.',
    category: 'nature'
  },
  {
    id: 10,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/Skyline%20Metropolis%20City.png',
    title: 'Sojourn Skyline',
    description: 'The magnificent skyline of Sojourn rises majestically, with bio-integrated towers that breathe with the rhythm of the planet while reaching toward the twin suns.',
    category: 'urban'
  },
  {
    id: 11,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/Terraforming%20eco%20bubbles.png',
    title: 'Atmospheric Genesis Domes',
    description: 'Terraforming eco-bubbles accelerate atmospheric transformation, creating protected microclimates that gradually expand the breathable zones of Kepler-442b.',
    category: 'technology'
  },
  {
    id: 12,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/the%20paris%20of%20sojourn.png',
    title: 'Cultural Quarter',
    description: 'Known as "The Paris of Sojourn," this artistic district celebrates human creativity while honoring the natural beauty of our new world.',
    category: 'culture'
  },
  {
    id: 13,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/Underground%20Greenhouse%20Farming.png',
    title: 'Subterranean Gardens',
    description: 'Underground greenhouse networks utilize geothermal energy and advanced LED systems to ensure year-round food production regardless of surface conditions.',
    category: 'agriculture'
  },
  {
    id: 14,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/underground%20mall.png',
    title: 'Underground Commons',
    description: 'Subterranean commercial and social spaces provide climate-controlled environments for community gathering and commerce during extreme weather periods.',
    category: 'commercial'
  },
  {
    id: 15,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/greenhouse.png',
    title: 'Atmospheric Gardens',
    description: 'Massive greenhouse installations serve as both agricultural centers and atmospheric processors, converting carbon dioxide while producing fresh oxygen.',
    category: 'agriculture'
  },
  {
    id: 16,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/dwelling%20neighborhood.png',
    title: 'Residential Harmony',
    description: 'Thoughtfully designed residential neighborhoods where human-scale architecture promotes community connection while maintaining harmony with the landscape.',
    category: 'residential'
  },
  {
    id: 17,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/dwellingneighborhood2.png',
    title: 'Community Living',
    description: 'Mixed-use neighborhoods where living, working, and recreational spaces flow seamlessly together, embodying the principles of sustainable urban design.',
    category: 'residential'
  },
  {
    id: 18,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/underground%20art%20museum%20entrance.png',
    title: 'Cultural Preservation Vault',
    description: 'Underground galleries preserve and celebrate both Terran heritage and the emerging artistic expressions of our new world, ensuring cultural continuity across worlds.',
    category: 'culture'
  }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visionImages.length);
    }, 8000); // 8 seconds per image
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % visionImages.length);
    setIsAutoPlaying(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + visionImages.length) % visionImages.length);
    setIsAutoPlaying(false);
  };

  const currentImage = visionImages[currentIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Fullscreen Image Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-8 z-10">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevImage}
          className="p-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/50 transition-all"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextImage}
          className="p-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/50 transition-all"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Image Counter */}
      <div className="absolute top-8 left-8 z-20">
        <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white font-mono text-sm">
          {String(currentIndex + 1).padStart(2, '0')} / {String(visionImages.length).padStart(2, '0')}
        </div>
      </div>

      {/* Info Toggle */}
      <div className="absolute top-8 right-8 z-20 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`p-3 backdrop-blur-sm border border-white/20 rounded-full text-white transition-all ${
            isAutoPlaying ? 'bg-emerald-500/30' : 'bg-black/30'
          }`}
        >
          {isAutoPlaying ? '⏸️' : '▶️'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInfo(!showInfo)}
          className="p-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/50 transition-all"
        >
          <Info size={20} />
        </motion.button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex gap-2">
          {visionImages.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Image Information Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-24 left-8 right-8 z-20"
          >
            <div className="max-w-2xl bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                    {currentImage.title}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium capitalize">
                    {currentImage.category}
                  </div>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Download size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowInfo(false)}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed">
                {currentImage.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Instructions */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white/60 text-xs font-mono">
          ← → arrows • space • i for info
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div 
        className="absolute inset-0 z-0"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') prevImage();
          if (e.key === 'ArrowRight') nextImage();
          if (e.key === ' ') {
            e.preventDefault();
            setIsAutoPlaying(!isAutoPlaying);
          }
          if (e.key === 'i') setShowInfo(!showInfo);
        }}
      />
    </section>
  );
}