
import React from 'react';
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
  const { isDrop, isCollect, requiresVerification } = useTripStatusManager(trip);

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
            onViewOrderDetails={handleViewOrderDetails}
            onStartVerification={handleStartVerification}
            onReportIssue={handleReportIssue}
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
