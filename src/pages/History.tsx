
import React from 'react';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { User, Phone, MapPin, Building, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

const History = () => {
  // Filter trips that have been completed
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED');
  
  // Group completed trips by their base ID (without the PICKUP/DROP prefix)
  const groupedTrips = completedTrips.reduce((acc, trip) => {
    const baseId = trip.id.includes('-') ? trip.id.split('-')[1] : trip.id;
    if (!acc[baseId]) {
      acc[baseId] = [];
    }
    acc[baseId].push(trip);
    return acc;
  }, {} as Record<string, typeof trips>);
  
  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-gray-800">Order History</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-20">
        <ScrollArea className="h-[calc(100vh-120px)]">
          {Object.keys(groupedTrips).length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No completed orders yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedTrips).map(([baseId, tripsGroup]) => {
                // Find pickup trip and drop trip
                const pickupTrip = tripsGroup.find(t => t.action === 'PICKUP') || tripsGroup[0];
                const dropTrip = tripsGroup.find(t => t.action === 'DROP');
                
                return (
                  <Card key={baseId} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mx-1">
                    {/* Order ID and Service Type */}
                    <div className="mb-4">
                      <p className="text-blue-500 font-medium mb-1">ID: {pickupTrip.id}</p>
                      <h2 className="text-xl font-bold">{pickupTrip.serviceType}</h2>
                    </div>
                    
                    {/* Customer Information */}
                    <div className="mb-4">
                      <div className="flex items-center mt-2">
                        <User size={16} className="text-blue-400 mr-2" />
                        <h4 className="font-medium text-gray-700">{pickupTrip.customerName}</h4>
                      </div>
                      <div className="flex items-center mt-2">
                        <Phone size={16} className="text-blue-400 mr-2" />
                        <p className="text-gray-600">{pickupTrip.phoneNumber}</p>
                      </div>
                      <div className="flex items-start mt-2">
                        <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                        <p className="text-gray-600">{pickupTrip.address}</p>
                      </div>
                    </div>
                    
                    {/* Pickup Status */}
                    <div className="mb-4">
                      <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
                        <span className="font-medium">Picked Up</span>
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Only display studio and dropped off if there's a drop trip */}
                    {dropTrip && (
                      <>
                        {/* Studio Information */}
                        <div className="mb-4">
                          <div className="flex items-center mt-2">
                            <Building size={16} className="text-blue-400 mr-2" />
                            <h4 className="font-medium text-gray-700">{dropTrip.studioName || "Sparkling Clean Studio"}</h4>
                          </div>
                          <div className="flex items-center mt-2">
                            <Phone size={16} className="text-blue-400 mr-2" />
                            <p className="text-gray-600">{dropTrip.studioPhone || "+91 9876543214"}</p>
                          </div>
                          <div className="flex items-start mt-2">
                            <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-600">{dropTrip.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}</p>
                          </div>
                        </div>
                        
                        {/* Drop Status */}
                        <div className="mb-1">
                          <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
                            <span className="font-medium">Dropped off</span>
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check size={16} className="text-white" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </Card>
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
