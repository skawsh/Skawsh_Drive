
import React from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { MapPin } from "lucide-react";

interface ProfileHeaderProps {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  onEditProfile: () => void;
  userData: {
    name: string;
    phone: string;
    email: string;
    location: string;
    profileImage: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  isActive, 
  setIsActive, 
  onEditProfile, 
  userData 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStatusChange = (checked: boolean) => {
    setIsActive(checked);
    toast({
      title: checked ? "You are now active" : "You are now inactive",
      description: checked ? "You will now receive delivery requests" : "You will not receive any delivery requests",
    });
  };

  return (
    <>
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
            <AvatarImage src={userData.profileImage} alt={userData.name} />
            <AvatarFallback className="bg-laundry-primary text-white text-xl">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <Button 
            size="icon" 
            variant="outline" 
            className="absolute -bottom-1 -right-1 rounded-full h-8 w-8 bg-white border shadow-sm"
            onClick={onEditProfile}
          >
            <Camera size={16} />
          </Button>
        </div>
        <h2 className="text-xl font-semibold">{userData.name}</h2>
        <p className="text-gray-500 text-sm">{userData.phone}</p>
        <p className="text-gray-500 text-sm">{userData.email}</p>
        
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <MapPin size={14} className="mr-1" />
          <span>{userData.location}</span>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
