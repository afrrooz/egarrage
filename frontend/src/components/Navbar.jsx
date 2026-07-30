import React from 'react';
import { Car, Wrench, Cpu, ShoppingBag, Calendar, Database, ShieldCheck, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, dbStatus }) {
  const navItems = [
    { id: 'showroom', label: 'Imported Showroom', icon: Car },
    { id: 'parts', label: 'Auto Parts', icon: ShoppingBag },
    { id: 'services', label: 'Garage Services', icon: Wrench },
    { id: 'tech', label: 'Tech & EVs', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('hero')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <Car className="w-6 h-6 text-black font-bold" />
            </div>
            <div>
              <span className="font-display text-2xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                eGARRAGE
              </span>
              <span className="block text-[10px] uppercase font-semibold text-cyan-400 tracking-widest -mt-1">
                Import & Performance Garage
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold shadow-md shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-cyan-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* DB Connection Status & CTA */}
          <div className="flex items-center space-x-4">
            <div className={`hidden lg:flex items-center space-x-2 text-xs px-3 py-1.5 rounded-full border ${
              dbStatus?.connected
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-950/40 border-amber-500/30 text-amber-400'
            }`}>
              <Database className="w-3.5 h-3.5 animate-pulse" />
              <span className="font-mono">
                {dbStatus?.connected ? 'DB: Postgres Connected' : 'DB: Connecting...'}
              </span>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 transition-all text-xs sm:text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Service</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex justify-around py-2 border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center py-1 px-3 text-xs font-medium ${
                  isActive ? 'text-cyan-400' : 'text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
