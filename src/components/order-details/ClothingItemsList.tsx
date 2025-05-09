
import React from 'react';

interface ClothingItem {
  name: string;
  quantity: number;
}

interface ClothingItemsListProps {
  items: Record<string, ClothingItem[]>;
}

const ClothingItemsList = ({ items }: ClothingItemsListProps) => {
  if (Object.keys(items).length === 0) {
    return null;
  }

  return (
    <>
      {Object.entries(items).map(([category, categoryItems]) => (
        <div key={category} className="mb-4">
          <p className="font-medium mb-2">{category}</p>
          <div className="ml-4">
            {categoryItems.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="text-indigo-400 mr-2">⬦</span>
                <span className="flex-1">{item.name}</span>
                <span className="text-gray-600">x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ClothingItemsList;
