
import React from 'react';
import { Shirt, Type, Pencil, Footprints, BookOpen } from 'lucide-react';

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

  // Group items by service category (Dry Cleaning, Shoe Cleaning)
  const groupItemsByService = () => {
    const serviceGroups: Record<string, Record<string, ClothingItem[]>> = {};
    
    Object.entries(items).forEach(([category, categoryItems]) => {
      if (category.toLowerCase().includes('shoe')) {
        if (!serviceGroups['Shoe Cleaning']) {
          serviceGroups['Shoe Cleaning'] = {};
        }
        serviceGroups['Shoe Cleaning'][category] = categoryItems;
      } else {
        if (!serviceGroups['Dry Cleaning']) {
          serviceGroups['Dry Cleaning'] = {};
        }
        serviceGroups['Dry Cleaning'][category] = categoryItems;
      }
    });
    
    return serviceGroups;
  };

  const serviceGroups = groupItemsByService();

  return (
    <div className="mb-6">
      {Object.entries(serviceGroups).map(([serviceName, categories]) => (
        <div key={serviceName} className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">{serviceName}</h3>
          
          {Object.entries(categories).map(([category, categoryItems]) => (
            <div key={category} className="mb-3">
              <p className="text-gray-700 font-medium text-sm mb-1">{category}</p>
              
              <div className="space-y-2 pl-2">
                {categoryItems.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {getItemIcon(item.name)}
                    <span className="ml-2 text-gray-600">{item.name}</span>
                    <span className="ml-auto text-gray-600">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ClothingItemsList;
