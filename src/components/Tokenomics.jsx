import React, { useEffect, useState } from 'react';
import { 
  DollarSign, 
  Target, 
  Coins, 
  TrendingUp,
  Users,
  Zap,
  Award,
  Megaphone,
  ArrowRight
} from 'lucide-react';

const TOTAL_SUPPLY = 1_000_000_000;
const PRESALE_TARGET = 500000;
const PRESALE_PRICE = 0.002;
const LISTING_PRICE = 0.005;
const PRESALE_START_ISO = '2024-10-23T00:00:00Z';

const Tokenomics = () => {
  const presaleStartDate = new Date(PRESALE_START_ISO);

  const calculateCountdown = () => {
    const now = new Date();
    const diff = presaleStartDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { active: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { active: true, days, hours, minutes, seconds };
  };

  const [countdown, setCountdown] = useState(calculateCountdown());

  const handlePresaleClick = () => {
    window.open('https://t.me/splshield', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Tokenomics data
  const tokenomicsData = [
    { name: 'Presale', percentage: 25, color: 'bg-tdl-purple-500', lightColor: 'bg-tdl-purple-100', darkColor: 'bg-tdl-purple-900', icon: Users },
    { name: 'Liquidity', percentage: 20, color: 'bg-blue-500', lightColor: 'bg-blue-100', darkColor: 'bg-blue-900', icon: TrendingUp },
    { name: 'Rewards', percentage: 25, color: 'bg-green-500', lightColor: 'bg-green-100', darkColor: 'bg-green-900', icon: Award },
    { name: 'Team', percentage: 15, color: 'bg-tdl-orange-500', lightColor: 'bg-tdl-orange-100', darkColor: 'bg-tdl-orange-900', icon: Users },
    { name: 'Marketing', percentage: 15, color: 'bg-yellow-500', lightColor: 'bg-yellow-100', darkColor: 'bg-yellow-900', icon: Megaphone }
  ];

  const presaleDetails = [
    { label: 'Presale Price', value: `$${PRESALE_PRICE.toFixed(3)}`, icon: DollarSign, highlight: true },
    { label: 'Listing Price', value: `$${LISTING_PRICE.toFixed(3)}`, icon: TrendingUp, highlight: false },
    { label: 'Raise Target', value: `$${PRESALE_TARGET.toLocaleString()}`, icon: Target, highlight: false },
    { label: 'Total Supply', value: TOTAL_SUPPLY.toLocaleString(), icon: Coins, highlight: false }
  ];

  // Calculate cumulative percentages for donut chart
  let cumulativePercentage = 0;
  const chartData = tokenomicsData.map(item => {
    const startAngle = cumulativePercentage;
    cumulativePercentage += item.percentage;
    return {
      ...item,
      startAngle,
      endAngle: cumulativePercentage
    };
  });

  // SVG Donut Chart Component
  const DonutChart = () => {
    const size = 280;
    const strokeWidth = 60;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          
          {/* Chart segments */}
          {chartData.map((segment, index) => {
            const strokeDasharray = `${(segment.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((segment.startAngle / 100) * circumference);
            
            return (
              <circle
                key={segment.name}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={`${segment.color.replace('bg-', 'text-')} transition-all duration-500 hover:opacity-80`}
                style={{ 
                  strokeLinecap: 'round',
                  animationDelay: `${index * 0.2}s`
                }}
              />
            );
          })}
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gradient-tdl mb-1">TDL</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Distribution</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="tokenomics" className="section-padding bg-gray-50 dark:bg-dark-surface">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            TDL Token <span className="text-gradient-tdl">Tokenomics</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transparent and fair distribution designed for long-term sustainability 
            and community growth with clear utility and value proposition.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Donut Chart Section */}
          <div className="space-y-8">
            <div className="flex justify-center">
              <DonutChart />
            </div>
            
            {/* Legend */}
            <div className="space-y-4">
          {tokenomicsData.map((item, index) => (
            <div 
              key={item.name}
              className="flex items-center justify-between p-4 bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 group hover:shadow-md transition-all duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <div className={`w-10 h-10 ${item.lightColor} dark:${item.darkColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <item.icon className={`w-5 h-5 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-white">{item.percentage}%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round((item.percentage / 100) * TOTAL_SUPPLY).toLocaleString()} TDL
                </div>
              </div>
            </div>
          ))}
        </div>
          </div>

          {/* Presale Details Section */}
          <div className="space-y-6">
            <div className="card p-8 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-tdl-purple-50 to-tdl-orange-50 dark:from-tdl-purple-900/20 dark:to-tdl-orange-900/20"></div>
              
              <div className="relative">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-tdl-gradient rounded-xl flex items-center justify-center shadow-glow-purple">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="heading-sm text-gray-900 dark:text-white">Presale Details</h3>
                    <p className="text-tdl-purple-600 dark:text-tdl-purple-400 font-medium">Limited Time Offer</p>
                  </div>
                </div>

                {/* Countdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                    <div
                      key={unit}
                      className="bg-white/70 dark:bg-dark-surface/60 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center backdrop-blur-sm"
                    >
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {String(countdown[unit]).padStart(2, '0')}
                      </div>
                      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {unit}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                  {countdown.active
                    ? 'Presale begins on October 23, 2024 at 00:00 UTC. Reserve your allocation now.'
                    : 'Presale is live – secure your allocation while supplies last.'}
                </p>

                <div className="space-y-4 mb-8">
                  {presaleDetails.map((detail, index) => (
                    <div 
                      key={detail.label}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        detail.highlight 
                          ? 'bg-tdl-gradient text-white shadow-glow-purple' 
                          : 'bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-600'
                      } transition-all duration-200 hover:scale-[1.02]`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-3">
                        <detail.icon className={`w-5 h-5 ${
                          detail.highlight ? 'text-white' : 'text-tdl-purple-500 dark:text-tdl-purple-400'
                        }`} />
                        <span className={`font-medium ${
                          detail.highlight ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {detail.label}
                        </span>
                      </div>
                      <span className={`font-bold text-lg ${
                        detail.highlight ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}>
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ROI Calculation */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 dark:text-green-300 font-medium">Potential ROI at Launch</span>
                    <span className="text-green-600 dark:text-green-400 font-bold text-xl">
                      +{Math.round(((LISTING_PRICE - PRESALE_PRICE) / PRESALE_PRICE) * 100)}%
                    </span>
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Based on listing price vs presale price
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className="btn-tdl w-full flex items-center justify-center space-x-2 text-lg"
                  type="button"
                  onClick={handlePresaleClick}
                >
                  <span>{countdown.active ? 'Join Presale Waitlist' : 'Enter Presale Portal'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Presale allocation: 25% of supply • Target raise ${PRESALE_TARGET.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-4 text-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Fixed Supply</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">No inflation</div>
              </div>
              <div className="card p-4 text-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Coins className="w-4 h-4 text-tdl-purple-500 dark:text-tdl-purple-400" />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Staking Rewards</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Community incentives</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
