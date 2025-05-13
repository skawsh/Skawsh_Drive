
import React from 'react';
import { User, Phone, MapPin, Check, Store } from 'lucide-react';
import { Trip } from '../../../data/trips';

interface PickupAndDropViewProps {
  pickupTrip: Trip;
  dropTrip: Trip;
}

const PickupAndDropView: React.FC<PickupAndDropViewProps> = ({ pickupTrip, dropTrip }) => {
  return (
    <>
      {/* Customer Information */}
      <div className="mb-3">
        <div className="flex items-center text-gray-700">
          <User size={16} className="text-blue-400 mr-2" />
          <h4 className="font-medium">{pickupTrip.customerName}</h4>
        </div>
        <div className="flex items-center mt-1 text-gray-600">
          <Phone size={16} className="text-blue-400 mr-2" />
          <p className="text-sm">{pickupTrip.phoneNumber}</p>
        </div>
        <div className="flex items-start mt-1 text-gray-600">
          <MapPin size={16} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{pickupTrip.address}</p>
        </div>
      </div>
      
      {/* Picked Up Status */}
      <div className="mb-3 border-b pb-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">Picked Up</span>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-1">
              <Check size={14} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Studio Information */}
      <div className="mb-3">
        <div className="flex items-center text-gray-700">
          <Store size={16} className="text-blue-400 mr-2" />
          <h4 className="font-medium">{dropTrip.studioName || "Sparkling Clean Studio"}</h4>
        </div>
        <div className="flex items-center mt-1 text-gray-600">
          <Phone size={16} className="text-blue-400 mr-2" />
          <p className="text-sm">{dropTrip.studioPhone || "+91 9876543214"}</p>
        </div>
        <div className="flex items-start mt-1 text-gray-600">
          <MapPin size={16} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{dropTrip.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}</p>
        </div>
      </div>
      
      {/* Dropped Off Status */}
      <div className="flex items-center justify-between">
        <span className="font-medium">Dropped off</span>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-1">
            <Check size={14} className="text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PickupAndDropView;
