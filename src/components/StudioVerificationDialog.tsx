
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/components/ui/input-otp";

interface StudioVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerificationSuccess: () => void;
}

const StudioVerificationDialog: React.FC<StudioVerificationDialogProps> = ({
  open,
  onOpenChange,
  onVerificationSuccess,
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const correctCode = "1234"; // In a real app, this would be dynamic
  
  const handleVerify = () => {
    if (verificationCode === correctCode) {
      toast({
        title: "Verification successful",
        description: "Studio code verified successfully",
      });
      onVerificationSuccess();
      onOpenChange(false);
    } else {
      toast({
        title: "Verification failed",
        description: "Incorrect verification code. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Studio Verification</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            Please enter the 4-digit verification code provided by the laundry studio.
          </p>
          
          <div className="flex justify-center mb-4">
            <InputOTP 
              maxLength={4}
              value={verificationCode}
              onChange={setVerificationCode}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleVerify} disabled={verificationCode.length !== 4}>
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudioVerificationDialog;
