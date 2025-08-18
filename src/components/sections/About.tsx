'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TimelineStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  tools: string[];
  screenshot?: string;
  duration: string;
}

const projectTimeline: TimelineStep[] = [
  {
    id: 'concept',
    phase: 'Phase 1',
    title: 'Concept & Vision',
    description: 'Initial brainstorming and conceptualization of a SolarPunk city on Mars, later evolved to Sojourn on Kepler-442b. Defined the core vision of sustainable interstellar civilization.',
    tools: ['Claude 4 Sonnet', 'ChatGPT 5', 'Perplexity Deep Research'],
    duration: 'Day 1',
  },
  {
    id: 'research',
    phase: 'Phase 2', 
    title: 'Research & Planning',
    description: 'Deep research into terraforming, sustainable city design, and exoplanet habitability. Explored technical requirements and aesthetic direction.',
    tools: ['Perplexity Deep Research', 'Grok 4 Web', 'Grok 4'],
    duration: 'Day 1-2',
  },
  {
    id: 'visual-design',
    phase: 'Phase 3',
    title: 'Visual Asset Creation',
    description: 'Generated stunning AI artwork depicting the evolution of Sojourn from early settlement to ecological paradise. Created the visual narrative backbone.',
    tools: ['Midjourney', 'MacBook Pro 15" 2017', 'AirDrop'],
    duration: 'Day 2-3',
  },
  {
    id: 'frontend-foundation',
    phase: 'Phase 4',
    title: 'Frontend Foundation',
    description: 'Built the core Next.js application with TypeScript, Tailwind CSS, and Framer Motion. Established the component architecture and design system.',
    tools: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Claude 4 Sonnet'],
    duration: 'Day 3-4',
  },
  {
    id: 'interactive-features',
    phase: 'Phase 5',
    title: 'Interactive Features',
    description: 'Developed the collaborative art wall with advanced neon spraypaint effects, real-time canvas rendering, and physics-based drip systems.',
    tools: ['HTML5 Canvas', 'Framer Motion', 'Custom Physics Engine'],
    duration: 'Day 4-5',
  },
  {
    id: 'audio-experience',
    phase: 'Phase 6',
    title: 'Audio Experience',
    description: 'Composed and integrated atmospheric soundscapes for Sojourn Radio. Created immersive audio that enhances the interstellar civilization theme.',
    tools: ['RODE USB Microphone', 'ATH-M50x Headphones', 'Ableton Live', 'Omnisphere', 'BFD Drums', 'Udio'],
    duration: 'Day 5-6',
  },
  {
    id: 'refinement',
    phase: 'Phase 7',
    title: 'Design Refinement',
    description: 'Polished the industrial aesthetic, fixed UI/UX issues, optimized performance, and ensured responsive design across all devices.',
    tools: ['Claude 4 Sonnet', 'Chrome DevTools', 'Tailwind CSS'],
    duration: 'Day 6-7',
  },
  {
    id: 'rebranding',
    phase: 'Phase 8',
    title: 'Rebranding to Sojourn',
    description: 'Complete transformation from Mars-based SolarPunk City to Kepler-442b-based Sojourn, elevating the concept to interstellar colonization.',
    tools: ['Claude 4 Sonnet', 'Git Version Control'],
    duration: 'Day 7',
  },
  {
    id: 'deployment',
    phase: 'Phase 9',
    title: 'Deployment & Launch',
    description: 'Final optimization, GitHub repository setup, and deployment to Vercel for public access. Ready for the art contest submission.',
    tools: ['GitHub', 'Vercel', 'Git'],
    duration: 'Day 7',
  }
];

const tools = {
  'AI Models': [
    { name: 'Claude 4 Sonnet', role: 'Primary development assistant, code generation, problem solving' },
    { name: 'ChatGPT 5', role: 'Conceptual brainstorming, content generation' },
    { name: 'Grok 4 Web', role: 'Real-time research and web information gathering' },
    { name: 'Perplexity Deep Research', role: 'Technical research and fact-checking' },
    { name: 'Grok 4', role: 'Additional AI assistance and creative input' },
  ],
  'Hardware': [
    { name: 'MacBook Pro 15" 2017', role: 'Primary development machine' },
    { name: 'RODE USB Microphone', role: 'Audio recording and capture' },
    { name: 'ATH-M50x Headphones', role: 'Audio monitoring and mixing' },
    { name: 'AirDrop', role: 'Asset transfer and file sharing' },
  ],
  'Creative Software': [
    { name: 'Midjourney', role: 'AI-generated visual assets and concept art' },
    { name: 'Ableton Live', role: 'Digital audio workstation for music production' },
    { name: 'Omnisphere', role: 'Advanced synthesizer for atmospheric sounds' },
    { name: 'BFD Drums', role: 'Realistic drum sounds and rhythms' },
    { name: 'Udio', role: 'AI-assisted music generation' },
  ],
  'Development Stack': [
    { name: 'Next.js 14 with App Router', role: 'React framework for production' },
    { name: 'TypeScript', role: 'Type-safe JavaScript development' },
    { name: 'Tailwind CSS', role: 'Utility-first CSS framework' },
    { name: 'Framer Motion', role: 'Smooth animations and transitions' },
    { name: 'HTML5 Canvas', role: 'High-performance graphics rendering' },
    { name: 'Howler.js', role: 'Audio playback and management' },
    { name: 'Lucide React', role: 'Icon system and UI elements' },
  ],
  'Deployment & Tools': [
    { name: 'GitHub', role: 'Version control and repository hosting' },
    { name: 'Vercel', role: 'Production deployment and hosting' },
    { name: 'Git', role: 'Version control system' },
    { name: 'Chrome DevTools', role: 'Debugging and performance optimization' },
  ],
};

export default function About() {
  const [activeToolCategory, setActiveToolCategory] = useState('AI Models');

  return (
    <section className="min-h-screen bg-stone-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-stone-700 tracking-wide uppercase">
              PROJECT DOCUMENTATION
            </span>
          </div>
          
          <h1 className="text-6xl font-bold text-stone-800 mb-6">
            Building Sojourn
          </h1>
          
          <p className="text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed">
            A comprehensive breakdown of the journey from concept to completion. 
            Explore the 9-phase development process, tools, and technologies that brought 
            this interstellar civilization to life.
          </p>
        </motion.div>

        {/* Project Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-stone-800 text-center mb-16">
            Development Timeline
          </h2>

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-400 to-blue-400 h-full hidden md:block" />

            {projectTimeline.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center mb-16 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="md:w-1/2 p-6">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-stone-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs font-bold rounded-full">
                        {step.phase}
                      </div>
                      <span className="text-sm text-stone-500 font-mono">
                        {step.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-stone-800 mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-stone-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 bg-stone-100 text-stone-700 text-sm rounded-lg"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden md:flex md:w-0 justify-center relative z-10">
                  <div className="w-6 h-6 bg-white border-4 border-green-400 rounded-full shadow-lg" />
                </div>

                {/* Screenshot Placeholder */}
                <div className="md:w-1/2 p-6">
                  <div className="aspect-video bg-gradient-to-br from-stone-200 to-stone-300 rounded-2xl border border-stone-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-stone-400 rounded-lg mb-3 mx-auto opacity-50" />
                      <p className="text-stone-500 text-sm">
                        Screenshot placeholder for<br />
                        <strong>{step.title}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-stone-800 text-center mb-16">
            Tools & Technologies
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.keys(tools).map((category) => (
              <button
                key={category}
                onClick={() => setActiveToolCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeToolCategory === category
                    ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white shadow-lg'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <motion.div
            key={activeToolCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tools[activeToolCategory as keyof typeof tools].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-stone-200 hover:shadow-xl transition-shadow"
              >
                <h4 className="text-lg font-bold text-stone-800 mb-2">
                  {tool.name}
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {tool.role}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Musical Composition Details */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-stone-800 text-center mb-16">
            Musical Composition
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-stone-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">
                  Sojourn Radio Soundscapes
                </h3>
                <p className="text-stone-600 leading-relaxed mb-6">
                  Created atmospheric audio experiences that transport listeners to the 
                  terraformed world of Kepler-442b. Each track captures the essence of 
                  sustainable civilization among the stars.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-stone-700"><strong>Key:</strong> G Major</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-stone-700"><strong>Style:</strong> Atmospheric Synthwave</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="text-stone-700"><strong>Mood:</strong> Hopeful & Contemplative</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-stone-50 rounded-xl">
                  <h4 className="font-bold text-stone-800 mb-2">Audio Setup</h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    <li>• RODE USB Microphone for pristine capture</li>
                    <li>• ATH-M50x headphones for accurate monitoring</li>
                    <li>• Professional studio-grade recording chain</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-stone-50 rounded-xl">
                  <h4 className="font-bold text-stone-800 mb-2">Production Tools</h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    <li>• Ableton Live for arrangement and mixing</li>
                    <li>• Omnisphere for lush pad sounds</li>
                    <li>• BFD Drums for organic rhythmic elements</li>
                    <li>• Udio AI for creative sound generation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-stone-800 mb-12">
            Project by the Numbers
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'Development Days', value: '7', color: 'from-green-400 to-green-500' },
              { label: 'AI Models Used', value: '5', color: 'from-blue-400 to-blue-500' },
              { label: 'Components Built', value: '15+', color: 'from-purple-400 to-purple-500' },
              { label: 'Git Commits', value: '25+', color: 'from-orange-400 to-orange-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 shadow-lg border border-stone-200">
                <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-stone-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
