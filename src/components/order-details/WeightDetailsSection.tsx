
import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <Card className="mb-4 p-4 border border-gray-100">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-800">Weight Details</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Estimated Weight</p>
            <p className="text-sm font-medium">{estimatedWeight} KG</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Actual Weight</p>
            <p className="text-sm font-medium">
              {actualWeight ? `${actualWeight} KG` : '—'}
            </p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm text-gray-600">Enter Actual Weight</p>
            <p className="text-xs text-gray-400">(Required)</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Input
                type="text"
                value={actualWeight}
                onChange={(e) => validateAndSetWeight(e.target.value)}
                placeholder="0.00"
                className={`pr-9 ${error ? 'border-red-500' : 'border-gray-300'}`}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                KG
              </span>
            </div>
            
            <Button
              onClick={handleConfirm}
              disabled={!!error || actualWeight === ''}
              className="bg-green-500 hover:bg-green-600"
              size="icon"
            >
              <Check size={16} />
            </Button>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mt-2 py-2 px-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2 text-xs">{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WeightDetailsSection;
