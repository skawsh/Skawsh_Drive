
import React from "react";
import { HelpCircle, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SupportCard: React.FC = () => {
  return (
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
  );
};

export default SupportCard;
