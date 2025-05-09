
import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const validateAndSetWeight = (value: string) => {
    // Allow empty string for clearing the input
    if (value === '') {
      setActualWeight(value);
      setError(null);
      return;
    }

    // Only allow numbers and a single decimal point
    const regex = /^\d*\.?\d*$/;
    if (!regex.test(value)) {
      setError("Please enter a valid number");
      return;
    }

    // Prevent multiple decimal points
    if ((value.match(/\./g) || []).length > 1) {
      return;
    }

    // Convert to number and check if it's a valid number
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setError("Please enter a valid number");
      return;
    }

    // Limit to 2 decimal places
    if (value.includes('.') && value.split('.')[1].length > 2) {
      return;
    }

    // Clear error and set the value
    setError(null);
    setActualWeight(value);
  };

  const handleConfirm = () => {
    if (!actualWeight) {
      setError("Weight is required");
      return;
    }

    const numValue = parseFloat(actualWeight);
    if (isNaN(numValue) || numValue <= 0) {
      setError("Please enter a valid weight greater than 0");
      return;
    }

    // Clear any errors and confirm the weight
    setError(null);
    onWeightConfirm();
    toast({
      title: "Weight confirmed",
      description: `Actual weight set to ${actualWeight} KG`,
    });
  };

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
            <Input
              type="text"
              value={actualWeight}
              onChange={(e) => validateAndSetWeight(e.target.value)}
              placeholder="Enter KG"
              className={`flex-1 px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none`}
            />
            <span className="mx-2 text-gray-500">KG</span>
            <button
              onClick={handleConfirm}
              disabled={!!error || actualWeight === ''}
              className={`p-2 ${error || actualWeight === '' ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md transition-colors`}
            >
              <Check size={18} />
            </button>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-2 py-2 px-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2 text-xs">{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightDetailsSection;
