
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ClothingItem } from '../../utils/orderUtils';

interface EditItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: ClothingItem | null;
  onUpdateItemQuantity: (quantity: number) => void;
  onDeleteItem: (item: ClothingItem) => void;
}

const EditItemDialog: React.FC<EditItemDialogProps> = ({
  open,
  onOpenChange,
  editingItem,
  onUpdateItemQuantity,
  onDeleteItem,
}) => {
  if (!editingItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Item Quantity</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{editingItem.name}</span>
              <div className="flex items-center">
                <button 
                  onClick={() => onUpdateItemQuantity(Math.max(1, (editingItem?.quantity || 1) - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-l-md"
                >
                  -
                </button>
                <span className="px-3 py-1 bg-gray-100">
                  {editingItem.quantity}
                </span>
                <button 
                  onClick={() => onUpdateItemQuantity((editingItem?.quantity || 1) + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <button 
                onClick={() => onDeleteItem(editingItem)}
                className="px-4 py-2 text-red-500 border border-red-300 rounded-md"
              >
                Delete
              </button>
              <button 
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditItemDialog;
