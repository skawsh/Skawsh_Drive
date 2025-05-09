
import React from 'react';
import { Plus, Shirt, Type, Pencil, Footprints, BookOpen } from 'lucide-react';

interface ClothingItem {
  name: string;
  quantity: number;
}

interface ClothesSectionProps {
  items: Record<string, ClothingItem[]>;
  onAddClothes: () => void;
}

const ClothesSection = ({ items, onAddClothes }: ClothesSectionProps) => {
  // Function to get the appropriate icon based on the item name
  const getItemIcon = (itemName: string) => {
    const name = itemName.toLowerCase();
    
    if (name.includes('shirt') && !name.includes('t-shirt')) {
      return <Shirt size={16} className="text-indigo-400" />;
    } else if (name.includes('t-shirt') || name.includes('tshirt') || name.includes('t shirt')) {
      return <Type size={16} className="text-indigo-400" />;
    } else if (name.includes('jeans') || name.includes('pant')) {
      return <Pencil size={16} className="text-indigo-400" />;
    } else if (name.includes('shoe') || name.includes('sneaker')) {
      return <Footprints size={16} className="text-indigo-400" />;
    } else if (name.includes('heel')) {
      return <BookOpen size={16} className="text-indigo-400" />;
    }
    
    // Default fallback
    return <Shirt size={16} className="text-indigo-400" />;
  };

  // Convert items record to a flat array of all clothing items
  const allItems: {name: string; quantity: number}[] = [];
  Object.values(items).forEach(categoryItems => {
    categoryItems.forEach(item => {
      allItems.push(item);
    });
  });

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

      {/* Display added clothing items */}
      {allItems.length > 0 && (
        <div className="mt-3 space-y-2 bg-gray-50 p-2 rounded-md">
          {allItems.map((item, index) => (
            <div key={index} className="flex items-center text-gray-700 py-1">
              {getItemIcon(item.name)}
              <span className="ml-2 text-sm">{item.name}</span>
              <span className="ml-auto text-xs text-gray-500">x{item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClothesSection;
