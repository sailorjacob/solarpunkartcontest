'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function PublicWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMaskLoaded, setIsMaskLoaded] = useState(false);
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);
  const [artSubmissions, setArtSubmissions] = useState<string[]>([]);

  // Ink blue color and settings  
  const neonBlue = '#1E40AF'; // Ink blue instead of cyan
  const sprayDensity = 100;
  const sprayRadius = 15;
  const glowBlur = 20;

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
    if (!canvasRef.current || (isImageLoaded && isMaskLoaded)) return;
    
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

  // Enhanced spray function with masking
  const spray = (x: number, y: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Check if we can paint at this location
    if (!isPointPaintable(Math.floor(x), Math.floor(y))) return;

    // Solid base layer
    ctx.save();
    setBaseStyles(ctx);
    for (let i = 0; i < sprayDensity; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius * 0.5;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius * 0.5;
      const particleX = x + offsetX;
      const particleY = y + offsetY;
      
      // Only paint if this particle location is paintable
      if (isPointPaintable(Math.floor(particleX), Math.floor(particleY))) {
        const particleSize = Math.random() * 1.5 + 0.5;
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Fainter outer particles
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < sprayDensity / 2; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius;
      const particleX = x + offsetX;
      const particleY = y + offsetY;
      
      // Only paint if this particle location is paintable
      if (isPointPaintable(Math.floor(particleX), Math.floor(particleY))) {
        const particleSize = Math.random() * 2 + 1;
        ctx.beginPath();
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    // Glow overlay
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.5;
    ctx.shadowBlur = glowBlur * 1.5;
    ctx.shadowColor = neonBlue;
    ctx.fillStyle = neonBlue;
    
    for (let i = 0; i < sprayDensity / 2; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius * 0.7;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius * 0.7;
      const particleX = x + offsetX;
      const particleY = y + offsetY;
      
      // Only add glow if this location is paintable
      if (isPointPaintable(Math.floor(particleX), Math.floor(particleY))) {
        const size = Math.random() * 3 + 2;
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

  const saveArt = () => {
    if (!canvasRef.current) return;
    
    // Get canvas as data URL
    const artworkData = canvasRef.current.toDataURL('image/png');
    
    // Add to submissions and cycle canvas position
    const newSubmissions = [...artSubmissions];
    newSubmissions[currentCanvasIndex] = artworkData;
    setArtSubmissions(newSubmissions);
    
    // Move to next canvas position (1 -> 2 -> 3 -> 4 -> 1)
    const nextIndex = (currentCanvasIndex + 1) % 4;
    setCurrentCanvasIndex(nextIndex);
    
    // Clear and reset for next artist
    clearCanvas();
    
    // Load new mask for next canvas
    setIsMaskLoaded(false);
    setTimeout(() => {
      loadCurrentMask();
    }, 100);
    
    // In a real app, you would send artworkData to your backend here
    console.log(`Art saved to canvas position ${currentCanvasIndex + 1}, moving to position ${nextIndex + 1}`);
  };

  return (
    <section className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-full mx-auto px-4">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-blue-600">
            COLLABORATIVE GALLERY
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mx-auto">
            Paint on the gallery with ink blue spraypaint • Your art will be displayed on the canvases
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-xl p-4"
        >
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border border-stone-300" 
                   style={{ backgroundColor: neonBlue, boxShadow: `0 0 10px ${neonBlue}` }}>
              </div>
              <span className="text-sm font-medium text-stone-700">Ink Blue Spraypaint</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-stone-500">
                Canvas {currentCanvasIndex + 1}/4
              </span>
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-stone-600 text-stone-100 rounded-lg font-mono text-sm hover:bg-stone-700 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={saveArt}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-mono text-sm hover:bg-blue-700 transition-colors"
              >
                Submit to Gallery
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-3 p-2 bg-stone-50 rounded text-center">
            <p className="text-xs text-stone-600">
              <strong>Click anywhere to start painting</strong> • Click and drag to spray • 
              Your art will be displayed on canvas position {currentCanvasIndex + 1}
            </p>
          </div>

          {/* Canvas */}
          <div className="border border-stone-300 rounded overflow-hidden">
            <canvas
              ref={canvasRef}
              width={1400}
              height={800}
              className="w-full max-w-full h-auto cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{ backgroundColor: '#f8f8f8' }}
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-stone-500 font-mono">
              Advanced ink blue spraypaint • Realistic spray patterns • 
              Paint your vision of the gallery space
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}