
import React, { useState } from 'react';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import HistoryHeader from '../components/history/HistoryHeader';
import CompletedTripsList from '../components/history/CompletedTripsList';
import ReportedTripsList from '../components/history/ReportedTripsList';
import HistoryTabs from '../components/history/HistoryTabs';
import { TabsContent } from '@/components/ui/tabs';
import { Trip } from '../data/trips';

const History = () => {
  const [activeTab, setActiveTab] = useState('completed');
  
  // Filter trips that have been completed
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED' && !trip.reportedIssue);
  
  // Filter trips that have reported issues
  const reportedTrips = trips.filter(trip => trip.reportedIssue !== undefined);
  
  console.log('All trips:', trips);
  console.log('Completed trips:', completedTrips);
  console.log('Reported trips:', reportedTrips);
  
  // Group trips by their base ID (excluding the prefix)
  const groupedTrips: {[key: string]: Trip[]} = completedTrips.reduce((groups: {[key: string]: Trip[]}, trip) => {
    // Extract base ID (e.g., "1234" from "PICKUP-1234" or "STD-1234")
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
        <ScrollArea className="flex-1 overflow-auto">
          <HistoryTabs 
            activeTab={activeTab}
            completedCount={completedTrips.length}
            reportedCount={reportedTrips.length}
            onTabChange={setActiveTab}
          >
            <TabsContent value="completed">
              <CompletedTripsList groupedTrips={groupedTripsArray} />
            </TabsContent>
            <TabsContent value="reported">
              <ReportedTripsList reportedTrips={reportedTrips} />
            </TabsContent>
          </HistoryTabs>
        </ScrollArea>
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
