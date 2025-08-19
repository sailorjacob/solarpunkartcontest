'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Info, X } from 'lucide-react';
import { saveArtworkToSupabase, getArtworksFromSupabase, type Artwork } from '@/lib/supabase';
import Image from 'next/image';

export default function PublicWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMaskLoaded, setIsMaskLoaded] = useState(false);
  // Simplified frame system - 4 frames but user gets random one
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
  const [artSubmissions, setArtSubmissions] = useState<string[]>([]);
  const [savedArtworks, setSavedArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [hasUserPainted, setHasUserPainted] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

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

  // Gallery canvas frame URLs for mapping - CORRECTED ORDER
  const galleryFrames = [
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe4.png', // Frame 1 (far left)
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe3.png', // Frame 2 (second from left)
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe1.png', // Frame 3 (third from left)
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe2.png'  // Frame 4 (far right)
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
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = async () => {
      if (!canvasRef.current) return;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      backgroundImageRef.current = img;
      
      // Load any existing submitted artwork for this frame
      await loadExistingArtwork();
      
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
    
    // Use the fixed Gallery2 image as the art wall background
    img.src = 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/gallery2.png';
  };

  // Load existing artwork for current frame
  const loadExistingArtwork = async () => {
    try {
      const artworks = await getArtworksFromSupabase();
      const currentFrameArtwork = artworks.find((artwork: Artwork) => artwork.frame_index === currentCanvasIndex);
      
      if (currentFrameArtwork && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Load and draw the existing artwork
        const artworkImg = new window.Image();
        artworkImg.crossOrigin = 'anonymous';
        
        return new Promise<void>((resolve) => {
          artworkImg.onload = () => {
            ctx.drawImage(artworkImg, 0, 0, canvas.width, canvas.height);
            console.log(`Loaded existing artwork for frame ${currentCanvasIndex + 1}`);
            resolve();
          };
          
          artworkImg.onerror = () => {
            console.error(`Failed to load artwork for frame ${currentCanvasIndex + 1}`);
            resolve();
          };
          
          artworkImg.src = currentFrameArtwork.artwork_data;
        });
      }
    } catch (error) {
      console.error('Error loading existing artwork:', error);
    }
  };

  // Load the mask for the current canvas position
  const loadCurrentMask = () => {
    if (!maskCanvasRef.current) return;
    
    const maskCanvas = maskCanvasRef.current;
    const maskCtx = maskCanvas.getContext('2d');
    if (!maskCtx) return;

    const maskImg = new window.Image();
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
    
    // Load the current frame as mask
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
    setHasUserPainted(true); // Track that user has started painting
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
    
    // Clear everything and restart fresh
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImageRef.current, 0, 0, canvas.width, canvas.height);
    
    // Reload existing artwork for this frame (so public art stays visible)
    loadExistingArtwork();
    
    // Reset painted state
    setHasUserPainted(false);
  };

  // Remove frame switching logic - single collaborative canvas

  // Load saved artworks from Supabase with retry logic
  const loadSavedArtworks = async (retryCount = 0) => {
    if (isRetrying && retryCount === 0) return; // Prevent duplicate calls
    
    try {
      if (retryCount === 0) setIsInitialLoading(true);
      if (retryCount > 0) setIsRetrying(true);
      
      const artworks = await getArtworksFromSupabase();
      setSavedArtworks(artworks);
      
      // Load 4 most recent artworks into frames
      const submissions = new Array(4).fill(null);
      artworks.forEach((artwork: Artwork) => {
        if (artwork.frame_index < 4) {
          submissions[artwork.frame_index] = artwork.artwork_data;
        }
      });
      setArtSubmissions(submissions);
      
      // Randomly select a frame for the user to paint on (0-3 in code = Frames 1-4 for user)
      const randomFrame = Math.floor(Math.random() * 4);
      setCurrentCanvasIndex(randomFrame);
      
      console.log(`User assigned to Frame ${randomFrame + 1} (index ${randomFrame})`);
      
      console.log(`Loaded ${artworks.length} artworks from Supabase`);
    } catch (error) {
      console.error('Error loading saved artworks:', error);
      
      // Retry with exponential backoff for first few attempts
      if (retryCount < 2) {
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s delays
        console.log(`Retrying in ${delay}ms... (attempt ${retryCount + 1})`);
        setTimeout(() => {
          loadSavedArtworks(retryCount + 1);
        }, delay);
        return;
      }
      
      // After max retries, continue with empty gallery
      console.log('Max retries reached. Continuing with empty gallery...');
    } finally {
      setIsInitialLoading(false);
      setIsRetrying(false);
    }
  };

  // Save artwork to Supabase
  const saveArtworkToDatabase = async (artworkData: string) => {
    try {
      setIsLoading(true);
      setSaveMessage('Saving artwork...');
      
      const artworkToSave = {
        title: `Art Gallery Frame ${currentCanvasIndex + 1} - Community Creation`,
        base_image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/gallery2.png',
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
      
      setSaveMessage('Artwork saved to public gallery');
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
    // Get canvas as data URL with compression for smaller size
    const artworkData = canvasRef.current.toDataURL('image/jpeg', 0.7); // JPEG with 70% quality for smaller size
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
    
      // Show success message
      setSaveMessage('Artwork saved to gallery!');
      
      // Reset painted state after successful save
      setHasUserPainted(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error in saveArt:', error);
      setSaveMessage('Failed to save artwork. Check console for details.');
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } finally {
      setIsLoading(false); // Always reset loading state
    }
  };

  // Download combined artwork
  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const combinedCanvas = document.createElement('canvas');
    const combinedCtx = combinedCanvas.getContext('2d');
    if (!combinedCtx) return;

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
      link.download = `Collaborative_Art_Gallery_artwork.png`;
      link.href = combinedCanvas.toDataURL('image/png');
      link.click();
    };
    
    img.src = 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/gallery2.png';
  };

    // Initialize canvas on component mount
  useEffect(() => {
    // Make canvas immediately interactive
    initializeCanvas();
    
    // Load artwork data in background (don't block canvas interaction)
    loadSavedArtworks();
  }, []);



  // Remove frame switching - single collaborative canvas

  return (
    <>
      <style jsx>{`
        .slider-custom::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider-custom::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Art Gallery Wall Background */}
      <div className="absolute inset-0">
        <Image
          src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/gallery2.png"
          alt="Art Gallery Wall"
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
        width={800}
        height={450}
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
        <div className="bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 border border-gray-200 shadow-lg">
          <div className="flex items-center gap-3 text-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wide text-gray-600">Brush</span>
              <input
                type="range"
                min="2"
                max="15"
                value={sprayRadius}
                onChange={(e) => setSprayRadius(Number(e.target.value))}
                className="w-16 h-1 rounded-lg appearance-none cursor-pointer slider-custom"
                style={{
                  background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${((sprayRadius - 2) / 13) * 100}%, #e5e7eb ${((sprayRadius - 2) / 13) * 100}%, #e5e7eb 100%)`
                }}
              />
              <span className="text-xs text-gray-500 w-6">{sprayRadius}</span>
            </div>
            
            <div className="h-4 w-px bg-gray-300" />
            
            <div className="flex gap-2">
              {hasUserPainted && (
              <button
                onClick={clearCanvas}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-mono lowercase tracking-wide rounded-lg transition-all duration-200 border border-gray-200"
              >
                clear
              </button>
              )}
              <button
                onClick={saveArt}
                disabled={isLoading || isInitialLoading}
                className={`px-3 py-1.5 text-xs font-mono lowercase tracking-wide rounded-lg transition-all duration-200 border ${
                  (isLoading || isInitialLoading)
                    ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                {isLoading ? 'saving...' : isInitialLoading ? 'loading...' : 'submit →'}
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
              : 'bg-gray-100 text-gray-700 border border-gray-200'
          }`}>
            {saveMessage}
        </div>
      </motion.div>
      )}



      {/* Collaborative Info - Bottom Left */}
      <motion.div 
        className="absolute bottom-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 border border-gray-200 shadow-lg hover:bg-white transition-all duration-200"
        >
                     <div className="flex items-center gap-2">
             <span className="text-xs font-mono text-gray-600 uppercase tracking-wide">
               Frame {currentCanvasIndex + 1}/4
             </span>
             <Info size={12} className="text-gray-500" />
           </div>
        </button>
      </motion.div>

      {/* Description Modal */}
      <AnimatePresence>
        {showDescription && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-6 z-50 max-w-xs"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 border border-gray-200 shadow-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-800">About This Space</h4>
                <button
                  onClick={() => setShowDescription(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
                             <p className="text-xs text-gray-600 leading-relaxed">
                 You've been assigned to Frame {currentCanvasIndex + 1} of 4 in our collaborative art gallery. 
                 Paint with the spray tool and submit your work to replace the current art on this frame. 
                 Each frame holds one artwork that evolves as new artists contribute.
               </p>
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    </section>
    </>
  );
}