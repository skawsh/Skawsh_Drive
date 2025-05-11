
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

  const handleCompleteDrop = () => {
    // Find the trip and mark it as completed
    const tripIndex = trips.findIndex(t => t.id === id);
    if (tripIndex !== -1) {
      trips[tripIndex].status = "COMPLETED";
    }
    
    toast({
      title: isCollect ? "Collection completed" : "Drop-off completed",
      description: isCollect ? "The laundry has been successfully collected" : "The laundry has been successfully dropped off",
    });
    navigate('/history');
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
