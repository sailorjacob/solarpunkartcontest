'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

const undergroundMallVideo = 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/extra%20vision/undergroundmalltimelapse.mp4';

// Audio tracks from SolarRadio
const tracks = [
  { 
    title: 'Travel', 
    artist: 'SolarPunk DJ', 
    duration: '2:43', 
    audioUrl: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/Travel.mp3' 
  },
  { 
    title: 'Terraform', 
    artist: 'SolarPunk DJ', 
    duration: '2:10', 
    audioUrl: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/Terraform.mp3' 
  },
];

export default function UndergroundMallPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    if (isPlaying) {
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
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setProgress(0);
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
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current.unload();
    }
    setIsPlaying(false);
    setCurrentTrack((prev) => 
      prev === 0 ? tracks.length - 1 : prev - 1
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Fullscreen Video */}
      <video
        src={undergroundMallVideo}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-50 bg-black/70 hover:bg-black/90 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm"
      >
        ← Back to Radio
      </motion.button>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40"
      >
        <h1 className="text-white text-2xl font-bold text-center">
          Underground Mall
        </h1>
        <p className="text-white/80 text-center">Live Event Venue</p>
      </motion.div>

      {/* Audio Player Controls - Bottom Center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-6 w-96">
          {/* LIVE Indicator */}
          {isPlaying && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-sm font-bold">LIVE</span>
            </div>
          )}

          {/* Current Track Info */}
          <div className="text-center mb-4">
            <h3 className="text-white text-lg font-bold">
              {tracks[currentTrack].title}
            </h3>
            <p className="text-white/70 text-sm">
              {tracks[currentTrack].artist}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-3 text-xs text-white/70 mb-2">
              <span className="w-10 text-center">
                {isPlaying && audioRef.current ? formatTime(audioRef.current.seek() as number) : '0:00'}
              </span>
              <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-punk-green to-punk-mint"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="w-10 text-center">{tracks[currentTrack].duration}</span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTrack}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <span className="text-white text-lg">⏮</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-punk-green to-punk-mint text-white flex items-center justify-center shadow-lg"
            >
              <span className="text-xl">{isPlaying ? '⏸' : '▶'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTrack}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <span className="text-white text-lg">⏭</span>
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <span className="text-white/70 text-xs font-semibold">VOL</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer volume-slider"
            />
            <span className="text-white/70 text-xs w-8 text-right">{volume}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
