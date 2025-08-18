'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const sections = [
  { id: 'process', label: 'Development Process' },
  { id: 'tools', label: 'Tools & Technology' },
];

export default function About() {
  const [activeSection, setActiveSection] = useState('process');

  return (
    <section className="bg-stone-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-stone-700 tracking-wide uppercase">
              PROJECT DOCUMENTATION
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-stone-800 mb-6">
            Building Sojourn
          </h1>
          
          <p className="text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
            The journey from concept to completion of an interstellar civilization
          </p>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-green-400/20 to-blue-400/20 text-green-400 border-2 border-green-400/50'
                  : 'bg-white text-stone-700 hover:bg-stone-100 shadow-lg border border-stone-200'
              }`}
            >
              <div className="text-sm">{section.label}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Content Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-16"
        >
          {activeSection === 'process' && (
            <>
              <h2 className="text-3xl font-bold text-stone-800 mb-8">The Development Process</h2>
          
          <div className="space-y-16">
            {/* Concept & Research */}
            <div className="space-y-6">
              <figure>
                <img 
                  src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/grokinitialprompt.png"
                  alt="Initial concept development"
                  className="w-full rounded-lg"
                />
                <figcaption className="text-sm text-stone-500 mt-3 italic">
                  Early concept development using Grok's research capabilities to explore terraforming possibilities
                </figcaption>
              </figure>
              <h3 className="text-xl font-bold text-stone-800">Concept & Research</h3>
              <p className="text-stone-600 leading-relaxed">
                Started with brainstorming a SolarPunk city concept, later evolved to Sojourn on Kepler-442b. 
                Used Perplexity for deep research into terraforming and sustainable city design.
              </p>
            </div>

            {/* Visual Asset Creation */}
            <div className="space-y-6">
              <figure>
                <img 
                  src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/first%20midjourney%20inspiration.png"
                  alt="Midjourney art generation"
                  className="w-full rounded-lg"
                />
                <figcaption className="text-sm text-stone-500 mt-3 italic">
                  First Midjourney experiments establishing the visual language for Sojourn's futuristic architecture
                </figcaption>
              </figure>
              <h3 className="text-xl font-bold text-stone-800">Visual Asset Creation</h3>
              <p className="text-stone-600 leading-relaxed">
                Generated stunning AI artwork with Midjourney to create the visual narrative backbone. 
                Multiple iterations and variations to capture the perfect aesthetic for each timeline phase.
              </p>
            </div>

            {/* Frontend Development */}
            <div className="space-y-6">
              <figure>
                <img 
                  src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/roughstart.png"
                  alt="Early development phase"
                  className="w-full rounded-lg"
                />
                <figcaption className="text-sm text-stone-500 mt-3 italic">
                  The rough beginning—basic layouts that would eventually evolve into the polished experience
                </figcaption>
              </figure>
              <h3 className="text-xl font-bold text-stone-800">Frontend Development</h3>
              <p className="text-stone-600 leading-relaxed">
                Built with Next.js 14, TypeScript, and Tailwind CSS. Started rough and iteratively 
                refined the design and functionality with Claude 4 Sonnet assistance.
              </p>
            </div>

            {/* Interactive Art Wall */}
            <div className="space-y-6">
              <figure>
                <img 
                  src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/grokspraypaintstep.png"
                  alt="Spraypaint tool development"
                  className="w-full rounded-lg"
                />
                <figcaption className="text-sm text-stone-500 mt-3 italic">
                  Developing the spraypaint mechanics—from basic mouse tracking to realistic spray patterns and neon glow
                </figcaption>
              </figure>
              <h3 className="text-xl font-bold text-stone-800">Interactive Art Wall</h3>
              <p className="text-stone-600 leading-relaxed">
                Developed the collaborative neon spraypaint tool with realistic physics and glow effects. 
                Multiple iterations to perfect the spray patterns and color intensity.
              </p>
            </div>
          </div>

                      </>
          )}
          
          {activeSection === 'tools' && (
            <>
              <h2 className="text-3xl font-bold text-stone-800">Tools & Technology</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-stone-800">AI Models</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Claude 4 Sonnet</li>
                  <li>• ChatGPT 5</li>
                  <li>• Grok 4 Web</li>
                  <li>• Perplexity Deep Research</li>
                  <li>• Midjourney</li>
                </ul>

                <h3 className="text-xl font-bold text-stone-800 mt-8">Creative Software</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Ableton Live</li>
                  <li>• Omnisphere</li>
                  <li>• BFD Drums</li>
                  <li>• Udio</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-stone-800">Tech Stack</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Next.js 14 with App Router</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Framer Motion</li>
                  <li>• HTML5 Canvas</li>
                  <li>• Howler.js</li>
                  <li>• Lucide React</li>
                </ul>

                <h3 className="text-xl font-bold text-stone-800 mt-8">Hardware</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• MacBook Pro 15" 2017</li>
                  <li>• RODE USB Microphone</li>
                  <li>• ATH-M50x Headphones</li>
                </ul>
                             </div>
             </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}