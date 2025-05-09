
import React from 'react';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import TripCard from '../components/TripCard';
import { Archive } from 'lucide-react';

const History = () => {
  // Filter trips that have been completed
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-gray-800">Order History</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-4">
        {completedTrips.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center">
            <Archive size={48} className="text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No completed orders yet</p>
            <p className="text-gray-400">Completed orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
