import React from 'react';
import { Shield, Eye, Lock, Users, Database, Globe, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We may collect personal information such as email addresses, wallet addresses, and contact details when you voluntarily provide them through our contact forms, newsletter subscriptions, or when using our services.'
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect information about how you interact with our services, including IP addresses, browser types, device information, and usage patterns to improve our security scanning services.'
        },
        {
          subtitle: 'Blockchain Data',
          text: 'Our scanning services analyze publicly available blockchain data including transaction histories, token holdings, and smart contract interactions to provide risk assessments.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use collected information to provide, maintain, and improve our security scanning services, risk analysis tools, and customer support.'
        },
        {
          subtitle: 'Security Enhancement',
          text: 'Your data helps us enhance our AI algorithms, detect new threats, and improve the accuracy of our risk assessment models.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your contact information to send important updates about our services, security alerts, or respond to your inquiries.'
        }
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection & Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmission is encrypted using industry-standard TLS encryption. Sensitive data is encrypted at rest using AES-256 encryption.'
        },
        {
          subtitle: 'Access Control',
          text: 'We implement strict access controls and authentication mechanisms to ensure only authorized personnel can access user data.'
        },
        {
          subtitle: 'Data Minimization',
          text: 'We collect and retain only the minimum amount of data necessary to provide our services effectively.'
        }
      ]
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing',
      icon: Users,
      content: [
        {
          subtitle: 'Third-Party Services',
          text: 'We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data for research and improvement purposes.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information when required by law, regulation, or legal process, or to protect our rights and the safety of our users.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share information with trusted service providers who assist in operating our services, subject to strict confidentiality agreements.'
        }
      ]
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
            <div className="w-16 h-16 bg-spl-gradient rounded-xl flex items-center justify-center shadow-glow-green">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="heading-lg text-gray-900 dark:text-white">Privacy Policy</h1>
              <p className="text-gray-600 dark:text-gray-400">SPL Shield - Security First</p>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At SPL Shield, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and protect your data when you use our Solana security scanning 
              services and TDL token ecosystem.
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <strong>Last Updated:</strong> {lastUpdated}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.id} className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="heading-sm text-gray-900 dark:text-white">{section.title}</h2>
                </div>

                <div className="space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Additional Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Your Rights */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Access and review your personal data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Request correction of inaccurate data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Request deletion of your personal data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Withdraw consent for data processing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Data portability rights</span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, contact us:
              </p>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p><strong>Email:</strong> privacy@splshield.com</p>
                <p><strong>Address:</strong> SPL Shield Legal Department</p>
                <p><strong>Response Time:</strong> Within 30 days</p>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
            <div className="flex items-start space-x-3">
              <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">International Users</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  SPL Shield operates globally and complies with applicable privacy laws including GDPR, CCPA, and other regional privacy regulations. 
                  This policy may be updated periodically to reflect changes in our practices or legal requirements. We will notify users of any 
                  material changes through our website or email communications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;