
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { trips } from '../data/trips';
import NavBar from '../components/NavBar';
import StudioVerificationDialog from '../components/StudioVerificationDialog';
import ReportIssueDialog from '../components/ReportIssueDialog';
import { useTripNavigation } from '../hooks/useTripNavigation';
import { useTripVerification } from '../hooks/useTripVerification';
import TripHeader from '../components/trip-details/TripHeader';
import TripInformation from '../components/trip-details/TripInformation';
import TripActionButtons from '../components/trip-details/TripActionButtons';
import { useTripStatusManager } from '../components/order-details/TripStatusManager';
import { toast } from "@/components/ui/use-toast";

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const trip = trips.find(t => t.id === id);
  
  const { 
    handleCompleteDrop, 
    navigateToOrderDetails, 
    navigateToHome 
  } = useTripNavigation(trip);

  // If trip not found, show not found UI
  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-lg text-gray-600">Trip not found</p>
        <button 
          onClick={navigateToHome}
          className="mt-4 px-4 py-2 bg-laundry-primary text-white rounded-md"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Get trip status information
  const { isDrop, isCollect, isDelivery, requiresVerification } = useTripStatusManager(trip);

  // Use trip verification hook
  const {
    isVerificationDialogOpen,
    setIsVerificationDialogOpen,
    isReportIssueDialogOpen,
    setIsReportIssueDialogOpen,
    handleStartVerification,
    handleReportIssue,
    handleSubmitIssueReport
  } = useTripVerification(handleCompleteDrop);

  const handleViewOrderDetails = () => {
    navigateToOrderDetails(id!);
  };

  // Handle delivery completion
  const handleCompleteDelivery = (isCOD: boolean) => {
    if (!trip) return;
    
    // Find the trip and mark it as completed
    const tripIndex = trips.findIndex(t => t.id === trip.id);
    if (tripIndex !== -1) {
      trips[tripIndex].status = "COMPLETED";
      // If it's COD, we could add extra information here
      if (isCOD) {
        trips[tripIndex].paymentMethod = "COD" as any;
      }
      console.log(`Delivery trip ${trip.id} marked as COMPLETED${isCOD ? ' with COD' : ''}`);
    }
    
    // Show success toast
    toast({
      title: "Delivery completed",
      description: isCOD ? "Cash on Delivery order completed" : "Order has been delivered successfully",
    });
    
    // Navigate back to home
    navigateToHome();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <TripHeader onBack={navigateToHome} />
      
      <div className="container mx-auto px-4 pt-20 pb-4">
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <div className="mb-6">
            <span className="block text-laundry-primary font-medium mb-1">{trip.id}</span>
            <h2 className="text-xl font-bold">{trip.serviceType}</h2>
          </div>
          
          <TripInformation 
            trip={trip}
            isDrop={isDrop}
            isCollect={isCollect}
          />
          
          <TripActionButtons 
            requiresVerification={requiresVerification}
            isCollect={isCollect}
            isDelivery={isDelivery}
            onViewOrderDetails={handleViewOrderDetails}
            onStartVerification={handleStartVerification}
            onReportIssue={handleReportIssue}
            onCompleteDelivery={handleCompleteDelivery}
          />
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
