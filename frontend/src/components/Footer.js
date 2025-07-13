import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/ikul_cars',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 20.312c-3.42 0-6.191-2.771-6.191-6.191s2.771-6.191 6.191-6.191 6.191 2.771 6.191 6.191-2.771 6.191-6.191 6.191zm7.138 0c-3.42 0-6.191-2.771-6.191-6.191s2.771-6.191 6.191-6.191 6.191 2.771 6.191 6.191-2.771 6.191-6.191 6.191z"/>
          <path d="M12 7.378c-2.552 0-4.622 2.069-4.622 4.622S9.448 16.622 12 16.622s4.622-2.069 4.622-4.622S14.552 7.378 12 7.378zM12 14.756c-1.549 0-2.806-1.256-2.806-2.806S10.451 9.194 12 9.194s2.806 1.256 2.806 2.806-1.256 2.756-2.806 2.756z"/>
          <circle cx="16.806" cy="7.207" r="1.078"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/ikul_cars',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-dark-primary border-t border-electric-blue/20 py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          {/* Instagram CTA */}
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white font-manrope mb-4">
              Follow us on Instagram
              <span className="text-electric-blue ml-2">@ikul_cars</span>
            </h3>
            <p className="text-gray-400 font-inter max-w-2xl mx-auto">
              Get behind-the-scenes content, exclusive previews, and daily automotive inspiration. 
              Join our community of car enthusiasts.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-8 mb-12">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-14 h-14 rounded-full border border-electric-blue/30 text-electric-blue hover:bg-electric-blue hover:text-dark-primary transition-all duration-300 hover:shadow-lg hover:shadow-electric-blue/30"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mb-12">
            <h4 className="text-xl font-semibold text-white font-manrope mb-4">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm font-inter mb-6">
              Get notified when we drop new specs and exclusive content.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-secondary border border-electric-blue/30 text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue font-inter"
              />
              <button className="px-6 py-3 bg-electric-blue text-dark-primary font-semibold hover:bg-white transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-electric-blue/20 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold font-manrope text-electric-blue">IKUL</span>
              <span className="text-2xl font-bold font-manrope text-white">cars</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex space-x-8">
              <a href="#hero" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 font-inter">
                Home
              </a>
              <a href="#latest-specs" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 font-inter">
                Latest
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 font-inter">
                Archive
              </a>
              <a href="#" className="text-gray-400 hover:text-electric-blue transition-colors duration-300 font-inter">
                About
              </a>
            </nav>

            {/* Copyright */}
            <div className="text-gray-500 text-sm font-inter">
              © {currentYear} IKUL Cars. All rights reserved.
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-8 pt-8 border-t border-electric-blue/10">
            <p className="text-gray-500 text-xs font-inter max-w-4xl mx-auto leading-relaxed">
              IKUL Cars is dedicated to providing the most accurate and beautifully presented automotive specifications. 
              All data is carefully researched and verified. Vehicle specifications may vary by market and are subject to manufacturer updates.
            </p>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent opacity-30"></div>
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-blue rounded-full animate-pulse opacity-50"
            style={{
              left: `${20 + i * 15}%`,
              bottom: `${10 + Math.sin(i) * 20}px`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;