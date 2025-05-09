
import { useState, useEffect } from 'react';
import { ClothingItem } from '../utils/orderUtils';
import { useToast } from './use-toast';

interface UseOrderItemsProps {
  items: Record<string, ClothingItem[]>;
  setItems: React.Dispatch<React.SetStateAction<Record<string, ClothingItem[]>>>;
}

export const useOrderItems = ({ items, setItems }: UseOrderItemsProps) => {
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

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

  const handleEditClothingItem = (item: ClothingItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClothingItem = (itemToDelete: ClothingItem) => {
    const updatedItems = { ...items };
    
    Object.keys(updatedItems).forEach(category => {
      updatedItems[category] = updatedItems[category].filter(
        item => !(item.name === itemToDelete.name)
      );
      
      if (updatedItems[category].length === 0) {
        delete updatedItems[category];
      }
    });
    
    setItems(updatedItems);
    
    toast({
      title: "Item removed",
      description: `${itemToDelete.name} has been removed from your order`,
    });

    // Close the dialog if it's open
    if (isEditDialogOpen) {
      setIsEditDialogOpen(false);
      setEditingItem(null);
    }
  };

  const handleUpdateItemQuantity = (newQuantity: number) => {
    if (!editingItem) return;
    
    const updatedItems = { ...items };
    
    Object.keys(updatedItems).forEach(category => {
      const itemIndex = updatedItems[category].findIndex(
        item => item.name === editingItem.name
      );
      
      if (itemIndex !== -1) {
        if (newQuantity <= 0) {
          updatedItems[category] = updatedItems[category].filter(
            (_, index) => index !== itemIndex
          );
          
          if (updatedItems[category].length === 0) {
            delete updatedItems[category];
          }
        } else {
          updatedItems[category][itemIndex].quantity = newQuantity;
        }
      }
    });
    
    setItems(updatedItems);
    setIsEditDialogOpen(false);
    setEditingItem(null);
    
    toast({
      title: "Item updated",
      description: `${editingItem.name} quantity updated to ${newQuantity}`,
    });
  };

  return {
    editingItem,
    setEditingItem,
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleAddItems,
    handleEditClothingItem,
    handleDeleteClothingItem,
    handleUpdateItemQuantity
  };
};
