
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  imageUrl: string | null;
}

const ProposalScene: React.FC<Props> = ({ imageUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center z-10 p-4"
    >
      <h1 className="text-5xl md:text-7xl text-rose-600 font-romantic text-center mb-10 drop-shadow-md">
        Happy Valentine’s Day ❤️
      </h1>
      
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-rose-400 to-pink-300 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
        <div className="relative bg-white p-2 rounded-3xl shadow-2xl border-8 border-rose-50 overflow-hidden max-w-lg">
          {imageUrl ? (
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              src={imageUrl} 
              alt="Romantic Proposal" 
              className="w-full h-auto rounded-2xl"
            />
          ) : (
            <div className="w-80 h-80 flex items-center justify-center bg-rose-50 text-rose-300 italic p-8 text-center">
              <p>Capturing the perfect moment for you...</p>
            </div>
          )}
          
          {/* Subtle blinking heart overlay */}
          <motion.div 
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-4 right-4 text-3xl"
          >
            💖
          </motion.div>
          <motion.div 
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="absolute bottom-4 left-4 text-3xl"
          >
            💝
          </motion.div>
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-rose-500 text-xl md:text-2xl font-medium text-center italic bg-white/60 px-6 py-2 rounded-full backdrop-blur-sm"
      >
        "In your eyes, I found my home."
      </motion.p>
    </motion.div>
  );
};

export default ProposalScene;
