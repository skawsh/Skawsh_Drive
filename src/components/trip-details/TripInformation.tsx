
import React from 'react';
import { MapPin } from 'lucide-react';
import { Trip } from '../../data/trips';

interface TripInformationProps {
  trip: Trip;
  isDrop: boolean;
  isCollect: boolean;
}

const TripInformation: React.FC<TripInformationProps> = ({ trip, isDrop, isCollect }) => {
  return (
    <div className="mb-6">
      {(isDrop || isCollect) ? (
        // Studio information for drop/collect trips
        <>
          <h3 className="font-semibold text-lg">{trip.studioName || "Sparkling Clean Studio"}</h3>
          <p className="text-gray-600">{trip.studioPhone || "+91 9876543214"}</p>
          <div className="flex items-start mt-2">
            <MapPin size={18} className="text-gray-500 mr-1 mt-1 flex-shrink-0" />
            <p className="text-gray-700">{trip.studioAddress || "Madhapur, Hyderabad, India"}</p>
          </div>
        </>
      ) : (
        // Customer information for pickup trips
        <>
          <h3 className="font-semibold text-lg">{trip.customerName}</h3>
          <p className="text-gray-600">{trip.phoneNumber}</p>
          <div className="flex items-start mt-2">
            <MapPin size={18} className="text-gray-500 mr-1 mt-1 flex-shrink-0" />
            <p className="text-gray-700">{trip.address}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default TripInformation;
