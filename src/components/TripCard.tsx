
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trip } from '../data/trips';
import { MapPin } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const navigate = useNavigate();
  
  const handleStartTrip = () => {
    navigate(`/active-trip/${trip.id}`);
  };

  const buttonText = `Start ${trip.action === 'PICKUP' ? 'Pick up' : 'Collect'}`;

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-4 border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-laundry-primary">{trip.id}</span>
          <h3 className="font-bold text-gray-800">{trip.serviceType}</h3>
        </div>
        <span className="text-sm text-gray-500 font-medium">
          {trip.distance} km away
        </span>
      </div>
      
      <div className="mb-3">
        <h4 className="font-semibold text-gray-800">{trip.customerName}</h4>
        <p className="text-sm text-gray-600">{trip.phoneNumber}</p>
        <div className="flex items-start mt-1">
          <MapPin size={16} className="text-gray-400 mt-1 flex-shrink-0" />
          <p className="text-sm text-gray-600 ml-1">{trip.address}</p>
        </div>
      </div>
      
      <button
        onClick={handleStartTrip}
        className="w-full py-2 bg-laundry-success text-white rounded-md font-medium hover:bg-green-600 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TripCard;
