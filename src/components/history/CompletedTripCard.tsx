
import React from 'react';
import { Trip } from '../../data/trips';
import { User, Phone, MapPin, Check, Store } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CompletedTripCardProps {
  baseId: string;
  tripsGroup: Trip[];
}

const CompletedTripCard: React.FC<CompletedTripCardProps> = ({ baseId, tripsGroup }) => {
  // Find pickup, collect, drop and delivery trips
  const pickupTrip = tripsGroup.find(t => t.action === 'PICKUP' && !t.id.startsWith('DEL-')) || tripsGroup[0];
  const collectTrip = tripsGroup.find(t => t.action === 'COLLECT');
  const dropTrip = tripsGroup.find(t => t.action === 'DROP');
  const deliveryTrip = tripsGroup.find(t => t.id.startsWith('DEL-'));
  
  // Use this trip for display (prefer pickup but use any available)
  const displayTrip = pickupTrip || collectTrip || dropTrip || deliveryTrip;
  
  // Check if we have both collection and delivery completed
  const hasCollectAndDelivery = collectTrip && deliveryTrip;
  
  // For traditional pickup/drop flow
  const hasPickupAndDrop = pickupTrip && dropTrip;

  // Display ID at the bottom for a cleaner look
  return (
    <Card key={baseId} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mx-1">
      {/* Service Type */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">{displayTrip.serviceType}</h2>
      </div>
      
      {/* Collection and Delivery UI - Show when both exist */}
      {hasCollectAndDelivery ? (
        <CollectAndDeliveryView collectTrip={collectTrip} deliveryTrip={deliveryTrip} />
      ) : hasPickupAndDrop ? (
        <PickupAndDropView pickupTrip={pickupTrip} dropTrip={dropTrip} />
      ) : (
        <SingleTripView displayTrip={displayTrip} />
      )}
      
      {/* Order ID */}
      <div className="mt-4 pt-2 border-t border-gray-100">
        <p className="text-sm text-blue-500">ID: {displayTrip.id}</p>
      </div>
    </Card>
  );
};

interface CollectAndDeliveryViewProps {
  collectTrip: Trip;
  deliveryTrip: Trip;
}

const CollectAndDeliveryView: React.FC<CollectAndDeliveryViewProps> = ({ collectTrip, deliveryTrip }) => {
  return (
    <>
      {/* Studio Information */}
      <div className="mb-4">
        <div className="flex items-center text-gray-700">
          <Store size={16} className="text-blue-400 mr-2" />
          <h4 className="font-medium">
            {collectTrip?.studioName || "Sparkling Clean Studio"}
          </h4>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <Phone size={16} className="text-blue-400 mr-2" />
          <p>
            {collectTrip?.studioPhone || "+91 9876543214"}
          </p>
        </div>
        <div className="flex items-start mt-2 text-gray-600">
          <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
          <p>
            {collectTrip?.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}
          </p>
        </div>
      </div>
      
      {/* Collection Status */}
      <div className="mb-4">
        <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
          <span className="font-medium">Collected</span>
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
        </div>
      </div>
      
      {/* Customer Information */}
      <div className="mb-4">
        <div className="flex items-center text-gray-700">
          <User size={16} className="text-blue-400 mr-2" />
          <h4 className="font-medium">{deliveryTrip?.customerName}</h4>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <Phone size={16} className="text-blue-400 mr-2" />
          <p>{deliveryTrip?.phoneNumber}</p>
        </div>
        <div className="flex items-start mt-2 text-gray-600">
          <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
          <p>{deliveryTrip?.address}</p>
        </div>
        <div className="mt-2 font-medium">Payment: COD</div>
      </div>
      
      {/* Delivery Status */}
      <div className="mb-1">
        <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
          <span className="font-medium">Delivered</span>
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

interface PickupAndDropViewProps {
  pickupTrip: Trip;
  dropTrip: Trip;
}

const PickupAndDropView: React.FC<PickupAndDropViewProps> = ({ pickupTrip, dropTrip }) => {
  return (
    <>
      {/* Studio Information */}
      <div className="mb-4">
        <div className="flex items-center text-gray-700">
          <Store size={16} className="text-blue-400 mr-2" />
          <h4 className="font-medium">{dropTrip.studioName || "Sparkling Clean Studio"}</h4>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <Phone size={16} className="text-blue-400 mr-2" />
          <p>{dropTrip.studioPhone || "+91 9876543214"}</p>
        </div>
        <div className="flex items-start mt-2 text-gray-600">
          <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
          <p>{dropTrip.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}</p>
        </div>
      </div>
      
      {/* Collected Status */}
      <div className="mb-4">
        <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
          <span className="font-medium">Collected</span>
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
        </div>
      </div>
      
      {/* Customer Information */}
      <div className="mb-4">
        <div className="flex items-center text-gray-700">
          <User size={16} className="text-blue-400 mr-2" />
          <h4 className="font-medium">{pickupTrip.customerName}</h4>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <Phone size={16} className="text-blue-400 mr-2" />
          <p>{pickupTrip.phoneNumber}</p>
        </div>
        <div className="flex items-start mt-2 text-gray-600">
          <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
          <p>{pickupTrip.address}</p>
        </div>
        <div className="mt-2 font-medium">Payment: COD</div>
      </div>
      
      {/* Delivered Status */}
      <div className="mb-1">
        <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
          <span className="font-medium">Delivered</span>
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

interface SingleTripViewProps {
  displayTrip: Trip;
}

const SingleTripView: React.FC<SingleTripViewProps> = ({ displayTrip }) => {
  return (
    <>
      {/* Display info based on what trip type we have */}
      <div className="mb-4">
        {displayTrip.action === 'PICKUP' || displayTrip.id.startsWith('DEL-') ? (
          // Customer information for pickup/delivery
          <>
            <div className="flex items-center mt-2">
              <User size={16} className="text-blue-400 mr-2" />
              <h4 className="font-medium text-gray-700">{displayTrip.customerName}</h4>
            </div>
            <div className="flex items-center mt-2">
              <Phone size={16} className="text-blue-400 mr-2" />
              <p className="text-gray-600">{displayTrip.phoneNumber}</p>
            </div>
            <div className="flex items-start mt-2">
              <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
              <p className="text-gray-600">{displayTrip.address}</p>
            </div>
          </>
        ) : (
          // Studio information for collect/drop
          <>
            <div className="flex items-center mt-2">
              <Store size={16} className="text-blue-400 mr-2" />
              <h4 className="font-medium text-gray-700">
                {displayTrip.studioName || "Sparkling Clean Studio"}
              </h4>
            </div>
            <div className="flex items-center mt-2">
              <Phone size={16} className="text-blue-400 mr-2" />
              <p className="text-gray-600">
                {displayTrip.studioPhone || "+91 9876543214"}
              </p>
            </div>
            <div className="flex items-start mt-2">
              <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
              <p className="text-gray-600">
                {displayTrip.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}
              </p>
            </div>
          </>
        )}
      </div>
      
      {/* Simple completed status */}
      <div className="mb-1">
        <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
          <span className="font-medium">Completed</span>
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={16} className="text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedTripCard;
