import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [currentPhase, setCurrentPhase] = useState('letters'); // letters, phrase, collapse, fade
  const [visibleLetters, setVisibleLetters] = useState([]);
  const [showPhrase, setShowPhrase] = useState(false);

  useEffect(() => {
    // Phase 1: Show letters one by one with glitch effect
    const letterTimings = [300, 600, 900, 1200]; // I, K, U, L
    const letters = ['I', 'K', 'U', 'L'];

    letterTimings.forEach((timing, index) => {
      setTimeout(() => {
        setVisibleLetters(prev => [...prev, letters[index]]);
      }, timing);
    });

    // Phase 2: Show full phrase after all letters appear
    setTimeout(() => {
      setCurrentPhase('phrase');
      setShowPhrase(true);
    }, 1800);

    // Phase 3: Hold phrase for 1.5 seconds
    setTimeout(() => {
      setCurrentPhase('collapse');
      setShowPhrase(false);
    }, 3300);

    // Phase 4: Fade out
    setTimeout(() => {
      setCurrentPhase('fade');
    }, 4200);
  }, []);

  return (
    <div className="fixed inset-0 bg-dark-primary flex items-center justify-center z-50">
      <div className="text-center">
        {currentPhase === 'letters' && (
          <div className="text-8xl font-bold font-manrope tracking-wider">
            {['I', 'K', 'U', 'L'].map((letter, index) => (
              <span
                key={letter}
                className={`inline-block transition-all duration-300 ${
                  visibleLetters.includes(letter)
                    ? 'opacity-100 text-electric-blue animate-glow glitch'
                    : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        )}

        {currentPhase === 'phrase' && showPhrase && (
          <div className="text-6xl font-bold font-manrope tracking-wide transition-all duration-1000 ease-in-out">
            <span className="text-electric-blue animate-glow">I</span>
            <span className="text-white mx-2">Know</span>
            <span className="text-electric-blue animate-glow">U</span>
            <span className="text-white mx-2">Like</span>
          </div>
        )}

        {currentPhase === 'collapse' && (
          <div className="text-8xl font-bold font-manrope tracking-wider transition-all duration-1000 ease-in-out">
            <span className="text-electric-blue animate-glow">I</span>
            <span className="text-electric-blue animate-glow">K</span>
            <span className="text-electric-blue animate-glow">U</span>
            <span className="text-electric-blue animate-glow">L</span>
          </div>
        )}

        {currentPhase === 'fade' && (
          <div className="text-8xl font-bold font-manrope tracking-wider transition-all duration-1000 ease-out opacity-0">
            <span className="text-electric-blue">I</span>
            <span className="text-electric-blue">K</span>
            <span className="text-electric-blue">U</span>
            <span className="text-electric-blue">L</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preloader;