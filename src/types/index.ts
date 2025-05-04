
// Station status types
export type StationStatus = 'available' | 'busy' | 'closed' | 'maintenance';

// Rating type (1-5 stars)
export type Rating = 1 | 2 | 3 | 4 | 5;

// Facility types that can be available at stations
export type Facility = 
  | 'restrooms' 
  | 'convenience_store' 
  | 'food' 
  | 'coffee' 
  | 'car_wash' 
  | 'atm' 
  | 'waiting_area' 
  | 'air_filling';

// Payment methods
export type PaymentMethod = 
  | 'cash' 
  | 'credit_card' 
  | 'debit_card' 
  | 'upi' 
  | 'wallet' 
  | 'prepaid_card';

// Review interface
export interface Review {
  id: string;
  userId: string;
  username: string;
  rating: Rating;
  comment: string;
  date: Date;
  helpful: number;
}

// Station interface
export interface Station {
  id: string;
  name: string;
  company: string;
  address: string;
  city: string;
  state: string;
  location: {
    lat: number;
    lng: number;
  };
  status: StationStatus;
  waitingTime: number; // in minutes
  pricePerKg: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  operatingHours: {
    open: string; // 24-hour format
    close: string; // 24-hour format
  };
  facilities: Facility[];
  paymentMethods: PaymentMethod[];
  lastUpdated: Date;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[]; // station IDs
  reviews: string[]; // review IDs
}

// Route interface
export interface Route {
  id: string;
  userId: string;
  name: string;
  origin: {
    name: string;
    location: {
      lat: number;
      lng: number;
    }
  };
  destination: {
    name: string;
    location: {
      lat: number;
      lng: number;
    }
  };
  waypoints: {
    location: {
      lat: number;
      lng: number;
    },
    stationId?: string;
  }[];
  distance: number; // in km
  duration: number; // in minutes
  created: Date;
}
