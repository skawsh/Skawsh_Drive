import React from 'react';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { User, Phone, MapPin, Building, Check, Store } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

const History = () => {
  // Filter trips that have been completed
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED');
  
  // Group completed trips by their base ID (without the PICKUP/DROP/DEL prefix)
  const groupedTrips = completedTrips.reduce((acc, trip) => {
    // Extract the base ID
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
                // Find pickup, collect, drop and delivery trips
                const pickupTrip = tripsGroup.find(t => t.action === 'PICKUP' && !t.id.startsWith('DEL-')) || tripsGroup[0];
                const collectTrip = tripsGroup.find(t => t.action === 'COLLECT');
                const dropTrip = tripsGroup.find(t => t.action === 'DROP');
                const deliveryTrip = tripsGroup.find(t => t.id.startsWith('DEL-'));
                
                // Use this trip for display (prefer pickup but use any available)
                const displayTrip = pickupTrip || collectTrip || dropTrip || deliveryTrip;
                
                // Check if we have both collection and delivery completed
                const hasCollectAndDelivery = collectTrip && deliveryTrip;
                
                // For traditional pickup/drop flow
                const hasPickupAndDrop = pickupTrip && dropTrip;
                
                return (
                  <Card key={baseId} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mx-1">
                    {/* Order ID and Service Type */}
                    <div className="mb-4">
                      <p className="text-blue-500 font-medium mb-1">ID: {displayTrip.id}</p>
                      <h2 className="text-xl font-bold">{displayTrip.serviceType}</h2>
                    </div>
                    
                    {/* Collection and Delivery UI - Show when both exist */}
                    {hasCollectAndDelivery ? (
                      <>
                        {/* Studio Information */}
                        <div className="mb-4">
                          <div className="flex items-center mt-2">
                            <Store size={16} className="text-blue-400 mr-2" />
                            <h4 className="font-medium text-gray-700">
                              {collectTrip?.studioName || "Sparkling Clean Studio"}
                            </h4>
                          </div>
                          <div className="flex items-center mt-2">
                            <Phone size={16} className="text-blue-400 mr-2" />
                            <p className="text-gray-600">
                              {collectTrip?.studioPhone || "+91 9876543214"}
                            </p>
                          </div>
                          <div className="flex items-start mt-2">
                            <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-600">
                              {collectTrip?.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}
                            </p>
                          </div>
                        </div>
                        
                        {/* Collection Status */}
                        <div className="mb-4">
                          <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
                            <span className="font-medium">Collected</span>
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check size={16} className="text-white" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Customer Information */}
                        <div className="mb-4">
                          <div className="flex items-center mt-2">
                            <User size={16} className="text-blue-400 mr-2" />
                            <h4 className="font-medium text-gray-700">{deliveryTrip?.customerName}</h4>
                          </div>
                          <div className="flex items-center mt-2">
                            <Phone size={16} className="text-blue-400 mr-2" />
                            <p className="text-gray-600">{deliveryTrip?.phoneNumber}</p>
                          </div>
                          <div className="flex items-start mt-2">
                            <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                            <p className="text-gray-600">{deliveryTrip?.address}</p>
                          </div>
                          <div className="mt-2 font-medium">Payment: COD</div>
                        </div>
                        
                        {/* Delivery Status */}
                        <div className="mb-1">
                          <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
                            <span className="font-medium">Delivered</span>
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check size={16} className="text-white" />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : hasPickupAndDrop ? (
                      // Traditional Pickup and Drop UI - Keep existing functionality
                      <>
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
                    ) : (
                      // Show simple completed status for individual trips
                      <>
                        {/* Display info based on what trip type we have */}
                        <div className="mb-4">
                          {displayTrip.action === 'PICKUP' || displayTrip.id.startsWith('DEL-') ? (
                            // Customer information for pickup/delivery
                            <>
                              <div className="flex items-center mt-2">
                                <User size={16} className="text-blue-400 mr-2" />
                                <h4 className="font-medium text-gray-700">{displayTrip.customerName}</h4>
                              </div>
                              <div className="flex items-center mt-2">
                                <Phone size={16} className="text-blue-400 mr-2" />
                                <p className="text-gray-600">{displayTrip.phoneNumber}</p>
                              </div>
                              <div className="flex items-start mt-2">
                                <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                                <p className="text-gray-600">{displayTrip.address}</p>
                              </div>
                            </>
                          ) : (
                            // Studio information for collect/drop
                            <>
                              <div className="flex items-center mt-2">
                                <Store size={16} className="text-blue-400 mr-2" />
                                <h4 className="font-medium text-gray-700">
                                  {displayTrip.studioName || "Sparkling Clean Studio"}
                                </h4>
                              </div>
                              <div className="flex items-center mt-2">
                                <Phone size={16} className="text-blue-400 mr-2" />
                                <p className="text-gray-600">
                                  {displayTrip.studioPhone || "+91 9876543214"}
                                </p>
                              </div>
                              <div className="flex items-start mt-2">
                                <MapPin size={16} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                                <p className="text-gray-600">
                                  {displayTrip.studioAddress || "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana"}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        
                        {/* Simple completed status */}
                        <div className="mb-1">
                          <div className="bg-gray-100 rounded-md p-3 flex justify-between items-center">
                            <span className="font-medium">Completed</span>
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
