import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-slate-800 rounded-xl overflow-hidden border border-white/5 hover:border-brand-neon/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-neon/10 hover:-translate-y-1">
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden bg-slate-900 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        {product.isTrending && (
          <div className="absolute top-2 right-2 bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            TRENDING
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                }}
                className="bg-brand-neon text-black font-bold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
             >
                <Plus size={18} /> Add to Cart
             </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-white truncate pr-2" title={product.name}>
            {product.name}
            </h3>
             <p className="text-lg font-bold text-brand-neon">₹{product.price.toFixed(2)}</p>
        </div>
        
        <p className="text-sm text-gray-400 mb-3">{product.category}</p>
        
        <div className="flex flex-wrap gap-1">
             {product.brandCompatibility.slice(0, 2).map((brand, i) => (
                 <span key={i} className="text-[10px] bg-slate-700 text-gray-300 px-2 py-0.5 rounded-sm">
                     {brand}
                 </span>
             ))}
             {product.brandCompatibility.length > 2 && (
                 <span className="text-[10px] bg-slate-700 text-gray-300 px-2 py-0.5 rounded-sm">
                     +{product.brandCompatibility.length - 2}
                 </span>
             )}
        </div>
      </div>
    </div>
  );
};