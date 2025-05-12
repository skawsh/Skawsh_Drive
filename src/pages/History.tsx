
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
  
  return (
    <div className="min-h-screen bg-white">
      <HistoryHeader />
      
      <div className="container mx-auto px-4 pt-20 pb-20">
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <CompletedTripsList groupedTrips={groupedTrips} />
        </ScrollArea>
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
