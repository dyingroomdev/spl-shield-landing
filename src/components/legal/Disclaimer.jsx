import React from 'react';
import { AlertTriangle, TrendingDown, Shield, Info, DollarSign, Scale, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
  const navigate = useNavigate();

  const riskFactors = [
    {
      title: 'Market Volatility',
      description: 'Cryptocurrency prices can fluctuate dramatically and unpredictably, potentially resulting in significant losses.',
      icon: TrendingDown
    },
    {
      title: 'Technology Risks',
      description: 'Blockchain technology and smart contracts may contain bugs, vulnerabilities, or security flaws.',
      icon: Shield
    },
    {
      title: 'Regulatory Uncertainty',
      description: 'Cryptocurrency regulations may change, potentially affecting the legality or value of digital assets.',
      icon: Scale
    },
    {
      title: 'Liquidity Risks',
      description: 'There may be limited liquidity for tokens, making it difficult to buy or sell at desired prices.',
      icon: DollarSign
    }
  ];

  const disclaimerSections = [
    {
      id: 'investment-risk',
      title: 'Investment Risk Disclaimer',
      icon: AlertTriangle,
      content: `CRYPTOCURRENCY INVESTMENTS CARRY SUBSTANTIAL RISK OF LOSS. The value of digital assets can decrease as well as increase, and you may lose all of your invested capital. Past performance is not indicative of future results. Only invest what you can afford to lose entirely.`,
      highlight: true
    },
    {
      id: 'not-financial-advice',
      title: 'Not Financial Advice',
      icon: Info,
      content: `The information provided by SPL Shield, including risk assessments, token analysis, and market data, is for informational purposes only and does not constitute financial, investment, legal, or tax advice. Always consult with qualified professionals before making investment decisions.`,
      highlight: true
    },
    {
      id: 'accuracy-disclaimer',
      title: 'Information Accuracy',
      icon: Shield,
      content: `While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy, completeness, or reliability of any data, analysis, or recommendations provided through our services. Information may become outdated or inaccurate without notice.`
    },
    {
      id: 'third-party-content',
      title: 'Third-Party Content',
      icon: Info,
      content: `Our platform may display information from third-party sources, including blockchain data, market prices, and external analysis. We are not responsible for the accuracy or reliability of third-party content and do not endorse any third-party opinions or recommendations.`
    },
    {
      id: 'token-risks',
      title: 'Token-Specific Risks',
      icon: DollarSign,
      content: `The TDL token and other digital assets mentioned on our platform are subject to specific risks including technological obsolescence, regulatory changes, market manipulation, and total loss of value. Utility tokens may have limited or no secondary market.`
    },
    {
      id: 'technical-limitations',
      title: 'Technical Limitations',
      icon: Shield,
      content: `Our scanning and analysis tools have inherent limitations and may not detect all security vulnerabilities, scams, or risks. False positives and false negatives may occur. Users should conduct their own due diligence and not rely solely on our analysis.`
    }
  ];

  const lastUpdated = 'December 15, 2024';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-surface pt-20">
      <div className="container-custom py-12">
        
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="heading-lg text-gray-900 dark:text-white">Disclaimer</h1>
              <p className="text-gray-600 dark:text-gray-400">SPL Shield - Risk Warnings & Legal Disclaimers</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 dark:text-red-100 mb-2">IMPORTANT RISK WARNING</h3>
                <p className="text-red-800 dark:text-red-200 text-sm leading-relaxed">
                  Trading and investing in cryptocurrencies involves substantial risk of loss and is not suitable for all investors. 
                  Please read all disclaimers carefully before using our services or making any investment decisions.
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-red-600 dark:text-red-400">
              <strong>Last Updated:</strong> {lastUpdated}
            </div>
          </div>
        </div>

        {/* Main Disclaimer Sections */}
        <div className="space-y-8">
          {disclaimerSections.map((section, index) => (
            <div 
              key={section.id} 
              className={`rounded-xl shadow-sm border ${
                section.highlight 
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
                  : 'bg-white dark:bg-dark-card border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    section.highlight
                      ? 'bg-red-100 dark:bg-red-800'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <section.icon className={`w-6 h-6 ${
                      section.highlight
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <h2 className={`heading-sm ${
                    section.highlight
                      ? 'text-red-900 dark:text-red-100'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {section.title}
                  </h2>
                </div>
                <p className={`leading-relaxed ${
                  section.highlight
                    ? 'text-red-800 dark:text-red-200'
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {section.content}
                </p>
              </div>
            </div>
          ))}

          {/* Risk Factors Grid */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <h2 className="heading-sm text-gray-900 dark:text-white mb-6">Key Risk Factors</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="border border-orange-200 dark:border-orange-800 rounded-lg p-6 bg-orange-50 dark:bg-orange-900/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-800 rounded-lg flex items-center justify-center flex-shrink-0">
                        <risk.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">{risk.title}</h3>
                        <p className="text-orange-800 dark:text-orange-200 text-sm">{risk.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Disclaimers */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Jurisdiction Disclaimer */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Jurisdiction & Compliance</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                <p>
                  Our services may not be available in all jurisdictions. Users are responsible for ensuring 
                  compliance with local laws and regulations regarding cryptocurrency use and trading.
                </p>
                <p>
                  Certain features or tokens may be restricted in specific jurisdictions. We reserve the right 
                  to limit access based on geographic location or regulatory requirements.
                </p>
                <p>
                  Users accessing our services from restricted jurisdictions do so at their own risk and 
                  may be in violation of local laws.
                </p>
              </div>
            </div>

            {/* Beta Software Disclaimer */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Beta Software Notice</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                <p>
                  Some features of our platform may be in beta or experimental stages. Beta features may contain 
                  bugs, errors, or unexpected behavior that could result in loss of data or funds.
                </p>
                <p>
                  Beta features are provided "as is" without warranty. We strongly recommend using only small amounts 
                  when testing beta features and conducting thorough personal testing.
                </p>
                <p>
                  Beta features may be modified, discontinued, or removed without notice. Data or configurations 
                  from beta features may not be preserved during updates.
                </p>
              </div>
            </div>

            {/* No Warranty */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">No Warranty</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                <p>
                  Our services are provided "as is" and "as available" without warranties of any kind, either express or implied, 
                  including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
                </p>
                <p>
                  We do not warrant that our services will be uninterrupted, error-free, or free from viruses or other harmful components. 
                  We do not warrant the accuracy or reliability of any information obtained through our services.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                <p>
                  To the maximum extent permitted by law, SPL Shield shall not be liable for any direct, indirect, incidental, 
                  special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses.
                </p>
                <p>
                  Our total liability for any claims arising from your use of our services shall not exceed the amount 
                  you paid to us, if any, during the 12 months preceding the claim.
                </p>
              </div>
            </div>
          </div>

          {/* Contact for Legal Questions */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-8">
            <h2 className="text-xl font-bold mb-4">Legal Questions?</h2>
            <p className="text-gray-300 mb-6">
              If you have questions about these disclaimers or need clarification on any legal matters, 
              please consult with qualified legal and financial professionals or contact our legal team.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <p><strong>Legal Email:</strong> legal@splshield.com</p>
                <p><strong>Subject Line:</strong> Legal Disclaimer Inquiry</p>
              </div>
              <div>
                <p><strong>Response Time:</strong> Within 5 business days</p>
                <p><strong>Legal Consultation:</strong> Available upon request</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;