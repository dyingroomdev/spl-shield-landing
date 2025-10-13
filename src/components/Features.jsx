import React from 'react';
import { 
  Shield, 
  Zap, 
  Brain, 
  Lock, 
  TrendingUp, 
  Users, 
  Globe, 
  CheckCircle,
  AlertTriangle,
  Search,
  DollarSign,
  BarChart3
} from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: Shield,
      title: 'Advanced Risk Scanning',
      description: 'AI-powered analysis of Solana tokens and wallets with real-time risk assessment and detailed security reports.',
      gradient: 'from-primary-500 to-primary-600',
      benefits: ['Real-time scanning', 'Comprehensive reports', 'Risk scoring', 'Historical data']
    },
    {
      icon: Brain,
      title: 'AI Security Intelligence',
      description: 'Machine learning algorithms detect suspicious patterns, rugpull indicators, and potential security threats.',
      gradient: 'from-secondary-500 to-secondary-600',
      benefits: ['Pattern recognition', 'Threat detection', 'Smart alerts', 'Predictive analysis']
    },
    {
      icon: DollarSign,
      title: 'TDL Token Ecosystem',
      description: 'Secure, utility-driven token with transparent tokenomics, proactive liquidity management, and long-term incentives.',
      gradient: 'from-tdl-purple-500 to-tdl-orange-500',
      benefits: ['Utility token', 'Transparent allocation', 'Liquidity control', 'Governance rights']
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Multi-layer Security',
      description: 'Comprehensive security protocols protecting user data and transactions'
    },
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description: 'Instant alerts and continuous monitoring of your portfolio'
    },
    {
      icon: Search,
      title: 'Deep Analysis',
      description: 'Thorough investigation of token contracts and liquidity pools'
    },
    {
      icon: BarChart3,
      title: 'Risk Metrics',
      description: 'Detailed risk scoring with actionable insights and recommendations'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by the community, for the community with open-source principles'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Available worldwide with multi-language support and 24/7 uptime'
    }
  ];

  return (
    <section id="features" className="section-padding bg-gray-50 dark:bg-dark-surface">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            Complete <span className="text-gradient-spl">Security Ecosystem</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive tools and services designed to protect your Solana investments 
            and provide secure trading opportunities in the DeFi space.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r opacity-30 group-hover:opacity-60 rounded-xl blur transition duration-300"></div>
              
              <div className="relative card p-8 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="heading-sm mb-4 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Features Grid */}
        <div className="text-center mb-12">
          <h3 className="heading-md mb-4">
            Built with <span className="text-gradient-spl">Security First</span> Principles
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Every feature is designed with security, transparency, and user protection at its core.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="card p-6 group hover:shadow-glow-green transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 bg-white dark:bg-dark-card px-8 py-4 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">99.9% Uptime</span>
            </div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enterprise Security</span>
            </div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-secondary-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Real-time Data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
