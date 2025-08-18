'use client';

import { motion } from 'framer-motion';

interface AboutProps {
  onBack: () => void;
}

export default function About({ onBack }: AboutProps) {
  return (
    <section className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sojourn
        </motion.button>

        {/* Simple Blog Content */}
        <div className="prose prose-lg max-w-none">
          <h1 className="text-2xl font-bold text-stone-800 mb-6">Development Notes</h1>
          
          <p className="text-stone-600 mb-8">
            Quick documentation of the development process for this project. Started as a SolarPunk city concept, 
            evolved into Sojourn on Kepler-442b through various iterations.
          </p>

          {/* Concept & Research */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Initial Research</h2>
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/grokinitialprompt.png"
            alt="Initial concept development"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Early brainstorming with Grok for terraforming research
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/Perplexity%20deep%20research.png"
            alt="Perplexity research"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-6">
            Used Perplexity for deep research into sustainable city design
          </p>

          {/* Visual Development */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Visual Asset Creation</h2>
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/first%20midjourney%20inspiration.png"
            alt="Midjourney art generation"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            First Midjourney experiments for visual language
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/midjourney%20prompting.png"
            alt="Midjourney prompting process"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-6">
            Iterative prompting process to refine the aesthetic
          </p>

          {/* Development Process */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Frontend Development</h2>
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/roughstart.png"
            alt="Early development phase"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Early rough layouts and basic structure
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/testingspray1%20black%20paint%20failure.png"
            alt="Spraypaint testing failures"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-6">
            Testing spray paint functionality - lots of failed attempts
          </p>

          {/* Interactive Features */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Interactive Features</h2>
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/grokspraypaintstep.png"
            alt="Spraypaint tool development"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-6">
            Working on spray paint mechanics with Grok assistance
          </p>

          {/* Tools Used */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Tools Used</h2>
          <p className="text-stone-600 mb-4">AI Models: Claude 4 Sonnet, ChatGPT 5, Grok 4 Web, Perplexity Deep Research, Midjourney, Udio</p>
          <p className="text-stone-600 mb-4">Hardware: MacBook Pro 15" 2017, RODE USB Microphone, ATH-M50x Headphones</p>
          <p className="text-stone-600 mb-4">Creative Software: Ableton Live, Omnisphere, BFD Drums, Udio</p>
          <p className="text-stone-600 mb-4">Tech Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, HTML5 Canvas, Howler.js, Lucide React</p>
          <p className="text-stone-600">Other: GitHub, Vercel, AirDrop, Chrome DevTools</p>
        </div>
      </div>
    </section>
  );
}