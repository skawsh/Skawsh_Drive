
import React from 'react';
import { Camera } from 'lucide-react';

const OrderPhotosSection = () => {
  return (
    <div className="mb-4">
      <p className="font-medium mb-2">Order Photos</p>
      <div className="flex justify-between items-center">
        <button className="flex items-center text-gray-600">
          <Camera size={18} className="mr-1" />
          Add Photo
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 rounded-md mt-2">
        <div className="text-gray-400 flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mb-2">
            <Camera size={24} className="text-gray-400" />
          </div>
          <p>No photos added yet.</p>
          <p className="text-xs text-center">Take photos of clothes or any issues.</p>
        </div>
        <button className="mt-3 px-4 py-1 border border-gray-300 rounded-md text-sm">
          Add First Photo
        </button>
      </div>
    </div>
  );
};

export default OrderPhotosSection;
