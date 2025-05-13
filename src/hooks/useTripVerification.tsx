
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { trips } from '../data/trips';

export const useTripVerification = (onVerificationSuccess: () => void) => {
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [isReportIssueDialogOpen, setIsReportIssueDialogOpen] = useState(false);

  const handleStartVerification = () => {
    setIsVerificationDialogOpen(true);
  };

  const handleReportIssue = () => {
    setIsReportIssueDialogOpen(true);
  };

  const handleSubmitIssueReport = (tripId: string, issueType: string, details: string) => {
    // Find the trip and mark it as reported
    const tripIndex = trips.findIndex(t => t.id === tripId);
    if (tripIndex !== -1) {
      // Add reported issue information to the trip
      trips[tripIndex].reportedIssue = {
        type: issueType,
        details: details,
        reportedAt: new Date().toISOString(),
      };
      
      // Mark as completed so it appears in history
      trips[tripIndex].status = "COMPLETED";
      console.log(`Trip ${tripId} marked as reported with issue: ${issueType}`);
    }
    
    toast({
      title: "Issue reported",
      description: "Your issue has been reported to our support team",
    });
  };

  return {
    isVerificationDialogOpen,
    setIsVerificationDialogOpen,
    isReportIssueDialogOpen,
    setIsReportIssueDialogOpen,
    handleStartVerification,
    handleReportIssue,
    handleSubmitIssueReport
  };
};
