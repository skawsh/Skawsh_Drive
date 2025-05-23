
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trip } from '../data/trips';
import { MapPin, User, Phone, Store } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  isEnabled?: boolean;
}

const TripCard: React.FC<TripCardProps> = ({ trip, isEnabled = true }) => {
  const navigate = useNavigate();
  
  const handleStartTrip = () => {
    if (isEnabled) {
      navigate(`/active-trip/${trip.id}`);
    }
  };

  // Determine if this is a pickup, collect, drop or delivery trip
  const isPickup = trip.action === 'PICKUP';
  const isCollect = trip.action === 'COLLECT';
  const isDrop = trip.status === 'DROP';
  const isDelivery = trip.id.startsWith('DEL-');
  const isSnoozed = trip.status === 'SNOOZED';
  
  // Set button text based on trip type
  let buttonText = 'Start Trip';
  if (isPickup) buttonText = 'Start Pickup';
  if (isCollect) buttonText = 'Start Collect';
  if (isDrop) buttonText = 'Start Drop';
  if (isDelivery) buttonText = 'Start Delivery';

  // Determine border color class
  const borderColorClass = isSnoozed ? 'border-orange-500' : 'border-gray-100';

  return (
    <div className={`bg-white rounded-lg shadow-md mb-4 p-4 border ${borderColorClass} ${!isEnabled ? 'opacity-70' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-laundry-primary">ID: {trip.id}</span>
          <h3 className="font-bold text-gray-800 text-lg">{trip.serviceType}</h3>
        </div>
        {trip.distance && (
          <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full font-medium">
            {trip.distance} km away
          </span>
        )}
      </div>
      
      <div className="mb-3">
        {(isPickup || isDelivery) ? (
          // Customer information for pickup and delivery trips
          <>
            <div className="flex items-center mt-2 text-gray-700">
              <User size={16} className="text-indigo-400 mr-2" />
              <h4 className="font-semibold">{trip.customerName}</h4>
            </div>
            <div className="flex items-center mt-2 text-gray-600">
              <Phone size={16} className="text-indigo-400 mr-2" />
              <p className="text-sm">{trip.phoneNumber}</p>
            </div>
            <div className="flex items-start mt-2 text-gray-600">
              <MapPin size={16} className="text-indigo-400 mr-2 mt-1 flex-shrink-0" />
              <p className="text-sm">{trip.address}</p>
            </div>
          </>
        ) : (
          // Laundry studio information for collect and drop trips
          <>
            <div className="flex items-center mt-2 text-gray-700">
              <Store size={16} className="text-indigo-400 mr-2" />
              <h4 className="font-semibold">
                {trip.studioName || "Sparkling Clean Studio"}
              </h4>
            </div>
            <div className="flex items-center mt-2 text-gray-600">
              <Phone size={16} className="text-indigo-400 mr-2" />
              <p className="text-sm">
                {trip.studioPhone || "+91 9876543214"}
              </p>
            </div>
            <div className="flex items-start mt-2 text-gray-600">
              <MapPin size={16} className="text-indigo-400 mr-2 mt-1 flex-shrink-0" />
              <p className="text-sm">
                {trip.studioAddress || "Madhapur, Hyderabad, India"}
              </p>
            </div>
          </>
        )}
      </div>
      
      <button
        onClick={handleStartTrip}
        disabled={!isEnabled}
        className={`w-full py-2 ${isEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-md font-medium transition-colors`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TripCard;
