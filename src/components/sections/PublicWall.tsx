'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function PublicWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Neon blue color and settings
  const neonBlue = '#00FFFF';
  const sprayDensity = 100;
  const sprayRadius = 15;
  const glowBlur = 20;

  // Initialize canvas when component first loads
  const initializeCanvas = () => {
    if (!canvasRef.current || isImageLoaded) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 600;

    // Load background image
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
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      backgroundImageRef.current = img;
      setIsImageLoaded(true);
    };
    
    img.onerror = () => {
      // Fallback: gray background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setIsImageLoaded(true);
    };
    
    img.src = 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/galleryfield.png';
  };

  // Set base drawing styles
  const setBaseStyles = (ctx: CanvasRenderingContext2D) => {
    ctx.shadowColor = neonBlue;
    ctx.shadowBlur = glowBlur;
    ctx.fillStyle = neonBlue;
    ctx.strokeStyle = neonBlue;
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  };

  // Get mouse position relative to canvas
  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (1200 / rect.width),
      y: (e.clientY - rect.top) * (600 / rect.height)
    };
  };

  // Enhanced spray function
  const spray = (x: number, y: number) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Solid base layer
    ctx.save();
    setBaseStyles(ctx);
    for (let i = 0; i < sprayDensity; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius * 0.5;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius * 0.5;
      const particleSize = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Fainter outer particles
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < sprayDensity / 2; i++) {
      const offsetX = (Math.random() * 2 - 1) * sprayRadius;
      const offsetY = (Math.random() * 2 - 1) * sprayRadius;
      const particleSize = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, particleSize, 0, Math.PI * 2);
      ctx.fill();
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
      const particleSize = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, particleSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isImageLoaded) {
      initializeCanvas();
      return;
    }
    
    setIsDrawing(true);
    const pos = getMousePos(e);
    spray(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isImageLoaded) return;
    const pos = getMousePos(e);
    spray(pos.x, pos.y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Clear drawings (keep background image)
  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    if (backgroundImageRef.current) {
      // Redraw background image
      const canvas = canvasRef.current;
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
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    } else {
      // Fallback gray background
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Save as PNG
  const saveArt = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'solarpunk-neon-art.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <section className="min-h-screen bg-stone-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-stone-800 mb-4">
            COLLABORATIVE ART WALL
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Express your vision of SolarPunk Mars with neon blue spraypaint. 
            Create stunning graffiti art with realistic spray patterns and glowing effects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-stone-300" 
                   style={{ backgroundColor: neonBlue, boxShadow: `0 0 20px ${neonBlue}` }}>
              </div>
              <span className="text-sm font-semibold text-stone-700 uppercase tracking-wider">
                Neon Blue Spraypaint
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Clear Art
              </button>
              <button
                onClick={saveArt}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Save PNG
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6 p-4 bg-stone-100 rounded-lg">
            <p className="text-sm text-stone-600 text-center">
              <strong>Instructions:</strong> Click anywhere to initialize the canvas • 
              Click and drag to spray neon blue paint • 
              Paint glows with realistic neon lighting • 
              Your art contributes to the collective SolarPunk vision
            </p>
          </div>

          {/* Canvas */}
          <div className="border-2 border-stone-300 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={1200}
              height={600}
              className="w-full max-w-full h-auto cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{ backgroundColor: '#f0f0f0' }}
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-stone-500">
              🎨 Advanced neon spraypaint with realistic effects • 
              ✨ Glowing particles and spray patterns • 
              🌱 Paint your vision of sustainable Mars civilization
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}