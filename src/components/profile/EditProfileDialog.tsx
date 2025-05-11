
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileData {
  name: string;
  phone: string;
  email: string;
  location: string;
  vehicle: {
    type: string;
    model: string;
    number: string;
  };
  profileImage: string;
}

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ProfileData;
  onSave: (data: ProfileData) => void;
}

const EditProfileDialog = ({ open, onOpenChange, data, onSave }: EditProfileDialogProps) => {
  const [formData, setFormData] = useState<ProfileData>({...data});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof ProfileData],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleVehicleTypeChange = (value: string) => {
    setFormData({
      ...formData,
      vehicle: {
        ...formData.vehicle,
        type: value
      }
    });
  };

  const handleSave = () => {
    onSave(formData);
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
            <DialogTitle className="text-base font-medium">Edit Profile</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col px-4 py-4 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <Avatar className="h-24 w-24 border-4 border-gray-100">
                <AvatarImage src={formData.profileImage} alt={formData.name} />
                <AvatarFallback className="bg-laundry-primary text-white text-xl">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="outline" 
                className="absolute -bottom-1 -right-1 rounded-full h-8 w-8 bg-white border shadow-sm"
              >
                <Camera size={16} />
              </Button>
            </div>
            <span className="text-sm text-gray-500">Change profile picture</span>
          </div>

          {/* Personal Details */}
          <div className="space-y-3">
            <h3 className="font-medium">Personal Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="Enter your location"
              />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-3">
            <h3 className="font-medium">Vehicle Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select value={formData.vehicle.type} onValueChange={handleVehicleTypeChange}>
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Two Wheeler">Two Wheeler</SelectItem>
                  <SelectItem value="Three Wheeler">Three Wheeler</SelectItem>
                  <SelectItem value="Four Wheeler">Four Wheeler</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicle.model">Vehicle Model</Label>
              <Input 
                id="vehicle.model" 
                name="vehicle.model" 
                value={formData.vehicle.model} 
                onChange={handleChange} 
                placeholder="Enter your vehicle model"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicle.number">Vehicle Number</Label>
              <Input 
                id="vehicle.number" 
                name="vehicle.number" 
                value={formData.vehicle.number} 
                onChange={handleChange} 
                placeholder="Enter your vehicle number"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-4 py-3 border-t border-gray-100">
          <Button className="w-full" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
