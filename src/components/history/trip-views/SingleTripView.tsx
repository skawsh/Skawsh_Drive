
import React from 'react';
import { User, Phone, MapPin, Check, Store } from 'lucide-react';
import { Trip } from '../../../data/trips';

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

export default SingleTripView;
