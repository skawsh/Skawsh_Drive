
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import { toast } from "@/components/ui/use-toast";
import NavBar from '../components/NavBar';
import AddClothesDialog from '../components/AddClothesDialog';
import ActionButtons from '../components/order-details/ActionButtons';
import OrderNotFound from '../components/order-details/OrderNotFound';
import { processTripItems } from '../utils/orderUtils';
import useOrderState from '../components/order-details/useOrderState';
import OrderHeader from '../components/order-details/OrderHeader';
import OrderContent from '../components/order-details/OrderContent';
import { useOrderItems } from '../hooks/useOrderItems';
import EditItemDialog from '../components/order-details/EditItemDialog';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === id);
  const [isAddClothesOpen, setIsAddClothesOpen] = useState(false);
  
  // If trip not found, show not found component
  if (!trip) {
    return <OrderNotFound />;
  }

  // Check if this is a drop trip
  const isDrop = trip.status === 'DROP';

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

  // Use order items hook
  const {
    editingItem,
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleAddItems,
    handleEditClothingItem,
    handleDeleteClothingItem,
    handleUpdateItemQuantity
  } = useOrderItems({ items, setItems });

  // Handle complete pickup with navigation
  const completePickupWithNavigation = () => {
    handleCompletePickup();
    
    // If this is a pickup trip, create a drop trip and mark the pickup as completed
    if (trip && trip.action === 'PICKUP' && trip.status !== 'DROP') {
      // First, mark the original pickup trip as completed
      const pickupIndex = trips.findIndex(t => t.id === id);
      if (pickupIndex !== -1) {
        trips[pickupIndex].status = "COMPLETED" as "PICKUP" | "DROP" | "COMPLETED";
      }
      
      // Create a new drop trip
      const dropTrip = {
        ...trip,
        id: `DROP-${trip.id.split('-')[1]}`, // Create a new ID with DROP prefix
        action: "DROP" as "PICKUP" | "DROP" | "COLLECT", // Fixed the type issue
        status: "DROP" as "PICKUP" | "DROP" | "COMPLETED", // Fixed the status type
        studioName: "Sparkling Clean Studio",
        studioPhone: "+91 9876543214",
        studioAddress: "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana",
      };
      
      // Add to trips array
      trips.push(dropTrip);
      
      // Show success toast
      toast({
        title: "Pickup completed",
        description: "A new drop-off trip has been created",
      });
    }
    // If this is a drop trip, mark it as completed and remove it from the trips array
    else if (trip && trip.status === 'DROP') {
      // Find the original trip and mark it as completed
      const tripIndex = trips.findIndex(t => t.id === id);
      if (tripIndex !== -1) {
        trips[tripIndex].status = "COMPLETED" as "PICKUP" | "DROP" | "COMPLETED";
      }
      
      // Show success toast
      toast({
        title: "Drop-off completed",
        description: "Order has been moved to history",
      });
    }
    
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
          onEditClothingItem={isDrop ? undefined : handleEditClothingItem}
          onDeleteClothingItem={isDrop ? undefined : handleDeleteClothingItem}
          isReadOnly={isDrop}
        />
        
        <ActionButtons 
          onSaveChanges={handleSaveChanges} 
          onCompletePickup={completePickupWithNavigation}
          saveDisabled={isSaveDisabled}
          showSaveButton={showSaveButton && !isDrop}
          showCompleteButton={showCompleteButton || isDrop}
        />
      </div>
      
      <NavBar />
      
      {!isDrop && (
        <>
          <AddClothesDialog
            open={isAddClothesOpen}
            onOpenChange={setIsAddClothesOpen}
            onAddItems={handleAddItems}
          />
          
          <EditItemDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            editingItem={editingItem}
            onUpdateItemQuantity={handleUpdateItemQuantity}
            onDeleteItem={handleDeleteClothingItem}
          />
        </>
      )}
    </div>
  );
};

export default OrderDetails;
