
import React from 'react';
import { trips, Trip } from '../data/trips';
import NavBar from '../components/NavBar';
import TripCard from '../components/TripCard';
import TripTypeToggle from '../components/TripTypeToggle';

const Index = () => {
  const [activeType, setActiveType] = React.useState<"EXPRESS" | "STANDARD">("STANDARD");
  
  // Filter active trips only (not completed)
  const activeTrips = trips.filter(trip => trip.status !== 'COMPLETED');
  const filteredTrips = activeTrips.filter(trip => trip.type === activeType);
  
  // Sort trips by distance (nearest to farthest)
  const sortedTrips = [...filteredTrips].sort((a, b) => a.distance - b.distance);
  
  // Find the first trip overall to enable (the closest one)
  const firstTripId = sortedTrips.length > 0 ? sortedTrips[0].id : null;

  // Function to determine if a trip should be enabled
  const isEnabled = (trip: Trip) => {
    // If this is the first trip, enable it
    if (trip.id === firstTripId) return true;
    
    // If this is a drop trip, check if corresponding pickup is completed
    if (trip.status === 'DROP') {
      // Extract the base ID to find the original pickup trip
      const baseId = trip.id.split('-')[1];
      const pickupTrip = trips.find(t => t.id === `PICKUP-${baseId}` || t.id === `EXP-${baseId}` || t.id === `STD-${baseId}`);
      return pickupTrip?.status === 'COMPLETED';
    }
    
    // If this is a delivery trip, check if corresponding collect trip is completed
    if (trip.id.startsWith('DEL-')) {
      const baseId = trip.id.split('-')[1];
      const collectTrip = trips.find(t => t.action === 'COLLECT' && t.id.includes(baseId));
      return collectTrip?.status === 'COMPLETED';
    }
    
    return false;
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
