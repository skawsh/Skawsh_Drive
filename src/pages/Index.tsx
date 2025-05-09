
import React, { useState } from 'react';
import { trips, Trip } from '../data/trips';
import NavBar from '../components/NavBar';
import TripCard from '../components/TripCard';
import TripTypeToggle from '../components/TripTypeToggle';

const Index = () => {
  const [activeType, setActiveType] = useState<"EXPRESS" | "STANDARD">("STANDARD");
  
  const filteredTrips = trips.filter(trip => trip.type === activeType);
  const pickupTrips = filteredTrips.filter(trip => trip.action === "PICKUP" && trip.status === "PICKUP");
  const collectTrips = filteredTrips.filter(trip => trip.action === "COLLECT" && trip.status === "PICKUP");
  const dropTrips = filteredTrips.filter(trip => trip.status === "DROP");

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-gray-800">Trip Dashboard</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-4">
        <TripTypeToggle activeType={activeType} setActiveType={setActiveType} />
        
        {filteredTrips.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No {activeType.toLowerCase()} trips available</p>
          </div>
        ) : (
          <div>
            {dropTrips.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Drop</h2>
                <div className="space-y-4">
                  {dropTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </div>
            )}
            
            {pickupTrips.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Pick up</h2>
                <div className="space-y-4">
                  {pickupTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </div>
            )}
            
            {collectTrips.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Collect</h2>
                <div className="space-y-4">
                  {collectTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default Index;
