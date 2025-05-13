
import React from 'react';
import { Trip } from '../../data/trips';
import { Card } from '@/components/ui/card';
import EmptyHistory from './EmptyHistory';
import CompletedTripCard from './CompletedTripCard';

interface GroupedTrip {
  baseId: string;
  tripsGroup: Trip[];
}

interface CompletedTripsListProps {
  groupedTrips: GroupedTrip[];
}

const CompletedTripsList: React.FC<CompletedTripsListProps> = ({ groupedTrips }) => {
  if (groupedTrips.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <div className="space-y-2 pb-24">
      {groupedTrips.map(({ baseId, tripsGroup }) => (
        <CompletedTripCard 
          key={baseId} 
          baseId={baseId} 
          tripsGroup={tripsGroup} 
        />
      ))}
    </div>
  );
};

export default CompletedTripsList;
