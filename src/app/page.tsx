'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import Gallery from '@/components/sections/Gallery';
import PublicWall from '@/components/sections/PublicWall';
import SolarRadio from '@/components/sections/SolarRadio';
import About from '@/components/sections/About';

export default function Home() {
  const [activeSection, setActiveSection] = useState('gallery');
  const [isLoading, setIsLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

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

  const handleFooterToggle = () => {
    setShowFooter(!showFooter);
    // If opening footer, scroll to bottom to reveal it
    if (!showFooter) {
      setTimeout(() => {
        window.scrollTo({ 
          top: document.documentElement.scrollHeight, 
          behavior: 'smooth' 
        });
      }, 100); // Small delay to allow animation to start
    }
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
        return <About onBack={() => handleSectionChange('gallery')} />;
      default:
        return <Gallery />;
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
                KEPLER-2157
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative overflow-x-hidden">
      {/* Navigation - Hidden on About page */}
      {activeSection !== 'about' && (
        <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      )}
      
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

      {/* Footer Toggle Button - Only on Home and Gallery Pages */}
      {(activeSection === 'home' || activeSection === 'gallery') && (
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
          {/* Toggle Button */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ y: 0 }}
            animate={{ y: showFooter ? -8 : 0 }}
          >
            <button
              onClick={handleFooterToggle}
              className="p-3 bg-stone-800/80 backdrop-blur-sm text-stone-200 rounded-t-lg hover:bg-stone-700/80 transition-all duration-300 border border-stone-600/50 pointer-events-auto"
            >
              <ChevronDownIcon 
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  showFooter ? 'rotate-180' : ''
                }`} 
              />
            </button>
          </motion.div>

          {/* Collapsible Footer */}
          <AnimatePresence>
            {showFooter && (
              <motion.footer 
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="fixed bottom-0 left-0 right-0 overflow-hidden bg-amber-50 text-stone-800 max-h-[80vh] overflow-y-auto"
              >
                <div className="container-custom py-16">
                  <div className="grid md:grid-cols-3 gap-12">
                    {/* Project Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-sm" />
                        <div>
                          <h3 className="font-bold text-xl text-stone-800">SOJOURN</h3>
                          <p className="text-xs font-mono text-blue-600">KEPLER-442B</p>
                        </div>
                      </div>
                      <p className="text-stone-600 leading-relaxed mb-4">
                        Advanced sustainable civilization project. Terraforming Kepler-442b through 
                        ecological integration and cutting-edge technology.
                      </p>
                      <div className="text-xs font-mono text-blue-600">
                        SECURITY: LEVEL 9
                      </div>
                    </div>

                    {/* Navigation */}
                    <div>
                      <h4 className="font-bold text-stone-800 mb-4 uppercase tracking-wide">Sectors</h4>
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
                      
                      <div className="mt-6">
                        <p className="text-stone-600 text-sm mb-1">By</p>
                        <a 
                          href="https://sailorjacob.github.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 text-3xl font-light inline-block relative opacity-70 hover:opacity-100 transition-opacity duration-300"
                          style={{
                            fontFamily: '"Brush Script MT", "Lucida Handwriting", cursive',
                            fontWeight: '300',
                            letterSpacing: '0.02em',
                            transform: 'rotate(3deg) skew(1deg)'
                          }}
                        >
                          Jacob
                        </a>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <h4 className="font-bold text-stone-800 mb-4 uppercase tracking-wide">System Status</h4>
                      <div className="space-y-3 text-sm font-mono">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-stone-200 rounded-full animate-pulse shadow-sm" />
                          <span className="text-stone-600 animate-fade-in">All Systems Operational</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-stone-300 rounded-full animate-ping shadow-sm" style={{ animationDuration: '2s' }} />
                          <span className="text-stone-600 animate-fade-in-delay-1">Atmospheric Processors Online</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse shadow-sm" style={{ animationDuration: '3s' }} />
                          <span className="text-stone-600 animate-fade-in-delay-2">Terraforming Progress: 89.3%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-stone-300">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <p className="text-sm font-mono text-blue-600">
                        © 2157 SOJOURN COLONY ALPHA • INTERSTELLAR COLLECTIVE
                      </p>
                      <div className="flex items-center gap-6 text-xs font-mono text-blue-600 uppercase">
                        <div>HARMONY PROTOCOL ACTIVE</div>
                        <div>DATA PROTECTED</div>
                        <div>TRANSMISSION PURE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.footer>
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}