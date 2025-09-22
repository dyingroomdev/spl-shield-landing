import React from 'react';
import { FileText, AlertTriangle, Scale, Shield, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: `By accessing or using SPL Shield's services, including our token risk scanner, TDL token, and related platforms, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms constitute a legally binding agreement between you and SPL Shield.`
    },
    {
      id: 'services',
      title: 'Description of Services',
      icon: Shield,
      content: `SPL Shield provides AI-powered security scanning services for Solana blockchain tokens and wallets, risk analysis tools, and the TDL utility token ecosystem. Our services are designed to help users identify potential security risks and make informed decisions about their cryptocurrency investments and transactions.`
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: Users,
      content: `Users are responsible for: (a) providing accurate information, (b) maintaining the security of their accounts and private keys, (c) complying with applicable laws and regulations, (d) not using our services for illegal activities, (e) not attempting to manipulate or interfere with our systems, and (f) conducting their own due diligence before making investment decisions.`
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers and Limitations',
      icon: AlertTriangle,
      content: `Our services are provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of our risk assessments. Cryptocurrency investments carry inherent risks, and past performance does not indicate future results. Users should not rely solely on our analysis for investment decisions.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: Scale,
      content: `SPL Shield's liability is limited to the maximum extent permitted by law. We are not liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services, including but not limited to investment losses, data loss, or business interruption.`
    },
    {
      id: 'token-terms',
      title: 'TDL Token Terms',
      icon: DollarSign,
      content: `The TDL token is a utility token designed for use within the SPL Shield ecosystem. Token holders may be subject to additional terms and conditions. The value of TDL tokens may fluctuate significantly, and there is no guarantee of profit or return on investment. Regulatory treatment of tokens may change over time.`
    }
  ];

  const prohibitedUses = [
    'Illegal activities or violations of any applicable laws',
    'Money laundering, terrorist financing, or other financial crimes',
    'Manipulating or attempting to manipulate our security algorithms',
    'Distributing malware, viruses, or other harmful software',
    'Violating intellectual property rights',
    'Harassment, abuse, or threats against other users',
    'Creating multiple accounts to circumvent restrictions',
    'Automated scraping or data harvesting without permission'
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="heading-lg text-gray-900 dark:text-white">Terms of Service</h1>
              <p className="text-gray-600 dark:text-gray-400">SPL Shield - Legal Agreement</p>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These Terms of Service govern your use of SPL Shield's security scanning services, TDL token ecosystem, 
              and related platforms. Please read these terms carefully before using our services.
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <strong>Last Updated:</strong> {lastUpdated}
            </div>
          </div>
        </div>

        {/* Main Sections */}
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
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}

          {/* Prohibited Uses */}
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="heading-sm text-gray-900 dark:text-white">Prohibited Uses</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You agree not to use our services for any of the following prohibited purposes:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {prohibitedUses.map((use, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Terms Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Intellectual Property */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                <p>
                  All content, features, and functionality of our services are owned by SPL Shield and are protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
                <p>
                  Users are granted a limited, non-exclusive license to use our services for their intended purpose. 
                  This license does not include the right to reproduce, distribute, or create derivative works.
                </p>
              </div>
            </div>

            {/* Account Termination */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Account Termination</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                <p>
                  We reserve the right to suspend or terminate user accounts that violate these terms, engage in prohibited activities, 
                  or pose a security risk to our platform or other users.
                </p>
                <p>
                  Users may terminate their accounts at any time by contacting our support team. 
                  Termination does not relieve users of their obligations under these terms.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                <p>
                  These terms are governed by and construed in accordance with applicable laws. 
                  Any disputes arising from these terms will be subject to the exclusive jurisdiction of competent courts.
                </p>
                <p>
                  If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </div>
            </div>

            {/* Updates to Terms */}
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Updates to Terms</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
                <p>
                  We may update these terms from time to time to reflect changes in our services, legal requirements, 
                  or business practices. Material changes will be communicated to users.
                </p>
                <p>
                  Continued use of our services after changes to the terms constitutes acceptance of the updated terms. 
                  Users who disagree with changes should discontinue using our services.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have questions about these Terms of Service, please contact our legal team:
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
              <div>
                <p><strong>Email:</strong> legal@splshield.com</p>
                <p><strong>Subject Line:</strong> Terms of Service Inquiry</p>
              </div>
              <div>
                <p><strong>Response Time:</strong> Within 5 business days</p>
                <p><strong>Legal Department:</strong> Available Monday-Friday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;