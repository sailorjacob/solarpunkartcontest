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
        duration: '2:43', 
        audioUrl: 'https://twejikjgxkzmphocbvpt.supabase.co/storage/v1/object/public/solarpunkcity/solarpunkradio/Travel.mp3' 
      },
      { 
        title: 'Terraform', 
        artist: 'SolarPunk DJ', 
        duration: '2:10', 
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative mt-8">
      {/* Underground Mall Video - Corner Feature */}
      <div className="absolute top-8 right-8 w-80 h-48 rounded-xl overflow-hidden border border-punk-green/30 shadow-lg">
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
      
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-3 text-left">
            <span className="bg-gradient-to-r from-solar-gold via-punk-green to-mars-orange text-gradient">
              SolarPunk Radio
            </span>
          </h2>
          <p className="text-gray-600 text-left text-lg">
            Live from Underground Mall
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Song Selection */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-8 text-punk-green text-left">Select Track</h3>
            <div className="space-y-4">
              {selectedStation.tracks.map((track, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.stop();
                      audioRef.current.unload();
                    }
                    setIsPlaying(false);
                    setCurrentTrack(index);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    index === currentTrack
                      ? 'bg-gradient-to-r from-punk-green to-punk-mint text-black'
                      : 'hover:bg-white/10 border border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{track.title}</h4>
                      <p className={`text-sm ${
                        index === currentTrack ? 'text-black/70' : 'text-gray-500'
                      }`}>
                        {track.artist} • {track.duration}
                      </p>
                    </div>
                    {index === currentTrack && isPlaying && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-xs font-medium">LIVE</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - DJ Video and Controls */}
          <div className="glass rounded-2xl p-8">
            {/* DJ Video */}
            <div className="mb-8">
              <div className="relative w-full h-80 rounded-xl overflow-hidden">
                <video
                  src={djVideos[currentDjVideo]}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
                {/* LIVE indicator in top right */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-bold">LIVE</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-lg font-bold">
                    {selectedStation.tracks[currentTrack]?.title}
                  </p>
                  <p className="text-white/80 text-sm">
                    {selectedStation.tracks[currentTrack]?.artist}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Track Info */}
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold mb-2">
                {selectedStation.tracks[currentTrack].title}
              </h4>
              <p className="text-gray-500 text-lg">
                {selectedStation.tracks[currentTrack].artist}
              </p>
            </div>

            {/* Progress Bar */}
            {(selectedStation.tracks[currentTrack] as any).audioUrl && (
              <div className="mb-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <span className="w-12 text-center">{isPlaying && audioRef.current ? formatTime(audioRef.current.seek() as number) : '0:00'}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-punk-green to-punk-mint"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <span className="w-12 text-center">{selectedStation.tracks[currentTrack].duration}</span>
                </div>
              </div>
            )}

            {/* Player Controls */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTrack}
                className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <span className="text-xl text-gray-700">⏮</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-punk-green to-punk-mint text-white flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl">{isPlaying ? '⏸' : '▶'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTrack}
                className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <span className="text-xl text-gray-700">⏭</span>
              </motion.button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-4">
              <span className="text-gray-500 font-semibold text-sm">VOLUME</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer volume-slider"
              />
              <span className="text-gray-500 w-12 text-right text-sm">{volume}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}