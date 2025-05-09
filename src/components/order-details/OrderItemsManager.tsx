
import React from 'react';
import { ClothingItem } from '../../utils/orderUtils';

interface OrderItemsManagerProps {
  items: Record<string, ClothingItem[]>;
  setItems: React.Dispatch<React.SetStateAction<Record<string, ClothingItem[]>>>;
}

const OrderItemsManager: React.FC<OrderItemsManagerProps> = ({ items, setItems }) => {
  const handleAddItems = (newItems: { name: string; quantity: number }[]) => {
    const updatedItems = { ...items };
    
    newItems.forEach(item => {
      const categoryName = getCategoryForItem(item.name);
      
      if (!updatedItems[categoryName]) {
        updatedItems[categoryName] = [];
      }
      
      const existingItemIndex = updatedItems[categoryName].findIndex(i => i.name === item.name);
      
      if (existingItemIndex >= 0) {
        updatedItems[categoryName][existingItemIndex].quantity += item.quantity;
      } else {
        updatedItems[categoryName].push({ name: item.name, quantity: item.quantity });
      }
    });
    
    setItems(updatedItems);
  };

  // Function to determine the category for an item based on its name
  const getCategoryForItem = (itemName: string): string => {
    const itemNameLower = itemName.toLowerCase();
    if (itemNameLower.includes('shoe') || itemNameLower.includes('sneaker')) {
      return 'Shoe Cleaning';
    } else if (
      itemNameLower.includes('pant') || 
      itemNameLower.includes('jean') || 
      itemNameLower.includes('trouser') ||
      itemNameLower.includes('short')
    ) {
      return 'Bottom Wear';
    }
    return 'Upper Wear';
  };

  return (
    <div>
      {/* This is a UI component that will be used to manage order items */}
    </div>
  );
};

export default OrderItemsManager;
export { getCategoryForItem };
