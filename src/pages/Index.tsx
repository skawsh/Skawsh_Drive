
import React, { useState } from 'react';
import { trips, Trip } from '../data/trips';
import NavBar from '../components/NavBar';
import TripCard from '../components/TripCard';
import TripTypeToggle from '../components/TripTypeToggle';

const Index = () => {
  const [activeType, setActiveType] = useState<"EXPRESS" | "STANDARD">("STANDARD");
  
  // Filter active trips only (not completed)
  const activeTrips = trips.filter(trip => trip.status !== 'COMPLETED');
  
  // Handle snoozed trips
  const nonSnoozedTrips = activeTrips.filter(trip => trip.status !== 'SNOOZED');
  const nextOrderSnoozedTrips = activeTrips.filter(
    trip => trip.status === 'SNOOZED' && trip.snoozedUntil === 'NEXT_ORDER'
  );
  const lastOrderSnoozedTrips = activeTrips.filter(
    trip => trip.status === 'SNOOZED' && trip.snoozedUntil === 'LAST_ORDER'
  );
  
  // Create the ordered trips array
  let orderedTrips = [...nonSnoozedTrips];
  
  // Append snooze-till-next-order trips after the first trip
  if (nextOrderSnoozedTrips.length > 0 && nonSnoozedTrips.length > 0) {
    orderedTrips = [
      nonSnoozedTrips[0],
      ...nextOrderSnoozedTrips,
      ...nonSnoozedTrips.slice(1)
    ];
  }
  
  // Append last-order snoozed trips at the end
  orderedTrips = [...orderedTrips, ...lastOrderSnoozedTrips];
  
  // Filter by type after reordering
  const filteredTrips = orderedTrips.filter(trip => trip.type === activeType);
  
  // Sort by distance (nearest to farthest)
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    // Snoozed trips should maintain their position
    if (a.status === 'SNOOZED' && b.status !== 'SNOOZED') return 1;
    if (a.status !== 'SNOOZED' && b.status === 'SNOOZED') return -1;
    
    // Sort non-snoozed trips by distance
    return a.distance - b.distance;
  });
  
  // Enable only the first trip
  const isEnabled = (trip: Trip) => {
    // If it's not the first non-snoozed trip of its type, disable it
    const firstNonSnoozedTrip = nonSnoozedTrips
      .filter(t => t.type === activeType)
      .sort((a, b) => a.distance - b.distance)[0];
    
    return trip.id === firstNonSnoozedTrip?.id;
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
