import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Settings, 
  Globe, 
  Smartphone,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  Brain,
  Users,
  BarChart3
} from 'lucide-react';
import { TELEGRAM_URL, DISCORD_URL } from '../config/communityLinks';

const Roadmap = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleExternalRedirect = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Roadmap phases
  const roadmapPhases = [
    {
      id: 'q4-2025',
      quarter: 'Q4 2025',
      title: 'Launch & Foundation',
      emoji: '🚀',
      icon: Rocket,
      status: 'upcoming', // upcoming, in-progress, completed
      gradient: 'from-red-500 to-pink-500',
      lightBg: 'bg-red-50 dark:bg-red-900/20',
      features: [
        'TDL Token Launch',
        'MVP Security Bot',
        'Basic Risk Scanner',
        'Community Building',
        'Solana Integration'
      ],
      description: 'Official token launch with core security features and community establishment.'
    },
    {
      id: 'q1-2026',
      quarter: 'Q1 2026',
      title: 'AI & Intelligence',
      emoji: '🔧',
      icon: Settings,
      status: 'upcoming',
      gradient: 'from-blue-500 to-cyan-500',
      lightBg: 'bg-blue-50 dark:bg-blue-900/20',
      features: [
        'Advanced AI Algorithms',
        'Enhanced Dashboard',
        'Real-time Analytics',
        'Threat Intelligence',
        'API Access'
      ],
      description: 'Major AI upgrades and comprehensive dashboard with advanced analytics.'
    },
    {
      id: 'q2-2026',
      quarter: 'Q2 2026',
      title: 'Governance & Staking',
      emoji: '🌐',
      icon: Globe,
      status: 'upcoming',
      gradient: 'from-green-500 to-emerald-500',
      lightBg: 'bg-green-50 dark:bg-green-900/20',
      features: [
        'TDL Staking Platform',
        'DAO Governance',
        'Voting Mechanisms',
        'Reward Distribution',
        'Community Proposals'
      ],
      description: 'Introduction of staking rewards and decentralized governance system.'
    },
    {
      id: 'q3-2026',
      quarter: 'Q3 2026',
      title: 'Multi-chain & Mobile',
      emoji: '📱',
      icon: Smartphone,
      status: 'upcoming',
      gradient: 'from-purple-500 to-indigo-500',
      lightBg: 'bg-purple-50 dark:bg-purple-900/20',
      features: [
        'Multi-chain Support',
        'Mobile Application',
        'Cross-chain Security',
        'Mobile Notifications',
        'Global Expansion'
      ],
      description: 'Expansion to multiple blockchains and launch of mobile application.'
    }
  ];

  // Auto-rotate through phases
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % roadmapPhases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  return (
    <section id="roadmap" className="section-padding bg-white dark:bg-dark-bg">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            Development <span className="text-gradient-spl">Roadmap</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our journey to building the most comprehensive Solana security ecosystem. 
            Each phase brings new features and capabilities to protect your investments.
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2"></div>
            
            {/* Progress line */}
            <div 
              className="absolute top-1/2 left-0 h-1 bg-spl-gradient transform -translate-y-1/2 transition-all duration-1000 ease-out"
              style={{ width: `${((activePhase + 1) / roadmapPhases.length) * 100}%` }}
            ></div>

            {/* Timeline nodes */}
            <div className="relative flex justify-between items-center">
              {roadmapPhases.map((phase, index) => (
                <div
                  key={phase.id}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                    index === activePhase ? 'scale-110' : 'hover:scale-105'
                  }`}
                  onClick={() => setActivePhase(index)}
                >
                  {/* Node */}
                  <div className={`relative w-16 h-16 rounded-full flex items-center justify-center border-4 border-white dark:border-dark-bg shadow-lg transition-all duration-300 ${
                    index <= activePhase 
                      ? `bg-gradient-to-r ${phase.gradient}` 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <span className="text-2xl">{phase.emoji}</span>
                    
                    {/* Status indicator */}
                    <div className="absolute -top-2 -right-2">
                      {getStatusIcon(phase.status)}
                    </div>
                  </div>

                  {/* Quarter label */}
                  <div className={`mt-4 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    index === activePhase
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}>
                    {phase.quarter}
                  </div>

                  {/* Title */}
                  <div className={`mt-2 text-center font-semibold transition-all duration-300 ${
                    index === activePhase
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {phase.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden mb-12">
          <div className="space-y-6">
            {roadmapPhases.map((phase, index) => (
              <div
                key={phase.id}
                className={`relative flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${
                  index === activePhase
                    ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
                onClick={() => setActivePhase(index)}
              >
                {/* Line connector */}
                {index < roadmapPhases.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-6 bg-gray-300 dark:bg-gray-600"></div>
                )}

                {/* Node */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-dark-bg shadow-lg ${
                  index <= activePhase 
                    ? `bg-gradient-to-r ${phase.gradient}` 
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  <span className="text-lg">{phase.emoji}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-gray-900 dark:text-white">{phase.quarter}</span>
                    {getStatusIcon(phase.status)}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{phase.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Phase Details */}
        <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Phase Info */}
            <div className={`card p-8 ${roadmapPhases[activePhase].lightBg}`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${roadmapPhases[activePhase].gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  {React.createElement(roadmapPhases[activePhase].icon, { className: "w-8 h-8 text-white" })}
                </div>
                <div>
                  <h3 className="heading-sm text-gray-900 dark:text-white">
                    {roadmapPhases[activePhase].quarter}: {roadmapPhases[activePhase].title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(roadmapPhases[activePhase].status)}
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                      {roadmapPhases[activePhase].status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {roadmapPhases[activePhase].description}
              </p>

              {/* Features List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Key Features</h4>
                {roadmapPhases[activePhase].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats & Progress */}
            <div className="space-y-6">
              
              {/* Overall Progress */}
              <div className="card p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Development Progress</h4>
                <div className="space-y-4">
                  {roadmapPhases.map((phase, index) => (
                    <div key={phase.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{phase.quarter}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getStatusColor(phase.status)} transition-all duration-500`}
                            style={{ 
                              width: phase.status === 'completed' ? '100%' : 
                                     phase.status === 'in-progress' ? '50%' : '0%' 
                            }}
                          ></div>
                        </div>
                        {getStatusIcon(phase.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4 text-center">
                  <Brain className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">AI</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Powered</div>
                </div>
                <div className="card p-4 text-center">
                  <Users className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">DAO</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Governed</div>
                </div>
                <div className="card p-4 text-center">
                  <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">Multi</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Chain</div>
                </div>
                <div className="card p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monitor</div>
                </div>
              </div>

              {/* CTA */}
              <div className="card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Stay Updated</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Follow our progress and get notified about major milestones.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleExternalRedirect(TELEGRAM_URL)}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <span>Join Telegram</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleExternalRedirect(DISCORD_URL)}
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <span>Join Discord</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
