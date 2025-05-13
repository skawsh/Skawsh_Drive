
import React from 'react';
import { Trip } from '../../data/trips';
import { Card } from '@/components/ui/card';
import { AlertTriangle, User, Phone, MapPin, Book } from 'lucide-react';

interface ReportedTripCardProps {
  trip: Trip;
}

const ReportedTripCard: React.FC<ReportedTripCardProps> = ({ trip }) => {
  return (
    <Card key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mx-1 mb-4">
      {/* Service Type and ID */}
      <div className="mb-2 flex justify-between items-start">
        <div>
          <p className="text-sm text-red-500">ID: {trip.id}</p>
          <h2 className="text-xl font-bold">{trip.serviceType}</h2>
        </div>
        <div className="bg-red-100 p-2 rounded-full">
          <AlertTriangle size={20} className="text-red-500" />
        </div>
      </div>
      
      {/* Customer/Location Information */}
      <div className="mb-3">
        {trip.customerName && (
          <div className="flex items-center">
            <User size={16} className="text-red-400 mr-2" />
            <h4 className="font-medium text-gray-700">{trip.customerName}</h4>
          </div>
        )}
        {trip.phoneNumber && (
          <div className="flex items-center mt-1">
            <Phone size={16} className="text-red-400 mr-2" />
            <p className="text-sm text-gray-600">{trip.phoneNumber}</p>
          </div>
        )}
        {trip.address && (
          <div className="flex items-start mt-1">
            <MapPin size={16} className="text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">{trip.address}</p>
          </div>
        )}
      </div>
      
      {/* Issue Information */}
      {trip.reportedIssue && (
        <div className="mt-3 border-t pt-2">
          <div className="flex items-start">
            <Book size={16} className="text-red-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Reported Issue:</p>
              <p className="text-sm text-gray-600">{trip.reportedIssue.type}</p>
              {trip.reportedIssue.details && (
                <p className="text-sm text-gray-600 mt-1">{trip.reportedIssue.details}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Status Badge */}
      <div className="flex justify-center mt-3">
        <span className="bg-red-100 text-red-600 font-medium rounded-md px-4 py-1 flex items-center">
          Issue Reported <AlertTriangle size={14} className="ml-1" />
        </span>
      </div>
    </Card>
  );
};

export default ReportedTripCard;
