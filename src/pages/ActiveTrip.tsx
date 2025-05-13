
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import { MapPin, ArrowLeft, Store, Phone, Clock } from 'lucide-react';
import NavBar from '../components/NavBar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const ActiveTrip = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const trip = trips.find(t => t.id === id);
  
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

  const isDrop = trip.status === 'DROP';

  const handleNavigate = () => {
    // In a real app, this would open maps with the address
    const address = isDrop ? trip.studioAddress || trip.address : trip.address;
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleLocationReached = () => {
    navigate(`/trip-details/${id}`);
  };

  const handleSnoozeUntilNextOrderCompletion = () => {
    // In a real app, this would implement the snooze until next order completion logic
    const tripIndex = trips.findIndex(t => t.id === id);
    if (tripIndex !== -1) {
      trips[tripIndex].status = "SNOOZED";
      trips[tripIndex].snoozedUntil = "NEXT_ORDER";
    }
    
    toast({
      title: "Order Snoozed",
      description: "This order will resume after the completion of next order",
    });
    
    navigate('/');
  };

  const handleSnoozeToLastOrder = () => {
    // In a real app, this would implement the snooze to last order logic
    const tripIndex = trips.findIndex(t => t.id === id);
    if (tripIndex !== -1) {
      trips[tripIndex].status = "SNOOZED";
      trips[tripIndex].snoozedUntil = "LAST_ORDER";
    }
    
    toast({
      title: "Order Snoozed",
      description: "This order has been moved to the end of your queue",
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="mr-4 p-1"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Active Trip</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="bg-laundry-lightGray px-3 py-1 rounded-md text-sm font-medium text-gray-700 flex items-center"
              >
                <Clock size={16} className="mr-1" />
                Snooze
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white">
              <DropdownMenuItem 
                onClick={handleSnoozeUntilNextOrderCompletion}
                className="cursor-pointer"
              >
                Snooze until completion of next order
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleSnoozeToLastOrder}
                className="cursor-pointer"
              >
                Snooze to the last order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-20 pb-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="text-center mb-6">
            <span className="block text-laundry-primary font-medium mb-1">{trip.id}</span>
            <h2 className="text-xl font-bold">{trip.serviceType}</h2>
          </div>
          
          <div className="w-full text-center mb-6">
            {isDrop ? (
              // Studio information for drop trips
              <>
                <h3 className="font-semibold text-lg flex items-center justify-center">
                  <Store size={18} className="mr-2" />
                  {trip.studioName || "Sparkling Clean Studio"}
                </h3>
                <p className="text-gray-600 flex items-center justify-center mt-2">
                  <Phone size={18} className="mr-2" />
                  {trip.studioPhone || "+91 9876543214"}
                </p>
                <div className="flex items-center justify-center mt-2">
                  <MapPin size={18} className="text-gray-500 mr-1" />
                  <p className="text-gray-700">
                    {trip.studioAddress || "Madhapur, Hyderabad, India"}
                  </p>
                </div>
              </>
            ) : (
              // Customer information for pickup trips
              <>
                <h3 className="font-semibold text-lg">{trip.customerName}</h3>
                <p className="text-gray-600">{trip.phoneNumber}</p>
                <div className="flex items-center justify-center mt-2">
                  <MapPin size={18} className="text-gray-500 mr-1" />
                  <p className="text-gray-700">{trip.address}</p>
                </div>
              </>
            )}
          </div>
          
          <button
            onClick={handleNavigate}
            className="w-full mb-4 py-3 bg-laundry-primary text-white rounded-md flex items-center justify-center font-medium"
          >
            <MapPin size={18} className="mr-2" />
            Navigate
          </button>
          
          <button
            onClick={handleLocationReached}
            className="w-full py-3 bg-laundry-success text-white rounded-md font-medium"
          >
            Location Reached
          </button>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default ActiveTrip;
