
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { ArrowLeft, Check, Plus, Camera } from 'lucide-react';
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
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3">
              <Check size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-bold">Services</h2>
          </div>
          
          <div className="mb-4">
            <p className="font-medium mb-1">Core Laundry Service</p>
            <p className="text-gray-600 ml-2 mb-3">Wash and Fold</p>
            
            <div className="ml-4 mb-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Weight Details</p>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Estimated Weight</span>
                <span className="font-medium">{trip.estimatedWeight} KG</span>
              </div>
              
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Actual Weight *</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={actualWeight}
                      onChange={(e) => setActualWeight(e.target.value)}
                      placeholder="Enter KG"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <span className="mx-2 text-gray-500">KG</span>
                    <button
                      onClick={handleWeightConfirm}
                      className="p-2 bg-green-500 text-white rounded-md"
                    >
                      <Check size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ml-4 mb-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Clothes Selected</p>
              {Object.keys(items).length === 0 ? (
                <div className="flex items-center text-gray-400 mb-2">
                  <span className="mr-2">⬦</span>
                  <span>No clothes selected</span>
                </div>
              ) : null}
              <button
                onClick={() => setIsAddClothesOpen(true)}
                className="w-full py-2 border border-gray-300 rounded-md flex items-center justify-center text-gray-600"
              >
                <Plus size={16} className="mr-1" />
                Add Clothes
              </button>
            </div>
          </div>
          
          {Object.entries(items).map(([category, categoryItems]) => (
            <div key={category} className="mb-4">
              <p className="font-medium mb-2">{category}</p>
              <div className="ml-4">
                {categoryItems.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="text-indigo-400 mr-2">⬦</span>
                    <span className="flex-1">{item.name}</span>
                    <span className="text-gray-600">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mb-4">
            <p className="font-medium mb-2">Order Photos</p>
            <div className="flex justify-between items-center">
              <button className="flex items-center text-gray-600">
                <Camera size={18} className="mr-1" />
                Add Photo
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-300 rounded-md mt-2">
              <div className="text-gray-400 flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mb-2">
                  <Camera size={24} className="text-gray-400" />
                </div>
                <p>No photos added yet.</p>
                <p className="text-xs text-center">Take photos of clothes or any issues.</p>
              </div>
              <button className="mt-3 px-4 py-1 border border-gray-300 rounded-md text-sm">
                Add First Photo
              </button>
            </div>
          </div>
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
