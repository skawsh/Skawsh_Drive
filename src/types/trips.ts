
// Define the ReportedIssue interface
export interface ReportedIssue {
  type: string;
  details: string;
  reportedAt: string;
}

// Define the payment method type
export type PaymentMethodType = 'COD' | 'ONLINE' | 'PREPAID';

// Define extra properties that can be added to the Trip interface
export interface TripExtensions {
  reportedIssue?: ReportedIssue;
}

// Declare module augmentation for the Trip type
// This adds our extensions to the original Trip type without causing circular references
declare module '../data/trips' {
  interface Trip {
    reportedIssue?: ReportedIssue;
  }
}
