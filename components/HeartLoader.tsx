
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const HeartLoader: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(10);
  const [isBursting, setIsBursting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsBursting(true), 500);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return prev + Math.random() * 1.5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center z-10">
      <AnimatePresence>
        {!isBursting ? (
          <motion.div
            key="loader"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1 + (progress / 200),
              transition: { duration: 0.2 }
            }}
            exit={{ scale: 2, opacity: 0 }}
            className="relative"
          >
            {/* Pulsing Heart */}
            <motion.svg
              viewBox="0 0 24 24"
              className="w-32 h-32 fill-rose-500"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
            
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xl drop-shadow-md">
                {Math.floor(progress)}%
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="burst"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 5], opacity: [1, 0] }}
            className="fixed inset-0 flex items-center justify-center"
          >
            <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_100px_rgba(244,63,94,0.8)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 text-rose-500 text-2xl font-romantic font-bold animate-pulse">
        Collecting your love...
      </div>
    </div>
  );
};

export default HeartLoader;
