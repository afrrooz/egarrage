import React from 'react';
import { Car, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#050609] border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                <Car className="w-5 h-5 text-black" />
              </div>
              <span className="font-display text-xl font-black text-white">eGARRAGE</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              The premier startup destination for imported luxury cars, genuine Japanese & European auto parts, and high-performance tuning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('showroom')} className="hover:text-cyan-400">Imported Showroom</button></li>
              <li><button onClick={() => onNavigate('parts')} className="hover:text-cyan-400">Performance Auto Parts</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-cyan-400">Garage Services</button></li>
              <li><button onClick={() => onNavigate('tech')} className="hover:text-cyan-400">Latest Tech & EVs</button></li>
            </ul>
          </div>

          {/* Showroom & Workshop Hours */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Showroom Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Sunday: By Appointment Only</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3 uppercase tracking-wider">Location & Contact</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5" />
                <span>777 Performance Blvd, Automotive Hub</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+1 (800) 555-EGARRAGE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>contact@egarrage.io</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500">
          <p>© {new Date().getFullYear()} egarrage Startup. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0 text-[11px]">
            <span>3-Tier Architecture (Vite React + Express + Postgres Docker)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
