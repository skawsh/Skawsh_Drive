
import React from 'react';
import { Trip } from '../../data/trips';
import CompletedTripCard from './CompletedTripCard';
import EmptyHistory from './EmptyHistory';

interface CompletedTripsListProps {
  groupedTrips: Record<string, Trip[]>;
}

const CompletedTripsList: React.FC<CompletedTripsListProps> = ({ groupedTrips }) => {
  if (Object.keys(groupedTrips).length === 0) {
    return <EmptyHistory />;
  }

  return (
    <div className="space-y-2 pb-16">
      {Object.entries(groupedTrips).map(([baseId, tripsGroup]) => (
        <CompletedTripCard key={baseId} baseId={baseId} tripsGroup={tripsGroup} />
      ))}
    </div>
  );
};

export default CompletedTripsList;
