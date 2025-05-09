
import React from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Shirt, Type, Pencil, Footprints, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ClothingItem } from '../../utils/orderUtils';

interface ClothesSectionProps {
  items: Record<string, ClothingItem[]>;
  onAddClothes: () => void;
  onEditItem?: (item: ClothingItem) => void;
  onDeleteItem?: (item: ClothingItem) => void;
}

const ClothesSection = ({
  items,
  onAddClothes,
  onEditItem,
  onDeleteItem
}: ClothesSectionProps) => {
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

  // Function to flatten all items for display
  const getAllItems = () => {
    const allItems: ClothingItem[] = [];
    Object.values(items).forEach(categoryItems => {
      categoryItems.forEach(item => {
        allItems.push(item);
      });
    });
    return allItems;
  };
  
  const allItems = getAllItems();
  
  return <div className="ml-4 mb-3">
      <p className="text-sm font-medium text-gray-700 mb-2">Clothes Selected</p>
      {Object.keys(items).length === 0 ? <div className="flex items-center text-gray-400 mb-2">
          <span className="mr-2">⬦</span>
          <span>No clothes selected</span>
        </div> : <div className="mb-3 space-y-2">
          {allItems.map((item, index) => (
            <ContextMenu key={index}>
              <ContextMenuTrigger>
                <div className="flex items-center justify-between hover:bg-gray-50 p-1 rounded cursor-pointer group">
                  <div className="flex items-center">
                    {getItemIcon(item.name)}
                    <span className="ml-2 text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">x{item.quantity}</span>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onEditItem) onEditItem(item);
                        }}
                      >
                        <Edit size={14} className="text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6" 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onDeleteItem) onDeleteItem(item);
                        }}
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="bg-white">
                <ContextMenuItem 
                  className="flex items-center cursor-pointer" 
                  onClick={() => onEditItem && onEditItem(item)}
                >
                  <Edit size={14} className="mr-2 text-blue-500" />
                  <span>Edit</span>
                </ContextMenuItem>
                <ContextMenuItem 
                  className="flex items-center cursor-pointer" 
                  onClick={() => onDeleteItem && onDeleteItem(item)}
                >
                  <Trash2 size={14} className="mr-2 text-red-500" />
                  <span>Delete</span>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>}
      <button onClick={onAddClothes} className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center text-gray-600">
        <Plus size={16} className="mr-1" />
        Add Clothes
      </button>
    </div>;
};

export default ClothesSection;
