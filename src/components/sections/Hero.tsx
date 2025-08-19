'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroProps {
  onExploreClick: () => void;
  onCreateClick: () => void;
}

const heroImages = [
  {
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/cityoverheadview.png',
    title: 'Metropolitan Scale',
    position: 'top-right'
  },
  {
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/lushcityview2.png',
    title: 'Ecological Integration',
    position: 'center-left'
  },
  {
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/greenhouse.png',
    title: 'Agricultural Systems',
    position: 'bottom-right'
  }
];

export default function Hero({ onExploreClick, onCreateClick }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentImageIndex ? 0.4 : 0,
              scale: index === currentImageIndex ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
          </motion.div>
        ))}
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Gallery Preview Cards - Positioned as side cards */}
      <div className="hidden xl:block">
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4">
          {heroImages.map((image, index) => (
            <motion.div
              key={`preview-${index}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: index === currentImageIndex ? 0.4 : 0.8,
                x: 0,
                scale: index === currentImageIndex ? 0.9 : 1
              }}
              transition={{ type: "spring", damping: 30, delay: index * 0.1 }}
              className="w-20 h-14 cursor-pointer"
              onClick={() => setCurrentImageIndex(index)}
            >
              <div className="relative w-full h-full rounded-md overflow-hidden border border-white/30 hover:border-white/60 transition-all duration-300">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-1">
                  <div className="text-xs font-mono text-white/80 truncate">{image.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Project Classification */}
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-sm tracking-wider text-gray-400 uppercase">
                SUCCESSFUL TERRAFORM // KEPLER-442B-2157
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-7xl lg:text-9xl font-black leading-none"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  SOJOURN
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl text-gray-300 font-light"
              >
                KEPLER-442B — SUSTAINABLE CIVILIZATION
              </motion.div>
            </div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="max-w-lg"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                Advanced terraforming technology meets sustainable urban planning. 
                Witness humanity's greatest achievement: a thriving ecological 
                metropolis on a distant world beyond our solar system.
              </p>
            </motion.div>

            {/* Technical Specs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-600"
            >
              <div>
                <div className="text-3xl font-bold text-emerald-400">2.4B</div>
                <div className="text-sm text-emerald-300 font-mono">POPULATION</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">100%</div>
                <div className="text-sm text-cyan-300 font-mono">RENEWABLE</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">2157</div>
                <div className="text-sm text-gray-300 font-mono">EST. YEAR</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="flex flex-wrap gap-6 pt-6"
            >
              <button
                onClick={onExploreClick}
                className="px-8 py-2 bg-blue-500 text-white text-sm font-medium tracking-wide uppercase rounded-full hover:bg-blue-600 transition-all duration-300 hover:scale-105"
              >
                explore
              </button>
              <button
                onClick={onCreateClick}
                className="px-8 py-2 border border-blue-500 text-blue-500 text-sm font-medium tracking-wide uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105"
              >
                create art
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Current Image Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-700">
              <img
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-white">
                      {heroImages[currentImageIndex].title}
                    </div>
                    <div className="text-sm text-white/80 font-mono">
                      SECTOR {currentImageIndex + 1}/3 — ACTIVE
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {heroImages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Technical Data */}
            <div className="mt-4 p-4 bg-gray-900/50 border border-gray-700 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4 text-gray-400">
                <div>STATUS: OPERATIONAL</div>
                <div>PURITY: LEVEL 7</div>
                <div>COORDINATES: 14°S 175°W</div>
                <div>ELEVATION: -2.5KM</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
                      <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <div className="flex items-center gap-6">
                <div>SOJOURN COLONY ALPHA</div>
                <div>STATUS: ACTIVE</div>
                <div>TEMP: 18°C</div>
              </div>
              <div className="flex items-center gap-6">
                <div>OXYGEN: 21.8%</div>
                <div>PRESSURE: 1.03 ATM</div>
                <div>LOCAL TIME: 26:47</div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}
