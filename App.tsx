
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import FloatingElements from './components/FloatingElements';
import QuestionCard from './components/QuestionCard';
import HeartLoader from './components/HeartLoader';
import ProposalScene from './components/ProposalScene';
import { AppState } from './types';
import { saveResponse } from './services/firebaseService';
import { generateRomanticScene } from './services/geminiService';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppState>(AppState.QUESTION);
  const [proposalImage, setProposalImage] = useState<string | null>(null);

  const handleQuestionSubmit = async (percentage: string) => {
    setScreen(AppState.LOADING);
    
    try {
      // We wrap the operations in a way that the UI isn't blocked by minor logging errors
      const results = await Promise.allSettled([
        saveResponse(percentage),
        generateRomanticScene()
      ]);

      const imageResult = results[1];
      if (imageResult.status === 'fulfilled' && imageResult.value) {
        setProposalImage(imageResult.value);
      } else {
        console.error("Failed to generate romantic scene image.");
      }
    } catch (err) {
      console.error("Critical error in submission flow:", err);
    }
  };

  const handleLoadingComplete = () => {
    setScreen(AppState.FINAL);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-pink-50 to-rose-100 overflow-hidden p-4">
      <FloatingElements />

      <AnimatePresence mode="wait">
        {screen === AppState.QUESTION && (
          <QuestionCard key="question" onSubmit={handleQuestionSubmit} />
        )}

        {screen === AppState.LOADING && (
          <HeartLoader key="loader" onComplete={handleLoadingComplete} />
        )}

        {screen === AppState.FINAL && (
          <ProposalScene key="final" imageUrl={proposalImage} />
        )}
      </AnimatePresence>

      {/* Decorative footer */}
      <footer className="fixed bottom-4 left-0 right-0 text-center text-rose-300 text-sm font-medium z-10 pointer-events-none">
        Made with ❤️ for someone special
      </footer>
    </div>
  );
};

export default App;
