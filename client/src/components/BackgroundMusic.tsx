import { useState, useRef, useEffect } from "react";
import { Volume2, Volume1, VolumeX, Music } from "lucide-react";
import { motion } from "framer-motion";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Auto-play on load with user interaction
    const playAudio = () => {
      audio.play().catch(() => {
        // Autoplay is blocked until user interaction
      });
    };

    const handleUserInteraction = () => {
      playAudio();
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-4 h-4" />;
    if (volume < 0.5) return <Volume1 className="w-4 h-4" />;
    return <Volume2 className="w-4 h-4" />;
  };

  return (
    <>
      {/* Hidden Audio Element - Using royalty-free romantic music */}
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* Floating Music Player */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.div
          layout
          className="bg-gradient-to-br from-primary/90 to-rose-500/90 backdrop-blur-md rounded-full shadow-lg shadow-primary/40 border border-white/20 flex items-center gap-2 px-2 py-2"
        >
          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayPause}
            className="text-white hover:text-rose-100 transition-colors p-2 hover:bg-white/10 rounded-full"
            title={isPlaying ? "Pause music" : "Play music"}
            data-testid="button-music-toggle"
          >
            {isPlaying ? (
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          {/* Music Icon with beat animation */}
          <motion.div
            animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
            transition={isPlaying ? { duration: 0.6, repeat: Infinity } : {}}
            className="text-white"
          >
            <Music className="w-4 h-4" />
          </motion.div>

          {/* Volume Control */}
          <motion.div
            animate={{ width: isExpanded ? 120 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex items-center gap-1"
          >
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
              className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) ${
                  volume * 100
                }%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`
              }}
            />
          </motion.div>

          {/* Volume Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-white hover:text-rose-100 transition-colors p-2 hover:bg-white/10 rounded-full"
            title="Volume control"
            data-testid="button-volume-toggle"
          >
            {getVolumeIcon()}
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}
