
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/NavBar";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import EditDocumentsDialog from "@/components/profile/EditDocumentsDialog";
import ProfileHeader from "@/components/profile/ProfileHeader";
import VehicleDetailsCard from "@/components/profile/VehicleDetailsCard";
import DocumentDetailsCard from "@/components/profile/DocumentDetailsCard";
import SupportCard from "@/components/profile/SupportCard";
import AccountCard from "@/components/profile/AccountCard";
import LogoutDialog from "@/components/profile/LogoutDialog";

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
      <ProfileHeader 
        isActive={isActive}
        setIsActive={setIsActive}
        onEditProfile={() => setShowEditProfile(true)}
        userData={{
          name: driverData.name,
          phone: driverData.phone,
          email: driverData.email,
          location: driverData.location,
          profileImage: driverData.profileImage
        }}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 mb-16">
        <VehicleDetailsCard 
          vehicleData={driverData.vehicle}
          onEdit={() => setShowEditProfile(true)}
        />

        <DocumentDetailsCard 
          documents={driverData.documents}
          onEdit={() => setShowEditDocuments(true)}
        />

        <SupportCard />

        <AccountCard onLogout={() => setShowLogoutDialog(true)} />
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

      <LogoutDialog 
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Profile;
