
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
  
  // Sort completed trips by their ID (as we don't have completion dates)
  // In a real app, you'd sort by completion date
  const sortedTrips = [...completedTrips].sort((a, b) => {
    // Extract numeric part of ID for comparison
    const idA = a.id.split('-')[1] || a.id;
    const idB = b.id.split('-')[1] || b.id;
    
    // Compare IDs in descending order (recent first)
    if (idA > idB) return -1;
    if (idA < idB) return 1;
    
    // If base IDs are the same, prioritize by action type
    // (DELIVERY, DROP, PICKUP, COLLECT)
    const actionOrder = { 'DELIVERY': 0, 'DROP': 1, 'PICKUP': 2, 'COLLECT': 3 };
    const actionA = a.id.startsWith('DEL-') ? 'DELIVERY' : a.action;
    const actionB = b.id.startsWith('DEL-') ? 'DELIVERY' : b.action;
    
    return (actionOrder[actionA] || 0) - (actionOrder[actionB] || 0);
  });
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HistoryHeader />
      
      <div className="flex-1 container mx-auto px-4 pt-16 pb-20 flex flex-col">
        <h1 className="text-xl font-bold mb-4 text-center">Order History</h1>
        <ScrollArea className="flex-1 overflow-auto">
          <CompletedTripsList completedTrips={sortedTrips} />
        </ScrollArea>
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
