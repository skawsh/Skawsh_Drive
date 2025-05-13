
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { trips } from '../data/trips';
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
import { useTripStatusManager } from '../components/order-details/TripStatusManager';
import { useTripCompletionManager } from '../components/order-details/TripCompletionManager';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const trip = trips.find(t => t.id === id);
  const [isAddClothesOpen, setIsAddClothesOpen] = useState(false);
  
  // If trip not found, show not found component
  if (!trip) {
    return <OrderNotFound />;
  }

  // Get trip status information
  const { isReadOnly, isDelivery } = useTripStatusManager(trip);

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
  } = useOrderState({ 
    initialItems,
    isReadOnly,
    // Add demo data for weight if it's a drop or collect trip
    demoActualWeight: isReadOnly ? "5.2" : undefined
  });

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

  // Use trip completion manager
  const { completeTrip } = useTripCompletionManager({ trip });

  // Handle complete pickup with navigation
  const completePickupWithNavigation = () => {
    handleCompletePickup();
    completeTrip();
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
          onEditClothingItem={isReadOnly ? undefined : handleEditClothingItem}
          onDeleteClothingItem={isReadOnly ? undefined : handleDeleteClothingItem}
          isReadOnly={isReadOnly}
        />
        
        <ActionButtons 
          onSaveChanges={handleSaveChanges} 
          onCompletePickup={completePickupWithNavigation}
          saveDisabled={isSaveDisabled}
          showSaveButton={showSaveButton && !isReadOnly}
          showCompleteButton={!isReadOnly && showCompleteButton}
          isReadOnly={isReadOnly}
          tripId={id}
        />
      </div>
      
      <NavBar />
      
      {!isReadOnly && (
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
