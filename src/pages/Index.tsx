
import React, { useState } from 'react';
import { trips, Trip } from '../data/trips';
import NavBar from '../components/NavBar';
import TripCard from '../components/TripCard';
import TripTypeToggle from '../components/TripTypeToggle';

const Index = () => {
  const [activeType, setActiveType] = useState<"EXPRESS" | "STANDARD">("STANDARD");
  
  // Filter active trips only (not completed or snoozed)
  const activeTrips = trips.filter(trip => trip.status !== 'COMPLETED' && trip.status !== 'SNOOZED');
  
  // Filter by type
  const filteredTrips = activeTrips.filter(trip => trip.type === activeType);
  
  // Sort by distance (nearest to farthest)
  const sortedTrips = [...filteredTrips].sort((a, b) => a.distance - b.distance);
  
  // Enable only the first trip
  const isEnabled = (trip: Trip) => {
    // If it's not the first trip of its type, disable it
    const firstTrip = activeTrips
      .filter(t => t.type === activeType)
      .sort((a, b) => a.distance - b.distance)[0];
    
    return trip.id === firstTrip?.id;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-gray-800">Trip Dashboard</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-4">
        <TripTypeToggle activeType={activeType} setActiveType={setActiveType} />
        
        {sortedTrips.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No {activeType.toLowerCase()} trips available</p>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {sortedTrips.map((trip) => (
              <TripCard 
                key={trip.id} 
                trip={trip} 
                isEnabled={isEnabled(trip)} 
              />
            ))}
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default Index;
