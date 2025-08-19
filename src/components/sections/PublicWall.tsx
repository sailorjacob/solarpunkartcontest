'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { saveArtworkToSupabase, getArtworksFromSupabase, type Artwork } from '@/lib/supabase';
import Image from 'next/image';

export default function PublicWall() {
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ink blue color and settings  
  const neonBlue = '#1E40AF'; // Ink blue instead of cyan
  const sprayDensity = 80;
  const [sprayRadius, setSprayRadius] = useState(5);
  const glowBlur = 15;

  // Gallery background images to paint on
  const galleryImages = [
    {
      src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/cityoverheadview.png',
      title: 'Metropolitan Overview'
    },
    {
      src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/lushcityview2.png',
      title: 'Verdant Cityscape'
    },
    {
      src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/greenhouse.png',
      title: 'Atmospheric Gardens'
    },
    {
      src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/dwelling%20neighborhood.png',
      title: 'Residential Harmony'
    }
  ];

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
    if (!canvasRef.current || isImageLoaded) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1400;
    canvas.height = 800;

    // Create mask canvas
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    maskCanvasRef.current = maskCanvas;

    // Load background image - using your gallery image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      if (!canvasRef.current) return;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      backgroundImageRef.current = img;
      setIsImageLoaded(true);
      
      // Load mask for current canvas
      loadCurrentMask();
    };
    
    img.onerror = (error) => {
      console.error('Error loading background image:', error);
      // Fallback to white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setIsImageLoaded(true);
    };
    
    // Use your gallery image as the painting background
    img.src = 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/gallery2.png';
  };

  // Load the mask for the current canvas position
  const loadCurrentMask = () => {
    if (!maskCanvasRef.current) return;
    
    const maskCanvas = maskCanvasRef.current;
    const maskCtx = maskCanvas.getContext('2d');
    if (!maskCtx) return;

    const maskImg = new Image();
    maskImg.crossOrigin = 'anonymous';
    
    maskImg.onload = () => {
      maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
      maskCtx.drawImage(maskImg, 0, 0, maskCanvas.width, maskCanvas.height);
      setIsMaskLoaded(true);
    };
    
    maskImg.onerror = () => {
      console.error('Error loading mask image');
      setIsMaskLoaded(true); // Continue without mask
    };
    
    // Load the current canvas frame as mask
    maskImg.src = galleryFrames[currentCanvasIndex];
  };

  // Check if a point is on a paintable area (has pixels in the mask)
  const isPointPaintable = (x: number, y: number): boolean => {
    if (!maskCanvasRef.current || !isMaskLoaded) return true; // Allow painting if no mask
    
    const maskCtx = maskCanvasRef.current.getContext('2d');
    if (!maskCtx) return true;
    
    try {
      const imageData = maskCtx.getImageData(x, y, 1, 1);
      const alpha = imageData.data[3]; // Alpha channel
      return alpha > 0; // Only paint where there are pixels
    } catch (e) {
      return true; // Allow painting if error
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isImageLoaded) {
      initializeCanvas();
      return;
    }
    setIsDrawing(true);
    const pos = getMousePos(e);
    spray(pos.x, pos.y);
  };

  // Get mouse position relative to canvas
  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (1400 / rect.width),
      y: (e.clientY - rect.top) * (800 / rect.height)
    };
  };

  // Enhanced spray function with masking and realistic drips
  const spray = (x: number, y: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Check if we can paint at this location
    if (!isPointPaintable(Math.floor(x), Math.floor(y))) return;

    // Dense core particles (fine mist effect)
    ctx.save();
    setBaseStyles(ctx);
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < sprayDensity * 1.2; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius * 0.3;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius * 0.3;
      const particleX = x + offsetX;
      const particleY = y + offsetY;
      
      if (isPointPaintable(Math.floor(particleX), Math.floor(particleY))) {
        const particleSize = Math.random() * 0.8 + 0.2; // Much smaller core particles
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Medium spray particles
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < sprayDensity * 0.7; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius * 0.6;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius * 0.6;
      const particleX = x + offsetX;
      const particleY = y + offsetY;
      
      if (isPointPaintable(Math.floor(particleX), Math.floor(particleY))) {
        const particleSize = Math.random() * 1.0 + 0.3;
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Outer spray particles (lighter)
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < sprayDensity * 0.4; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius;
      const particleX = x + offsetX;
      const particleY = y + offsetY;
      
      if (isPointPaintable(Math.floor(particleX), Math.floor(particleY))) {
        const particleSize = Math.random() * 1.2 + 0.4;
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Realistic drip effects (occasional)
    if (Math.random() < 0.15) { // 15% chance for drips
      ctx.globalAlpha = 0.7;
      const dripLength = Math.random() * sprayRadius * 2 + sprayRadius;
      const dripX = x + (Math.random() * 2 - 1) * sprayRadius * 0.3;
      
      for (let d = 0; d < dripLength; d += 2) {
        const dripY = y + d;
        const dripWidth = Math.max(0.5, (dripLength - d) / dripLength * 2);
        
        if (isPointPaintable(Math.floor(dripX), Math.floor(dripY))) {
          ctx.beginPath();
          ctx.arc(dripX + (Math.random() * 0.6 - 0.3), dripY, dripWidth * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();

    // Subtle glow (much reduced)
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.2; // Much reduced glow
    ctx.shadowBlur = glowBlur * 0.5; // Smaller glow radius
    ctx.shadowColor = neonBlue;
    ctx.fillStyle = neonBlue;
    
    for (let i = 0; i < sprayDensity * 0.2; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius * 0.4;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius * 0.4;
      const particleX = x + offsetX;
      const particleY = y + offsetY;
      
      if (isPointPaintable(Math.floor(particleX), Math.floor(particleY))) {
        const size = Math.random() * 1.5 + 0.8; // Much smaller glow
        ctx.beginPath();
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    spray(pos.x, pos.y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !backgroundImageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas and redraw background image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImageRef.current, 0, 0, canvas.width, canvas.height);
  };

  // Load saved artworks from Supabase
  const loadSavedArtworks = async () => {
    try {
      setIsLoading(true);
      const artworks = await getArtworksFromSupabase();
      setSavedArtworks(artworks);
      
      // Update artSubmissions to show which frames are used
      const submissions = new Array(4).fill(null);
      artworks.forEach((artwork: Artwork) => {
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
      
      const currentImage = galleryImages[currentImageIndex];
      const artworkToSave = {
        title: `${currentImage.title} - Community Art`,
        base_image: currentImage.src,
        artwork_data: artworkData,
        frame_index: currentCanvasIndex,
        artist_name: 'Anonymous Artist'
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

  const saveArt = async () => {
    if (!canvasRef.current || isLoading) return;
    
    console.log('Starting save process...');
    
    try {
      // Get canvas as data URL
      const artworkData = canvasRef.current.toDataURL('image/png');
      console.log('Canvas data captured, length:', artworkData.length);
      
      // Save to database
      const savedArtwork = await saveArtworkToDatabase(artworkData);
      
      if (!savedArtwork) {
        console.error('Failed to save artwork - no data returned');
        return;
      }
      
      console.log('Artwork saved successfully:', savedArtwork);
      
      // Update local submissions
      const newSubmissions = [...artSubmissions];
      newSubmissions[currentCanvasIndex] = artworkData;
      setArtSubmissions(newSubmissions);
      
      // Show success for 2 seconds before clearing
      setSaveMessage('Artwork submitted successfully! 🎨');
      
      // Wait before moving to next frame
      setTimeout(() => {
        // Move to next canvas position
        const nextIndex = (currentCanvasIndex + 1) % 4;
        setCurrentCanvasIndex(nextIndex);
        
        // Clear and reset for next artist
        clearCanvas();
        
        // Load new mask for next canvas
        setIsMaskLoaded(false);
        setTimeout(() => {
          loadCurrentMask();
        }, 100);
        
        console.log(`Moved to frame ${nextIndex + 1} for next artwork`);
      }, 2000);
      
    } catch (error) {
      console.error('Error in saveArt:', error);
      setSaveMessage('Failed to save artwork. Check console for details.');
    }
  };

  // Download combined artwork
  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');
    if (!combinedCtx) return;

    const currentImage = galleryImages[currentImageIndex];
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      combinedCanvas.width = img.width;
      combinedCanvas.height = img.height;
      
      // Draw the original image
      combinedCtx.drawImage(img, 0, 0);
      
      // Draw the painted overlay
      combinedCtx.drawImage(canvas, 0, 0, combinedCanvas.width, combinedCanvas.height);
      
      // Download the combined image
      const link = document.createElement('a');
      link.download = `${currentImage.title.replace(/\s+/g, '_')}_artwork.png`;
      link.href = combinedCanvas.toDataURL('image/png');
      link.click();
    };
    
    img.src = currentImage.src;
  };

  // Initialize canvas on component mount
  useEffect(() => {
    initializeCanvas();
    loadSavedArtworks();
  }, []);

  // Function to change canvas frame
  const changeCanvasFrame = (newIndex: number) => {
    setCurrentCanvasIndex(newIndex);
    setIsMaskLoaded(false);
    setTimeout(() => {
      loadCurrentMask();
    }, 100);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Gallery Image */}
      <div className="absolute inset-0">
        <Image
          src={galleryImages[currentImageIndex].src}
          alt={galleryImages[currentImageIndex].title}
          fill
          priority
          className="object-cover opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Canvas Overlay */}
      <canvas
        ref={canvasRef}
        width={1400}
        height={800}
        className="absolute inset-0 w-full h-full object-cover cursor-crosshair z-10"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ background: 'transparent' }}
      />

      {/* Floating Controls Overlay - Top Right */}
      <motion.div 
        className="absolute top-6 right-6 z-50 pointer-events-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 text-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wide text-gray-600">Brush</span>
              <input
                type="range"
                min="2"
                max="15"
                value={sprayRadius}
                onChange={(e) => setSprayRadius(Number(e.target.value))}
                className="w-16 h-1 bg-red-500 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((sprayRadius - 2) / 13) * 100}%, #e5e7eb ${((sprayRadius - 2) / 13) * 100}%, #e5e7eb 100%)`
                }}
              />
              <span className="text-xs text-gray-500 w-6">{sprayRadius}</span>
            </div>
            
            <div className="h-4 w-px bg-gray-300" />
            
            <div className="flex gap-2">
              <button
                onClick={clearCanvas}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-mono lowercase tracking-wide rounded-lg transition-all duration-200 border border-gray-200"
              >
                clear
              </button>
              <button
                onClick={downloadArtwork}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-mono lowercase tracking-wide rounded-lg transition-all duration-200 border border-emerald-200 flex items-center gap-1"
              >
                <Download size={12} />
                download
              </button>
              <button
                onClick={saveArt}
                disabled={isLoading}
                className={`px-3 py-1.5 text-xs font-mono lowercase tracking-wide rounded-lg transition-all duration-200 border ${
                  isLoading 
                    ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                }`}
              >
                {isLoading ? 'saving...' : 'submit to public'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Save Message */}
      {saveMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            saveMessage.includes('Error') 
              ? 'bg-red-100 text-red-700 border border-red-200'
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {saveMessage}
          </div>
        </motion.div>
      )}

      {/* Image Selector - Bottom Center */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-xl px-6 py-3 border border-gray-200 shadow-lg">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-600 uppercase">Background:</span>
            <div className="flex gap-2">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    clearCanvas();
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                    currentImageIndex === index
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="h-3 w-px bg-gray-300" />
            <span className="text-xs font-mono text-gray-600">
              Frame <span className="text-blue-600 font-bold">{currentCanvasIndex + 1}</span>/4
            </span>
            <div className="h-3 w-px bg-gray-300" />
            <span className="text-xs font-mono text-gray-500">
              {galleryImages[currentImageIndex].title}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Canvas Position Indicator - Top Left */}
      <motion.div 
        className="absolute top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => changeCanvasFrame(index)}
                  className={`w-2 h-2 rounded-full border transition-all duration-200 hover:scale-125 cursor-pointer ${
                    index === currentCanvasIndex 
                      ? 'bg-blue-500 border-blue-400' 
                      : artSubmissions[index] 
                        ? 'bg-green-500 border-green-400' 
                        : 'bg-gray-300 border-gray-400 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-gray-600 uppercase tracking-wide">
              Gallery Frames
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}