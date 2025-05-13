
import { Trip as OriginalTrip } from '../data/trips';

// Extend the Trip type to include reportedIssue
export interface ReportedIssue {
  type: string;
  details: string;
  reportedAt: string;
}

// Extend the Trip type from data/trips.ts
declare module '../data/trips' {
  interface Trip extends OriginalTrip {
    reportedIssue?: ReportedIssue;
    paymentMethod?: 'COD' | 'ONLINE' | 'PREPAID';
  }
}
