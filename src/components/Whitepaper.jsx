import React from 'react';
import { 
  FileText, 
  Download, 
  BookOpen, 
  Shield, 
  TrendingUp, 
  Users, 
  Code, 
  ExternalLink,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Whitepaper = () => {
  const whitepaperSections = [
    {
      icon: Shield,
      title: 'Security Architecture',
      description: 'Deep dive into our multi-layered security approach and AI-powered risk detection algorithms.',
      topics: ['Risk Assessment Engine', 'Threat Detection Models', 'Security Protocols', 'Data Protection']
    },
    {
      icon: Code,
      title: 'Technical Implementation',
      description: 'Comprehensive overview of our Solana program architecture and smart contract design.',
      topics: ['Smart Contract Design', 'Solana Integration', 'API Architecture', 'Performance Optimization']
    },
    {
      icon: TrendingUp,
      title: 'TDL Token Economics',
      description: 'Detailed analysis of the TDL token utility, governance model, and economic incentives.',
      topics: ['Token Utility', 'Burn Mechanisms', 'Governance Model', 'Economic Incentives']
    },
    {
      icon: Users,
      title: 'Ecosystem & Roadmap',
      description: 'Our vision for the future of Solana security and the role of community governance.',
      topics: ['Development Roadmap', 'Community Governance', 'Partnership Strategy', 'Future Features']
    }
  ];

  const downloadFormats = [
    { format: 'PDF', size: '2.4 MB', icon: FileText },
    { format: 'EPUB', size: '1.8 MB', icon: BookOpen },
  ];

  const handleDownload = (format) => {
    // In a real implementation, this would trigger the actual download
    console.log(`Downloading whitepaper in ${format} format`);
  };

  return (
    <section id="whitepaper" className="section-padding bg-white dark:bg-dark-bg">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            Read Our <span className="text-gradient-spl">Whitepaper</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Get an in-depth understanding of SPL Shield's technology, security architecture, 
            and vision for the future of Solana DeFi security.
          </p>
          
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {downloadFormats.map((download) => (
              <button
                key={download.format}
                onClick={() => handleDownload(download.format)}
                className="btn-primary flex items-center space-x-3 group"
              >
                <download.icon className="w-5 h-5" />
                <span>Download {download.format}</span>
                <span className="text-sm opacity-75">({download.size})</span>
                <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            ))}
            <button className="btn-secondary flex items-center space-x-2">
              <span>Read Online</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Whitepaper Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {whitepaperSections.map((section, index) => (
            <div
              key={section.title}
              className="card p-8 group hover:shadow-glow-green transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                  <section.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="heading-sm text-gray-900 dark:text-white">{section.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {section.description}
              </p>

              {/* Topics */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                  Key Topics Covered:
                </h4>
                {section.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Highlights */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="heading-md mb-4">
              Key Highlights from Our Whitepaper
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Essential insights into our technology and vision
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">99.9% Accuracy</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our AI models achieve industry-leading accuracy in threat detection
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Real-time Analysis</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Sub-second response times for critical security assessments
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-tdl-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Community Driven</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Open-source development with transparent governance model
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="heading-md mb-4">
              Ready to Dive Deeper?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join our community of developers and security enthusiasts building the future of DeFi security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Join Community</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>View GitHub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whitepaper;