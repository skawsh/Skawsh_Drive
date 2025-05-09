
import React from 'react';

interface ActionButtonsProps {
  onSaveChanges: () => void;
  onCompletePickup: () => void;
}

const ActionButtons = ({ onSaveChanges, onCompletePickup }: ActionButtonsProps) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 shadow-lg">
      <button
        onClick={onSaveChanges}
        className="flex-1 py-3 bg-laundry-purple text-white rounded-md font-medium"
      >
        Save Changes
      </button>
      <button
        onClick={onCompletePickup}
        className="flex-1 py-3 bg-laundry-success text-white rounded-md font-medium"
      >
        Complete Pickup
      </button>
    </div>
  );
};

export default ActionButtons;
