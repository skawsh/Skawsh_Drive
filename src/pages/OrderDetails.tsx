
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { ArrowLeft } from 'lucide-react';
import AddClothesDialog from '../components/AddClothesDialog';
import WeightDetailsSection from '../components/order-details/WeightDetailsSection';
import ClothesSection from '../components/order-details/ClothesSection';
import ClothingItemsList from '../components/order-details/ClothingItemsList';
import OrderPhotosSection from '../components/order-details/OrderPhotosSection';
import ActionButtons from '../components/order-details/ActionButtons';
import ServicesSectionHeader from '../components/order-details/ServicesSectionHeader';
import OrderNotFound from '../components/order-details/OrderNotFound';
import { processTripItems } from '../utils/orderUtils';
import useOrderState from '../components/order-details/useOrderState';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === id);
  const [isAddClothesOpen, setIsAddClothesOpen] = useState(false);
  
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

  // Handle adding items (forwarding to the order state)
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

  // Handle complete pickup with navigation
  const completePickupWithNavigation = () => {
    handleCompletePickup();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate(`/trip-details/${id}`)}
            className="mr-4 p-1"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Order Details</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-20 pb-20">
        <div className="bg-white rounded-lg shadow-md p-5">
          <ServicesSectionHeader />
          
          <div className="mb-4">
            <p className="font-medium mb-1">Core Laundry Service</p>
            <p className="text-gray-600 ml-2 mb-3">Wash and Fold</p>
            
            <WeightDetailsSection 
              estimatedWeight={trip.estimatedWeight} 
              actualWeight={actualWeight} 
              setActualWeight={setActualWeight} 
              onWeightConfirm={handleWeightConfirm} 
            />
            
            <ClothesSection 
              items={items} 
              onAddClothes={() => setIsAddClothesOpen(true)} 
            />
          </div>
          
          <ClothingItemsList items={items} />
          
          <OrderPhotosSection />
        </div>
        
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
    </div>
  );
};

export default OrderDetails;
