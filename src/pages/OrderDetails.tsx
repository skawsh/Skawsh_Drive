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

interface ClothingItem {
  name: string;
  quantity: number;
}

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === id);
  
  const [actualWeight, setActualWeight] = useState<string>('');
  const [isAddClothesOpen, setIsAddClothesOpen] = useState(false);
  const [items, setItems] = useState<Record<string, ClothingItem[]>>(
    trip?.items
      ? trip.items.reduce((acc, item) => {
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
        }, {} as Record<string, ClothingItem[]>)
      : {}
  );
  
  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-lg text-gray-600">Trip not found</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-laundry-primary text-white rounded-md"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleAddItems = (newItems: ClothingItem[]) => {
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

  const handleWeightConfirm = () => {
    alert(`Weight confirmed: ${actualWeight} kg`);
  };

  const handleCompletePickup = () => {
    navigate('/');
  };

  const handleSaveChanges = () => {
    alert('Changes saved successfully');
  };

  const hasNoWeight = actualWeight === '';
  const hasNoClothes = Object.keys(items).length === 0;
  const isSaveDisabled = hasNoWeight && hasNoClothes;

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
          onCompletePickup={handleCompletePickup}
          saveDisabled={isSaveDisabled}
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
