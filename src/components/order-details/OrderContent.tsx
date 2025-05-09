
import React from 'react';
import WeightDetailsSection from './WeightDetailsSection';
import ClothesSection from './ClothesSection';
import OrderPhotosSection from './OrderPhotosSection';
import ServicesSectionHeader from './ServicesSectionHeader';
import DryCleaningService from './DryCleaningService';
import ShoeCleaningService from './ShoeCleaningService';
import { ClothingItem } from '../../utils/orderUtils';

interface OrderContentProps {
  estimatedWeight: number | string;
  actualWeight: string;
  setActualWeight: (weight: string) => void;
  items: Record<string, ClothingItem[]>;
  onWeightConfirm: () => void;
  onAddClothes: () => void;
  onEditClothingItem?: (item: ClothingItem) => void;
  onDeleteClothingItem?: (item: ClothingItem) => void;
  isReadOnly?: boolean;
}

const OrderContent: React.FC<OrderContentProps> = ({ 
  estimatedWeight, 
  actualWeight, 
  setActualWeight, 
  items, 
  onWeightConfirm, 
  onAddClothes,
  onEditClothingItem,
  onDeleteClothingItem,
  isReadOnly = false
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <ServicesSectionHeader />
      
      {/* Core Laundry Service */}
      <div className="mb-6">
        <p className="font-medium mb-1">Core Laundry Service</p>
        <p className="text-gray-600 ml-2 mb-3">Wash and Fold</p>
        
        <WeightDetailsSection 
          estimatedWeight={estimatedWeight} 
          actualWeight={actualWeight} 
          setActualWeight={setActualWeight} 
          onWeightConfirm={onWeightConfirm} 
          isReadOnly={isReadOnly}
        />
        
        <ClothesSection 
          items={items} 
          onAddClothes={onAddClothes}
          onEditItem={onEditClothingItem}
          onDeleteItem={onDeleteClothingItem} 
          isReadOnly={isReadOnly}
        />
      </div>
      
      {/* Dry Cleaning Service */}
      <DryCleaningService />
      
      {/* Shoe Cleaning Service */}
      <ShoeCleaningService />
      
      <OrderPhotosSection />
    </div>
  );
};

export default OrderContent;
