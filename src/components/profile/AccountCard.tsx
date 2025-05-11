
import React from "react";
import { LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AccountCardProps {
  onLogout: () => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ onLogout }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <button 
          className="w-full p-4 flex items-center text-red-600"
          onClick={onLogout}
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
