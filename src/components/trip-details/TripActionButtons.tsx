
import React, { useState } from 'react';
import { FileText, AlertTriangle, Check, DollarSign } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

interface TripActionButtonsProps {
  requiresVerification: boolean;
  isCollect: boolean;
  isDelivery?: boolean;
  onViewOrderDetails: () => void;
  onStartVerification: () => void;
  onReportIssue: () => void;
  onCompleteDelivery?: (isCashOnDelivery: boolean) => void;
}

const TripActionButtons: React.FC<TripActionButtonsProps> = ({
  requiresVerification,
  isCollect,
  isDelivery = false,
  onViewOrderDetails,
  onStartVerification,
  onReportIssue,
  onCompleteDelivery
}) => {
  const [isCOD, setIsCOD] = useState(false);

  const handleCompleteDelivery = () => {
    if (onCompleteDelivery) {
      onCompleteDelivery(isCOD);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={onViewOrderDetails}
        className="w-full py-3 bg-laundry-success text-white rounded-md font-medium flex items-center justify-center"
      >
        <FileText size={18} className="mr-2" />
        View Order Details
      </button>
      
      {requiresVerification && (
        <button
          onClick={onStartVerification}
          className="w-full py-3 bg-laundry-primary text-white rounded-md font-medium flex items-center justify-center"
        >
          <Check size={18} className="mr-2" />
          {isCollect ? "Complete Collection" : "Complete Drop"}
        </button>
      )}

      {isDelivery && (
        <>
          <div className="flex items-center space-x-2 my-3 p-2 bg-gray-50 rounded-md">
            <Checkbox
              id="cod"
              checked={isCOD}
              onCheckedChange={(checked) => setIsCOD(checked === true)}
            />
            <label
              htmlFor="cod"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
            >
              <DollarSign size={16} className="mr-1 text-green-600" />
              Mark as Cash on Delivery (COD)
            </label>
          </div>
          <button
            onClick={handleCompleteDelivery}
            className="w-full py-3 bg-green-500 text-white rounded-md font-medium flex items-center justify-center"
          >
            <Check size={18} className="mr-2" />
            Complete Delivery
          </button>
        </>
      )}
      
      <button
        onClick={onReportIssue}
        className="w-full py-3 bg-laundry-danger text-white rounded-md font-medium flex items-center justify-center"
      >
        <AlertTriangle size={18} className="mr-2" />
        Report Issue
      </button>
    </div>
  );
};

export default TripActionButtons;
