
import { useNavigate } from 'react-router-dom';
import { trips } from '../data/trips';
import { Trip } from '../data/trips';
import { toast } from "@/components/ui/use-toast";

export const useTripNavigation = (trip: Trip | undefined) => {
  const navigate = useNavigate();

  // Find next nearest trip
  const findNextNearestTrip = () => {
    if (!trip) return null;

    // Filter active trips 
    const activeTrips = trips
      .filter(t => t.status !== 'COMPLETED')
      .sort((a, b) => a.distance - b.distance);
    
    let nextTrip = null;
    
    // If this is a collect trip, find the delivery trip
    if (trip.action === 'COLLECT') {
      // Extract the base ID
      const baseId = trip.id.split('-')[1];
      // Look for the corresponding delivery trip or create one if needed
      nextTrip = activeTrips.find(t => t.id === `DEL-${baseId}`);
    }
    
    // If no specific next trip is found, return the closest trip
    if (!nextTrip && activeTrips.length > 0) {
      nextTrip = activeTrips[0];
    }
    
    return nextTrip;
  };

  const handleCompleteDrop = () => {
    if (!trip) return;
    
    console.log("Completing trip:", trip.id);
    
    // Find the trip and mark it as completed
    const tripIndex = trips.findIndex(t => t.id === trip.id);
    if (tripIndex !== -1) {
      trips[tripIndex].status = "COMPLETED";
      console.log(`Trip ${trip.id} marked as COMPLETED`);
    }
    
    // If this is a collect trip, create a new delivery trip
    if (trip.action === 'COLLECT') {
      // Create a new delivery trip
      const deliveryTripId = `DEL-${trip.id.split('-')[1]}`;
      const existingDeliveryTrip = trips.find(t => t.id === deliveryTripId);
      
      if (!existingDeliveryTrip) {
        const deliveryTrip = {
          ...trip,
          id: deliveryTripId,
          action: "DROP" as const,
          status: "PICKUP" as const, // Set as PICKUP so it shows in the active trips
          type: trip.type, // Ensure the type (EXPRESS/STANDARD) is preserved
          // Preserve customer information for delivery trips
          customerName: trip.customerName || "Customer Name",
          phoneNumber: trip.phoneNumber || "+91 9876543210",
          address: trip.address || "Customer Address",
        };
        
        // Add to trips array
        trips.push(deliveryTrip);
      }
      
      toast({
        title: "Collection completed",
        description: "A new delivery trip has been created",
      });
      
      // Find the next nearest trip (should be the delivery trip we just created)
      const nextTrip = findNextNearestTrip();
      
      if (nextTrip) {
        // Navigate to that trip
        navigate(`/active-trip/${nextTrip.id}`);
      } else {
        // Navigate to dashboard if no next trip
        navigate('/');
      }
    } else {
      toast({
        title: "Drop-off completed",
        description: "The laundry has been successfully dropped off",
      });
      
      // Find the next nearest trip
      const nextTrip = findNextNearestTrip();
      
      if (nextTrip) {
        // Navigate to that trip
        navigate(`/active-trip/${nextTrip.id}`);
      } else {
        // Navigate to dashboard if no next trip
        navigate('/');
      }
    }
  };
  
  const navigateToOrderDetails = (id: string) => {
    navigate(`/order-details/${id}`);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return {
    handleCompleteDrop,
    navigateToOrderDetails,
    navigateToHome
  };
};
