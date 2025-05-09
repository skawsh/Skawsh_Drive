
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import AddClothesDialog from '../components/AddClothesDialog';
import ActionButtons from '../components/order-details/ActionButtons';
import OrderNotFound from '../components/order-details/OrderNotFound';
import { ClothingItem, processTripItems } from '../utils/orderUtils';
import useOrderState from '../components/order-details/useOrderState';
import OrderHeader from '../components/order-details/OrderHeader';
import OrderContent from '../components/order-details/OrderContent';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === id);
  const [isAddClothesOpen, setIsAddClothesOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // If trip not found, show not found component
  if (!trip) {
    return <OrderNotFound />;
  }

  // Process initial items from trip data
  const initialItems = processTripItems(trip.items);
  
  // Use order state hook
  const {
    actualWeight,
    setActualWeight,
    items,
    setItems,
    showSaveButton,
    showCompleteButton,
    handleWeightConfirm,
    handleSaveChanges,
    handleCompletePickup,
    isSaveDisabled,
  } = useOrderState({ initialItems });

  // Handle adding items (this uses the OrderItemsManager)
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

  // Handle edit clothing item
  const handleEditClothingItem = (item: ClothingItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  // Handle delete clothing item
  const handleDeleteClothingItem = (itemToDelete: ClothingItem) => {
    const updatedItems = { ...items };
    
    // Find and remove the item from its category
    Object.keys(updatedItems).forEach(category => {
      updatedItems[category] = updatedItems[category].filter(
        item => !(item.name === itemToDelete.name)
      );
      
      // Remove the category if it's empty
      if (updatedItems[category].length === 0) {
        delete updatedItems[category];
      }
    });
    
    setItems(updatedItems);
    
    toast({
      title: "Item removed",
      description: `${itemToDelete.name} has been removed from your order`,
    });
  };

  // Handle update item quantity
  const handleUpdateItemQuantity = (newQuantity: number) => {
    if (!editingItem) return;
    
    const updatedItems = { ...items };
    
    // Find and update the item
    Object.keys(updatedItems).forEach(category => {
      const itemIndex = updatedItems[category].findIndex(
        item => item.name === editingItem.name
      );
      
      if (itemIndex !== -1) {
        if (newQuantity <= 0) {
          // Remove item if quantity is zero or less
          updatedItems[category] = updatedItems[category].filter(
            (_, index) => index !== itemIndex
          );
          
          // Remove category if it's empty
          if (updatedItems[category].length === 0) {
            delete updatedItems[category];
          }
        } else {
          // Update quantity
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

  // Handle complete pickup with navigation
  const completePickupWithNavigation = () => {
    handleCompletePickup();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <OrderHeader id={id!} />
      
      <div className="container mx-auto px-4 pt-20 pb-20">
        <OrderContent 
          estimatedWeight={trip.estimatedWeight}
          actualWeight={actualWeight}
          setActualWeight={setActualWeight}
          items={items}
          onWeightConfirm={handleWeightConfirm}
          onAddClothes={() => setIsAddClothesOpen(true)}
          onEditClothingItem={handleEditClothingItem}
          onDeleteClothingItem={handleDeleteClothingItem}
        />
        
        <ActionButtons 
          onSaveChanges={handleSaveChanges} 
          onCompletePickup={completePickupWithNavigation}
          saveDisabled={isSaveDisabled}
          showSaveButton={showSaveButton}
          showCompleteButton={showCompleteButton}
        />
      </div>
      
      <NavBar />
      
      <AddClothesDialog
        open={isAddClothesOpen}
        onOpenChange={setIsAddClothesOpen}
        onAddItems={handleAddItems}
      />
      
      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Item Quantity</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {editingItem && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{editingItem.name}</span>
                  <div className="flex items-center">
                    <button 
                      onClick={() => handleUpdateItemQuantity(Math.max(1, (editingItem?.quantity || 1) - 1))}
                      className="px-3 py-1 bg-gray-200 rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-gray-100">
                      {editingItem.quantity}
                    </span>
                    <button 
                      onClick={() => handleUpdateItemQuantity((editingItem?.quantity || 1) + 1)}
                      className="px-3 py-1 bg-gray-200 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button 
                    onClick={() => {
                      handleDeleteClothingItem(editingItem);
                      setIsEditDialogOpen(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2 text-red-500 border border-red-300 rounded-md"
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditDialogOpen(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderDetails;
