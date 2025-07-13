import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ArchiveSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);

  const placeholders = [
    'e.g., Porsche 911 GT3 RS',
    'e.g., Bugatti Chiron',
    'e.g., Nissan GT-R',
    'e.g., Ferrari 296 GTB',
    'e.g., McLaren 720S',
    'e.g., Lamborghini Huracán'
  ];

  // Cycle through placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Search function with debouncing
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchQuery.trim().length >= 2) {
      setIsSearching(true);
      debounceRef.current = setTimeout(async () => {
        await performSearch(searchQuery);
      }, 300);
    } else {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery]);

  const performSearch = async (query) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cars/search?q=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback mock results
      setSearchResults([
        { id: '1', name: 'Ferrari 296 GTB', brand: 'Ferrari', model: '296 GTB', year: 2024 },
        { id: '2', name: 'Porsche 911 GT3 RS', brand: 'Porsche', model: '911 GT3 RS', year: 2024 },
      ].filter(car => 
        car.name.toLowerCase().includes(query.toLowerCase()) ||
        car.brand.toLowerCase().includes(query.toLowerCase()) ||
        car.model.toLowerCase().includes(query.toLowerCase())
      ));
      setShowResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = (car) => {
    console.log('Selected car:', car);
    setSearchQuery('');
    setShowResults(false);
    // Here you would typically navigate to the car detail page
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    searchInputRef.current?.focus();
  };

  return (
    <section className="py-24 bg-dark-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-electric-blue/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-electric-blue/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-electric-blue rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-manrope text-white mb-6">
            Find Your <span className="text-electric-blue">Legend</span>
          </h2>
          <p className="text-xl text-gray-400 font-inter max-w-3xl mx-auto mb-12">
            Search through our comprehensive archive of automotive specifications. 
            From classic legends to cutting-edge hypercars, find the exact data you're looking for.
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Search Bar Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/20 to-transparent rounded-lg blur-lg group-focus-within:blur-xl transition-all duration-300"></div>
              
              <div className="relative bg-dark-primary border border-electric-blue/30 rounded-lg overflow-hidden group-focus-within:border-electric-blue transition-all duration-300">
                {/* Search Input */}
                <div className="flex items-center p-6">
                  {/* Search Icon */}
                  <div className="mr-4 text-electric-blue">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Input Field */}
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="flex-1 bg-transparent text-white text-xl font-inter placeholder-gray-500 focus:outline-none"
                    placeholder={placeholders[placeholderIndex]}
                  />

                  {/* Loading/Clear Button */}
                  <div className="ml-4">
                    {isSearching ? (
                      <div className="w-6 h-6 border-2 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
                    ) : searchQuery ? (
                      <button
                        onClick={clearSearch}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    ) : null}
                  </div>
                </div>

                {/* Search Results */}
                {showResults && (
                  <div className="border-t border-electric-blue/20">
                    {searchResults.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((car, index) => (
                          <SearchResult
                            key={car.id}
                            car={car}
                            index={index}
                            onClick={() => handleResultClick(car)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-gray-400">
                        <div className="mb-2">
                          <svg className="w-12 h-12 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.071-2.33" />
                          </svg>
                        </div>
                        <p>No cars found matching "{searchQuery}"</p>
                        <p className="text-sm mt-2">Try searching for a different model or brand</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Search Suggestions */}
            {!searchQuery && (
              <div className="mt-8 text-center">
                <p className="text-gray-400 font-inter mb-4">Popular searches:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Ferrari', 'Porsche', 'Lamborghini', 'McLaren', 'Bugatti'].map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSearchQuery(brand)}
                      className="px-4 py-2 border border-electric-blue/30 text-electric-blue hover:bg-electric-blue hover:text-dark-primary transition-all duration-300 rounded-lg text-sm font-inter"
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '500+', label: 'Car Models' },
            { number: '50+', label: 'Manufacturers' },
            { number: '2024', label: 'Latest Year' },
            { number: '100%', label: 'Accurate Data' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-electric-blue font-manrope mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 font-inter">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SearchResult = ({ car, index, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 text-left hover:bg-dark-secondary/50 transition-colors duration-200 border-b border-electric-blue/10 last:border-b-0"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold font-manrope">
            {car.name}
          </h3>
          <p className="text-gray-400 text-sm font-inter">
            {car.brand} • {car.year}
          </p>
        </div>
        <div className="text-electric-blue">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ArchiveSearch;