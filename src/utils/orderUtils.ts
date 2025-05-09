
/**
 * Utility functions for order-related operations
 */

export interface ClothingItem {
  name: string;
  quantity: number;
}

/**
 * Gets the appropriate category for a clothing item based on its name
 */
export const getCategoryForItem = (itemName: string): string => {
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

/**
 * Processes trip items into categorized items
 */
export const processTripItems = (tripItems?: Array<{category: string; name: string; quantity: number}>) => {
  if (!tripItems) return {};
  
  return tripItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    
    const existingItemIndex = acc[item.category].findIndex(i => i.name === item.name);
    
    if (existingItemIndex >= 0) {
      acc[item.category][existingItemIndex].quantity += item.quantity;
    } else {
      acc[item.category].push({ name: item.name, quantity: item.quantity });
    }
    
    return acc;
  }, {} as Record<string, ClothingItem[]>);
};
