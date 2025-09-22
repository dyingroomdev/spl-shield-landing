import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
        <Header />
        
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Features />
              <Products />
              <Tokenomics />
              <Roadmap />
              <Whitepaper />
              <Contact />
              <Footer />
            </main>
          } />
          
          {/* Content Pages */}
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;