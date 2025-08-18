'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

interface Track {
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
}

const tracks: Track[] = [
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
];

const djVideos = [
  'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/solarpunkdj.mp4',
  'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/solarpunkdj2.mp4'
];

export default function SolarRadio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [currentDjVideo, setCurrentDjVideo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<Howl | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.unload();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // DJ video rotation when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentDjVideo((prev) => (prev + 1) % djVideos.length);
      }, 10000); // Change video every 10 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Progress tracking
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          const seek = audioRef.current.seek() as number;
          const duration = audioRef.current.duration() as number;
          setProgress((seek / duration) * 100);
        }
      }, 1000);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    const currentTrackData = tracks[currentTrack];
    
    if (!isPlaying) {
      // Stop any existing audio
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current.unload();
      }
      
      // Create new Howl instance for the track
      audioRef.current = new Howl({
        src: [currentTrackData.audioUrl],
        volume: volume / 100,
        onload: () => {
          setDuration(audioRef.current?.duration() as number);
        },
        onend: () => {
          setIsPlaying(false);
          setProgress(0);
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
      setIsPlaying(true);
    } else {
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
    setProgress(0);
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current.unload();
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTrack((prev) => prev === 0 ? tracks.length - 1 : prev - 1);
  };

  const selectTrack = (index: number) => {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current.unload();
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTrack(index);
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
      <div className="absolute inset-0 bg-gradient-to-br from-punk-green/5 via-transparent to-solar-gold/5" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
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
            Live from Mars Studio
          </p>
        </motion.div>

        {/* Main Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-3xl p-8 mb-8"
        >
          {/* DJ Video Section */}
          <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-8 bg-black/20">
            <div className="grid grid-cols-2 h-full gap-1">
              {djVideos.map((video, index) => (
                <div key={index} className="relative h-full overflow-hidden rounded-xl">
                  <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      isPlaying ? 'brightness-100' : 'brightness-75'
                    } ${
                      currentDjVideo === index && isPlaying ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  {/* Video overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-1000 ${
                    currentDjVideo === index && isPlaying ? 'opacity-60' : 'opacity-80'
                  }`} />
                </div>
              ))}
            </div>
            
            {/* Live indicator */}
            {isPlaying && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 rounded-full px-3 py-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">LIVE</span>
              </div>
            )}
            
            {/* Current track overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-2xl font-bold mb-1">{tracks[currentTrack].title}</h3>
              <p className="text-white/80 text-lg">{tracks[currentTrack].artist}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
              <span>{isPlaying && audioRef.current ? formatTime(audioRef.current.seek() as number) : '0:00'}</span>
              <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-punk-green to-solar-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span>{tracks[currentTrack].duration}</span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTrack}
              className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="text-2xl">⏮</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-punk-green to-solar-gold text-black flex items-center justify-center shadow-lg"
            >
              <span className="text-3xl">{isPlaying ? '⏸' : '▶'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTrack}
              className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="text-2xl">⏭</span>
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray-400 text-xl">🔊</span>
            <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
              />
            </div>
            <span className="text-gray-400 w-12 text-right">{volume}%</span>
          </div>

          {/* Track List */}
          <div className="space-y-3">
            {tracks.map((track, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                onClick={() => selectTrack(index)}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                  index === currentTrack
                    ? 'bg-gradient-to-r from-punk-green/20 to-solar-gold/20 border border-punk-green/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index === currentTrack && isPlaying
                      ? 'bg-gradient-to-r from-punk-green to-solar-gold text-black'
                      : 'bg-white/10'
                  }`}>
                    {index === currentTrack && isPlaying ? (
                      <span className="text-lg">♪</span>
                    ) : (
                      <span className="text-lg">▶</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{track.title}</h4>
                    <p className="text-gray-400">{track.artist}</p>
                  </div>
                </div>
                <span className="text-gray-400">{track.duration}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}