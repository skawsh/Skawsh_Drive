
import React from 'react';
import { User, Phone, MapPin, Check, Store } from 'lucide-react';
import { Trip } from '../../../data/trips';

interface SingleTripViewProps {
  displayTrip: Trip;
}

const SingleTripView: React.FC<SingleTripViewProps> = ({ displayTrip }) => {
  // Determine what kind of trip this is
  const isPickup = displayTrip.action === 'PICKUP';
  const isCollect = displayTrip.action === 'COLLECT';
  const isDrop = displayTrip.status === 'DROP' || displayTrip.id.includes('DROP-');
  const isDelivery = displayTrip.id.startsWith('DEL-');
  
  // Determine status label
  let statusLabel = "Completed";
  if (isPickup) statusLabel = "Picked Up";
  if (isCollect) statusLabel = "Collected";
  if (isDrop) statusLabel = "Dropped off";
  if (isDelivery) statusLabel = "Delivered";
  
  return (
    <>
      {/* Display info based on what trip type we have */}
      <div className="mb-3">
        {isPickup || isDelivery ? (
          // Customer information for pickup/delivery
          <>
            <div className="flex items-center">
              <User size={16} className="text-blue-400 mr-2" />
              <h4 className="font-medium text-gray-700">{displayTrip.customerName}</h4>
            </div>
            <div className="flex items-center mt-1">
              <Phone size={16} className="text-blue-400 mr-2" />
              <p className="text-sm text-gray-600">{displayTrip.phoneNumber}</p>
            </div>
            <div className="flex items-start mt-1">
              <MapPin size={16} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">{displayTrip.address}</p>
            </div>
          </>
        ) : (
          // Studio information for collect/drop
          <>
            <div className="flex items-center">
              <Store size={16} className="text-blue-400 mr-2" />
              <h4 className="font-medium text-gray-700">
                {displayTrip.studioName || "Sparkling Clean Studio"}
              </h4>
            </div>
            <div className="flex items-center mt-1">
              <Phone size={16} className="text-blue-400 mr-2" />
              <p className="text-sm text-gray-600">
                {displayTrip.studioPhone || "+91 9876543214"}
              </p>
            </div>
            <div className="flex items-start mt-1">
              <MapPin size={16} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                {displayTrip.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}
              </p>
            </div>
          </>
        )}
      </div>
      
      {/* Status */}
      <div className="flex justify-center mt-2">
        <button className="bg-white border border-gray-200 text-green-600 font-medium rounded-md px-4 py-1 flex items-center">
          {statusLabel} <Check size={16} className="ml-1 text-green-500" />
        </button>
      </div>
    </>
  );
};

export default SingleTripView;
