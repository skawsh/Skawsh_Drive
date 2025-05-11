
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import { MapPin, Clock, FileText, AlertTriangle, ArrowLeft, Check } from 'lucide-react';
import StudioVerificationDialog from '../components/StudioVerificationDialog';
import { toast } from "@/components/ui/use-toast";

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  
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

  const handleViewOrderDetails = () => {
    navigate(`/order-details/${id}`);
  };

  const handleReportIssue = () => {
    // In a real app, this would open an issue reporting form
    alert('Issue reporting functionality would be implemented here');
  };

  const handleStartVerification = () => {
    setIsVerificationDialogOpen(true);
  };

  const handleCompleteDrop = () => {
    // Find the trip and mark it as completed
    const tripIndex = trips.findIndex(t => t.id === id);
    if (tripIndex !== -1) {
      trips[tripIndex].status = "COMPLETED";
    }
    
    toast({
      title: "Drop-off completed",
      description: "The laundry has been successfully dropped off",
    });
    navigate('/history');
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
          <button 
            className="absolute top-4 right-4 bg-laundry-lightGray px-3 py-1 rounded-md text-sm font-medium text-gray-700"
          >
            <Clock size={16} className="inline mr-1" />
            Snooze
          </button>
          
          <div className="mb-6">
            <span className="block text-laundry-primary font-medium mb-1">{trip.id}</span>
            <h2 className="text-xl font-bold">{trip.serviceType}</h2>
          </div>
          
          {isDrop ? (
            // Studio information for drop trips
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
            
            {isDrop && (
              <button
                onClick={handleStartVerification}
                className="w-full py-3 bg-laundry-primary text-white rounded-md font-medium flex items-center justify-center"
              >
                <Check size={18} className="mr-2" />
                Complete Drop
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
    </div>
  );
};

export default TripDetails;
