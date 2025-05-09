
import React from 'react';
import { Plus } from 'lucide-react';

interface ClothingItem {
  name: string;
  quantity: number;
}

interface ClothesSectionProps {
  items: Record<string, ClothingItem[]>;
  onAddClothes: () => void;
}

const ClothesSection = ({ items, onAddClothes }: ClothesSectionProps) => {
  return (
    <div className="ml-4 mb-3">
      <p className="text-sm font-medium text-gray-700 mb-2">Clothes Selected</p>
      {Object.keys(items).length === 0 ? (
        <div className="flex items-center text-gray-400 mb-2">
          <span className="mr-2">⬦</span>
          <span>No clothes selected</span>
        </div>
      ) : null}
      <button
        onClick={onAddClothes}
        className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center text-gray-600"
      >
        <Plus size={16} className="mr-1" />
        Add Clothes
      </button>
    </div>
  );
};

export default ClothesSection;
