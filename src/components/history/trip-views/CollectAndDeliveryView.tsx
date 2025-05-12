
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

export default CollectAndDeliveryView;
