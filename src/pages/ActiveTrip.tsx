
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import { MapPin, ArrowLeft, Store, Phone, Clock } from 'lucide-react';
import NavBar from '../components/NavBar';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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

  const handleSnooze = () => {
    // This is a non-functional placeholder
    toast({
      title: "Feature not available",
      description: "Snooze functionality is not implemented yet.",
    });
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSnooze}
            className="flex items-center gap-1 border-orange-400 text-orange-600"
          >
            <Clock size={16} />
            Snooze
          </Button>
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
