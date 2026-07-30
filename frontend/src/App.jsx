import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarShowroom from './components/CarShowroom';
import AutoPartsStore from './components/AutoPartsStore';
import ServiceBooking from './components/ServiceBooking';
import TechShowcase from './components/TechShowcase';
import Footer from './components/Footer';
import { fetchHealthStatus } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [dbStatus, setDbStatus] = useState({ connected: false });
  const [selectedCarForService, setSelectedCarForService] = useState('');

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    const health = await fetchHealthStatus();
    if (health && health.database) {
      setDbStatus(health.database);
    }
  };

  const handleBookServiceForCar = (carName) => {
    setSelectedCarForService(carName);
    setActiveTab('services');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07080c] text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* Sticky Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        dbStatus={dbStatus} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'hero' && (
          <>
            <Hero 
              onExploreShowroom={() => setActiveTab('showroom')}
              onBookService={() => setActiveTab('services')}
            />
            <div className="space-y-16 pb-12">
              <CarShowroom onBookServiceForCar={handleBookServiceForCar} />
              <AutoPartsStore />
              <TechShowcase />
            </div>
          </>
        )}

        {activeTab === 'showroom' && (
          <CarShowroom onBookServiceForCar={handleBookServiceForCar} />
        )}

        {activeTab === 'parts' && (
          <AutoPartsStore />
        )}

        {activeTab === 'services' && (
          <ServiceBooking initialCarModel={selectedCarForService} />
        )}

        {activeTab === 'tech' && (
          <TechShowcase />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
