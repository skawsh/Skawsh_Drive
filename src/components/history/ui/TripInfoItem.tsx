
import React, { ReactNode } from 'react';

interface TripInfoItemProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

const TripInfoItem: React.FC<TripInfoItemProps> = ({ icon, text, className = "" }) => {
  return (
    <div className={`flex items-start mt-2 text-gray-600 ${className}`}>
      <span className="text-blue-400 mr-2 mt-1 flex-shrink-0">{icon}</span>
      <p>{text}</p>
    </div>
  );
};

export default TripInfoItem;
