import React from 'react';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  selectedCategory: Category | 'All';
  onCategorySelect: (cat: Category | 'All') => void;
  onHomeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartClick, 
  selectedCategory, 
  onCategorySelect,
  onHomeClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={onHomeClick}>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-neon to-brand-purple">
              POREDDY'S
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button 
                onClick={() => onCategorySelect('All')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === 'All' ? 'text-brand-neon bg-white/10' : 'text-gray-300 hover:text-white'}`}
              >
                All
              </button>
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategorySelect(cat)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-brand-neon bg-white/10' : 'text-gray-300 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={onCartClick}
              className="p-2 text-gray-400 hover:text-brand-neon transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/4 -translate-y-1/4 bg-brand-neon rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button 
                onClick={() => { onCategorySelect('All'); setIsMenuOpen(false); }}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                All Products
              </button>
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => { onCategorySelect(cat); setIsMenuOpen(false); }}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};