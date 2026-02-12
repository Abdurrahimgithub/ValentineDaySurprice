
import React, { useEffect, useState } from 'react';

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<{ id: number; left: string; size: string; duration: string; delay: string; type: 'petal' | 'heart' }[]>([]);

  useEffect(() => {
    // Fixed: Explicitly cast 'type' to the specific union literals to prevent TypeScript from inferring it as a generic 'string'
    const newElements = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * (30 - 15) + 15}px`,
      duration: `${Math.random() * (10 - 5) + 5}s`,
      delay: `${Math.random() * 5}s`,
      type: (Math.random() > 0.4 ? 'petal' : 'heart') as 'petal' | 'heart'
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className="petal opacity-0"
          style={{
            left: el.left,
            width: el.size,
            height: el.size,
            animationDuration: el.duration,
            animationDelay: el.delay,
          }}
        >
          {el.type === 'petal' ? (
             <svg viewBox="0 0 100 100" className="fill-rose-300 opacity-60">
                <path d="M50 0C50 0 100 20 100 50C100 80 80 100 50 100C20 100 0 80 0 50C0 20 50 0 50 0Z" />
             </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="fill-pink-400 opacity-50">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
