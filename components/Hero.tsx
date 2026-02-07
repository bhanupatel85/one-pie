import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative pt-20 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            Protect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-purple">Vibe</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-8">
            The world's trendiest cases, from Hidden Leaf Village to Stark Tower. 
            Premium protection meets elite aesthetics.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={onShopNow}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-brand-neon hover:bg-cyan-300 transition-all transform hover:scale-105"
            >
              Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-3 border border-white/20 text-base font-medium rounded-full text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all">
              View Lookbook
            </button>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-purple rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-neon rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};