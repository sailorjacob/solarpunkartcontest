'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function PublicWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPainting, setIsPainting] = useState(false);
  const [artSubmissions, setArtSubmissions] = useState<string[]>([]);
  const [currentCanvasIndex, setCurrentCanvasIndex] = useState(0);

  // Ink blue color and settings  
  const inkBlue = '#1E40AF';
  const sprayDensity = 100;
  const sprayRadius = 15;
  const glowBlur = 20;

  // Gallery canvas frame URLs
  const galleryFrames = [
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe1.png',
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe2.png',
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe3.png',
    'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/gallery/galleryframe4.png'
  ];

  // Initialize fullscreen canvas for painting
  const initializePaintingCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1600;
    canvas.height = 900;
    
    // Set background to white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const startPainting = () => {
    setIsPainting(true);
    setTimeout(() => {
      initializePaintingCanvas();
    }, 100);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
    ctx.shadowColor = inkBlue;
    ctx.shadowBlur = glowBlur;
    ctx.fillStyle = inkBlue;
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
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const submitArt = () => {
    if (!canvasRef.current) return;
    
    // Get canvas as data URL
    const artworkData = canvasRef.current.toDataURL('image/png');
    
    // Add to submissions (in real app, this would go to your backend)
    const newSubmissions = [...artSubmissions];
    newSubmissions[currentCanvasIndex] = artworkData;
    setArtSubmissions(newSubmissions);
    
    // Move to next canvas position
    setCurrentCanvasIndex((prev) => (prev + 1) % 4);
    
    // Return to gallery view
    setIsPainting(false);
  };

  if (!isPainting) {
    // Gallery Entrance View
    return (
      <section className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pattern-grid opacity-10" />
        
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center pt-20 pb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-blue-600">
              COLLABORATIVE GALLERY
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto px-6">
              Create digital art that will be displayed in our virtual gallery space
            </p>
          </motion.div>

          {/* Gallery Display */}
          <div className="flex-1 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative max-w-6xl w-full"
            >
              {/* Base Gallery Image */}
              <div className="relative w-full">
                <Image
                  src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/gallery2.png"
                  alt="Virtual Gallery with Canvas Frames"
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  priority
                />
                
                {/* Overlay submitted artworks */}
                {artSubmissions.map((artwork, index) => artwork && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryFrames[index]}
                      alt={`Gallery Frame ${index + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Start Painting Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startPainting}
                  className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Start Creating Art
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center pb-20"
          >
            <p className="text-sm text-stone-500 max-w-xl mx-auto px-6">
              Click "Start Creating Art" to enter the painting mode. Your artwork will be displayed on one of the gallery canvases.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Fullscreen Painting Mode
  return (
    <section className="fixed inset-0 bg-white z-50 overflow-hidden">
      {/* Fullscreen Canvas */}
      <div className="absolute inset-0">
        <canvas
          ref={canvasRef}
          width={1600}
          height={900}
          className="w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{ backgroundColor: '#ffffff' }}
        />
      </div>

      {/* Floating Controls */}
      <div className="absolute top-8 left-8 right-8 z-10">
        <div className="flex justify-between items-center">
          {/* Title */}
          <div className="bg-black/20 backdrop-blur-sm rounded-full px-6 py-3">
            <h3 className="text-white font-semibold text-lg">Paint Your Vision</h3>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCanvas}
              className="px-6 py-3 bg-red-500/80 text-white rounded-full font-medium backdrop-blur-sm hover:bg-red-600/80 transition-all"
            >
              Clear
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPainting(false)}
              className="px-6 py-3 bg-gray-500/80 text-white rounded-full font-medium backdrop-blur-sm hover:bg-gray-600/80 transition-all"
            >
              Back to Gallery
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={submitArt}
              className="px-6 py-3 bg-blue-600/80 text-white rounded-full font-medium backdrop-blur-sm hover:bg-blue-700/80 transition-all"
            >
              Submit to Gallery
            </motion.button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-6 py-3">
          <p className="text-white text-sm text-center">
            Click and drag to paint with ink blue • Your art will be displayed in the gallery
          </p>
        </div>
      </div>

      {/* Canvas Info */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
          <p className="text-white text-xs font-mono">
            Canvas {currentCanvasIndex + 1}/4
          </p>
        </div>
      </div>
    </section>
  );
}