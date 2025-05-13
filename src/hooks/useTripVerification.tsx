
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

export const useTripVerification = (onVerificationSuccess: () => void) => {
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [isReportIssueDialogOpen, setIsReportIssueDialogOpen] = useState(false);

  const handleStartVerification = () => {
    setIsVerificationDialogOpen(true);
  };

  const handleReportIssue = () => {
    setIsReportIssueDialogOpen(true);
  };

  const handleSubmitIssueReport = (issueType: string, details: string) => {
    // In a real app, this would send the issue report to the server
    console.log("Issue reported:", { issueType, details });
    
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
