
import React from 'react';
import { Trip } from '../../data/trips';
import { Card } from '@/components/ui/card';
import { 
  CollectAndDeliveryView, 
  PickupAndDropView, 
  SingleTripView 
} from './trip-views';

interface CompletedTripCardProps {
  baseId: string;
  tripsGroup: Trip[];
}

const CompletedTripCard: React.FC<CompletedTripCardProps> = ({ baseId, tripsGroup }) => {
  // Find different trip types
  const pickupTrip = tripsGroup.find(t => t.action === 'PICKUP' && !t.id.startsWith('DEL-')) || tripsGroup[0];
  const collectTrip = tripsGroup.find(t => t.action === 'COLLECT');
  const dropTrip = tripsGroup.find(t => t.status === 'DROP');
  const deliveryTrip = tripsGroup.find(t => t.id.startsWith('DEL-'));
  
  // Use this trip for display (prefer pickup but use any available)
  const displayTrip = pickupTrip || collectTrip || dropTrip || deliveryTrip;
  
  // Check if we have both collection and delivery completed
  const hasCollectAndDelivery = collectTrip && deliveryTrip;
  
  // For traditional pickup/drop flow
  const hasPickupAndDrop = pickupTrip && dropTrip;

  return (
    <Card key={baseId} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mx-1 mb-4">
      {/* Service Type and ID */}
      <div className="mb-2">
        <p className="text-sm text-blue-500">ID: {displayTrip.id}</p>
        <h2 className="text-xl font-bold">{displayTrip.serviceType}</h2>
      </div>
      
      {/* Trip Details View - different view based on trip types */}
      {hasCollectAndDelivery ? (
        <CollectAndDeliveryView collectTrip={collectTrip} deliveryTrip={deliveryTrip} />
      ) : hasPickupAndDrop ? (
        <PickupAndDropView pickupTrip={pickupTrip} dropTrip={dropTrip} />
      ) : (
        <SingleTripView displayTrip={displayTrip} />
      )}
    </Card>
  );
};

export default CompletedTripCard;
