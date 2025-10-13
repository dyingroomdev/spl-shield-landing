import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ExternalLink } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Products', href: '#products' },
    { name: 'Whitepaper', href: '#whitepaper' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    const hash = href.startsWith('#') ? href : `#${href}`;
    const isOnHome = location.pathname === '/';

    if (!isOnHome) {
      navigate('/', { state: { scrollTo: hash } });
      return;
    }

    if (hash === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExternalRedirect = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('#home')}
            className="flex items-center space-x-3 focus:outline-none"
            aria-label="Go to SPL Shield home"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-glow-green overflow-hidden">
                <img
                  src="/assets/logo.png"
                  alt="SPL Shield logo"
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="absolute -inset-1 bg-spl-gradient rounded-lg blur opacity-30 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display text-gray-900 dark:text-white">
                SPL Shield
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Security First
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="nav-link"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Action Buttons & Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => handleExternalRedirect('https://app.splshield.com')}
                className="btn-secondary flex items-center space-x-2"
              >
                <span>Launch Scanner</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleExternalRedirect('https://ex.splshield.com')}
                className="btn-tdl flex items-center space-x-2"
              >
                <span>TDL Exchange</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 space-y-4 border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm rounded-xl mt-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left nav-link py-2 px-4"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-3 px-4">
              <button
                onClick={() => handleExternalRedirect('https://app.splshield.com')}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <span>Launch Scanner</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleExternalRedirect('https://ex.splshield.com')}
                className="w-full btn-tdl flex items-center justify-center space-x-2"
              >
                <span>TDL Exchange</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
