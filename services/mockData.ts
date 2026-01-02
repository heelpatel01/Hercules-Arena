import { Booking, Turf } from "../types";

export const TURFS: Turf[] = [
  {
    id: "turf-1",
    name: "Hercules Cricket Ground",
    type: "CRICKET",
    basePricePerHour: 1200,
    // Night cricket stadium/turf with floodlights and green grass
    image:
      "https://lh3.googleusercontent.com/p/AF1QipOyqW9gcQpBcRqDZRKp08wm8_cnV4-za6l5b2Wn=s1360-w1360-h1020-rw",
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
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSx6-YGYIBObETobk8WkwA9o7tJ44AURxP2xjmjd8Jv2KCFMTC7FZl9985UexQOZwxDEmPpjHK5v6bKMppCI3uL96a_K9qW-JUfe1gf2B-VTl_Z0W3tkeYJsuxy5njv-X588qDJbTGOjTO_V=s1360-w1360-h1020-rw",
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
    url: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy-evMi2U9zpeVNSNpuJ2awPF5iepO3IBjdlvBoHl_JBRhedq8n3yXgkcRNdf31XZQhgHqT1UZULF04cwxwy2d3fit-LRpMRS8ykP8z0GBLdhyQnYi-q0Zj1w7WA2v4vYE9loZKLAfq6exX=s1360-w1360-h1020-rw",
    title: "Night Floodlights",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    title: "Full Ground View",
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/29820785/pexels-photo-29820785.jpeg",
    title: "Dugout Area",
  },
  {
    id: 6,
    url: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSw8eplAbvan08mU1BHqARYZgF8txXsapesae40RtT1waGZTnf6GX-q1WoyikfPl7qnbnNJbHNBL0L8osDZghHmD8E33KakQLyowpxUXgOhLlPk9-tA0sSnxiNpkbtcE3vHtdBJ7=s1360-w1360-h1020-rw",
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
