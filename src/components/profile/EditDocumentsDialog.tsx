
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documents: {
    aadharNumber: string;
    aadharImage: string;
    licenseNumber: string;
    licenseExpiry: string;
    licenseImage: string;
  };
  onSave: (data: any) => void;
}

const formSchema = z.object({
  aadharNumber: z.string().min(8, "Valid Aadhar number required"),
  licenseNumber: z.string().min(8, "Valid license number required"),
  licenseExpiry: z.string().min(8, "Valid expiry date required"),
});

const EditDocumentsDialog = ({ open, onOpenChange, documents, onSave }: EditDocumentsDialogProps) => {
  const [aadharImage, setAadharImage] = useState(documents.aadharImage);
  const [licenseImage, setLicenseImage] = useState(documents.licenseImage);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aadharNumber: documents.aadharNumber,
      licenseNumber: documents.licenseNumber,
      licenseExpiry: documents.licenseExpiry,
    },
  });

  const handleAadharImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload this to a server and get back a URL
      // For this demo, we'll just simulate an upload
      setAadharImage("/placeholder.svg");
    }
  };

  const handleLicenseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload this to a server and get back a URL
      // For this demo, we'll just simulate an upload
      setLicenseImage("/placeholder.svg");
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedDocuments = {
      aadharNumber: values.aadharNumber,
      aadharImage: aadharImage,
      licenseNumber: values.licenseNumber,
      licenseExpiry: values.licenseExpiry,
      licenseImage: licenseImage,
    };
    
    onSave(updatedDocuments);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Documents</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <h3 className="font-medium">Aadhar Details</h3>
            
            <FormField
              control={form.control}
              name="aadharNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhar Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Aadhar number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Aadhar Card Image</FormLabel>
              <div className="mt-1 flex items-center">
                <div className="h-20 w-full bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={aadharImage} 
                    alt="Aadhar Card" 
                    className="h-full object-contain" 
                  />
                </div>
              </div>
              <div className="mt-2">
                <Input 
                  type="file" 
                  onChange={handleAadharImageChange}
                  accept="image/*"
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            <h3 className="font-medium pt-2">License Details</h3>
            
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter license number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="licenseExpiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Expiry</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/DD/YYYY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>License Image</FormLabel>
              <div className="mt-1 flex items-center">
                <div className="h-20 w-full bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={licenseImage} 
                    alt="License" 
                    className="h-full object-contain" 
                  />
                </div>
              </div>
              <div className="mt-2">
                <Input 
                  type="file" 
                  onChange={handleLicenseImageChange}
                  accept="image/*"
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDocumentsDialog;
