import React, { useState, useEffect } from 'react';
import { fetchCars } from '../services/api';
import { Gauge, Zap, Shield, CheckCircle2, ChevronRight, X, Sparkles, Filter } from 'lucide-react';

export default function CarShowroom({ onBookServiceForCar }) {
  const [cars, setCars] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [error, setError] = useState(null);

  const categories = ['All', 'JDM', 'European Luxury', 'Electric Tech'];

  useEffect(() => {
    loadCars(category);
  }, [category]);

  const loadCars = async (cat) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCars(cat);
      setCars(data);
    } catch (err) {
      setError('Unable to load imported cars catalog. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs uppercase font-bold tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Direct Imports & Supercars</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold text-white">Imported Cars Showroom</h2>
          <p className="text-slate-400 text-sm mt-1">
            Hand-selected, fully certified sports cars & luxury supercars imported with complete compliance documentation.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                category === cat
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-96 rounded-2xl bg-slate-900/60 border border-slate-800 animate-pulse"></div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-300 text-center my-8">
          <p>{error}</p>
        </div>
      )}

      {/* Cars Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-black/75 backdrop-blur-md text-cyan-400 text-xs font-bold rounded-lg border border-cyan-500/30">
                    {car.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg backdrop-blur-md ${
                    car.availability === 'In Showroom' 
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                  }`}>
                    {car.availability}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{car.brand} • {car.year}</span>
                    <span className="text-lg font-extrabold text-amber-400 font-display">
                      ${Number(car.price).toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {car.description}
                  </p>
                </div>

                <div>
                  {/* Performance Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Power</span>
                      <span className="text-xs font-bold text-cyan-400">{car.horsepower} HP</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Engine</span>
                      <span className="text-[11px] font-semibold text-slate-200 truncate block">{car.engine}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">0-60mph</span>
                      <span className="text-xs font-bold text-amber-400">{car.acceleration}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCar(car)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-200 font-bold text-xs transition-all flex items-center justify-center space-x-2"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Car Detail Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl rounded-3xl overflow-hidden border border-cyan-500/40 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCar(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-slate-300 hover:text-white flex items-center justify-center border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{selectedCar.brand} • {selectedCar.category}</span>
                  <h2 className="text-2xl font-black text-white font-display">{selectedCar.name}</h2>
                </div>
                <span className="text-2xl font-black text-amber-400 font-display">
                  ${Number(selectedCar.price).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedCar.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div>
                  <span className="text-xs text-slate-400">Horsepower</span>
                  <p className="text-sm font-bold text-white">{selectedCar.horsepower} HP</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Transmission</span>
                  <p className="text-sm font-bold text-white">{selectedCar.transmission}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Acceleration</span>
                  <p className="text-sm font-bold text-cyan-400">{selectedCar.acceleration}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Status</span>
                  <p className="text-sm font-bold text-emerald-400">{selectedCar.availability}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  onClick={() => {
                    const carName = selectedCar.name;
                    setSelectedCar(null);
                    onBookServiceForCar(carName);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold rounded-xl shadow-lg transition-all text-sm"
                >
                  Book Tuning or Inspection for this Model
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
