
import React from 'react';
import { Trip } from '../../data/trips';
import { Card } from '@/components/ui/card';
import { SingleTripView } from './trip-views';
import EmptyHistory from './EmptyHistory';

interface CompletedTripsListProps {
  completedTrips: Trip[];
}

const CompletedTripsList: React.FC<CompletedTripsListProps> = ({ completedTrips }) => {
  if (completedTrips.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <div className="space-y-2 pb-24">
      {completedTrips.map((trip) => (
        <Card key={trip.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mx-1 mb-4">
          {/* Service Type and ID */}
          <div className="mb-2">
            <p className="text-sm text-blue-500">ID: {trip.id}</p>
            <h2 className="text-xl font-bold">{trip.serviceType}</h2>
          </div>
          
          {/* Display the individual trip */}
          <SingleTripView displayTrip={trip} />
        </Card>
      ))}
    </div>
  );
};

export default CompletedTripsList;
