'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

const journeyStories = [
  {
    id: 'early-days',
    title: 'The Pioneer Days',
    subtitle: 'First Settlement • 2087-2105',
    description: 'The early pioneers on Kepler-442b established the first sustainable habitats using innovative dome technology and careful resource management. These hardy settlers laid the foundation for what would become humanity\'s greatest interstellar achievement.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/earlydays.png',
    details: [
      'Initial population: 10,000 settlers',
      'First successful atmospheric processors',
      'Establishment of basic infrastructure',
      'Development of closed-loop life support'
    ],
    theme: 'from-mars-400 to-copper-500'
  },
  {
    id: 'underground-expansion',
    title: 'Underground Networks',
    subtitle: 'Cultural Renaissance • 2105-2130',
    description: 'As the population grew, colonists carved extensive underground cities, creating spaces for art, culture, and community. These subterranean marvels became centers of learning and creative expression.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/underground%20art%20museum%20entrance.png',
    details: [
      'Underground art museums and galleries',
      'Protected cultural preservation spaces',
      'Advanced geothermal energy systems',
      'Community gathering amphitheaters'
    ],
    theme: 'from-azure-400 to-sage-500'
  },
  {
    id: 'greenhouse-revolution',
    title: 'Agricultural Revolution',
    subtitle: 'Food Security • 2130-2140',
    description: 'Revolutionary greenhouse technology and vertical farming transformed Kepler-442b from dependent colony to self-sustaining civilization. These bio-domes became the lungs of the new world.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/greenhouse.png',
    details: [
      'Massive atmospheric greenhouses',
      'Genetically adapted Earth crops',
      'Self-sustaining food production',
      'Oxygen generation systems'
    ],
    theme: 'from-sage-400 to-sage-600'
  },
  {
    id: 'neighborhood-growth',
    title: 'Community Flourishing',
    subtitle: 'Urban Planning • 2140-2150',
    description: 'Thoughtfully designed neighborhoods emerged, balancing privacy with community connection. Each district became a model of sustainable living and social harmony.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/dwelling%20neighborhood.png',
    details: [
      'Integrated residential communities',
      'Shared spaces and resources',
      'Walkable neighborhood design',
      'Community energy grids'
    ],
    theme: 'from-stone-400 to-cream-400'
  },
  {
    id: 'city-overview',
    title: 'Metropolitan Marvel',
    subtitle: 'Urban Density • 2150-2157',
    description: 'The city reached magnificent scale while maintaining ecological principles. Advanced transportation, mixed-use development, and green spaces created a template for sustainable urban living.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/cityoverheadview.png',
    details: [
      'Population: 2.4 million citizens',
      'Integrated transport networks',
      'Mixed residential-commercial zones',
      'Central park systems'
    ],
    theme: 'from-mars-400 to-azure-500'
  },
  {
    id: 'lush-future',
    title: 'Ecological Paradise',
    subtitle: 'Full Terraforming • 2157+',
    description: 'Today, Sojourn stands as proof that technology and nature can coexist beautifully. Lush vegetation, clean air, and renewable energy power a civilization that thrives in harmony with its environment.',
    image: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/lushcityview2.png',
    details: [
      'Complete atmospheric transformation',
      '100% renewable energy grid',
      'Native Kepler-442b-Earth hybrid ecosystems',
      'Carbon-negative city operations'
    ],
    theme: 'from-sage-400 to-azure-400'
  }
];

export default function Journey() {
  const [activeStory, setActiveStory] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pattern-grid opacity-20"
      />
      
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full mb-6">
            <div className="w-2 h-2 bg-mars-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-stone-700 tracking-wide">
              THE JOURNEY • 2087-2157
            </span>
          </div>
          
          <h2 className="subheading text-gradient-premium mb-6">
            From Survival to Paradise
          </h2>
          
          <p className="text-xl text-stone-600 max-w-3xl mx-auto text-balance">
            Witness the 70-year transformation of Kepler-442b from barren wasteland to humanity's 
            most advanced sustainable civilization. Each phase tells a story of innovation, 
            community, and ecological harmony across the stars.
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {journeyStories.map((story, index) => (
            <motion.button
              key={story.id}
              onClick={() => setActiveStory(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeStory === index
                  ? 'bg-gradient-to-r from-green-400/20 to-blue-400/20 text-green-400 border-2 border-green-400/50'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300/80 border border-stone-300'
              }`}
            >
              <div className="text-sm">{story.title}</div>
              <div className="text-xs opacity-70">{story.subtitle.split('•')[1]}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Story Display */}
        <motion.div
          key={activeStory}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="aspect-[4/3] relative overflow-hidden rounded-3xl shadow-elevation-3">
              <div className={`absolute inset-0 bg-gradient-to-br ${journeyStories[activeStory].theme} opacity-20`} />
              <Image
                src={journeyStories[activeStory].image}
                alt={journeyStories[activeStory].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            
            {/* Timeline indicator */}
            <div className="absolute -bottom-4 left-6 right-6 h-2 bg-stone-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${((activeStory + 1) / journeyStories.length) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`h-full bg-gradient-to-r ${journeyStories[activeStory].theme} rounded-full`}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${journeyStories[activeStory].theme} text-white mb-4`}>
                {journeyStories[activeStory].subtitle}
              </div>
              
              <h3 className="text-h3 font-bold text-stone-900 mb-4">
                {journeyStories[activeStory].title}
              </h3>
              
              <p className="text-lg leading-relaxed text-stone-600 mb-8">
                {journeyStories[activeStory].description}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-stone-800 mb-4">Key Developments</h4>
              <div className="grid gap-3">
                {journeyStories[activeStory].details.map((detail, index) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${journeyStories[activeStory].theme} mt-2 flex-shrink-0`} />
                    <span className="text-stone-600 leading-relaxed">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 pt-6">
              <button
                onClick={() => setActiveStory(Math.max(0, activeStory - 1))}
                disabled={activeStory === 0}
                className="p-3 rounded-full glass-card disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <span className="text-sm text-stone-500 font-medium">
                {activeStory + 1} of {journeyStories.length}
              </span>
              
              <button
                onClick={() => setActiveStory(Math.min(journeyStories.length - 1, activeStory + 1))}
                disabled={activeStory === journeyStories.length - 1}
                className="p-3 rounded-full glass-card disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Auto-advance timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => setActiveStory((activeStory + 1) % journeyStories.length)}
            className="btn-secondary group"
          >
            <span>Continue Journey</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
