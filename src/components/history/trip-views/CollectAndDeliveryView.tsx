
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
      <div className="mb-3 border-b pb-2">
        <div className="flex items-center justify-between">
          <span className="font-medium">Collected</span>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-1">
              <Check size={14} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Information */}
      <div className="mb-3">
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
      <div className="flex items-center justify-between">
        <span className="font-medium">Delivered</span>
        <div className="flex items-center">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-1">
            <Check size={14} className="text-white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectAndDeliveryView;
