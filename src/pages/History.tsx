
import React from 'react';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import HistoryHeader from '../components/history/HistoryHeader';
import CompletedTripsList from '../components/history/CompletedTripsList';

const History = () => {
  // Filter trips that have been completed
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED');
  
  console.log('All trips:', trips);
  console.log('Completed trips:', completedTrips);
  
  // Group trips by their base ID (excluding the prefix)
  const groupedTrips = completedTrips.reduce((groups, trip) => {
    // Extract base ID (e.g., "1234" from "PICKUP-1234")
    const baseId = trip.id.split('-')[1] || trip.id;
    
    if (!groups[baseId]) {
      groups[baseId] = [];
    }
    groups[baseId].push(trip);
    
    return groups;
  }, {});
  
  // Convert grouped trips to array format for the list component
  const groupedTripsArray = Object.entries(groupedTrips)
    .map(([baseId, tripsGroup]) => ({
      baseId,
      tripsGroup
    }))
    .sort((a, b) => {
      // Sort by newest first (assuming higher ID is newer)
      if (a.baseId > b.baseId) return -1;
      if (a.baseId < b.baseId) return 1;
      return 0;
    });
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HistoryHeader />
      
      <div className="flex-1 container mx-auto px-4 pt-16 pb-20 flex flex-col">
        <h1 className="text-xl font-bold mb-4 text-center">Order History</h1>
        <ScrollArea className="flex-1 overflow-auto">
          <CompletedTripsList groupedTrips={groupedTripsArray} />
        </ScrollArea>
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
