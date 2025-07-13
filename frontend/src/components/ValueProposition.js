import React, { useState, useEffect, useRef } from 'react';

const ValueProposition = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate items in sequence
            setTimeout(() => setVisibleItems(prev => [...prev, 0]), 200);
            setTimeout(() => setVisibleItems(prev => [...prev, 1]), 600);
            setTimeout(() => setVisibleItems(prev => [...prev, 2]), 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const propositions = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 13l6 6" />
        </svg>
      ),
      title: "Meticulously Researched",
      description: "We obsess over every detail, so you don't have to.",
      details: "Every specification verified through multiple sources, technical documentation, and manufacturer data."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9a2 2 0 00-2 2v12a4 4 0 004 4h6a2 2 0 002-2V7a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 17l2 2 4-4" />
        </svg>
      ),
      title: "Artfully Presented",
      description: "Data shouldn't be boring. We make it beautiful and intuitive.",
      details: "Interactive visualizations, 3D models, and immersive experiences that bring automotive data to life."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15l2 2 4-4" />
        </svg>
      ),
      title: "Consistently Delivered",
      description: "Fresh specs, delivered to you every single week.",
      details: "Regular updates featuring the latest releases, concept cars, and exclusive previews from major manufacturers."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-dark-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 carbon-texture opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold font-manrope text-white mb-6">
            Why <span className="text-electric-blue">IKUL</span>?
          </h2>
          <p className="text-xl text-gray-400 font-inter max-w-3xl mx-auto">
            We don't just collect automotive data—we transform it into an art form. 
            Every specification tells a story, and we make sure it's told beautifully.
          </p>
        </div>

        {/* Value Propositions Grid */}
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {propositions.map((prop, index) => (
            <ValueCard
              key={index}
              proposition={prop}
              index={index}
              isVisible={visibleItems.includes(index)}
            />
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-block p-8 glass-card rounded-lg max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4 font-manrope">
              Experience the Difference
            </h3>
            <p className="text-gray-400 font-inter mb-6">
              Join thousands of automotive enthusiasts who trust IKUL for the most comprehensive 
              and beautifully presented car specifications on the web.
            </p>
            <button className="px-8 py-3 bg-electric-blue text-dark-primary font-semibold rounded-none hover:bg-white transition-colors duration-300">
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ proposition, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`text-center group transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Icon Container */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          {/* Background circle */}
          <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isHovered 
              ? 'bg-electric-blue shadow-lg shadow-electric-blue/30' 
              : 'bg-dark-secondary border-2 border-electric-blue/30'
          }`}></div>
          
          {/* Icon */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'text-dark-primary' : 'text-electric-blue'
          }`}>
            {proposition.icon}
          </div>

          {/* Animated ring */}
          <div className={`absolute inset-0 rounded-full border-2 border-electric-blue transition-all duration-1000 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
          }`}></div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white font-manrope group-hover:text-electric-blue transition-colors duration-300">
            {proposition.title}
          </h3>
          
          <p className="text-lg text-gray-300 font-inter">
            {proposition.description}
          </p>

          {/* Expandable details on hover */}
          <div className={`transition-all duration-500 overflow-hidden ${
            isHovered ? 'max-h-32 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
          }`}>
            <div className="bg-dark-secondary/50 rounded-lg p-4 border border-electric-blue/20">
              <p className="text-sm text-gray-400 font-inter leading-relaxed">
                {proposition.details}
              </p>
            </div>
          </div>
        </div>

        {/* Hover effect background */}
        <div className={`absolute inset-0 -z-10 rounded-lg transition-all duration-500 ${
          isHovered ? 'bg-electric-blue/5 scale-105' : 'scale-100'
        }`}></div>
      </div>
    </div>
  );
};

export default ValueProposition;