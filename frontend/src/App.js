import React, { useState, useEffect } from 'react';
import './App.css';
import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import LatestSpecsShowcase from './components/LatestSpecsShowcase';
import ValueProposition from './components/ValueProposition';
import ArchiveSearch from './components/ArchiveSearch';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for preloader animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); // 4.5 seconds for the complete preloader sequence

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <HeroSection />
          <LatestSpecsShowcase />
          <ValueProposition />
          <ArchiveSearch />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;