
import React, { useState } from "react";
import { ArrowLeft, Bell, Moon, Languages, HelpCircle, Info, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import NavBar from "@/components/NavBar";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    toast({
      title: checked ? "Dark mode enabled" : "Dark mode disabled",
      description: checked ? "Your app is now in dark mode" : "Your app is now in light mode",
    });
  };

  const handleNotificationsToggle = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: checked ? "Notifications enabled" : "Notifications disabled",
      description: checked ? "You will receive notifications" : "You will not receive notifications",
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
      <div className="bg-white p-4 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">Settings</h1>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-4 space-y-6 mb-16">
        {/* Appearance Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Appearance
          </h2>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Moon size={20} className="mr-3 text-gray-500" />
                <span>Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
            </div>
            <Separator />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Languages size={20} className="mr-3 text-gray-500" />
                <span>Language</span>
              </div>
              <div className="text-sm font-medium text-gray-500">English</div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Notifications
          </h2>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bell size={20} className="mr-3 text-gray-500" />
                <span>Push Notifications</span>
              </div>
              <Switch checked={notifications} onCheckedChange={handleNotificationsToggle} />
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Support
          </h2>
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <HelpCircle size={20} className="mr-3 text-gray-500" />
                <span>Help Center</span>
              </div>
              <button className="text-blue-600">Visit</button>
            </div>
            <Separator />
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Info size={20} className="mr-3 text-gray-500" />
                <span>About</span>
              </div>
              <span className="text-sm text-gray-500">v1.0.0</span>
            </div>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Account
          </h2>
          <div className="bg-white rounded-lg shadow-sm">
            <button 
              className="w-full p-4 flex items-center text-red-600"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

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

      <NavBar />
    </div>
  );
};

export default Settings;
