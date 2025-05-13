
import React from 'react';
import { Trip } from '../../data/trips';
import { Card } from '@/components/ui/card';
import EmptyHistory from './EmptyHistory';
import ReportedTripCard from './ReportedTripCard';

interface ReportedTripsListProps {
  reportedTrips: Trip[];
}

const ReportedTripsList: React.FC<ReportedTripsListProps> = ({ reportedTrips }) => {
  if (reportedTrips.length === 0) {
    return (
      <div className="pt-4">
        <EmptyHistory message="No reported issues found" />
      </div>
    );
  }

  return (
    <div className="space-y-2 pb-24">
      {reportedTrips.map((trip) => (
        <ReportedTripCard 
          key={trip.id} 
          trip={trip} 
        />
      ))}
    </div>
  );
};

export default ReportedTripsList;
