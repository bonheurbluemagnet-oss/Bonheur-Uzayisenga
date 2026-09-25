import React from 'react';
import ishemaLogoImg from '../assets/images/ishema_express_logo_1789734542599.jpg';

interface IshemaLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'mark';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const IshemaLogo: React.FC<IshemaLogoProps> = ({
  className = '',
  variant = 'horizontal',
  theme = 'light',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: variant === 'mark' ? 'w-9 h-9' : 'h-9',
    md: variant === 'mark' ? 'w-12 h-12' : 'h-12',
    lg: variant === 'mark' ? 'w-16 h-16' : 'h-16',
    xl: variant === 'mark' ? 'w-24 h-24' : 'h-24'
  };

  // If mark only: clean emblem with courier on motorcycle and yellow cargo box
  if (variant === 'mark') {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-100 ${sizeClasses[size]} ${className}`}
      >
        <img
          src={ishemaLogoImg}
          alt="Ishema Express Logo Mark"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-0.5"
        />
      </div>
    );
  }

  // Full stacked badge or emblem (e.g. for hero or about section)
  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <img
          src={ishemaLogoImg}
          alt="Ishema Express - Shop • Send • Deliver"
          referrerPolicy="no-referrer"
          className={`${
            size === 'xl' ? 'w-52 h-52' : size === 'lg' ? 'w-40 h-40' : 'w-32 h-32'
          } object-contain rounded-2xl bg-white p-2 shadow-md border border-slate-100`}
        />
      </div>
    );
  }

  // Default: Horizontal navbar / header format (Rider logo mark + ISHEMA EXPRESS text)
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Motorcycle Courier Logo Badge */}
      <div className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
        <img
          src={ishemaLogoImg}
          alt="Ishema Express"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-heading font-black text-xl sm:text-2xl tracking-tight italic ${
              theme === 'dark' ? 'text-white' : 'text-[#0047AB]'
            }`}
          >
            ISHEMA
          </span>
          <span className="font-heading font-black text-xl sm:text-2xl tracking-tight italic text-[#FFB800]">
            EXPRESS
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase font-interface ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Shop <span className="text-[#FFB800]">•</span> Send <span className="text-[#FFB800]">•</span> Deliver
          </span>
        </div>
      </div>
    </div>
  );
};
