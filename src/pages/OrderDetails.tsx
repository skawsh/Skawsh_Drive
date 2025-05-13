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

  // Check if this is a drop or collect trip (both should be read-only)
  const isDrop = trip.status === 'DROP';
  const isCollect = trip.action === 'COLLECT';
  const isDelivery = id?.startsWith('DEL-');
  const isReadOnly = isDrop || isCollect || isDelivery;

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
    isReadOnly: orderStateReadOnly
  } = useOrderState({ 
    initialItems,
    isReadOnly, // Pass read-only status
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

  // Find next nearest trip
  const findNextNearestTrip = () => {
    // Filter active trips 
    const activeTrips = trips
      .filter(t => t.status !== 'COMPLETED')
      .sort((a, b) => a.distance - b.distance);
    
    let nextTrip = null;
    
    // If this is a pickup trip, find the nearest drop trip
    if (trip.action === 'PICKUP') {
      // Extract the base ID
      const baseId = trip.id.split('-')[1];
      // Look for the corresponding drop trip
      nextTrip = activeTrips.find(t => t.id === `DROP-${baseId}`);
    } 
    // If this is a collect trip, find the nearest delivery trip
    else if (trip.action === 'COLLECT') {
      // Extract the base ID
      const baseId = trip.id.split('-')[1];
      // Look for the corresponding delivery trip
      nextTrip = activeTrips.find(t => t.id === `DEL-${baseId}`);
    }
    
    // If no specific next trip is found, return the closest trip
    if (!nextTrip && activeTrips.length > 0) {
      nextTrip = activeTrips[0];
    }
    
    return nextTrip;
  };

  // Handle complete pickup with navigation
  const completePickupWithNavigation = () => {
    handleCompletePickup();
    
    console.log("Completing pickup/drop in OrderDetails for trip:", trip.id);
    
    // If this is a pickup trip, create a drop trip and mark the pickup as completed
    if (trip && trip.action === 'PICKUP' && trip.status !== 'DROP') {
      // First, mark the original pickup trip as completed
      const pickupIndex = trips.findIndex(t => t.id === id);
      if (pickupIndex !== -1) {
        trips[pickupIndex].status = "COMPLETED";
        console.log(`Pickup trip ${id} marked as COMPLETED`);
      }
      
      // Create a new drop trip if it doesn't already exist
      const dropTripId = `DROP-${trip.id.split('-')[1]}`;
      const existingDropTrip = trips.find(t => t.id === dropTripId);
      
      if (!existingDropTrip) {
        const dropTrip = {
          ...trip,
          id: dropTripId, 
          action: "DROP" as const,
          status: "DROP" as const,
          studioName: "Sparkling Clean Studio",
          studioPhone: "+91 9876543214",
          studioAddress: "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana",
        };
        
        // Add to trips array
        trips.push(dropTrip);
      }
      
      // Show success toast
      toast({
        title: "Pickup completed",
        description: "A new drop-off trip has been created",
      });
      
      // Find the next nearest trip
      const nextTrip = findNextNearestTrip();
      
      if (nextTrip) {
        // Navigate to that trip
        navigate(`/active-trip/${nextTrip.id}`);
      } else {
        // Navigate to dashboard if no next trip
        navigate('/');
      }
    } 
    // If this is a drop trip, mark it as completed and navigate to next nearest trip
    else if (trip && trip.status === 'DROP') {
      // Find the original trip and mark it as completed
      const tripIndex = trips.findIndex(t => t.id === id);
      if (tripIndex !== -1) {
        trips[tripIndex].status = "COMPLETED";
        console.log(`Drop trip ${id} marked as COMPLETED`);
      }
      
      // Show success toast
      toast({
        title: "Drop-off completed",
        description: "Order has been moved to history",
      });
      
      // Find the next nearest trip
      const nextTrip = findNextNearestTrip();
      
      if (nextTrip) {
        // Navigate to that trip
        navigate(`/active-trip/${nextTrip.id}`);
      } else {
        // Navigate to dashboard if no next trip
        navigate('/');
      }
    } 
    // If this is a delivery trip, mark it as completed and navigate to next nearest trip
    else if (trip && id?.startsWith('DEL-')) {
      // Find the trip and mark it as completed
      const tripIndex = trips.findIndex(t => t.id === id);
      if (tripIndex !== -1) {
        trips[tripIndex].status = "COMPLETED";
        console.log(`Delivery trip ${id} marked as COMPLETED`);
      }
      
      // Show success toast
      toast({
        title: "Delivery completed",
        description: "Order has been delivered successfully",
      });
      
      // Find the next nearest trip
      const nextTrip = findNextNearestTrip();
      
      if (nextTrip) {
        // Navigate to that trip
        navigate(`/active-trip/${nextTrip.id}`);
      } else {
        // Navigate to dashboard if no next trip
        navigate('/');
      }
    }
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
          showCompleteButton={showCompleteButton || isReadOnly}
          isReadOnly={isReadOnly}
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
