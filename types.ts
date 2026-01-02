export type TurfType = 'CRICKET' | 'PICKLEBALL';

export interface Turf {
  id: string;
  name: string;
  type: TurfType;
  basePricePerHour: number;
  image: string;
  description: string;
  features: string[];
}

export interface Booking {
  id: string;
  turfId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentStatus: 'PAID' | 'PARTIAL' | 'PENDING';
  paymentMethod: 'ONLINE' | 'CASH';
  timestamp: number;
}

export interface TimeSlot {
  time: string; // HH:mm
  available: boolean;
  isPeak: boolean;
  price: number;
}

export interface DateSelection {
  date: Date;
  slots: string[]; // Array of start times
}

export interface AdminStats {
  totalRevenue: number;
  totalBookings: number;
  activeTurfs: number;
  recentActivity: Booking[];
}