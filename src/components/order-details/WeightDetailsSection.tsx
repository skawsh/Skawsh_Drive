
import React from 'react';

interface WeightDetailsSectionProps {
  estimatedWeight: number | string;
  actualWeight: string;
  setActualWeight: (weight: string) => void;
  onWeightConfirm: () => void;
  isReadOnly?: boolean;
}

const WeightDetailsSection: React.FC<WeightDetailsSectionProps> = ({
  estimatedWeight,
  actualWeight,
  setActualWeight,
  onWeightConfirm,
  isReadOnly = false
}) => {
  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-sm font-medium">Weight Details</p>
          <p className="text-xs text-gray-500">Estimated Weight: {estimatedWeight} kg</p>
        </div>
        
        {!isReadOnly && !actualWeight && (
          <button
            onClick={onWeightConfirm}
            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
          >
            Confirm Weight
          </button>
        )}
      </div>
      
      <div className="flex items-center">
        <p className="text-sm mr-3 font-medium">Actual Weight (kg):</p>
        {isReadOnly ? (
          <p className="font-medium">{actualWeight || "Not confirmed"} kg</p>
        ) : (
          <input
            type="number"
            value={actualWeight}
            onChange={(e) => setActualWeight(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-20 text-sm"
            placeholder="0.0"
            step="0.1"
            min="0"
            disabled={!!actualWeight}
          />
        )}
      </div>
    </div>
  );
};

export default WeightDetailsSection;
