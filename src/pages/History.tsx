
import React from 'react';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { User, Phone, MapPin, Store, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const History = () => {
  // Filter trips that have been completed
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED');
  
  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-gray-800">Order History</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-4">
        <ScrollArea className="h-[calc(100vh-120px)]">
          {completedTrips.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No completed orders yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {completedTrips.map((trip) => {
                // Try to find the matching drop trip for this pickup
                const dropTripId = trip.action === 'PICKUP' ? `DROP-${trip.id.split('-')[1]}` : null;
                const dropTrip = dropTripId ? trips.find(t => t.id === dropTripId && t.status === 'COMPLETED') : null;
                
                return (
                  <div key={trip.id} className="bg-white rounded-3xl shadow-md border border-gray-100 p-5 mx-2">
                    <div className="mb-4">
                      <p className="text-blue-500 font-medium mb-1">ID: {trip.id}</p>
                      <h2 className="text-xl font-bold">{trip.serviceType}</h2>
                    </div>
                    
                    {/* Customer Information */}
                    <div className="mb-4">
                      <div className="flex items-center mt-2">
                        <User size={16} className="text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-700">{trip.customerName}</h4>
                      </div>
                      <div className="flex items-center mt-2">
                        <Phone size={16} className="text-blue-400 mr-2" />
                        <p className="text-gray-600">{trip.phoneNumber}</p>
                      </div>
                      <div className="flex items-start mt-2">
                        <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                        <p className="text-gray-600">{trip.address}</p>
                      </div>
                    </div>
                    
                    {/* Pickup Status */}
                    <div className="my-4">
                      <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
                        <span className="font-medium">Picked Up</span>
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Studio Information */}
                    <div className="mb-4">
                      <div className="flex items-center mt-2">
                        <Store size={16} className="text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-700">{trip.studioName || "Sparkling Clean Studio"}</h4>
                      </div>
                      <div className="flex items-center mt-2">
                        <Phone size={16} className="text-blue-400 mr-2" />
                        <p className="text-gray-600">{trip.studioPhone || "+91 9876543214"}</p>
                      </div>
                      <div className="flex items-start mt-2">
                        <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                        <p className="text-gray-600">{trip.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}</p>
                      </div>
                    </div>
                    
                    {/* Drop Status */}
                    <div className="my-4">
                      <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
                        <span className="font-medium">Dropped off</span>
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>
      
      <NavBar />
    </div>
  );
};

export default History;
