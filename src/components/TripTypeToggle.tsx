
import React from 'react';

interface TripTypeToggleProps {
  activeType: "EXPRESS" | "STANDARD";
  setActiveType: (type: "EXPRESS" | "STANDARD") => void;
}

const TripTypeToggle: React.FC<TripTypeToggleProps> = ({ activeType, setActiveType }) => {
  return (
    <div className="flex bg-laundry-lightGray rounded-lg p-1 mb-4">
      <button
        className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
          activeType === 'STANDARD' ? 'bg-white text-laundry-primary shadow-sm' : 'text-gray-600'
        }`}
        onClick={() => setActiveType('STANDARD')}
      >
        Standard
      </button>
      <button
        className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
          activeType === 'EXPRESS' ? 'bg-white text-laundry-primary shadow-sm' : 'text-gray-600'
        }`}
        onClick={() => setActiveType('EXPRESS')}
      >
        Express
      </button>
    </div>
  );
};

export default TripTypeToggle;
