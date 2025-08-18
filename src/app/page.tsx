'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import Gallery from '@/components/sections/Gallery';
import PublicWall from '@/components/sections/PublicWall';
import SolarRadio from '@/components/sections/SolarRadio';
import About from '@/components/sections/About';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Quick loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Smooth scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
  return (
          <Hero 
            onExploreClick={() => handleSectionChange('journey')}
            onCreateClick={() => handleSectionChange('wall')}
          />
        );
      case 'journey':
        return <Journey />;
      case 'gallery':
        return <Gallery />;
      case 'wall':
        return <PublicWall />;
      case 'radio':
        return <SolarRadio />;
      case 'about':
        return <About onBack={() => handleSectionChange('home')} />;
      default:
        return (
          <Hero 
            onExploreClick={() => handleSectionChange('journey')}
            onCreateClick={() => handleSectionChange('wall')}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-sm" />
            <div>
              <h1 className="font-bold text-xl text-white tracking-tight">
                SOLARPUNK
              </h1>
              <p className="text-xs font-mono text-gray-400 tracking-wider -mt-1">
                MARS-2157
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative">
      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      {/* Content Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* Industrial Footer - Only on Home Page */}
      {activeSection === 'home' && (
        <footer className="relative border-t border-stone-200 bg-stone-50 text-slate-800">
        <div className="container-custom py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Project Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-sm" />
                <div>
                  <h3 className="font-bold text-xl text-slate-800">SOJOURN</h3>
                  <p className="text-xs font-mono text-blue-500">KEPLER-442B</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Advanced sustainable civilization project. Terraforming Kepler-442b through 
                ecological integration and cutting-edge technology.
              </p>
              <div className="text-xs font-mono text-blue-500">
                PURITY: LEVEL 7 HARMONY
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wide">Sectors</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => handleSectionChange('about')}
                    className="text-blue-600 hover:text-blue-800 transition-colors font-mono text-sm uppercase tracking-wide"
                  >
                    Documentation
                  </button>
                </li>
              </ul>
            </div>

            {/* Status */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4 uppercase tracking-wide">System Status</h4>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-slate-600">All Systems Operational</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-slate-600">Atmospheric Processors Online</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span className="text-slate-600">Terraforming Progress: 89.3%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-stone-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm font-mono text-blue-500">
                © 2157 SOJOURN COLONY ALPHA • INTERSTELLAR COLLECTIVE
              </p>
              <div className="flex items-center gap-6 text-xs font-mono text-blue-500 uppercase">
                <div>HARMONY PROTOCOL ACTIVE</div>
                <div>DATA PROTECTED</div>
                <div>TRANSMISSION PURE</div>
              </div>
            </div>
          </div>
        </div>
        </footer>
      )}
    </main>
  );
}