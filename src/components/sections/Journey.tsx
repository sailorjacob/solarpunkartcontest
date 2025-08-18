'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const journeyStories = [
  {
    id: 'early-days',
    title: 'The Pioneer Days',
    period: '2087-2105',
    description: 'The early pioneers on Kepler-442b established the first sustainable habitats using innovative dome technology and careful resource management.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/earlydays.png',
    details: [
      'Initial population: 10,000 settlers',
      'First successful atmospheric processors',
      'Establishment of basic infrastructure',
      'Development of closed-loop life support'
    ]
  },
  {
    id: 'underground-expansion',
    title: 'Underground Networks',
    period: '2105-2130',
    description: 'As the population grew, colonists carved extensive underground cities, creating spaces for art, culture, and community.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/underground%20art%20museum%20entrance.png',
    details: [
      'Underground art museums and galleries',
      'Protected cultural preservation spaces',
      'Advanced geothermal energy systems',
      'Community gathering amphitheaters'
    ]
  },
  {
    id: 'greenhouse-revolution',
    title: 'Agricultural Revolution',
    period: '2130-2140',
    description: 'Revolutionary greenhouse technology and vertical farming transformed Kepler-442b from dependent colony to self-sustaining civilization.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/greenhouse.png',
    details: [
      'Massive atmospheric greenhouses',
      'Genetically adapted Earth crops',
      'Self-sustaining food production',
      'Oxygen generation systems'
    ]
  },
  {
    id: 'neighborhood-growth',
    title: 'Community Flourishing',
    period: '2140-2150',
    description: 'Thoughtfully designed neighborhoods emerged, balancing privacy with community connection. Each district became a model of sustainable living.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/dwelling%20neighborhood.png',
    details: [
      'Integrated residential communities',
      'Shared spaces and resources',
      'Walkable neighborhood design',
      'Community energy grids'
    ]
  },
  {
    id: 'city-overview',
    title: 'Metropolitan Marvel',
    period: '2150-2157',
    description: 'The city reached magnificent scale while maintaining ecological principles. Advanced transportation and green spaces created sustainable urban living.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/cityoverheadview.png',
    details: [
      'Population: 2.4 million citizens',
      'Integrated transport networks',
      'Mixed residential-commercial zones',
      'Central park systems'
    ]
  },
  {
    id: 'lush-future',
    title: 'Ecological Paradise',
    period: '2157+',
    description: 'Today, Sojourn stands as proof that technology and nature can coexist beautifully. Lush vegetation, clean air, and renewable energy power a thriving civilization.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/lushcityview2.png',
    details: [
      'Complete atmospheric transformation',
      '100% renewable energy grid',
      'Native Kepler-442b-Earth hybrid ecosystems',
      'Carbon-negative city operations'
    ]
  }
];

export default function Journey() {
  const [activeStory, setActiveStory] = useState(0);
  const currentStory = journeyStories[activeStory];

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      {/* Large Image Display */}
      <div className="relative w-full h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={currentStory.image}
              alt={currentStory.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Story Content - Bottom Left */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Period Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-4"
                >
                  <span className="text-white/90 text-sm font-mono tracking-wider">
                    {currentStory.period}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                >
                  {currentStory.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-xl"
                >
                  {currentStory.description}
                </motion.p>

                {/* Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl"
                >
                  {currentStory.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-2 text-white/80 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      {detail}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Story Counter - Top Right */}
        <div className="absolute top-8 right-8 z-20">
          <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white font-mono text-sm">
            {String(activeStory + 1).padStart(2, '0')} / {String(journeyStories.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Floating Navigation Tabs - Bottom */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-black/60 backdrop-blur-md border border-white/20 rounded-2xl p-3"
        >
          <div className="flex gap-2">
            {journeyStories.map((story, index) => (
              <motion.button
                key={story.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStory(index)}
                className={`px-4 py-3 rounded-xl transition-all duration-300 text-left min-w-[140px] ${
                  activeStory === index
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <div className={`text-xs font-medium mb-1 ${
                  activeStory === index ? 'text-gray-800' : 'text-white/70'
                }`}>
                  {story.period}
                </div>
                <div className={`text-sm font-semibold leading-tight ${
                  activeStory === index ? 'text-black' : 'text-white'
                }`}>
                  {story.title}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-8 right-8 flex justify-between items-center z-20 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveStory((prev) => (prev - 1 + journeyStories.length) % journeyStories.length)}
          className="p-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/50 transition-all pointer-events-auto"
          disabled={activeStory === 0}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveStory((prev) => (prev + 1) % journeyStories.length)}
          className="p-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/50 transition-all pointer-events-auto"
          disabled={activeStory === journeyStories.length - 1}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </motion.button>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white/60 text-xs font-mono">
          ← → arrows to navigate
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div 
        className="absolute inset-0 z-0"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setActiveStory((prev) => (prev - 1 + journeyStories.length) % journeyStories.length);
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            setActiveStory((prev) => (prev + 1) % journeyStories.length);
          }
        }}
      />
    </section>
  );
}