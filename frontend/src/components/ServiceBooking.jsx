import React, { useState, useEffect } from 'react';
import { createServiceBooking, fetchServiceBookings } from '../services/api';
import { Wrench, Calendar, Clock, CheckCircle2, User, Phone, Mail, Car, AlertCircle, ShieldAlert } from 'lucide-react';

export default function ServiceBooking({ initialCarModel = '' }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    car_model: initialCarModel || '',
    service_type: 'Full Tuning',
    preferred_date: '',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recentBookings, setRecentBookings] = useState([]);

  const serviceOptions = [
    'Full Tuning & Dyno Audit',
    'Stage 2/3 ECU Remapping',
    'Custom Exhaust & Intake Fitment',
    'Brake & Suspension Upgrade',
    'Battery Health & EV Diagnostics',
    'General Maintenance & Oil Service'
  ];

  useEffect(() => {
    if (initialCarModel) {
      setFormData((prev) => ({ ...prev, car_model: initialCarModel }));
    }
    loadRecentBookings();
  }, [initialCarModel]);

  const loadRecentBookings = async () => {
    try {
      const data = await fetchServiceBookings();
      setRecentBookings(data);
    } catch (err) {
      console.error('Failed to load service bookings:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await createServiceBooking(formData);
      setSuccessMessage(response.message || 'Service appointment booked successfully!');
      setFormData({
        customer_name: '',
        email: '',
        phone: '',
        car_model: '',
        service_type: 'Full Tuning & Dyno Audit',
        preferred_date: '',
        notes: '',
      });
      loadRecentBookings();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit service appointment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30 mb-2">
          <Wrench className="w-4 h-4" />
          <span>Precision Garage & Tuning Workshop</span>
        </div>
        <h2 className="font-display text-3xl font-extrabold text-white">Book Garage Service</h2>
        <p className="text-slate-400 text-sm mt-2">
          Schedule your appointment with our master mechanics & performance dyno technicians.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Booking Form Column */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>Appointment Request</span>
          </h3>

          {successMessage && (
            <div className="p-4 mb-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center space-x-3 text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 mb-6 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-300 flex items-center space-x-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Vance"
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Car Brand & Model *</label>
                <div className="relative">
                  <Car className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nissan GT-R R35 / Porsche 911"
                    value={formData.car_model}
                    onChange={(e) => setFormData({ ...formData, car_model: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Service Package *</label>
                <select
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white outline-none"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Date *</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.preferred_date}
                  onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Specific Requests / Custom Parts to Fit</label>
              <textarea
                rows="3"
                placeholder="Mention any custom specifications, target HP numbers, or parts you are bringing in..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl text-xs text-white outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.01] transition-all text-sm"
            >
              {submitting ? 'Submitting to PostgreSQL Database...' : 'Confirm Appointment Booking'}
            </button>
          </form>
        </div>

        {/* Live PostgreSQL Booking Records Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>Recent Service Requests</span>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                Live DB Records
              </span>
            </h3>

            {recentBookings.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No bookings recorded yet in database.</p>
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {recentBookings.map((b) => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{b.customer_name}</span>
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] font-semibold">
                        {b.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>🏎️ {b.car_model}</span>
                      <span>📅 {new Date(b.preferred_date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-cyan-400 text-[11px] font-medium">{b.service_type}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
