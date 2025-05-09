
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Minus, Trash2 } from 'lucide-react';

interface ClothingItem {
  name: string;
  quantity: number;
}

interface AddClothesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddItems: (items: ClothingItem[]) => void;
}

const AddClothesDialog: React.FC<AddClothesDialogProps> = ({ 
  open, 
  onOpenChange,
  onAddItems
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [items, setItems] = useState<ClothingItem[]>([]);

  const handleAddItem = () => {
    if (newItemName.trim()) {
      setItems([...items, { name: newItemName.trim(), quantity: 1 }]);
      setNewItemName('');
    }
  };

  const handleQuantityChange = (index: number, change: number) => {
    const updatedItems = [...items];
    const newQuantity = Math.max(1, updatedItems[index].quantity + change);
    updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };
    setItems(updatedItems);
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSave = () => {
    onAddItems(items);
    setItems([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add New Clothing Item</DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Enter clothing item name"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-primary"
          />
          <button
            onClick={handleAddItem}
            className="bg-laundry-success text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Add
          </button>
        </div>

        {items.length > 0 && (
          <div className="mt-4 space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2 min-w-[20px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="text-laundry-danger hover:text-red-600 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handleSave}
              className="w-full mt-4 bg-laundry-primary text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Save Items
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddClothesDialog;
