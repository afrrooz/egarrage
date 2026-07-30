import React, { useState, useEffect } from 'react';
import { fetchAutoParts } from '../services/api';
import { Search, ShoppingBag, Star, CheckCircle, Package, AlertCircle } from 'lucide-react';

export default function AutoPartsStore() {
  const [parts, setParts] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  const categories = ['All', 'Performance', 'Exhaust & Intake', 'Brakes & Suspension'];

  useEffect(() => {
    loadParts();
  }, [category, searchTerm]);

  const loadParts = async () => {
    setLoading(true);
    try {
      const data = await fetchAutoParts(category, searchTerm);
      setParts(data);
    } catch (err) {
      console.error('Failed to load auto parts:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (part) => {
    setCart([...cart, part]);
    setNotification(`Added "${part.name}" to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs uppercase font-bold tracking-widest mb-1">
            <Package className="w-4 h-4" />
            <span>Genuine Auto Parts & Upgrades</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-white">Performance Auto Parts</h2>
          <p className="text-slate-400 text-sm mt-1">
            Imported OEM & aftermarket high-performance components for Japanese & European sports cars.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search part name, number, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Categories & Cart Notification */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                category === cat
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cart Counter */}
        <div className="flex items-center space-x-3">
          {notification && (
            <span className="text-xs text-emerald-400 font-medium bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/30 animate-fade-in">
              {notification}
            </span>
          )}
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs text-slate-300 font-bold">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Cart Items: {cart.length}</span>
          </div>
        </div>
      </div>

      {/* Grid of Parts */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-80 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parts.map((part) => (
            <div key={part.id} className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between p-4 group">
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-3">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] font-mono text-cyan-400 rounded">
                    #{part.part_number}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{part.category}</span>
                  <div className="flex items-center text-amber-400 space-x-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="font-bold text-[11px]">{part.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-sm mb-1 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {part.name}
                </h3>

                <p className="text-[11px] text-slate-400 mb-3 line-clamp-1">
                  Fit: <span className="text-slate-300 font-medium">{part.compatibility}</span>
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mb-3">
                  <span className="text-xs text-slate-400">In Stock: {part.stock} units</span>
                  <span className="font-display font-extrabold text-base text-amber-400">
                    ${Number(part.price).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(part)}
                  className="w-full py-2 bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
