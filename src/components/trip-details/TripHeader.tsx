
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TripHeaderProps {
  onBack: () => void;
}

const TripHeader: React.FC<TripHeaderProps> = ({ onBack }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <button 
          onClick={onBack}
          className="mr-4 p-1"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Trip Details</h1>
      </div>
    </div>
  );
};

export default TripHeader;
