
import React, { useState } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ReportIssueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (issueType: string, details: string) => void;
}

const ReportIssueDialog = ({ open, onOpenChange, onSubmit }: ReportIssueDialogProps) => {
  const [issueType, setIssueType] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(issueType, details);
    setIssueType("");
    setDetails("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-md">
        <DialogHeader className="px-4 py-3 flex flex-row items-center justify-between border-b border-gray-100">
          <div className="flex items-center">
            <DialogClose className="mr-2">
              <ArrowLeft size={20} className="text-gray-700" />
            </DialogClose>
            <DialogTitle className="text-base font-medium">Report an Issue</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="px-4 py-4">
          <div className="flex items-center text-red-500 font-medium mb-4">
            <AlertTriangle size={20} className="mr-2" />
            <h2 className="text-lg">Report an Issue</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What's the issue?</label>
              <Select value={issueType} onValueChange={setIssueType}>
                <SelectTrigger className="w-full border border-gray-200 rounded-md">
                  <SelectValue placeholder="Select an issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-not-responding">Customer Not Responding</SelectItem>
                  <SelectItem value="invalid-contact">Customer Gave Invalid Contact Number</SelectItem>
                  <SelectItem value="not-present">Customer Not Present at Location</SelectItem>
                  <SelectItem value="wrong-address">Wrong Address Provided</SelectItem>
                  <SelectItem value="custom">Custom Issue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
              <Textarea 
                placeholder="Please provide any additional details that might help our support team..."
                className="min-h-[100px] border-gray-200"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full bg-red-500 hover:bg-red-600 text-white"
              onClick={handleSubmit}
              disabled={!issueType}
            >
              <AlertTriangle size={16} className="mr-2" />
              Report Issue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportIssueDialog;
