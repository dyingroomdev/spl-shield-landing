import React from 'react';
import { 
  Shield, 
  Search, 
  BarChart3, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  Lock, 
  Coins,
  ExternalLink,
  ArrowRight,
  Activity,
  Users,
  Zap,
  Target
} from 'lucide-react';

const Products = () => {
  const handleExternalRedirect = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scannerFeatures = [
    { icon: Search, text: 'Real-time Token Scanning' },
    { icon: BarChart3, text: 'Risk Assessment Dashboard' },
    { icon: AlertTriangle, text: 'Threat Detection Engine' },
    { icon: Activity, text: 'Portfolio Monitoring' },
    { icon: Users, text: 'Community Reports' },
    { icon: Target, text: 'Precision Analytics' }
  ];

  const tdlFeatures = [
    { icon: DollarSign, text: 'Utility Token Design' },
    { icon: Lock, text: 'Institutional-Grade Custody' },
    { icon: TrendingUp, text: 'Liquidity Management' },
    { icon: Coins, text: 'Staking Rewards' },
    { icon: Zap, text: 'Fast Transactions' },
    { icon: Shield, text: 'Secure Protocol' }
  ];

  return (
    <section id="products" className="section-padding bg-white dark:bg-dark-bg">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            Our <span className="text-gradient-spl">Product Suite</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Two powerful products working together to create the most comprehensive 
            Solana security and trading ecosystem in DeFi.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* SPL Shield Scanner */}
          <div className="group relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-spl-gradient rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            
            <div className="relative card-gradient p-8 lg:p-10 h-full">
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-spl-gradient rounded-xl flex items-center justify-center shadow-glow-green">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="heading-sm text-gray-900 dark:text-white">SPL Shield Scanner</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">AI-Powered Risk Analysis</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                Advanced security scanner that analyzes Solana tokens and wallets in real-time. 
                Protect yourself from rugpulls, scams, and suspicious activities with our 
                comprehensive AI-driven risk assessment engine.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {scannerFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">50K+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Scans Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">99.9%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">24/7</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Monitoring</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleExternalRedirect('https://app.splshield.com')}
                  className="btn-primary flex items-center justify-center space-x-2 flex-1"
                >
                  <span>Launch Scanner</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="btn-secondary flex items-center justify-center space-x-2">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* TDL Token Exchange */}
          <div className="group relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-tdl-gradient rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            
            <div className="relative card-gradient p-8 lg:p-10 h-full">
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-tdl-gradient rounded-xl flex items-center justify-center shadow-glow-purple">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="heading-sm text-gray-900 dark:text-white">TDL Token Exchange</h3>
                  <p className="text-tdl-purple-600 dark:text-tdl-purple-400 font-medium">Secure Trading Platform</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                Trade our utility token TDL with transparent tokenomics, proactive liquidity management, 
                and governance rights. Every mechanism is engineered for long-term sustainability and 
                institutional-grade security.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {tdlFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5 text-tdl-purple-500 dark:text-tdl-purple-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Token Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-4 bg-gradient-to-r from-tdl-purple-50 to-tdl-orange-50 dark:from-tdl-purple-900/20 dark:to-tdl-orange-900/20 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-tdl-purple-600 dark:text-tdl-purple-400">TDL</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Symbol</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-tdl-orange-600 dark:text-tdl-orange-400">1B</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Total Supply</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-tdl-gradient bg-clip-text text-transparent">25%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Presale Allocation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-tdl-purple-600 dark:text-tdl-purple-400">$500K</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Presale Target</div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleExternalRedirect('https://ex.splshield.com')}
                  className="btn-tdl flex items-center justify-center space-x-2 flex-1"
                >
                  <span>Start Trading</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button className="btn-secondary flex items-center justify-center space-x-2">
                  <span>View Docs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="heading-md mb-6">
              <span className="text-gradient-spl">Integrated Ecosystem</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Both products work seamlessly together, creating a comprehensive security and trading platform 
              that protects your investments while providing opportunities for growth.
            </p>
            
            {/* Integration Flow */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-4 bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <Shield className="w-8 h-8 text-primary-500" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Scan & Analyze</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Risk assessment</div>
                </div>
              </div>
              
              <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
              
              <div className="flex items-center space-x-4 bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <DollarSign className="w-8 h-8 text-tdl-purple-500" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Trade Safely</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Secure transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
