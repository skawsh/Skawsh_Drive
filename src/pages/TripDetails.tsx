import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { MapPin, FileText, AlertTriangle, ArrowLeft, Check } from 'lucide-react';
import StudioVerificationDialog from '../components/StudioVerificationDialog';
import ReportIssueDialog from '../components/ReportIssueDialog';
import { toast } from "@/components/ui/use-toast";

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [isReportIssueDialogOpen, setIsReportIssueDialogOpen] = useState(false);
  
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

  // Check if this is a drop-off or collect trip
  const isDrop = trip.status === 'DROP';
  const isCollect = trip.action === 'COLLECT';
  const requiresVerification = isDrop || isCollect;

  const handleViewOrderDetails = () => {
    navigate(`/order-details/${id}`);
  };

  const handleReportIssue = () => {
    setIsReportIssueDialogOpen(true);
  };

  const handleStartVerification = () => {
    setIsVerificationDialogOpen(true);
  };
  
  // Find next nearest trip
  const findNextNearestTrip = () => {
    // Filter active trips 
    const activeTrips = trips
      .filter(t => t.status !== 'COMPLETED')
      .sort((a, b) => a.distance - b.distance);
    
    let nextTrip = null;
    
    // If this is a collect trip, find the delivery trip
    if (isCollect) {
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
    console.log("Completing trip:", trip.id);
    
    // Find the trip and mark it as completed
    const tripIndex = trips.findIndex(t => t.id === id);
    if (tripIndex !== -1) {
      trips[tripIndex].status = "COMPLETED";
      console.log(`Trip ${id} marked as COMPLETED`);
    }
    
    // If this is a collect trip, create a new delivery trip
    if (isCollect) {
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
  
  const handleSubmitIssueReport = (issueType: string, details: string) => {
    // In a real app, this would send the issue report to the server
    console.log("Issue reported:", { issueType, details });
    
    toast({
      title: "Issue reported",
      description: "Your issue has been reported to our support team",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="mr-4 p-1"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Trip Details</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-20 pb-4">
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          {/* Removed the snooze button from here */}
          
          <div className="mb-6">
            <span className="block text-laundry-primary font-medium mb-1">{trip.id}</span>
            <h2 className="text-xl font-bold">{trip.serviceType}</h2>
          </div>
          
          {(isDrop || isCollect) ? (
            // Studio information for drop/collect trips
            <div className="mb-6">
              <h3 className="font-semibold text-lg">{trip.studioName || "Sparkling Clean Studio"}</h3>
              <p className="text-gray-600">{trip.studioPhone || "+91 9876543214"}</p>
              <div className="flex items-start mt-2">
                <MapPin size={18} className="text-gray-500 mr-1 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{trip.studioAddress || "Madhapur, Hyderabad, India"}</p>
              </div>
            </div>
          ) : (
            // Customer information for pickup trips
            <div className="mb-6">
              <h3 className="font-semibold text-lg">{trip.customerName}</h3>
              <p className="text-gray-600">{trip.phoneNumber}</p>
              <div className="flex items-start mt-2">
                <MapPin size={18} className="text-gray-500 mr-1 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{trip.address}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={handleViewOrderDetails}
              className="w-full py-3 bg-laundry-success text-white rounded-md font-medium flex items-center justify-center"
            >
              <FileText size={18} className="mr-2" />
              View Order Details
            </button>
            
            {requiresVerification && (
              <button
                onClick={handleStartVerification}
                className="w-full py-3 bg-laundry-primary text-white rounded-md font-medium flex items-center justify-center"
              >
                <Check size={18} className="mr-2" />
                {isCollect ? "Complete Collection" : "Complete Drop"}
              </button>
            )}
            
            <button
              onClick={handleReportIssue}
              className="w-full py-3 bg-laundry-danger text-white rounded-md font-medium flex items-center justify-center"
            >
              <AlertTriangle size={18} className="mr-2" />
              Report Issue
            </button>
          </div>
        </div>
      </div>
      
      <NavBar />
      
      <StudioVerificationDialog 
        open={isVerificationDialogOpen}
        onOpenChange={setIsVerificationDialogOpen}
        onVerificationSuccess={handleCompleteDrop}
      />
      
      <ReportIssueDialog
        open={isReportIssueDialogOpen}
        onOpenChange={setIsReportIssueDialogOpen}
        onSubmit={handleSubmitIssueReport}
      />
    </div>
  );
};

export default TripDetails;
