import { motion } from "framer-motion";

export function BackgroundMusic() {
  const spotifyTrackId = "2afuRCRz0x0ToWdMhObkmp";
  const embedUrl = `https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-rose-500/50 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden">
          <iframe
            src={embedUrl}
            width="300"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
            title="Spotify Background Music"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
}
