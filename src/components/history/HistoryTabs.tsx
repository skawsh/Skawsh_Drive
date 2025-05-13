
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface HistoryTabsProps {
  activeTab: string;
  completedCount: number;
  reportedCount: number;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const HistoryTabs: React.FC<HistoryTabsProps> = ({ 
  activeTab, 
  completedCount, 
  reportedCount, 
  onTabChange,
  children 
}) => {
  return (
    <Tabs defaultValue={activeTab} className="w-full" onValueChange={onTabChange}>
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="completed" className="flex items-center justify-center">
          <CheckCircle size={16} className="mr-1" />
          Completed ({completedCount})
        </TabsTrigger>
        <TabsTrigger value="reported" className="flex items-center justify-center">
          <AlertTriangle size={16} className="mr-1" />
          Reported ({reportedCount})
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};

export default HistoryTabs;
