
import React from 'react';
import { User, Phone, MapPin, Check, Store } from 'lucide-react';
import { Trip } from '../../../data/trips';

interface CollectAndDeliveryViewProps {
  collectTrip: Trip;
  deliveryTrip: Trip;
}

const CollectAndDeliveryView: React.FC<CollectAndDeliveryViewProps> = ({ collectTrip, deliveryTrip }) => {
  return (
    <>
      {/* Studio Information */}
      <div className="mb-3">
        <div className="flex items-center text-gray-700">
          <Store size={16} className="text-blue-400 mr-2" />
          <h4 className="font-medium">{collectTrip?.studioName || "Sparkling Clean Studio"}</h4>
        </div>
        <div className="flex items-center mt-1 text-gray-600">
          <Phone size={16} className="text-blue-400 mr-2" />
          <p className="text-sm">{collectTrip?.studioPhone || "+91 9876543214"}</p>
        </div>
        <div className="flex items-start mt-1 text-gray-600">
          <MapPin size={16} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{collectTrip?.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}</p>
        </div>
      </div>
      
      {/* Collection Status */}
      <div className="flex justify-center my-2">
        <button className="bg-white border border-gray-200 text-green-600 font-medium rounded-md px-4 py-1 flex items-center">
          Collected <Check size={16} className="ml-1 text-green-500" />
        </button>
      </div>
      
      {/* Customer Information */}
      <div className="mt-3 mb-2">
        <div className="flex items-center text-gray-700">
          <User size={16} className="text-blue-400 mr-2" />
          <h4 className="font-medium">{deliveryTrip?.customerName}</h4>
        </div>
        <div className="flex items-center mt-1 text-gray-600">
          <Phone size={16} className="text-blue-400 mr-2" />
          <p className="text-sm">{deliveryTrip?.phoneNumber}</p>
        </div>
        <div className="flex items-start mt-1 text-gray-600">
          <MapPin size={16} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{deliveryTrip?.address}</p>
        </div>
        <div className="mt-1 font-medium text-sm">Payment: COD</div>
      </div>
      
      {/* Delivery Status */}
      <div className="flex justify-center mt-2">
        <button className="bg-white border border-gray-200 text-green-600 font-medium rounded-md px-4 py-1 flex items-center">
          Delivered <Check size={16} className="ml-1 text-green-500" />
        </button>
      </div>
    </>
  );
};

export default CollectAndDeliveryView;
