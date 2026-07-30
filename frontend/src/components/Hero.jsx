import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Gauge, Award, ChevronRight } from 'lucide-react';

export default function Hero({ onExploreShowroom, onBookService }) {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase">
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>Next-Gen Imported Automotive Hub</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              EXCLUSIVITY IN <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">MOTION</span> & <span className="text-amber-400">PERFORMANCE</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Welcome to <strong className="text-white">egarrage</strong>. We specialize in importing iconic supercars, supplying genuine performance auto parts, and delivering precision tuning & garage services powered by advanced ECU diagnostics.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreShowroom}
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold px-8 py-4 rounded-xl shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all text-base"
              >
                <span>Explore Showroom</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onBookService}
                className="flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-4 rounded-xl border border-slate-700 hover:border-slate-500 transition-all text-base"
              >
                <span>Book Garage Service</span>
                <ChevronRight className="w-5 h-5 text-cyan-400" />
              </button>
            </div>

            {/* Metric Counters */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
              <div>
                <p className="font-display text-3xl font-extrabold text-white cyan-glow">120+</p>
                <p className="text-xs text-slate-400 uppercase font-medium tracking-wider mt-1">Imported Supercars</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-amber-400 gold-glow">4.9/5</p>
                <p className="text-xs text-slate-400 uppercase font-medium tracking-wider mt-1">Service Rating</p>
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-indigo-400">100%</p>
                <p className="text-xs text-slate-400 uppercase font-medium tracking-wider mt-1">Genuine OEM Parts</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 group">
              <img
                src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
                alt="Nissan GT-R Nismo in egarrage Showroom"
                className="w-full h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">Featured Import</span>
                    <h3 className="text-lg font-bold text-white">Nissan GT-R Nismo Spec</h3>
                    <p className="text-xs text-slate-300">600 HP | 3.8L Twin-Turbo | 0-60 in 2.5s</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/30">
                    $220,000
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
