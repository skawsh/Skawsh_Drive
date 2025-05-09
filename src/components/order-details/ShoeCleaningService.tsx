
import React from 'react';
import { Footprints } from 'lucide-react';

const ShoeCleaningService: React.FC = () => {
  // Predefined items for shoe cleaning that can't be edited or deleted
  const shoeItems = [
    { name: "Formal Shoes", quantity: 1 }
  ];

  return (
    <div className="mb-6">
      <p className="font-medium mb-1">Shoe Cleaning Service</p>
      
      <div className="ml-4 mb-3">
        <div className="mb-3 space-y-2">
          {shoeItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-1 rounded"
            >
              <div className="flex items-center">
                <Footprints size={16} className="text-indigo-400" />
                <span className="ml-2 text-gray-700">{item.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">x{item.quantity}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 italic mt-2">
          Note: These items are part of the standard service and cannot be modified.
        </div>
      </div>
    </div>
  );
};

export default ShoeCleaningService;
