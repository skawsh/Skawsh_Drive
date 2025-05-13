
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ActionButtonsProps {
  onSaveChanges: () => void;
  onCompletePickup: () => void;
  saveDisabled?: boolean;
  showSaveButton: boolean;
  showCompleteButton: boolean;
  isReadOnly?: boolean;
  tripId?: string;
}

const ActionButtons = ({ 
  onSaveChanges, 
  onCompletePickup, 
  saveDisabled = false,
  showSaveButton,
  showCompleteButton,
  isReadOnly = false,
  tripId
}: ActionButtonsProps) => {
  const navigate = useNavigate();

  // If no buttons to show, don't render anything
  if (!showSaveButton && !showCompleteButton) {
    return null;
  }

  // Navigate back to trip details for read-only views
  const handleBackToTripDetails = () => {
    if (tripId) {
      navigate(`/trip-details/${tripId}`);
    }
  };

  // For read-only trips (drop, collect, delivery), show back button instead of complete button
  if (isReadOnly && tripId) {
    return (
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 shadow-lg">
        <button
          onClick={handleBackToTripDetails}
          className="flex-1 py-3 rounded-md font-medium bg-laundry-primary text-white flex items-center justify-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Trip Details
        </button>
      </div>
    );
  }

  // Determine the button text based on isReadOnly
  // For delivery trips we need to show "Complete Delivery"
  const getCompleteButtonText = () => {
    if (!isReadOnly) return "Complete Pickup";
    
    // Check if current URL contains "DEL-" to determine if it's a delivery trip
    const isDeliveryTrip = window.location.pathname.includes("DEL-");
    
    if (isDeliveryTrip) return "Complete Delivery";
    if (window.location.pathname.includes("DROP-")) return "Complete Drop";
    return "Complete Process";
  };

  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 shadow-lg">
      {showSaveButton && (
        <button
          onClick={onSaveChanges}
          disabled={saveDisabled}
          className={`flex-1 py-3 rounded-md font-medium ${
            saveDisabled 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-laundry-purple text-white'
          }`}
        >
          Save Changes
        </button>
      )}
      
      {showCompleteButton && (
        <button
          onClick={onCompletePickup}
          className={`flex-1 py-3 rounded-md font-medium ${
            isReadOnly 
              ? 'bg-laundry-success text-white' 
              : 'bg-laundry-success text-white'
          }`}
        >
          {getCompleteButtonText()}
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
