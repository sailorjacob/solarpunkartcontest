'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const processSteps = [
  {
    id: 1,
    title: 'Conceptualization',
    description: 'Initial vision and mood board creation',
    screenshots: [
      { id: 1, prompt: 'Solarpunk city on Mars, aerial view', iterations: 4 },
      { id: 2, prompt: 'Sustainable architecture, red planet', iterations: 6 },
    ],
    color: 'from-mars-orange to-mars-red',
  },
  {
    id: 2,
    title: 'Architecture Design',
    description: 'Developing sustainable building concepts',
    screenshots: [
      { id: 3, prompt: 'Geodesic domes with solar panels on Mars', iterations: 8 },
      { id: 4, prompt: 'Vertical farms in Martian greenhouse', iterations: 5 },
    ],
    color: 'from-punk-green to-punk-forest',
  },
  {
    id: 3,
    title: 'Environment Creation',
    description: 'Terraforming and ecosystem design',
    screenshots: [
      { id: 5, prompt: 'Terraformed Mars landscape with water', iterations: 7 },
      { id: 6, prompt: 'Martian gardens with Earth plants', iterations: 9 },
    ],
    color: 'from-solar-gold to-solar-warm',
  },
  {
    id: 4,
    title: 'Community Spaces',
    description: 'Social and cultural hub designs',
    screenshots: [
      { id: 7, prompt: 'Public plaza on Mars, solarpunk aesthetic', iterations: 6 },
      { id: 8, prompt: 'Art gallery in Martian colony', iterations: 4 },
    ],
    color: 'from-punk-mint to-punk-sage',
  },
];

export default function Process() {
  const [selectedStep, setSelectedStep] = useState(processSteps[0]);
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-mars-orange to-punk-green text-gradient">
              Creative Process
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Behind the scenes: From prompts to paradise
          </p>
          
          {/* View Mode Toggle */}
          <div className="inline-flex gap-2 p-1 glass rounded-full">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                viewMode === 'timeline'
                  ? 'bg-gradient-to-r from-punk-green to-solar-gold text-black font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-punk-green to-solar-gold text-black font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              Grid View
            </button>
          </div>
        </motion.div>

        {viewMode === 'timeline' ? (
          /* Timeline View */
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-punk-green via-solar-gold to-mars-orange rounded-full" />
            
            {/* Timeline Steps */}
            <div className="space-y-20">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass rounded-2xl p-6 cursor-pointer"
                      onClick={() => setSelectedStep(step)}
                    >
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${step.color} text-black mb-4`}>
                        Step {step.id}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-400 mb-4">{step.description}</p>
                      
                      {/* Screenshot Preview Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {step.screenshots.map((screenshot) => (
                          <div
                            key={screenshot.id}
                            className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden group"
                          >
                            <div className="w-full h-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                              🖼️
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {step.screenshots.reduce((acc, s) => acc + s.iterations, 0)} iterations
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-punk-green text-sm font-semibold"
                        >
                          View Details →
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl font-bold text-black shadow-lg`}
                    >
                      {step.id}
                    </motion.div>
                  </div>
                  
                  {/* Spacer for opposite side */}
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedStep(step)}
                className="glass rounded-2xl p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${step.color} text-black mb-2`}>
                      Step {step.id}
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-lg font-bold text-black`}>
                    {step.id}
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">{step.description}</p>
                
                {/* Screenshot Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {step.screenshots.map((screenshot) => (
                    <div
                      key={screenshot.id}
                      className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden"
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-2">
                        <span className="text-3xl mb-1">🖼️</span>
                        <span className="text-xs text-gray-500">{screenshot.iterations} iter</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Total: {step.screenshots.reduce((acc, s) => acc + s.iterations, 0)} iterations
                  </span>
                  <span className="text-punk-green text-sm font-semibold group-hover:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedStep(processSteps[0])}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full glass rounded-2xl p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="mb-6">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${selectedStep.color} text-black mb-4`}>
                  Step {selectedStep.id}
                </div>
                <h3 className="text-4xl font-bold mb-2">{selectedStep.title}</h3>
                <p className="text-xl text-gray-400">{selectedStep.description}</p>
              </div>
              
              <div className="space-y-6">
                {selectedStep.screenshots.map((screenshot) => (
                  <div key={screenshot.id} className="glass rounded-xl p-4">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center text-9xl">
                      🖼️
                    </div>
                    <div className="flex items-center justify-between">
                      <code className="text-sm text-punk-green">{screenshot.prompt}</code>
                      <span className="text-sm text-gray-500">{screenshot.iterations} iterations</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
