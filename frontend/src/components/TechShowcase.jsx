import React, { useState, useEffect } from 'react';
import { fetchTechInnovations } from '../services/api';
import { Cpu, Zap, Radio, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';

export default function TechShowcase() {
  const [techItems, setTechItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTech();
  }, []);

  const loadTech = async () => {
    try {
      const data = await fetchTechInnovations();
      setTechItems(data);
    } catch (err) {
      console.error('Failed to load tech innovations:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs uppercase font-bold tracking-widest mb-1">
            <Cpu className="w-4 h-4" />
            <span>Next-Gen Innovation Labs</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-white">Latest Technology & EVs</h2>
          <p className="text-slate-400 text-sm mt-1">
            Integrating cutting-edge EV powertrains, high-voltage battery swaps, and cloud-synced ECU remapping.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-slate-900 rounded-3xl animate-pulse"></div>
          <div className="h-64 bg-slate-900 rounded-3xl animate-pulse"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techItems.map((item) => (
            <div key={item.id} className="glass-panel rounded-3xl overflow-hidden border border-cyan-500/20 p-6 flex flex-col justify-between relative group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-3 py-1 bg-cyan-950 text-cyan-400 text-xs font-bold rounded-lg border border-cyan-500/30">
                    {item.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-3 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">{item.subtitle}</p>
                </div>
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
