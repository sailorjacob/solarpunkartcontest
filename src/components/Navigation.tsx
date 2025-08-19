'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'gallery', label: 'Visions' },
  { id: 'journey', label: 'The Journey' },
  { id: 'wall', label: 'Create' },
  { id: 'radio', label: 'Experience' },
];

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "bg-black/90 backdrop-blur-sm py-4 border-b border-gray-800" 
            : "py-8"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer group"
              onClick={() => onSectionChange('home')}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-sm ${
                    activeSection === 'home' ? 'bg-gradient-to-br from-red-500 to-orange-500' : 'bg-gradient-to-br from-green-400 to-blue-400'
                  }`} />
                  <div>
                    <h1 className={`font-bold text-xl tracking-tight transition-colors duration-300 ${
                      isScrolled ? 'text-white' : activeSection === 'journey' || activeSection === 'wall' || activeSection === 'radio' ? 'text-slate-800' : activeSection === 'home' ? 'text-orange-600' : 'text-white'
                    }`}>
                      SOJOURN
                    </h1>
                    <p className={`text-xs font-mono tracking-wider -mt-1 transition-colors duration-300 ${
                      isScrolled ? 'text-gray-400' : activeSection === 'journey' || activeSection === 'wall' || activeSection === 'radio' ? 'text-slate-600' : activeSection === 'home' ? 'text-orange-500' : 'text-gray-300'
                    }`}>
                      KEPLER-442B
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "relative px-6 py-3 font-medium tracking-wider transition-all duration-300 uppercase text-sm",
                    activeSection === item.id
                      ? activeSection === 'home' ? "text-red-500 border-b-2 border-red-500" : "text-green-400 border-b-2 border-green-400"
                      : isScrolled 
                        ? "text-gray-400 hover:text-white"
                        : activeSection === 'journey' || activeSection === 'wall' || activeSection === 'radio'
                          ? "text-slate-800 hover:text-slate-600"
                          : activeSection === 'home'
                            ? "text-orange-600 hover:text-red-500"
                            : "text-slate-200 hover:text-white"
                  )}
                >

                  <span className="relative z-10 text-sm">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Right Spacer for Balance */}
            <div className="hidden lg:block w-32"></div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-2xl bg-white/80 border border-gray-200"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.div
                  animate={{ 
                    rotate: isMobileMenuOpen ? 45 : 0, 
                    y: isMobileMenuOpen ? 2 : -2 
                  }}
                  className="w-4 h-0.5 bg-gray-700 mb-1"
                />
                <motion.div
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-4 h-0.5 bg-gray-700 mb-1"
                />
                <motion.div
                  animate={{ 
                    rotate: isMobileMenuOpen ? -45 : 0, 
                    y: isMobileMenuOpen ? -2 : 2 
                  }}
                  className="w-4 h-0.5 bg-gray-700"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-6 right-6 z-40 glass-card rounded-3xl p-6 lg:hidden shadow-elevation-3"
          >
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full px-6 py-4 rounded-2xl transition-all duration-300 text-left font-medium",
                    activeSection === item.id
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-stone-700 hover:bg-white/60 hover:text-stone-900"
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="pt-4 border-t border-stone-200">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  onClick={() => {
                    onSectionChange('wall');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full btn-primary"
                >
                  Start Creating
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
