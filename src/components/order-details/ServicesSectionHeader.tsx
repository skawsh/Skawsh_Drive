
import React from 'react';
import { Check } from 'lucide-react';

const ServicesSectionHeader = () => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3">
        <Check size={16} className="text-white" />
      </div>
      <h2 className="text-lg font-bold">Services</h2>
    </div>
  );
};

export default ServicesSectionHeader;
