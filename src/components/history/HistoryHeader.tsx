
import React from 'react';

const HistoryHeader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-xl font-bold text-center text-gray-800">Order History</h1>
      </div>
    </div>
  );
};

export default HistoryHeader;
