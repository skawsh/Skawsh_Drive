
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <p className="text-lg text-gray-600">Trip not found</p>
      <button 
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2 bg-laundry-primary text-white rounded-md"
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default OrderNotFound;
