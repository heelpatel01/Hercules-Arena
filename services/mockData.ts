import { Booking, Turf } from "../types";

export const TURFS: Turf[] = [
  {
    id: "turf-1",
    name: "Hercules Cricket Ground",
    type: "CRICKET",
    basePricePerHour: 1200,
    // Night cricket stadium/turf with floodlights and green grass
    image: "/NightFloodlights.png",
    description:
      "Professional grade cricket turf with ample run-up area, high nets, and floodlights for night matches.",
    features: [
      "Box Cricket",
      "Night Lights",
      "Dugout Seating",
      "Bowling Machine Available",
    ],
  },
  {
    id: "turf-2",
    name: "Pickleball Court A",
    type: "PICKLEBALL",
    basePricePerHour: 800,
    // Synthetic court image
    image: "/pickleball.png",
    description:
      "Standard size pickleball court with premium synthetic surface and anti-skid coating.",
    features: [
      "International Dimensions",
      "Anti-skid Surface",
      "Equipment Rental",
    ],
  },
];

export const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=800",
    title: "Match Action",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=800",
    title: "Premium Turf Grass",
  },
  {
    id: 3,
    url: "/NightFloodlights.png",
    title: "Night Floodlights",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    title: "Full Ground View",
  },
  {
    id: 5,
    url: "/DugoutArea.png",
    title: "Dugout Area",
  },
  {
    id: 6,
    url: "/pickleball.png",
    title: "Pickleball Action",
  },
];

const STORAGE_KEY = "hercules_bookings";

export const getBookings = (): Booking[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
};

export const saveBooking = (booking: Booking): void => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const updateBookingStatus = (
  id: string,
  status: Booking["status"]
): void => {
  const bookings = getBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
};
