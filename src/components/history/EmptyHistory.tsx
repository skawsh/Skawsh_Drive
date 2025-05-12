
import React from 'react';
import { ScrollText } from 'lucide-react';

const EmptyHistory: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <ScrollText size={48} className="text-gray-300 mb-4" />
      <p className="text-gray-500 text-lg font-medium">No completed orders yet</p>
      <p className="text-gray-400 text-sm mt-2 text-center">
        Completed orders will appear here for your reference
      </p>
    </div>
  );
};

export default EmptyHistory;
