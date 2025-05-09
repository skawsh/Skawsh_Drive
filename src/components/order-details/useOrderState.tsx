
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ClothingItem } from '../../utils/orderUtils';

interface OrderStateProps {
  initialItems: Record<string, ClothingItem[]>;
}

const useOrderState = ({ initialItems }: OrderStateProps) => {
  const { toast } = useToast();
  const [actualWeight, setActualWeight] = useState<string>('');
  const [items, setItems] = useState<Record<string, ClothingItem[]>>(initialItems);
  
  // Track UI state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  // Effect to detect changes
  useEffect(() => {
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
  }, [actualWeight, items]);

  const handleWeightConfirm = () => {
    setShowSaveButton(true);
    toast({
      title: "Weight confirmed",
      description: `Actual weight set to ${actualWeight} KG`,
    });
  };

  const handleSaveChanges = () => {
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
    setActualWeight,
    items,
    setItems,
    hasUnsavedChanges,
    changesSaved,
    showSaveButton,
    showCompleteButton,
    handleWeightConfirm,
    handleSaveChanges,
    handleCompletePickup,
    isSaveDisabled,
  };
};

export default useOrderState;
