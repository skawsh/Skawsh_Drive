
import { Trip } from '../../data/trips';

export const useTripStatusManager = (trip: Trip) => {
  // Check if this is a drop or collect trip (both should be read-only)
  const isDrop = trip.status === 'DROP';
  const isCollect = trip.action === 'COLLECT';
  const isDelivery = trip.id?.startsWith('DEL-');
  const isReadOnly = isDrop || isCollect || isDelivery;

  return {
    isDrop,
    isCollect,
    isDelivery,
    isReadOnly
  };
};
