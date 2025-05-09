
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { ArrowLeft, Check, Plus, File, Camera } from 'lucide-react';
import AddClothesDialog from '../components/AddClothesDialog';

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
    // Simple logic to categorize items - in a real app this would be more sophisticated
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
    // In a real app, this would save the weight to the trip data
    alert(`Weight confirmed: ${actualWeight} kg`);
  };

  const handleCompletePickup = () => {
    navigate('/');
  };

  const handleSaveChanges = () => {
    // In a real app, this would save all changes to the trip data
    alert('Changes saved successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
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
        <div className="bg-white rounded-lg shadow-md p-5 mb-4">
          <h2 className="font-bold text-lg mb-3">Core Laundry Service</h2>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Estimated Weight</p>
            <p className="font-medium">{trip.estimatedWeight} KG</p>
          </div>
          
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Actual Weight (KG)</p>
              <input
                type="number"
                value={actualWeight}
                onChange={(e) => setActualWeight(e.target.value)}
                placeholder="Enter actual weight"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-laundry-primary"
                step="0.1"
                min="0"
              />
            </div>
            <button
              onClick={handleWeightConfirm}
              className="ml-3 p-3 bg-laundry-success text-white rounded-md"
            >
              <Check size={20} />
            </button>
          </div>
          
          <button
            onClick={() => setIsAddClothesOpen(true)}
            className="w-full mt-4 py-2 bg-laundry-lightGray text-gray-800 rounded-md font-medium flex items-center justify-center"
          >
            <Plus size={18} className="mr-2" />
            Add Clothes
          </button>
        </div>
        
        {Object.entries(items).map(([category, categoryItems]) => (
          <div key={category} className="bg-white rounded-lg shadow-md p-5 mb-4">
            <h2 className="font-bold text-lg mb-3">{category}</h2>
            <div className="divide-y divide-gray-100">
              {categoryItems.map((item, index) => (
                <div key={index} className="py-3 flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="font-medium">x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="bg-white rounded-lg shadow-md p-5 mb-4">
          <h2 className="font-bold text-lg mb-3">Order Photos</h2>
          <button
            className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500"
          >
            <Camera size={24} className="mb-2" />
            <span>Add Photo</span>
          </button>
        </div>
        
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 shadow-lg">
          <button
            onClick={handleSaveChanges}
            className="flex-1 py-3 bg-laundry-purple text-white rounded-md font-medium"
          >
            Save Changes
          </button>
          <button
            onClick={handleCompletePickup}
            className="flex-1 py-3 bg-laundry-success text-white rounded-md font-medium"
          >
            Complete Pickup
          </button>
        </div>
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
