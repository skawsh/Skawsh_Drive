
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OrderHeaderProps {
  id: string;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({ id }) => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <button 
          onClick={() => navigate(`/trip-details/${id}`)}
          className="mr-4 p-1"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Order Details</h1>
      </div>
    </div>
  );
};

export default OrderHeader;
