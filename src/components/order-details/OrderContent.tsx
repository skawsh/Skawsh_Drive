
import React from 'react';
import WeightDetailsSection from './WeightDetailsSection';
import ClothesSection from './ClothesSection';
import ClothingItemsList from './ClothingItemsList';
import OrderPhotosSection from './OrderPhotosSection';
import ServicesSectionHeader from './ServicesSectionHeader';
import { ClothingItem } from '../../utils/orderUtils';

interface OrderContentProps {
  estimatedWeight: number | string;
  actualWeight: string;
  setActualWeight: (weight: string) => void;
  items: Record<string, ClothingItem[]>;
  onWeightConfirm: () => void;
  onAddClothes: () => void;
}

const OrderContent: React.FC<OrderContentProps> = ({ 
  estimatedWeight, 
  actualWeight, 
  setActualWeight, 
  items, 
  onWeightConfirm, 
  onAddClothes 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <ServicesSectionHeader />
      
      <div className="mb-4">
        <p className="font-medium mb-1">Core Laundry Service</p>
        <p className="text-gray-600 ml-2 mb-3">Wash and Fold</p>
        
        <WeightDetailsSection 
          estimatedWeight={estimatedWeight} 
          actualWeight={actualWeight} 
          setActualWeight={setActualWeight} 
          onWeightConfirm={onWeightConfirm} 
        />
        
        <ClothesSection 
          items={items} 
          onAddClothes={onAddClothes} 
        />
      </div>
      
      <ClothingItemsList items={items} />
      
      <OrderPhotosSection />
    </div>
  );
};

export default OrderContent;
