
import React from 'react';
import { FileText, AlertTriangle, Check } from 'lucide-react';

interface TripActionButtonsProps {
  requiresVerification: boolean;
  isCollect: boolean;
  onViewOrderDetails: () => void;
  onStartVerification: () => void;
  onReportIssue: () => void;
}

const TripActionButtons: React.FC<TripActionButtonsProps> = ({
  requiresVerification,
  isCollect,
  onViewOrderDetails,
  onStartVerification,
  onReportIssue
}) => {
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
