'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

// Gallery showcasing various aspects of SolarPunk City
const galleryImages = [
  {
    id: 1,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/cityoverheadview.png',
    title: 'Metropolitan Marvel',
    description: 'Aerial view of the complete SolarPunk metropolis',
    prompt: 'Overhead view of sustainable Mars city, green architecture, solar panels, organized districts --v 6',
    category: 'urban'
  },
  {
    id: 2,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/lushcityview2.png',
    title: 'Ecological Paradise',
    description: 'Lush vegetation integrated with advanced technology',
    prompt: 'Futuristic Mars city with abundant greenery, clean technology, harmony between nature and urban development --v 6',
    category: 'nature'
  },
  {
    id: 3,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/greenhouse.png',
    title: 'Agricultural Revolution',
    description: 'Advanced greenhouse technology feeding the city',
    prompt: 'Massive greenhouse domes on Mars, vertical farming, sustainable agriculture, glass architecture --v 6',
    category: 'agriculture'
  },
  {
    id: 4,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/dwelling%20neighborhood.png',
    title: 'Community Living',
    description: 'Thoughtfully designed residential neighborhoods',
    prompt: 'Martian residential district, sustainable homes, community spaces, human-scale architecture --v 6',
    category: 'residential'
  },
  {
    id: 5,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/dwellingneighborhood2.png',
    title: 'Urban Integration',
    description: 'Seamless blend of public and private spaces',
    prompt: 'Mixed-use Mars neighborhood, integrated living spaces, walkable communities, green infrastructure --v 6',
    category: 'residential'
  },
  {
    id: 6,
    src: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/underground%20art%20museum%20entrance.png',
    title: 'Cultural Heritage',
    description: 'Underground spaces preserving art and culture',
    prompt: 'Underground art museum entrance on Mars, cultural preservation, modern gallery architecture --v 6',
    category: 'culture'
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [filter, setFilter] = useState('all');

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
            <span className="bg-gradient-to-r from-punk-green to-solar-gold text-gradient">
              Vision Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            AI-generated glimpses of sustainable life on the Red Planet
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {['all', 'architecture', 'nature', 'technology', 'community'].map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-punk-green to-solar-gold text-black font-semibold'
                  : 'glass hover:bg-white/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage(image)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl glass">
                <div className="aspect-[4/3] bg-gradient-to-br from-mars-orange/20 to-punk-green/20">
                  {/* Replace with actual images */}
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    🌆
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-300">{image.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="glass px-3 py-1 rounded-full text-xs">
                    View Details
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full glass rounded-2xl p-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-[4/3] bg-gradient-to-br from-mars-orange/20 to-punk-green/20 rounded-xl flex items-center justify-center text-9xl">
                  🌆
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-punk-green to-solar-gold text-gradient">
                    {selectedImage.title}
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    {selectedImage.description}
                  </p>
                  <div className="glass rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-400 mb-2">Midjourney Prompt:</p>
                    <code className="text-xs text-punk-green">
                      {selectedImage.prompt}
                    </code>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gradient-to-r from-punk-green to-solar-gold text-black font-semibold rounded-full"
                    >
                      Download
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(null)}
                      className="px-6 py-2 glass rounded-full hover:bg-white/20"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
