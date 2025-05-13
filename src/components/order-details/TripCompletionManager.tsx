import { useNavigate } from 'react-router-dom';
import { Trip, trips } from '../../data/trips';
import { toast } from "@/components/ui/use-toast";

interface TripCompletionManagerProps {
  trip: Trip;
}

export const useTripCompletionManager = ({ trip }: TripCompletionManagerProps) => {
  const navigate = useNavigate();

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
  const completeTrip = () => {
    console.log("Completing pickup/drop in OrderDetails for trip:", trip.id);
    
    // If this is a pickup trip, create a drop trip and mark the pickup as completed
    if (trip && trip.action === 'PICKUP' && trip.status !== 'DROP') {
      // First, mark the original pickup trip as completed
      const pickupIndex = trips.findIndex(t => t.id === trip.id);
      if (pickupIndex !== -1) {
        trips[pickupIndex].status = "COMPLETED";
        console.log(`Pickup trip ${trip.id} marked as COMPLETED`);
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
    } 
    // If this is a drop trip, mark it as completed and navigate to trips section
    else if (trip && trip.status === 'DROP') {
      // Find the original trip and mark it as completed
      const tripIndex = trips.findIndex(t => t.id === trip.id);
      if (tripIndex !== -1) {
        trips[tripIndex].status = "COMPLETED";
        console.log(`Drop trip ${trip.id} marked as COMPLETED`);
      }
      
      // Show success toast
      toast({
        title: "Drop-off completed",
        description: "Order has been moved to history",
      });
    } 
    // If this is a delivery trip, mark it as completed and navigate to trips section
    else if (trip && trip.id.startsWith('DEL-')) {
      // Find the trip and mark it as completed
      const tripIndex = trips.findIndex(t => t.id === trip.id);
      if (tripIndex !== -1) {
        trips[tripIndex].status = "COMPLETED";
        console.log(`Delivery trip ${trip.id} marked as COMPLETED`);
      }
      
      // Show success toast
      toast({
        title: "Delivery completed",
        description: "Order has been delivered successfully",
      });
    }
    
    // Always redirect to trips section after completion
    navigate('/');
  };

  return { completeTrip };
};
