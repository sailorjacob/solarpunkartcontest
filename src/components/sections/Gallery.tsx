'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Info, Download, X, Play, Pause, Palette, Eye } from 'lucide-react';
import { saveArtworkToSupabase, getArtworksFromSupabase, type Artwork } from '@/lib/supabase';

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
  const [currentIndex, setCurrentIndex] = useState(6); // Start with image 07 (lush rocket station)
  const [showInfo, setShowInfo] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'view' | 'create'>('view');
  
  // Canvas and painting state (from PublicWall)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMaskLoaded, setIsMaskLoaded] = useState(false);
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
  const [artSubmissions, setArtSubmissions] = useState<string[]>([]);
  const [savedArtworks, setSavedArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Painting settings
  const neonBlue = '#1E40AF';
  const sprayDensity = 80;
  const [sprayRadius, setSprayRadius] = useState(5);
  const glowBlur = 15;

  // Gallery canvas frame URLs for mapping
  const galleryFrames = [
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe1.png',
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe2.png',
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe3.png',
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe4.png'
  ];

  // Set base drawing styles
  const setBaseStyles = (ctx: CanvasRenderingContext2D) => {
    ctx.shadowColor = neonBlue;
    ctx.shadowBlur = glowBlur;
    ctx.fillStyle = neonBlue;
    ctx.strokeStyle = neonBlue;
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  };

  // Initialize canvas when component first loads
  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setBaseStyles(ctx);
    loadCurrentMask();
  };

  // Load current mask image for the canvas frame
  const loadCurrentMask = () => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!canvas || !maskCanvas) return;

    const ctx = canvas.getContext('2d');
    const maskCtx = maskCanvas.getContext('2d');
    if (!ctx || !maskCtx) return;

    // Set mask canvas dimensions
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;

    // Clear mask canvas
    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

    const maskImage = new window.Image();
    maskImage.crossOrigin = 'anonymous';
    maskImage.onload = () => {
      maskCtx.drawImage(maskImage, 0, 0, maskCanvas.width, maskCanvas.height);
      setIsMaskLoaded(true);
    };
    maskImage.src = galleryFrames[currentCanvasIndex];
  };

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!canvas || !maskCanvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    const maskCtx = maskCanvas.getContext('2d');
    if (!ctx || !maskCtx) return;

    // Check if we're drawing in the allowed area (where mask is transparent/white)
    const maskData = maskCtx.getImageData(x, y, 1, 1);
    const [r, g, b, a] = maskData.data;
    
    // Only draw if the mask area is transparent or white (allowing drawing)
    if (a === 0 || (r > 200 && g > 200 && b > 200)) {
      setBaseStyles(ctx);
      
      // Create spray paint effect
      for (let i = 0; i < sprayDensity; i++) {
        const offsetX = (Math.random() - 0.5) * sprayRadius * 2;
        const offsetY = (Math.random() - 0.5) * sprayRadius * 2;
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        
        if (distance <= sprayRadius) {
          const alpha = Math.max(0, 1 - (distance / sprayRadius));
          ctx.globalAlpha = alpha * 0.3;
          ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
        }
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a new canvas to combine the background image with the painted overlay
    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');
    if (!combinedCtx) return;

    // Set dimensions to match the original image
    const currentImage = visionImages[currentIndex];
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      combinedCanvas.width = img.width;
      combinedCanvas.height = img.height;
      
      // Draw the original image
      combinedCtx.drawImage(img, 0, 0);
      
      // Draw the painted overlay (scale to match image dimensions)
      combinedCtx.drawImage(canvas, 0, 0, combinedCanvas.width, combinedCanvas.height);
      
      // Download the combined image
      const link = document.createElement('a');
      link.download = `${currentImage.title.replace(/\s+/g, '_')}_artwork.png`;
      link.href = combinedCanvas.toDataURL('image/png');
      link.click();
    };
    
    img.src = currentImage.src;
  };

  // Find next available canvas slot
  const findNextAvailableCanvas = () => {
    // If all canvases are full, start overwriting from the beginning
    if (artSubmissions.length >= 4) {
      return 0;
    }
    // Otherwise, find the first empty slot
    for (let i = 0; i < 4; i++) {
      if (!artSubmissions[i]) {
        return i;
      }
    }
    return 0; // Fallback
  };

  const saveArt = async () => {
    if (!canvasRef.current || isLoading) return;
    
    // Get canvas as data URL (fresh artwork only)
    const artworkData = canvasRef.current.toDataURL('image/png');
    
    // Save to database - this REPLACES any existing artwork on this frame
    const savedArtwork = await saveArtworkToDatabase(artworkData);
    if (!savedArtwork) return;
    
    // Update submissions at current position with the NEW artwork (replaces old)
    const newSubmissions = [...artSubmissions];
    newSubmissions[currentCanvasIndex] = artworkData;
    setArtSubmissions(newSubmissions);
    
    // Move to next available canvas position so they can create fresh art
    const nextIndex = findNextAvailableCanvas();
    setCurrentCanvasIndex(nextIndex);
    
    // Clear and reset for next artist to start fresh
    clearCanvas();
    
    // Load new mask for next canvas
    setIsMaskLoaded(false);
    setTimeout(() => {
      loadCurrentMask();
    }, 100);
    
    console.log(`New art submitted to frame ${currentCanvasIndex + 1}! Moving to frame ${nextIndex + 1}`);
    console.log(`Gallery frames with art: ${newSubmissions.filter(Boolean).length}/4`);
  };

  // Function to manually select a canvas frame (starts clean)
  const selectCanvasFrame = (frameIndex: number) => {
    setCurrentCanvasIndex(frameIndex);
    clearCanvas();
    setIsMaskLoaded(false);
    setTimeout(() => {
      loadCurrentMask();
      // Don't load existing artwork - start with clean canvas for new art
    }, 100);
  };

  // Load existing collaborative artwork for a frame
  const loadExistingArtwork = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !artSubmissions[frameIndex]) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = artSubmissions[frameIndex];
  };

  // Load saved artworks from Supabase
  const loadSavedArtworks = async () => {
    try {
      setIsLoading(true);
      const artworks = await getArtworksFromSupabase();
      setSavedArtworks(artworks);
      
      // Update artSubmissions to show which frames are used
      const submissions = new Array(4).fill(null);
      artworks.forEach((artwork) => {
        if (artwork.frame_index < 4) {
          submissions[artwork.frame_index] = artwork.artwork_data;
        }
      });
      setArtSubmissions(submissions);
      console.log(`Loaded ${artworks.length} artworks from Supabase`);
    } catch (error) {
      console.error('Error loading saved artworks:', error);
      setSaveMessage('Error loading artworks from database');
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Save artwork to Supabase
  const saveArtworkToDatabase = async (artworkData: string) => {
    try {
      setIsLoading(true);
      setSaveMessage('Saving artwork...');
      
      const currentImage = visionImages[currentIndex];
      const artworkToSave = {
        title: `${currentImage.title} - Remix`,
        base_image: currentImage.src,
        artwork_data: artworkData,
        frame_index: currentCanvasIndex,
        artist_name: 'Anonymous Artist' // Could be made dynamic later
      };

      console.log('Attempting to save artwork:', {
        frame_index: currentCanvasIndex,
        title: artworkToSave.title,
        dataLength: artworkData.length
      });

      const savedArtwork = await saveArtworkToSupabase(artworkToSave);
      
      if (!savedArtwork) {
        throw new Error('No artwork returned from Supabase');
      }
      
      // Update local state
      const updatedArtworks = savedArtworks.filter(art => art.frame_index !== currentCanvasIndex);
      updatedArtworks.push(savedArtwork);
      setSavedArtworks(updatedArtworks);
      
      setSaveMessage('Artwork saved to public gallery! 🎨');
      setTimeout(() => setSaveMessage(null), 3000);
      
      console.log('Artwork saved successfully to Supabase:', savedArtwork);
      
      // Reload artworks to ensure sync
      setTimeout(() => {
        loadSavedArtworks();
      }, 500);
      
      return savedArtwork;
    } catch (error: any) {
      console.error('Error saving artwork to Supabase:', error);
      setSaveMessage(`Error: ${error.message || 'Failed to save artwork'}`);
      setTimeout(() => setSaveMessage(null), 5000);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize canvas on component mount
  useEffect(() => {
    if (activeTab === 'create') {
      initializeCanvas();
      // Start with clean canvas - don't load existing artwork
    }
  }, [activeTab]);

  // Load saved artworks on component mount and when switching to view tab
  useEffect(() => {
    loadSavedArtworks();
  }, []);

  // Refresh artworks when switching to view tab
  useEffect(() => {
    if (activeTab === 'view') {
      loadSavedArtworks();
    }
  }, [activeTab]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || activeTab !== 'view') return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % visionImages.length);
    }, 8000); // 8 seconds per image
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, visionImages.length]);

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
    <section 
      className="relative w-full h-screen overflow-hidden bg-black"
      tabIndex={0}
      onKeyDown={(e) => {
        if (activeTab === 'view') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevImage();
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextImage();
        }
        if (e.key === ' ') {
          e.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
        }
        if (e.key === 'i' || e.key === 'I') {
          e.preventDefault();
          setShowInfo(!showInfo);
          }
        }
      }}
    >
      {/* Tab Navigation */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex bg-black/30 backdrop-blur-sm border border-white/20 rounded-full p-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('view')}
            className={`px-6 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'view' 
                ? 'bg-white/20 text-white' 
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            <Eye size={16} />
            View Gallery
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('create')}
            className={`px-6 py-2 rounded-full flex items-center gap-2 transition-all ${
              activeTab === 'create' 
                ? 'bg-white/20 text-white' 
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            <Palette size={16} />
            Create Art
          </motion.button>
        </div>
      </div>

      {/* VIEW TAB - Fullscreen Image Display */}
      {activeTab === 'view' && (
        <>
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
          
          {/* Show submitted artwork overlay if it exists for current image */}
          {artSubmissions[currentIndex % 4] && (
            <div className="absolute inset-0">
              <img
                src={artSubmissions[currentIndex % 4]}
                alt={`Community artwork`}
                className="w-full h-full object-cover opacity-80 mix-blend-screen"
              />
            </div>
          )}
          
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
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
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
      </>
      )}

      {/* CREATE TAB - Art Creation Interface */}
      {activeTab === 'create' && (
        <div className="relative w-full h-full">
          {/* Background Image - Current gallery image */}
          <div className="absolute inset-0">
            <Image
              src={currentImage.src}
              alt={currentImage.title}
              fill
              priority
              className="object-cover opacity-80"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Canvas Container */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative">
              {/* Main Canvas */}
              <canvas
                ref={canvasRef}
                className="border border-white/20 rounded-lg cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{
                  background: 'transparent',
                  maxWidth: '90vw',
                  maxHeight: '70vh'
                }}
              />
              
              {/* Hidden mask canvas */}
              <canvas
                ref={maskCanvasRef}
                className="hidden"
              />
            </div>
          </div>

          {/* Controls Panel */}
          <div className="absolute top-20 right-8 z-20">
            <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-4">
              
              {/* Collaborative Info */}
              <div className="text-white/80 text-xs bg-white/10 rounded-lg p-3 border border-white/20">
                <div className="font-semibold text-emerald-300 mb-1">🎨 Ever-Changing Gallery</div>
                <div>Paint on a clean canvas, download your art, then submit to replace the current frame. The gallery evolves as new artists contribute!</div>
              </div>

              {/* Main Action Buttons - Side by Side */}
              <div className="flex gap-2">
                {/* Download Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadArtwork}
                  className="flex-1 px-3 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-lg text-emerald-300 hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Download size={14} />
                  Download
                </motion.button>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  onClick={saveArt}
                  disabled={isLoading}
                  className={`flex-1 px-3 py-2 border rounded-lg transition-all flex items-center justify-center gap-2 text-sm ${
                    isLoading 
                      ? 'bg-gray-500/20 border-gray-400/30 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-500/20 border-blue-400/30 text-blue-300 hover:bg-blue-500/30'
                  }`}
                >
                  {isLoading ? 'Saving...' : 'Submit to Public'}
                </motion.button>
              </div>

              {/* Clear Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCanvas}
                className="w-full px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all"
              >
                Clear Canvas
              </motion.button>

              {/* Canvas Frame Selector */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm">Select Canvas Frame</label>
                <div className="text-white/60 text-xs mb-2">
                  Each frame shows the latest artwork. Submit yours to replace it!
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {galleryFrames.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => selectCanvasFrame(index)}
                      className={`p-2 rounded border text-xs transition-all ${
                        currentCanvasIndex === index
                          ? 'bg-blue-500/30 border-blue-400/50 text-blue-300'
                          : artSubmissions[index]
                          ? 'bg-green-500/20 border-green-400/30 text-green-300'
                          : 'bg-gray-500/20 border-gray-400/30 text-gray-300 hover:border-gray-300/50'
                      }`}
                    >
                      Frame {index + 1}
                      {artSubmissions[index] ? (
                        <div className="text-xs opacity-75">🎨 Active</div>
                      ) : (
                        <div className="text-xs opacity-75">Empty</div>
                      )}
                    </motion.button>
                  ))}
                </div>
                <div className="text-white/60 text-xs">
                  {artSubmissions.filter(Boolean).length}/4 frames have public art
                </div>
              </div>

              {/* Brush Size Control */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm">Brush Size</label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={sprayRadius}
                  onChange={(e) => setSprayRadius(Number(e.target.value))}
                  className="w-full accent-blue-400"
                />
                              <div className="text-white/60 text-xs">{sprayRadius}px</div>
            </div>

            {/* Success/Error Message */}
            {saveMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`px-3 py-2 rounded-lg text-sm ${
                  saveMessage.includes('Error') 
                    ? 'bg-red-500/20 border border-red-400/30 text-red-300'
                    : 'bg-green-500/20 border border-green-400/30 text-green-300'
                }`}
              >
                {saveMessage}
              </motion.div>
            )}
          </div>
          </div>

          {/* Image Navigation for Create Mode */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex gap-2">
              {visionImages.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => {
                    setCurrentIndex(index);
                    clearCanvas(); // Clear when switching images
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

          {/* Image Info */}
          <div className="absolute bottom-8 left-8 z-20">
            <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded-lg p-3">
              <h3 className="text-white font-semibold text-sm">{currentImage.title}</h3>
              <p className="text-white/60 text-xs capitalize">{currentImage.category}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}