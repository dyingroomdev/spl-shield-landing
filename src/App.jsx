import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import Whitepaper from './components/Whitepaper';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Legal Pages
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import CookiePolicy from './components/legal/CookiePolicy';
import Disclaimer from './components/legal/Disclaimer';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const targetHash = location.state?.scrollTo || location.hash;

    if (targetHash) {
      const scrollToElement = () => {
        if (targetHash === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const element = document.querySelector(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

      // Delay to ensure DOM elements are mounted
      requestAnimationFrame(scrollToElement);

      if (location.state?.scrollTo) {
        navigate(location.pathname, { replace: true, state: null });
      }
    }
  }, [location, navigate]);

  return (
    <main>
      <Hero />
      <Features />
      <Products />
      <Tokenomics />
      <Roadmap />
      <Whitepaper />
      <Contact />
    </main>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Content Pages */}
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
