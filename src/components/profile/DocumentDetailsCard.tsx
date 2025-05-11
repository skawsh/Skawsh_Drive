
import React from "react";
import { FileText, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DocumentDetailsCardProps {
  documents: {
    aadharNumber: string;
    aadharImage: string;
    licenseNumber: string;
    licenseExpiry: string;
    licenseImage: string;
  };
  onEdit: () => void;
}

const DocumentDetailsCard: React.FC<DocumentDetailsCardProps> = ({ documents, onEdit }) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <FileText size={20} className="mr-3 text-laundry-primary" />
            <h3 className="font-medium">Documentation Details</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onEdit}>
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
                <span>{documents.aadharNumber}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-2">Aadhar Card</span>
                <div className="h-20 w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <img 
                    src={documents.aadharImage} 
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
                <span>{documents.licenseNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">License Expiry</span>
                <span>{documents.licenseExpiry}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-2">Driving License</span>
                <div className="h-20 w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <img 
                    src={documents.licenseImage} 
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
  );
};

export default DocumentDetailsCard;
