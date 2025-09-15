// Firebase types for the application
import { User as FirebaseUser } from "firebase/auth";

// Re-export Firebase User type for consistency
export type User = FirebaseUser;

// User profile data structure for Firestore
export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

// Trip data structure for Firestore
export interface Trip {
  id: string;
  userId: string;
  name: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget?: number;
  status: 'planning' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Itinerary data structure for Firestore
export interface Itinerary {
  id: string;
  tripId: string;
  day: number;
  activities: Activity[];
  createdAt: Date;
  updatedAt: Date;
}

// Activity data structure
export interface Activity {
  id: string;
  name: string;
  description: string;
  time: string;
  location: string;
  cost?: number;
  category: 'accommodation' | 'transportation' | 'food' | 'attraction' | 'other';
}

