
import React, { useState } from "react";
import { ArrowLeft, Camera, Edit, MapPin, Truck, FileText, HelpCircle, Info, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/NavBar";
import { useToast } from "@/hooks/use-toast";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import EditDocumentsDialog from "@/components/profile/EditDocumentsDialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditDocuments, setShowEditDocuments] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  // Mock driver data
  const [driverData, setDriverData] = useState({
    name: "John Doe",
    phone: "+91 9876543210",
    email: "john.doe@example.com",
    location: "Mumbai, Maharashtra",
    vehicle: {
      type: "Two Wheeler",
      model: "Honda Activa",
      number: "MH01AB1234"
    },
    documents: {
      aadharNumber: "XXXX XXXX 1234",
      aadharImage: "/placeholder.svg",
      licenseNumber: "MH0120210012345",
      licenseExpiry: "12/31/2025",
      licenseImage: "/placeholder.svg"
    },
    profileImage: "/placeholder.svg"
  });

  const handleStatusChange = (checked: boolean) => {
    setIsActive(checked);
    toast({
      title: checked ? "You are now active" : "You are now inactive",
      description: checked ? "You will now receive delivery requests" : "You will not receive any delivery requests",
    });
  };

  const updateProfileData = (newData: any) => {
    setDriverData({...driverData, ...newData});
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    });
  };

  const updateDocuments = (newDocuments: any) => {
    setDriverData({
      ...driverData, 
      documents: {...driverData.documents, ...newDocuments}
    });
    toast({
      title: "Documents updated",
      description: "Your documents have been updated successfully",
    });
  };

  const handleLogout = () => {
    // Close the dialog first
    setShowLogoutDialog(false);
    
    // Show toast and navigate to login (root in this case)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-medium">My Profile</h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
          <Switch checked={isActive} onCheckedChange={handleStatusChange} />
        </div>
      </div>

      {/* Profile Summary */}
      <div className="flex flex-col items-center p-6 bg-white">
        <div className="relative mb-3">
          <Avatar className="h-24 w-24 border-4 border-gray-100">
            <AvatarImage src={driverData.profileImage} alt={driverData.name} />
            <AvatarFallback className="bg-laundry-primary text-white text-xl">
              {driverData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <Button 
            size="icon" 
            variant="outline" 
            className="absolute -bottom-1 -right-1 rounded-full h-8 w-8 bg-white border shadow-sm"
            onClick={() => setShowEditProfile(true)}
          >
            <Camera size={16} />
          </Button>
        </div>
        <h2 className="text-xl font-semibold">{driverData.name}</h2>
        <p className="text-gray-500 text-sm">{driverData.phone}</p>
        <p className="text-gray-500 text-sm">{driverData.email}</p>
        
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <MapPin size={14} className="mr-1" />
          <span>{driverData.location}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 mb-16">
        {/* Vehicle Details */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Truck size={20} className="mr-3 text-laundry-primary" />
                <h3 className="font-medium">Vehicle Details</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowEditProfile(true)}>
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
            </div>
            <Separator />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle Type</span>
                <span>{driverData.vehicle.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle Model</span>
                <span>{driverData.vehicle.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vehicle Number</span>
                <span>{driverData.vehicle.number}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Details */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FileText size={20} className="mr-3 text-laundry-primary" />
                <h3 className="font-medium">Documentation Details</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowEditDocuments(true)}>
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
            </div>
            <Separator />
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">Aadhar Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Aadhar Number</span>
                    <span>{driverData.documents.aadharNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-2">Aadhar Card</span>
                    <div className="h-20 w-full bg-gray-100 rounded-md flex items-center justify-center">
                      <img 
                        src={driverData.documents.aadharImage} 
                        alt="Aadhar Card" 
                        className="h-full object-contain" 
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">License Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">License Number</span>
                    <span>{driverData.documents.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">License Expiry</span>
                    <span>{driverData.documents.licenseExpiry}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-2">Driving License</span>
                    <div className="h-20 w-full bg-gray-100 rounded-md flex items-center justify-center">
                      <img 
                        src={driverData.documents.licenseImage} 
                        alt="Driving License" 
                        className="h-full object-contain" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Support
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <HelpCircle size={20} className="mr-3 text-gray-500" />
                    <span>Help Center</span>
                  </div>
                  <button className="text-blue-600">Visit</button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Info size={20} className="mr-3 text-gray-500" />
                    <span>About</span>
                  </div>
                  <span className="text-sm text-gray-500">v1.0.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Section */}
        <Card>
          <CardContent className="p-0">
            <button 
              className="w-full p-4 flex items-center text-red-600"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </CardContent>
        </Card>
      </div>

      <NavBar />

      {/* Dialogs */}
      <EditProfileDialog 
        open={showEditProfile} 
        onOpenChange={setShowEditProfile}
        data={driverData}
        onSave={updateProfileData}
      />

      <EditDocumentsDialog 
        open={showEditDocuments} 
        onOpenChange={setShowEditDocuments}
        documents={driverData.documents}
        onSave={updateDocuments}
      />

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout from your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
