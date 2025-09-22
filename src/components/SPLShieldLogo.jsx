import React from 'react';

const SPLShieldLogo = ({ className = "w-6 h-6", ...props }) => {
  return (
    <svg 
      viewBox="0 0 200 240" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="shieldGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      
      {/* Shield Shape */}
      <path
        d="M100 10 
           C100 10, 170 25, 170 25
           C180 30, 185 40, 185 55
           C185 55, 185 120, 185 120
           C185 150, 175 175, 155 195
           C155 195, 100 230, 100 230
           C100 230, 45 195, 45 195
           C25 175, 15 150, 15 120
           C15 120, 15 55, 15 55
           C15 40, 20 30, 30 25
           C30 25, 100 10, 100 10 Z"
        fill="url(#shieldGradient)"
        className="dark:fill-[url(#shieldGradientDark)]"
        stroke="none"
      />
      
      {/* Inner Shadow Effect */}
      <path
        d="M100 20
           C100 20, 160 32, 160 32
           C168 36, 172 44, 172 56
           C172 56, 172 115, 172 115
           C172 140, 164 160, 148 176
           C148 176, 100 205, 100 205
           C100 205, 52 176, 52 176
           C36 160, 28 140, 28 115
           C28 115, 28 56, 28 56
           C28 44, 32 36, 40 32
           C40 32, 100 20, 100 20 Z"
        fill="rgba(255,255,255,0.1)"
        stroke="none"
      />
      
      {/* Letter "S" */}
      <g fill="white">
        {/* Top part of S */}
        <path
          d="M85 75
             C85 75, 130 75, 130 75
             C140 75, 145 80, 145 90
             C145 100, 140 105, 130 105
             C130 105, 110 105, 110 105
             C110 105, 110 115, 110 115
             C110 115, 130 115, 130 115
             C135 115, 140 120, 140 125
             C140 130, 135 135, 130 135
             C130 135, 85 135, 85 135
             C75 135, 70 130, 70 120
             C70 110, 75 105, 85 105
             C85 105, 105 105, 105 105
             C105 105, 105 95, 105 95
             C105 95, 85 95, 85 95
             C80 95, 75 90, 75 85
             C75 80, 80 75, 85 75 Z"
        />
        
        {/* Bottom part of S */}
        <path
          d="M115 145
             C115 145, 160 145, 160 145
             C170 145, 175 150, 175 160
             C175 170, 170 175, 160 175
             C160 175, 140 175, 140 175
             C140 175, 140 185, 140 185
             C140 185, 160 185, 160 185
             C165 185, 170 190, 170 195
             C170 200, 165 205, 160 205
             C160 205, 115 205, 115 205
             C105 205, 100 200, 100 190
             C100 180, 105 175, 115 175
             C115 175, 135 175, 135 175
             C135 175, 135 165, 135 165
             C135 165, 115 165, 115 165
             C110 165, 105 160, 105 155
             C105 150, 110 145, 115 145 Z"
        />
      </g>
      
      {/* Highlight Effect */}
      <path
        d="M100 15
           C100 15, 155 28, 155 28
           C162 31, 165 37, 165 45
           C165 45, 165 80, 165 80
           C165 85, 162 88, 158 90
           C158 90, 100 110, 100 110"
        fill="rgba(255,255,255,0.3)"
        stroke="none"
      />
    </svg>
  );
};

export default SPLShieldLogo;