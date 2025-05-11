
import React from "react";
import { Truck, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface VehicleDetailsCardProps {
  vehicleData: {
    type: string;
    model: string;
    number: string;
  };
  onEdit: () => void;
}

const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({ vehicleData, onEdit }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Truck size={20} className="mr-3 text-laundry-primary" />
            <h3 className="font-medium">Vehicle Details</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit size={16} className="mr-1" />
            Edit
          </Button>
        </div>
        <Separator />
        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Vehicle Type</span>
            <span>{vehicleData.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Vehicle Model</span>
            <span>{vehicleData.model}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Vehicle Number</span>
            <span>{vehicleData.number}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleDetailsCard;
