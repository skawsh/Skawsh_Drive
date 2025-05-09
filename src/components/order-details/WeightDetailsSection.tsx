
import React from 'react';
import { Check } from 'lucide-react';

interface WeightDetailsSectionProps {
  estimatedWeight: string | number;
  actualWeight: string;
  setActualWeight: (weight: string) => void;
  onWeightConfirm: () => void;
}

const WeightDetailsSection = ({ 
  estimatedWeight, 
  actualWeight, 
  setActualWeight, 
  onWeightConfirm 
}: WeightDetailsSectionProps) => {
  return (
    <div className="ml-4 mb-3">
      <p className="text-sm font-medium text-gray-700 mb-2">Weight Details</p>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Estimated Weight</span>
        <span className="font-medium">{estimatedWeight} KG</span>
      </div>
      
      <div className="flex items-center">
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Actual Weight *</span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={actualWeight}
              onChange={(e) => setActualWeight(e.target.value)}
              placeholder="Enter KG"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <span className="mx-2 text-gray-500">KG</span>
            <button
              onClick={onWeightConfirm}
              className="p-2 bg-green-500 text-white rounded-md"
            >
              <Check size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightDetailsSection;
