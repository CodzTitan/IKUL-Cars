import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const LatestSpecsShowcase = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchLatestCars();
  }, []);

  const fetchLatestCars = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cars/latest`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching latest cars:', error);
      // Fallback sample data
      setCars([
        {
          id: '1',
          name: 'Ferrari 296 GTB',
          brand: 'Ferrari',
          model: '296 GTB',
          year: 2024,
          horsepower: 818,
          top_speed: 205,
          engine: '2.9L V6 Hybrid',
          acceleration_0_60: 2.9,
          image_url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
          blueprint_image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800',
          description: 'The ultimate expression of Ferrari\'s hybrid technology',
          is_latest: true
        },
        {
          id: '2',
          name: 'Porsche 911 GT3 RS',
          brand: 'Porsche',
          model: '911 GT3 RS',
          year: 2024,
          horsepower: 518,
          top_speed: 184,
          engine: '4.0L Flat-6',
          acceleration_0_60: 3.0,
          image_url: 'https://images.unsplash.com/photo-1655827763440-7905302b75ff?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBjYXJzfGVufDB8fHxibGFja3wxNzUyNDA5MDUyfDA&ixlib=rb-4.1.0&q=85',
          blueprint_image_url: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXJzfGVufDB8fHxibGFja3wxNzUyNDA5MDUyfDA&ixlib=rb-4.1.0&q=85',
          description: 'Track-focused precision engineering',
          is_latest: true
        },
        {
          id: '3',
          name: 'Bugatti Chiron',
          brand: 'Bugatti',
          model: 'Chiron',
          year: 2024,
          horsepower: 1479,
          top_speed: 261,
          engine: '8.0L W16 Quad-Turbo',
          acceleration_0_60: 2.4,
          image_url: 'https://images.unsplash.com/photo-1557349504-2f6a19aff9d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxzcG9ydHMlMjBjYXJzfGVufDB8fHxibGFja3wxNzUyNDA5MDU4fDA&ixlib=rb-4.1.0&q=85',
          blueprint_image_url: 'https://images.unsplash.com/photo-1532578498858-e21a39e0a449?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJzfGVufDB8fHxibGFja3wxNzUyNDA5MDU4fDA&ixlib=rb-4.1.0&q=85',
          description: 'The pinnacle of automotive engineering',
          is_latest: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const startX = e.pageX || e.touches[0].pageX;
      const scrollLeft = container.scrollLeft;

      const handleMouseMove = (e) => {
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleMouseMove);
        document.removeEventListener('touchend', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
    }
  };

  if (loading) {
    return (
      <section id="latest-specs" className="py-20 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse text-electric-blue text-xl">Loading the latest drops...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="latest-specs" className="py-20 bg-dark-secondary">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-manrope text-white mb-4">
            The <span className="text-electric-blue">Weekly Drop</span>
          </h2>
          <p className="text-xl text-gray-400 font-inter max-w-2xl mx-auto">
            Fresh automotive specs delivered weekly. Each car meticulously researched and beautifully presented.
          </p>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: 'x mandatory' }}
            onMouseDown={handleDrag}
            onTouchStart={handleDrag}
          >
            {cars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>

          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-8 w-20 bg-gradient-to-r from-dark-secondary to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-dark-secondary to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

const CarCard = ({ car, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-80 card-3d"
      style={{ scrollSnapAlign: 'start' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`card-3d-inner h-96 glass-card rounded-lg overflow-hidden transition-all duration-600 hover-glow ${
          !isHovered ? 'card-3d-resting' : ''
        }`}
        style={{
          animationDelay: `${index * 0.2}s`,
        }}
      >
        {/* Card Content */}
        <div className="relative h-full">
          {/* Car Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={isHovered ? car.blueprint_image_url : car.image_url}
              alt={car.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isHovered ? 'blueprint scale-110' : 'scale-100'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Latest indicator */}
            {car.is_latest && (
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-electric-blue rounded-full animate-pulse"></div>
              </div>
            )}

            {/* Hover overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-dark-primary/60 flex items-center justify-center">
                <div className="text-electric-blue text-center space-y-2 animate-fade-in">
                  <div className="text-lg font-bold">BLUEPRINT MODE</div>
                  <div className="text-sm">Analyzing Specifications...</div>
                </div>
              </div>
            )}
          </div>

          {/* Card Info */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white font-manrope">
                {car.name}
              </h3>
              <span className="text-electric-blue text-sm font-inter">
                {car.year}
              </span>
            </div>

            {/* Specs Grid - Animated on hover */}
            <div className={`transition-all duration-500 ${isHovered ? 'opacity-100 max-h-40' : 'opacity-60 max-h-8'}`}>
              {isHovered ? (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-gray-300">
                    <span className="text-electric-blue font-semibold">{car.horsepower}</span> HP
                  </div>
                  <div className="text-gray-300">
                    <span className="text-electric-blue font-semibold">{car.top_speed}</span> MPH
                  </div>
                  <div className="text-gray-300 col-span-2">
                    <span className="text-electric-blue font-semibold">{car.engine}</span>
                  </div>
                  <div className="text-gray-300 col-span-2">
                    <span className="text-electric-blue font-semibold">{car.acceleration_0_60}s</span> 0-60
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm font-inter truncate">
                  {car.description}
                </p>
              )}
            </div>

            {/* Deep Dive Link - Only on hover */}
            {isHovered && (
              <div className="mt-4 animate-fade-in">
                <button className="text-electric-blue hover:text-white transition-colors duration-300 text-sm font-semibold">
                  Deep Dive →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestSpecsShowcase;