'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function PublicWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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

  // Initialize canvas when component first loads
  const initializeCanvas = () => {
    if (!canvasRef.current || isImageLoaded) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1400;
    canvas.height = 800;

    // Load background image - using your gallery image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      if (!canvasRef.current) return;
      
      // Calculate dimensions to fit the image properly
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (imgAspect > canvasAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      backgroundImageRef.current = img;
      setIsImageLoaded(true);
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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isImageLoaded) {
      initializeCanvas();
      return;
    }
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Create spray paint effect
    ctx.globalCompositeOperation = 'source-over';
    
    for (let i = 0; i < sprayDensity; i++) {
      const offsetX = (Math.random() - 0.5) * sprayRadius * 2;
      const offsetY = (Math.random() - 0.5) * sprayRadius * 2;
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      
      if (distance <= sprayRadius) {
        const opacity = Math.max(0, 1 - distance / sprayRadius) * 0.1;
        ctx.fillStyle = `rgba(30, 64, 175, ${opacity})`;
        ctx.fillRect(x + offsetX, y + offsetY, 1, 1);
      }
    }

    // Add glow effect
    ctx.shadowColor = neonBlue;
    ctx.shadowBlur = glowBlur;
    ctx.fillStyle = neonBlue;
    ctx.globalAlpha = 0.03;
    ctx.beginPath();
    ctx.arc(x, y, sprayRadius * 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
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
    
    const img = backgroundImageRef.current;
    const imgAspect = img.width / img.height;
    const canvasAspect = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (imgAspect > canvasAspect) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgAspect;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgAspect;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
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
    setCurrentCanvasIndex((prev) => (prev + 1) % 4);
    
    // Clear and reset for next artist
    clearCanvas();
    
    // In a real app, you would send artworkData to your backend here
    console.log(`Art saved to canvas position ${currentCanvasIndex + 1}`);
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