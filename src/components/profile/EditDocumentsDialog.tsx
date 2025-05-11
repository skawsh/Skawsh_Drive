
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DocumentsData {
  aadharNumber: string;
  aadharImage: string;
  licenseNumber: string;
  licenseExpiry: string;
  licenseImage: string;
}

interface EditDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documents: DocumentsData;
  onSave: (data: DocumentsData) => void;
}

const EditDocumentsDialog = ({ open, onOpenChange, documents, onSave }: EditDocumentsDialogProps) => {
  const [formData, setFormData] = useState<DocumentsData>({...documents});
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    documents.licenseExpiry ? new Date(documents.licenseExpiry) : undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setExpiryDate(date);
    if (date) {
      const formattedDate = format(date, "MM/dd/yyyy");
      setFormData({
        ...formData,
        licenseExpiry: formattedDate
      });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const handleImageUpload = (field: keyof DocumentsData) => {
    // In a real app, this would open a file picker and upload the image
    // For now, we'll simulate it by setting the image to a placeholder
    setFormData({
      ...formData,
      [field]: "/placeholder.svg"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-md">
        <DialogHeader className="px-4 py-3 flex flex-row items-center justify-between border-b border-gray-100">
          <div className="flex items-center">
            <DialogClose className="mr-2">
              <ArrowLeft size={20} className="text-gray-700" />
            </DialogClose>
            <DialogTitle className="text-base font-medium">Edit Documents</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col px-4 py-4 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Aadhar Details */}
          <div className="space-y-3">
            <h3 className="font-medium">Aadhar Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="aadharNumber">Aadhar Number</Label>
              <Input 
                id="aadharNumber" 
                name="aadharNumber" 
                value={formData.aadharNumber} 
                onChange={handleChange} 
                placeholder="Enter your Aadhar number"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Aadhar Card Image</Label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center cursor-pointer"
                onClick={() => handleImageUpload('aadharImage')}
              >
                {formData.aadharImage && formData.aadharImage !== "/placeholder.svg" ? (
                  <div className="w-full">
                    <img src={formData.aadharImage} alt="Aadhar Card" className="h-32 object-contain mx-auto" />
                    <p className="text-sm text-center mt-2 text-gray-500">Click to change</p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Upload Aadhar Card</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* License Details */}
          <div className="space-y-3">
            <h3 className="font-medium">License Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input 
                id="licenseNumber" 
                name="licenseNumber" 
                value={formData.licenseNumber} 
                onChange={handleChange} 
                placeholder="Enter your license number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="licenseExpiry">License Expiry Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !expiryDate && "text-muted-foreground"
                    )}
                  >
                    {expiryDate ? format(expiryDate, "MM/dd/yyyy") : "Select expiry date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Driving License Image</Label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center cursor-pointer"
                onClick={() => handleImageUpload('licenseImage')}
              >
                {formData.licenseImage && formData.licenseImage !== "/placeholder.svg" ? (
                  <div className="w-full">
                    <img src={formData.licenseImage} alt="License" className="h-32 object-contain mx-auto" />
                    <p className="text-sm text-center mt-2 text-gray-500">Click to change</p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Upload Driving License</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF up to 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-4 py-3 border-t border-gray-100">
          <Button className="w-full" onClick={handleSave}>Save Documents</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDocumentsDialog;
