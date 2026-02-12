
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onSubmit: (percentage: string) => void;
}

const QuestionCard: React.FC<Props> = ({ onSubmit }) => {
  const [selected, setSelected] = useState<string>('');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="relative z-10 w-full max-w-md p-8 mx-auto"
    >
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-rose-200 relative">
        {/* Decorative Rose Icons in corners */}
        <div className="absolute -top-6 -left-6 text-4xl">🌹</div>
        <div className="absolute -top-6 -right-6 text-4xl">🌹</div>
        <div className="absolute -bottom-6 -left-6 text-4xl">🌹</div>
        <div className="absolute -bottom-6 -right-6 text-4xl">🌹</div>

        <h1 className="text-4xl md:text-5xl text-rose-600 font-romantic text-center mb-8">
          How much do you like me?
        </h1>

        <div className="space-y-4 mb-8">
          <label className={`flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${selected === '70-100' ? 'bg-rose-50 border-rose-400' : 'bg-white border-rose-100'}`}>
            <input 
              type="radio" 
              name="percentage" 
              className="hidden" 
              onChange={() => setSelected('70-100')} 
            />
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${selected === '70-100' ? 'border-rose-500 bg-rose-500' : 'border-rose-200'}`}>
              {selected === '70-100' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span className="text-lg font-medium text-rose-700">70% – 100%</span>
          </label>

          <label className={`flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${selected === '100-200' ? 'bg-rose-50 border-rose-400' : 'bg-white border-rose-100'}`}>
            <input 
              type="radio" 
              name="percentage" 
              className="hidden" 
              onChange={() => setSelected('100-200')} 
            />
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${selected === '100-200' ? 'border-rose-500 bg-rose-500' : 'border-rose-200'}`}>
              {selected === '100-200' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span className="text-lg font-medium text-rose-700">100% – 200%</span>
          </label>
        </div>

        <button
          onClick={() => selected && onSubmit(selected)}
          disabled={!selected}
          className={`w-full py-4 rounded-full text-white text-xl font-bold transition-all shadow-lg active:scale-95 ${selected ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          Reveal My Surprise ❤️
        </button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
