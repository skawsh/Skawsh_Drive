
import React from 'react';
import { Check } from 'lucide-react';

interface StatusBadgeProps {
  label: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, className }) => {
  return (
    <div className={`bg-gray-100 rounded-md p-3 flex justify-between items-center ${className}`}>
      <span className="font-medium">{label}</span>
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <Check size={16} className="text-white" />
      </div>
    </div>
  );
};

export default StatusBadge;
