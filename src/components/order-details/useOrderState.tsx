
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ClothingItem } from '../../utils/orderUtils';

interface OrderStateProps {
  initialItems: Record<string, ClothingItem[]>;
  isReadOnly?: boolean;
  demoActualWeight?: string; // Add prop for demo weight
}

const useOrderState = ({ initialItems, isReadOnly = false, demoActualWeight }: OrderStateProps) => {
  const { toast } = useToast();
  const [actualWeight, setActualWeight] = useState<string>(demoActualWeight || '');
  const [items, setItems] = useState<Record<string, ClothingItem[]>>(initialItems);
  
  // Track UI state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  // Effect to initialize showCompleteButton for read-only mode
  useEffect(() => {
    if (isReadOnly) {
      // In read-only mode, show complete button right away and hide save button
      setShowCompleteButton(true);
      setShowSaveButton(false);
    }
  }, [isReadOnly]);

  // Effect to detect changes
  useEffect(() => {
    if (isReadOnly) {
      // In read-only mode, don't show any action buttons
      setHasUnsavedChanges(false);
      setShowSaveButton(false);
      setShowCompleteButton(true);  // Always show complete button in read-only mode
      return;
    }
    
    // If weight is added or clothes are added, show save button
    const hasWeight = actualWeight !== '';
    const hasClothes = Object.keys(items).length > 0;
    
    if (hasWeight || hasClothes) {
      setHasUnsavedChanges(true);
      setShowSaveButton(true);
      // Hide complete button until changes are saved
      setShowCompleteButton(false);
    } else {
      setHasUnsavedChanges(false);
      setShowSaveButton(false);
    }
  }, [actualWeight, items, isReadOnly]);

  const handleWeightConfirm = () => {
    if (isReadOnly) return;
    
    setShowSaveButton(true);
    toast({
      title: "Weight confirmed",
      description: `Actual weight set to ${actualWeight} KG`,
    });
  };

  const handleSaveChanges = () => {
    if (isReadOnly) return;
    
    // Check if actual weight is empty
    if (actualWeight === '') {
      toast({
        title: "Action required",
        description: "Please add actual weight before saving changes",
      });
      return;
    }
    
    toast({
      title: "Changes saved",
      description: "Order details have been updated",
    });
    
    setChangesSaved(true);
    setHasUnsavedChanges(false);
    
    setShowSaveButton(false);
    setShowCompleteButton(true);
  };

  const handleCompletePickup = () => {
    if (isReadOnly) {
      // For read-only mode (drop or collect trips)
      toast({
        title: isReadOnly ? "Trip completed" : "Pickup completed",
        description: "Order has been successfully processed",
      });
      return;
    }
    
    toast({
      title: "Pickup completed",
      description: "Order has been successfully completed",
    });
  };

  const hasNoWeight = actualWeight === '';
  const hasNoClothes = Object.keys(items).length === 0;
  const isSaveDisabled = hasNoWeight && hasNoClothes;

  return {
    actualWeight,
    setActualWeight: isReadOnly ? () => {} : setActualWeight,
    items,
    setItems: isReadOnly ? () => {} : setItems,
    hasUnsavedChanges,
    changesSaved,
    showSaveButton,
    showCompleteButton,
    handleWeightConfirm,
    handleSaveChanges,
    handleCompletePickup,
    isSaveDisabled,
    isReadOnly,
  };
};

export default useOrderState;
