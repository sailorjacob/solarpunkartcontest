'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

interface Track {
  title: string;
  artist: string;
  duration: string;
  audioUrl?: string;
}

const radioStations = [
  {
    id: 1,
    name: 'Mars Ambient',
    description: 'Ethereal soundscapes from the red planet',
    genre: 'Ambient',
    color: 'from-mars-red to-mars-orange',
    frequency: '88.5',
    tracks: [
      { title: 'Dust Storm Meditation', artist: 'Solar Collective', duration: '5:42' },
      { title: 'Olympus Mons Sunrise', artist: 'Terra Dreams', duration: '7:18' },
      { title: 'Valles Marineris Echo', artist: 'Red Horizon', duration: '6:03' },
    ],
  },
  {
    id: 2,
    name: 'Solarpunk Beats',
    description: 'Uplifting electronic rhythms for a sustainable future',
    genre: 'Electronic',
    color: 'from-punk-green to-punk-mint',
    frequency: '92.3',
    tracks: [
      { title: 'Travel', artist: 'SolarPunk DJ', duration: '4:32', audioUrl: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/Travel.mp3' },
      { title: 'Green Revolution', artist: 'EcoBeats', duration: '4:15' },
      { title: 'Solar Powered', artist: 'Future Garden', duration: '3:48' },
      { title: 'Vertical Farm Groove', artist: 'Sustainable Sound', duration: '5:21' },
    ],
  },
  {
    id: 3,
    name: 'Terraform FM',
    description: 'Progressive sounds for planetary transformation',
    genre: 'Experimental',
    color: 'from-solar-gold to-solar-warm',
    frequency: '101.7',
    tracks: [
      { title: 'Terraform', artist: 'SolarPunk DJ', duration: '5:18', audioUrl: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/Terraform.mp3' },
      { title: 'Atmosphere Genesis', artist: 'Planet Builders', duration: '8:30' },
      { title: 'Ice Cap Melodies', artist: 'Climate Shift', duration: '6:45' },
      { title: 'First Rain', artist: 'New Eden', duration: '5:12' },
    ],
  },
  {
    id: 4,
    name: 'Colony Classics',
    description: 'Earth nostalgia meets Martian innovation',
    genre: 'Fusion',
    color: 'from-punk-sage to-punk-forest',
    frequency: '106.9',
    tracks: [
      { title: 'Earth Blues, Mars Views', artist: 'Interplanetary', duration: '4:33' },
      { title: 'Dome Sweet Dome', artist: 'Settlers Band', duration: '3:56' },
      { title: 'Red Planet Jazz', artist: 'Cosmic Quartet', duration: '7:02' },
    ],
  },
];

const djVideos = [
  'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/solarpunkdj.mp4',
  'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/solarpunkdj2.mp4'
];

export default function SolarRadio() {
  const [selectedStation, setSelectedStation] = useState(radioStations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(20).fill(0));
  const [currentDjVideo, setCurrentDjVideo] = useState(0);
  const audioRef = useRef<Howl | null>(null);
  const visualizerInterval = useRef<NodeJS.Timeout | null>(null);
  const djVideoInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.unload();
      }
      if (visualizerInterval.current) {
        clearInterval(visualizerInterval.current);
      }
      if (djVideoInterval.current) {
        clearInterval(djVideoInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    // Simulate visualizer when playing
    if (isPlaying) {
      visualizerInterval.current = setInterval(() => {
        setVisualizerData(
          new Array(20).fill(0).map(() => Math.random() * 100)
        );
      }, 100);
      
      // Start DJ video transitions when playing
      djVideoInterval.current = setInterval(() => {
        setCurrentDjVideo((prev) => (prev + 1) % djVideos.length);
      }, 8000); // Change video every 8 seconds
    } else {
      if (visualizerInterval.current) {
        clearInterval(visualizerInterval.current);
      }
      if (djVideoInterval.current) {
        clearInterval(djVideoInterval.current);
      }
      setVisualizerData(new Array(20).fill(0));
    }

    return () => {
      if (visualizerInterval.current) {
        clearInterval(visualizerInterval.current);
      }
      if (djVideoInterval.current) {
        clearInterval(djVideoInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const currentTrackData = selectedStation.tracks[currentTrack];
    
    if (!isPlaying) {
      // Start playing
      if (currentTrackData.audioUrl) {
        // Stop any existing audio
        if (audioRef.current) {
          audioRef.current.stop();
          audioRef.current.unload();
        }
        
        // Create new Howl instance for the track
        audioRef.current = new Howl({
          src: [currentTrackData.audioUrl],
          volume: volume / 100,
          onend: () => {
            setIsPlaying(false);
            nextTrack();
          },
          onloaderror: (id, error) => {
            console.error('Audio load error:', error);
            setIsPlaying(false);
          },
          onplayerror: (id, error) => {
            console.error('Audio play error:', error);
            setIsPlaying(false);
          }
        });
        
        audioRef.current.play();
      }
      setIsPlaying(true);
    } else {
      // Stop playing
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current.unload();
    }
    setIsPlaying(false);
    setCurrentTrack((prev) => (prev + 1) % selectedStation.tracks.length);
  };

  const prevTrack = () => {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current.unload();
    }
    setIsPlaying(false);
    setCurrentTrack((prev) => 
      prev === 0 ? selectedStation.tracks.length - 1 : prev - 1
    );
  };

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume(volume / 100);
    }
  }, [volume]);

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-solar-gold via-punk-green to-mars-orange text-gradient">
              SolarPunk Radio
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tune into the sounds of tomorrow's Mars
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Station Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 text-punk-green">Radio Stations</h3>
              <div className="space-y-3">
                {radioStations.map((station) => (
                  <motion.button
                    key={station.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.stop();
                        audioRef.current.unload();
                      }
                      setIsPlaying(false);
                      setSelectedStation(station);
                      setCurrentTrack(0);
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedStation.id === station.id
                        ? 'bg-gradient-to-r ' + station.color + ' text-black'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold">{station.name}</h4>
                        <p className={`text-xs mt-1 ${
                          selectedStation.id === station.id ? 'text-black/70' : 'text-gray-500'
                        }`}>
                          {station.genre} • FM {station.frequency}
                        </p>
                      </div>
                      {selectedStation.id === station.id && isPlaying && (
                        <div className="flex gap-1">
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [8, 16, 8] }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                              className="w-1 bg-black/50 rounded-full"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-8">
              {/* Station Info */}
              <div className="mb-8">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${selectedStation.color} text-black mb-4`}>
                  FM {selectedStation.frequency}
                </div>
                <h3 className="text-3xl font-bold mb-2">{selectedStation.name}</h3>
                <p className="text-gray-400">{selectedStation.description}</p>
              </div>

              {/* DJ Video Section */}
              <div className="mb-8">
                <div className="relative w-full h-64 rounded-xl overflow-hidden bg-black/20">
                  <AnimatePresence mode="wait">
                    <motion.video
                      key={currentDjVideo}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 1 }}
                      src={djVideos[currentDjVideo]}
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {/* Video overlay with station info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm font-medium opacity-90">
                          Live from Mars Studio
                        </p>
                        <p className="text-white/70 text-xs">
                          SolarPunk DJ • Now Playing
                        </p>
                      </div>
                      {isPlaying && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-white text-xs font-medium">LIVE</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visualizer */}
              <div className="mb-8 h-32 flex items-end justify-center gap-1">
                {visualizerData.map((height, index) => (
                  <motion.div
                    key={index}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.1 }}
                    className={`w-3 bg-gradient-to-t ${selectedStation.color} rounded-t-full`}
                    style={{ minHeight: '4px' }}
                  />
                ))}
              </div>

              {/* Current Track */}
              <div className="mb-8 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTrack}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-2xl font-bold mb-2">
                      {selectedStation.tracks[currentTrack].title}
                    </h4>
                    <p className="text-gray-400">
                      {selectedStation.tracks[currentTrack].artist}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {selectedStation.tracks[currentTrack].duration}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTrack}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20"
                >
                  <span className="text-xl">⏮</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r ${selectedStation.color} text-black`}
                >
                  <span className="text-2xl">{isPlaying ? '⏸' : '▶'}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTrack}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20"
                >
                  <span className="text-xl">⏭</span>
                </motion.button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-4">
                <span className="text-gray-400">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-gray-400 w-12 text-right">{volume}%</span>
              </div>

              {/* Track List */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-4">Up Next</h4>
                <div className="space-y-3">
                  {selectedStation.tracks.map((track, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                        index === currentTrack
                          ? 'bg-white/10'
                          : 'hover:bg-white/5'
                      }`}
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.stop();
                          audioRef.current.unload();
                        }
                        setIsPlaying(false);
                        setCurrentTrack(index);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 w-6">{index + 1}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{track.title}</p>
                            {track.audioUrl && (
                              <span className="text-xs bg-punk-green text-black px-2 py-1 rounded-full font-bold">
                                PLAYABLE
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{track.artist}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{track.duration}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Listeners', value: '2,847', icon: '👥' },
            { label: 'Stations', value: '4', icon: '📻' },
            { label: 'Total Tracks', value: '156', icon: '🎵' },
            { label: 'Live DJs', value: '3', icon: '🎧' },
          ].map((stat, index) => (
            <div key={index} className="glass rounded-xl p-6 text-center">
              <span className="text-3xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl font-bold text-punk-green">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
