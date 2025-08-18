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
          
          <p className="text-stone-600 mb-4">
            The project began with many creative possibilities - a golden plated statue, film photography, music. 
            I wanted to visualize life on Mars and thought it would be cool to create a futuristic billboard on a green, 
            terraformed Mars. Started by using Midjourney to generate initial concepts and built an entire world from there.
          </p>
          
          <p className="text-stone-600 mb-8">
            <em>Sojourn means a temporary stay, which we humans are in this universe, very temporary. 
            Pixels are the new canvas, keystrokes are the new brush.</em>
          </p>

          {/* Initial Concept */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Initial Concept & Research</h2>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/billboard%20on%20mars%20concept.png"
            alt="Billboard on Mars concept"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            The original Mars billboard concept - visualizing futuristic advertising on a terraformed planet
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/grokinitialprompt.png"
            alt="Initial concept development"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Early brainstorming with Grok for terraforming research and initial project scope
          </p>
          


          {/* Visual Development */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Visual Asset Creation</h2>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/first%20midjourney%20inspiration.png"
            alt="Midjourney art generation"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            First Midjourney experiments establishing the visual language for a terraformed Mars
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/midjourney%20prompting.png"
            alt="Midjourney prompting process"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Iterative prompting process to refine the aesthetic and build a cohesive world
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/using%20midjourney%20variation.png"
            alt="Midjourney variations"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Using Midjourney variations to explore different artistic interpretations
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/structure%20variations%20midjourney.png"
            alt="Structure variations in Midjourney"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Exploring architectural structure variations for the Mars city concept
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/dwelling%20prompt.png"
            alt="Dwelling prompting"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Developing residential dwelling concepts and community living spaces
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/editing%20midjourney%20generation.png"
            alt="Editing Midjourney generations"
            className="w-full mb-6"
          />
          <p className="text-sm text-stone-500 mb-6">
            Post-processing and editing Midjourney generations for the final gallery
          </p>

          {/* Art Gallery & Underground Concepts */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Art Gallery & Underground Spaces</h2>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/trying%20to%20generate%20an%20art%20gallery%20wall.png"
            alt="Art gallery wall generation"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Attempting to generate an art gallery wall concept for the interactive painting feature
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/modern%20art%20entrance%20inside%20midjourney.png"
            alt="Modern art entrance concept"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Modern art entrance concept for underground cultural spaces
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/underground%20mall.png"
            alt="Underground mall concept"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Underground mall and community space design exploration
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/underground%20mall%20scene%20video%20looping%20selection.png"
            alt="Underground mall video scene"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Video looping selection for dynamic underground mall scenes
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/random%20wall%20in%20planet%20.png"
            alt="Random wall on planet"
            className="w-full mb-6"
          />
          <p className="text-sm text-stone-500 mb-6">
            Exploring random wall structures and surfaces for the interactive art component
          </p>

          {/* Development Process */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Frontend Development</h2>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/roughstart.png"
            alt="Early development phase"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Early rough layouts and basic structure - the humble beginnings
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/textedit.png"
            alt="Text editing and development"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Text editing and code development process - refining the interactive features
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/testingspray1%20black%20paint%20failure.png"
            alt="Spraypaint testing failures"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Testing spray paint functionality - many failed attempts before success
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/testingspray2,%20blue%20is%20too%20light.png"
            alt="Blue spray paint too light"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Color testing - discovering that blue spray paint was too light for visibility
          </p>

          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/grokspraypaintstep.png"
            alt="Spraypaint tool development"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Working on spray paint mechanics with AI assistance to achieve realistic effects
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/grokspraypaintstep2.png"
            alt="Advanced spraypaint development"
            className="w-full mb-3"
          />
          <p className="text-sm text-stone-500 mb-4">
            Further development of spray paint mechanics with advanced particle effects
          </p>
          
          <img 
            src="https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/process%20documentation/groksprayappaftertextedit.png"
            alt="Spray app after text editing"
            className="w-full mb-6"
          />
          <p className="text-sm text-stone-500 mb-6">
            Final spray paint application after text editing and code refinements
          </p>

          {/* Tools Used */}
          <h2 className="text-xl font-semibold text-stone-800 mt-8 mb-4">Tools Used</h2>
          <p className="text-stone-600 mb-4">AI Models: Claude 4 Sonnet, ChatGPT 5, Grok 4 Web, Midjourney, Udio</p>
          <p className="text-stone-600 mb-4">Hardware: MacBook Pro 15" 2017, RODE USB Microphone, ATH-M50x Headphones</p>
          <p className="text-stone-600 mb-4">Creative Software: Ableton Live, Omnisphere, BFD Drums, Udio</p>
          <p className="text-stone-600 mb-4">Tech Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, HTML5 Canvas, Howler.js, Lucide React</p>
          <p className="text-stone-600">Other: GitHub, Vercel, AirDrop, Chrome DevTools</p>
        </div>
      </div>
    </section>
  );
}