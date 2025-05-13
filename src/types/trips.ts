
// Define the ReportedIssue interface
export interface ReportedIssue {
  type: string;
  details: string;
  reportedAt: string;
}

// Import the original Trip type
import { Trip as OriginalTrip } from '../data/trips';

// Define extended properties for the Trip type
export interface TripExtensions {
  reportedIssue?: ReportedIssue;
  paymentMethod?: 'COD' | 'ONLINE' | 'PREPAID';
}

// Extend the Trip type from data/trips.ts
declare module '../data/trips' {
  interface Trip extends OriginalTrip, TripExtensions {}
}
