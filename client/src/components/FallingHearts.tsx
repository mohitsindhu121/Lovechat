import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Heart = ({ delay, duration, left, scale }: { delay: number; duration: number; left: number; scale: number }) => (
  <motion.div
    initial={{ y: -100, opacity: 0 }}
    animate={{ 
      y: "110vh", 
      opacity: [0, 1, 1, 0],
      rotate: [0, 45, -45, 0] 
    }}
    transition={{ 
      duration: duration, 
      repeat: Infinity, 
      delay: delay, 
      ease: "linear" 
    }}
    style={{
      position: "fixed",
      top: -20,
      left: `${left}%`,
      fontSize: `${scale * 20}px`,
      color: "rgba(225, 29, 72, 0.4)", // Primary red with opacity
      zIndex: 0,
      pointerEvents: "none",
    }}
  >
    ❤️
  </motion.div>
);

export function FallingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; delay: number; duration: number; left: number; scale: number }>>([]);

  useEffect(() => {
    // Generate static set of hearts to avoid hydration mismatch/re-renders
    const newHearts = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      left: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart key={heart.id} {...heart} />
      ))}
    </div>
  );
}
