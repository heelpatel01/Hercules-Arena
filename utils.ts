import { TimeSlot, Turf, Booking } from './types';

// Generate slots from 6 AM to 2 AM (next day)
export const generateTimeSlots = (
  turf: Turf, 
  dateStr: string, 
  existingBookings: Booking[]
): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 6; // 6 AM
  const endHour = 26; // 2 AM next day

  for (let i = startHour; i < endHour; i++) {
    const hour = i % 24;
    const hourStr = hour.toString().padStart(2, '0');
    
    // Create 30 min intervals
    ['00', '30'].forEach(minute => {
      const timeLabel = `${hourStr}:${minute}`;
      
      // Determine if Peak Hour (6 PM to 11 PM)
      const isPeak = (hour >= 18 && hour <= 23);
      
      // Calculate Price
      const price = isPeak ? turf.basePricePerHour * 1.2 : turf.basePricePerHour;

      // Check Availability
      const isBooked = existingBookings.some(b => 
        b.turfId === turf.id && 
        b.date === dateStr && 
        b.status !== 'CANCELLED' &&
        checkOverlap(timeLabel, 30, b.startTime, b.durationMinutes)
      );

      slots.push({
        time: timeLabel,
        available: !isBooked,
        isPeak,
        price: isBooked ? 0 : price / 2 // Price per 30 mins
      });
    });
  }
  return slots;
};

const checkOverlap = (
  slotStart: string, 
  slotDuration: number, 
  bookingStart: string, 
  bookingDuration: number
): boolean => {
  const parseTime = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const s1 = parseTime(slotStart);
  const e1 = s1 + slotDuration;
  const s2 = parseTime(bookingStart);
  const e2 = s2 + bookingDuration;

  return s1 < e2 && e1 > s2;
};

export const formatDateForDisplay = (date: Date): string => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
};

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getDayName = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  
  return date.toLocaleDateString('en-IN', { weekday: 'long' });
};