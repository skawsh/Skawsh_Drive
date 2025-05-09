
import React from 'react';

interface ActionButtonsProps {
  onSaveChanges: () => void;
  onCompletePickup: () => void;
  saveDisabled?: boolean;
  showSaveButton: boolean;
  showCompleteButton: boolean;
}

const ActionButtons = ({ 
  onSaveChanges, 
  onCompletePickup, 
  saveDisabled = false,
  showSaveButton,
  showCompleteButton
}: ActionButtonsProps) => {
  // If no buttons to show, don't render anything
  if (!showSaveButton && !showCompleteButton) {
    return null;
  }

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
          className="flex-1 py-3 bg-laundry-success text-white rounded-md font-medium"
        >
          Complete Pickup
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
