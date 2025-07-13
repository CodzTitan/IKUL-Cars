import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    // Start typing animation after component mounts
    const typingTimer = setTimeout(() => {
      setTypingComplete(true);
    }, 3500);

    // Show scroll indicator after typing completes
    const scrollTimer = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 4000);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(scrollTimer);
    };
  }, []);

  const handleEnterVault = () => {
    document.getElementById('latest-specs').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXJzfGVufDB8fHxibGFja3wxNzUyNDA5MDUyfDA&ixlib=rb-4.1.0&q=85"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-primary/80 via-dark-primary/60 to-dark-primary/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-primary/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Logo/Headline */}
        <div className="mb-8 fade-in">
          <h1 className="text-7xl md:text-9xl font-bold font-manrope tracking-wider text-white mb-4">
            <span className="text-electric-blue animate-glow">IKUL</span>
            <span className="text-white ml-4">cars</span>
          </h1>
        </div>

        {/* Tagline with typing effect */}
        <div className="mb-12 fade-in-delayed">
          <div className="text-2xl md:text-4xl font-light font-inter text-gray-300 min-h-[3rem] flex items-center justify-center">
            {!typingComplete ? (
              <span className="typing-animation">
                The Art of Automotive Data
              </span>
            ) : (
              <span className="text-gradient">
                The Art of Automotive Data
              </span>
            )}
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="mb-16 fade-in-delayed">
          <button
            onClick={handleEnterVault}
            className="group relative px-12 py-4 text-xl font-medium font-inter tracking-wide transition-all duration-300 ease-in-out"
          >
            {/* Button background */}
            <div className="absolute inset-0 border-2 border-electric-blue rounded-none transition-all duration-300 ease-in-out group-hover:bg-electric-blue"></div>
            
            {/* Button text */}
            <span className="relative z-10 text-electric-blue transition-colors duration-300 ease-in-out group-hover:text-dark-primary">
              ENTER THE VAULT
            </span>

            {/* Hover fill effect */}
            <div className="absolute inset-0 bg-electric-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></div>
          </button>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center">
              <div className="text-electric-blue text-sm font-inter mb-2">SCROLL</div>
              <svg 
                className="w-6 h-6 text-electric-blue animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Animated particles/dots effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-blue rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;