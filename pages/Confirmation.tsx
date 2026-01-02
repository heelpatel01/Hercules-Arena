import React from 'react';
import { Check, Calendar, Clock, MapPin, Share2 } from 'lucide-react';
import { Booking } from '../types';
import { Button, Card } from '../components/UI';
import { formatDateForDisplay, formatPrice } from '../utils';

interface ConfirmationProps {
  booking: Booking;
  onHome: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ booking, onHome }) => {
  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
        <Check className="w-10 h-10 text-black stroke-[3]" />
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
      <p className="text-zinc-400 mb-8">Your slot at Hercules Arena has been reserved.</p>

      <Card className="p-0 overflow-hidden mb-8 text-left relative">
        <div className="bg-zinc-800 p-4 border-b border-zinc-700 flex justify-between items-center">
          <span className="text-xs text-zinc-400 uppercase tracking-widest">Booking ID</span>
          <span className="font-mono text-turf-400 font-bold">#{booking.id.slice(-6)}</span>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <Calendar className="w-5 h-5 text-zinc-500 mt-0.5" />
            <div>
              <p className="text-sm text-zinc-400">Date</p>
              <p className="text-white font-medium">{formatDateForDisplay(new Date(booking.date))}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-zinc-500 mt-0.5" />
            <div>
              <p className="text-sm text-zinc-400">Time</p>
              <p className="text-white font-medium">{booking.startTime} ({booking.durationMinutes} mins)</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-zinc-500 mt-0.5" />
            <div>
              <p className="text-sm text-zinc-400">Venue</p>
              <p className="text-white font-medium">Hercules Sports Arena, Bhayli</p>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-xs text-turf-500 hover:underline">View on Map</a>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 p-4 border-t border-zinc-800">
           <div className="flex justify-between items-center">
             <span className="text-sm text-zinc-400">Amount Paid</span>
             <span className="text-lg font-bold text-white">
               {formatPrice(booking.paymentStatus === 'PAID' ? booking.totalAmount : booking.totalAmount * 0.3)}
             </span>
           </div>
           {booking.paymentStatus === 'PARTIAL' && (
             <div className="text-xs text-red-400 mt-1 text-right">
               Due at venue: {formatPrice(booking.totalAmount * 0.7)}
             </div>
           )}
        </div>
      </Card>

      <div className="space-y-4">
        <Button 
          className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2"
          onClick={() => window.open(`https://wa.me/?text=I just booked a slot at Hercules Arena! Join me on ${booking.date} at ${booking.startTime}.`, '_blank')}
        >
          <Share2 className="w-4 h-4" /> Share on WhatsApp
        </Button>
        <Button variant="outline" className="w-full" onClick={onHome}>
          Book Another Slot
        </Button>
      </div>
    </div>
  );
};