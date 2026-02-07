import React from 'react';
import { X, Trash2, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem,
  onUpdateQuantity 
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-slate-900 border-l border-white/10 shadow-xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Your Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-gray-500">
                    <ShieldCheck size={32} />
                </div>
                <p className="text-gray-400 text-lg">Your cart is empty.</p>
                <p className="text-gray-500 text-sm">Time to protect that phone!</p>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex py-2">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-white/10">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-white">
                          <h3>{item.name}</h3>
                          <p className="ml-4 text-brand-neon">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-400">{item.category}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center space-x-2">
                           <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center hover:bg-slate-600"
                                disabled={item.quantity <= 1}
                           >-</button>
                           <span className="text-white font-mono">{item.quantity}</span>
                           <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center hover:bg-slate-600"
                           >+</button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="font-medium text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-white/10 px-4 py-6 bg-slate-800/50">
              <div className="flex justify-between text-base font-medium text-white mb-4">
                <p>Subtotal</p>
                <p>₹{subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-400 mb-6">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-brand-neon px-6 py-3 text-base font-bold text-black shadow-sm hover:bg-cyan-300 transition-colors"
                onClick={() => alert("Checkout functionality would go here!")}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};