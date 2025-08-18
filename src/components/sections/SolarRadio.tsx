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
    name: 'SolarPunk Live',
    description: 'Live electronic music from Mars',
    genre: 'Electronic',
    color: 'from-punk-green to-punk-mint',
    frequency: '108.5',
    tracks: [
      { 
        title: 'Travel', 
        artist: 'SolarPunk DJ', 
        duration: '4:17', 
        audioUrl: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/Travel.mp3' 
      },
      { 
        title: 'Terraform', 
        artist: 'SolarPunk DJ', 
        duration: '3:52', 
        audioUrl: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/Terraform.mp3' 
      },
    ],
  },
];

const djVideos = [
  'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/solarpunkdj.mp4',
  'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/solarpunkdj2.mp4'
];

const undergroundMallVideo = 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/undergroundmalltimelapse.mp4';

export default function SolarRadio() {
  const [selectedStation, setSelectedStation] = useState(radioStations[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(20).fill(0));
  const [currentDjVideo, setCurrentDjVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<Howl | null>(null);
  const visualizerInterval = useRef<NodeJS.Timeout | null>(null);
  const djVideoInterval = useRef<NodeJS.Timeout | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

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
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    // Simulate visualizer and DJ video transitions when playing
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

      // Progress tracking
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          const seek = audioRef.current.seek() as number;
          const duration = audioRef.current.duration() as number;
          if (duration > 0) {
            setProgress((seek / duration) * 100);
          }
        }
      }, 1000);
    } else {
      if (visualizerInterval.current) {
        clearInterval(visualizerInterval.current);
      }
      if (djVideoInterval.current) {
        clearInterval(djVideoInterval.current);
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setVisualizerData(new Array(20).fill(0));
      setProgress(0);
    }

    return () => {
      if (visualizerInterval.current) {
        clearInterval(visualizerInterval.current);
      }
      if (djVideoInterval.current) {
        clearInterval(djVideoInterval.current);
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const currentTrackData = selectedStation.tracks[currentTrack];
    
    if (!isPlaying) {
      // Start playing
      if ((currentTrackData as any).audioUrl) {
        // Stop any existing audio
        if (audioRef.current) {
          audioRef.current.stop();
          audioRef.current.unload();
        }
        
        // Create new Howl instance for the track
        audioRef.current = new Howl({
          src: [(currentTrackData as any).audioUrl],
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      
      {/* Underground Mall Video - Corner Feature */}
      <div className="absolute bottom-8 right-8 w-96 h-64 rounded-xl overflow-hidden border border-punk-green/30 shadow-2xl">
        <video
          src={undergroundMallVideo}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <p className="text-white text-sm font-medium">Underground Mall</p>
          <p className="text-white/70 text-xs">Live Event Venue</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
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
            Live from Underground Mall
          </p>
        </motion.div>

        {/* Main Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-8">

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
                          SolarPunk DJ
                        </p>
                        <p className="text-white/70 text-xs">
                          Live Performance
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
                    <p className="text-gray-300">
                      {selectedStation.tracks[currentTrack].artist}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {selectedStation.tracks[currentTrack].duration}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Bar */}
              {(selectedStation.tracks[currentTrack] as any).audioUrl && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                    <span>{isPlaying && audioRef.current ? formatTime(audioRef.current.seek() as number) : '0:00'}</span>
                    <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${selectedStation.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <span>{selectedStation.tracks[currentTrack].duration}</span>
                  </div>
                </div>
              )}

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
                <span className="text-gray-400 font-semibold">VOL</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 range-slider"
                />
                <span className="text-gray-400 w-12 text-right">{volume}%</span>
              </div>

              {/* Track List */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-4">Tracks</h4>
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
                          <p className="font-semibold">{track.title}</p>
                          <p className="text-sm text-gray-400">{track.artist}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{track.duration}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}