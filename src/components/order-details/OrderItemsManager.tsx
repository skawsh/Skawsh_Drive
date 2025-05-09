
import React from 'react';
import { ClothingItem, getCategoryForItem } from '../../utils/orderUtils';

interface OrderItemsManagerProps {
  items: Record<string, ClothingItem[]>;
  setItems: React.Dispatch<React.SetStateAction<Record<string, ClothingItem[]>>>;
}

const OrderItemsManager: React.FC<OrderItemsManagerProps> = ({ items, setItems }) => {
  const handleAddItems = (newItems: ClothingItem[]) => {
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

  return {
    handleAddItems
  };
};

export default OrderItemsManager;
