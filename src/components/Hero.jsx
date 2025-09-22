import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, Users, Lock, ExternalLink, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [stats, setStats] = useState({
    scansCompleted: 0,
    tokensAnalyzed: 0,
    usersProtected: 0,
    risksPrevented: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const targetStats = {
      scansCompleted: 50000,
      tokensAnalyzed: 15000,
      usersProtected: 8500,
      risksPrevented: 12000
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        scansCompleted: Math.floor(targetStats.scansCompleted * progress),
        tokensAnalyzed: Math.floor(targetStats.tokensAnalyzed * progress),
        usersProtected: Math.floor(targetStats.usersProtected * progress),
        risksPrevented: Math.floor(targetStats.risksPrevented * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleExternalRedirect = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-light dark:bg-hero-gradient"></div>
      <div className="absolute inset-0 grid-pattern dark:grid-pattern-dark opacity-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-900 rounded-full blur-xl opacity-60 animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary-200 dark:bg-secondary-900 rounded-full blur-xl opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-tdl-purple-200 dark:bg-tdl-purple-900 rounded-full blur-xl opacity-50 animate-float" style={{animationDelay: '4s'}}></div>

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8 animate-slide-up">
            <h1 className="heading-xl mb-6">
              The Complete{' '}
              <span className="text-gradient-spl">Solana Security</span>{' '}
              Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Advanced token scanning, risk analysis, and secure trading powered by AI. 
              Protect your investments with SPL Shield's comprehensive security suite.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="card p-6 text-center group">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stats.scansCompleted.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Scans Completed
              </div>
            </div>

            <div className="card p-6 text-center group">
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800 transition-colors">
                <TrendingUp className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stats.tokensAnalyzed.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Tokens Analyzed
              </div>
            </div>

            <div className="card p-6 text-center group">
              <div className="w-12 h-12 bg-tdl-purple-100 dark:bg-tdl-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-tdl-purple-200 dark:group-hover:bg-tdl-purple-800 transition-colors">
                <Users className="w-6 h-6 text-tdl-purple-600 dark:text-tdl-purple-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stats.usersProtected.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Users Protected
              </div>
            </div>

            <div className="card p-6 text-center group">
              <div className="w-12 h-12 bg-tdl-orange-100 dark:bg-tdl-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-tdl-orange-200 dark:group-hover:bg-tdl-orange-800 transition-colors">
                <Lock className="w-6 h-6 text-tdl-orange-600 dark:text-tdl-orange-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stats.risksPrevented.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Risks Prevented
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <button
              onClick={() => handleExternalRedirect('https://app.splshield.com')}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-3 group"
            >
              <Shield className="w-5 h-5" />
              <span>Launch Scanner</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => handleExternalRedirect('https://ex.splshield.com')}
              className="btn-tdl text-lg px-8 py-4 flex items-center space-x-3 group"
            >
              <TrendingUp className="w-5 h-5" />
              <span>TDL Exchange</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('#features')}
              className="btn-secondary text-lg px-8 py-4 flex items-center space-x-3 group"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{animationDelay: '0.6s'}}>
            {['AI-Powered', 'Real-time Analysis', 'Solana Native', 'Open Source'].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('#features')}
          className="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-90" />
        </button>
      </div>
    </section>
  );
};

export default Hero;