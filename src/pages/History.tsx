
import React from 'react';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import HistoryHeader from '../components/history/HistoryHeader';
import CompletedTripsList from '../components/history/CompletedTripsList';

const History = () => {
  // Filter trips that have been completed
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED');
  
  // Group completed trips by their base ID (without the PICKUP/DROP/DEL prefix)
  const groupedTrips = completedTrips.reduce((acc, trip) => {
    // Extract the base ID
    const baseId = trip.id.includes('-') ? trip.id.split('-')[1] : trip.id;
    if (!acc[baseId]) {
      acc[baseId] = [];
    }
    acc[baseId].push(trip);
    return acc;
  }, {} as Record<string, typeof trips>);
  
  // Sort grouped trips by most recent completion date
  // Since we don't have completion dates, we'll just use the order in the array
  // In a real app, you'd sort by completion date
  const sortedGroupedTrips = Object.fromEntries(
    Object.entries(groupedTrips).reverse()
  );
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HistoryHeader />
      
      <div className="flex-1 container mx-auto px-4 pt-16 pb-20 flex flex-col">
        <h1 className="text-xl font-bold mb-4 text-center">Order History</h1>
        <ScrollArea className="flex-1 overflow-auto">
          <CompletedTripsList groupedTrips={sortedGroupedTrips} />
        </ScrollArea>
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
