import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AIChat } from './components/AIChat';
import { PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<'home' | 'shop'>('home');

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-gray-100 selection:bg-brand-neon selection:text-black">
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onCategorySelect={(cat) => {
            setSelectedCategory(cat);
            setView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onHomeClick={() => setView('home')}
      />

      <main className="flex-1">
        {view === 'home' && (
          <>
            <Hero onShopNow={() => setView('shop')} />
            
            {/* Trending Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-extrabold text-white">Trending Now 🔥</h2>
                <button 
                  onClick={() => setView('shop')}
                  className="text-brand-neon hover:text-cyan-300 font-medium"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.filter(p => p.isTrending).map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </section>

            {/* Features/Trust Section */}
            <section className="bg-slate-900 py-16 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-slate-800 rounded-2xl border border-white/5">
                        <h3 className="text-xl font-bold text-brand-purple mb-2">Anime Verified</h3>
                        <p className="text-gray-400">Official artwork and community favorites for true fans.</p>
                    </div>
                    <div className="p-6 bg-slate-800 rounded-2xl border border-white/5">
                        <h3 className="text-xl font-bold text-brand-neon mb-2">Military Grade</h3>
                        <p className="text-gray-400">Tested drops. Tempered glass rated 9H hardness.</p>
                    </div>
                    <div className="p-6 bg-slate-800 rounded-2xl border border-white/5">
                        <h3 className="text-xl font-bold text-brand-500 mb-2">Fast Shipping</h3>
                        <p className="text-gray-400">Get your gear before the next episode drops.</p>
                    </div>
                </div>
            </section>
          </>
        )}

        {view === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h2 className="text-3xl font-bold text-white mb-2">{selectedCategory === 'All' ? 'All Collections' : selectedCategory}</h2>
            <p className="text-gray-400 mb-8">
                {filteredProducts.length} items found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <span className="text-2xl font-black text-white mb-4 block">POREDDY'S</span>
                    <p className="text-gray-400 text-sm">
                        Elevating mobile aesthetics since 2024. The ultimate destination for anime and pop-culture gear.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Shop</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="hover:text-brand-neon cursor-pointer">Anime Cases</li>
                        <li className="hover:text-brand-neon cursor-pointer">Marvel Series</li>
                        <li className="hover:text-brand-neon cursor-pointer">Tempered Glass</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Support</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li className="hover:text-brand-neon cursor-pointer">Order Tracker</li>
                        <li className="hover:text-brand-neon cursor-pointer">Return Policy</li>
                        <li className="hover:text-brand-neon cursor-pointer">Contact Us</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-brand-neon"><Facebook size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-brand-neon"><Instagram size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-brand-neon"><Twitter size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
                &copy; 2024 Poreddy's Mobile Accessories. All rights reserved.
            </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      
      <AIChat />
    </div>
  );
};

export default App;