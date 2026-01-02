import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Smartphone, CreditCard } from 'lucide-react';
import { Booking, Turf } from '../types';
import { TURFS } from '../services/mockData';
import { Button, Card, Input } from '../components/UI';
import { formatDateForDisplay, formatPrice } from '../utils';

interface CheckoutProps {
  bookingDetails: Partial<Booking>;
  onBack: () => void;
  onConfirm: (finalBooking: Booking) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ bookingDetails, onBack, onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMode, setPaymentMode] = useState<'FULL' | 'ADVANCE'>('ADVANCE');
  const [isProcessing, setIsProcessing] = useState(false);

  const turf = TURFS.find(t => t.id === bookingDetails.turfId);
  const total = bookingDetails.totalAmount || 0;
  const advanceAmount = Math.ceil(total * 0.3); // 30% advance

  const handlePayment = () => {
    if (!name || !phone) {
      alert("Please fill in your details");
      return;
    }

    setIsProcessing(true);

    // Simulate Payment Gateway Delay
    setTimeout(() => {
      const finalBooking: Booking = {
        id: `BK-${Date.now()}`,
        turfId: bookingDetails.turfId!,
        date: bookingDetails.date!,
        startTime: bookingDetails.startTime!,
        durationMinutes: bookingDetails.durationMinutes!,
        customerName: name,
        customerPhone: phone,
        totalAmount: total,
        status: 'CONFIRMED',
        paymentStatus: paymentMode === 'FULL' ? 'PAID' : 'PARTIAL',
        paymentMethod: 'ONLINE',
        timestamp: Date.now(),
      };
      
      setIsProcessing(false);
      onConfirm(finalBooking);
    }, 2000);
  };

  if (!turf) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
      <button onClick={onBack} className="flex items-center text-zinc-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-white">Checkout</h1>

      <div className="space-y-6">
        {/* Booking Details Card */}
        <Card className="p-5 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Arena</p>
              <p className="text-white font-bold">{turf.name}</p>
            </div>
            <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Date</p>
              <p className="text-white font-bold">{bookingDetails.date ? formatDateForDisplay(new Date(bookingDetails.date)) : ''}</p>
            </div>
            <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Time</p>
              <p className="text-white font-bold">{bookingDetails.startTime}</p>
            </div>
            <div className="bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Duration</p>
              <p className="text-white font-bold">{bookingDetails.durationMinutes} Minutes</p>
            </div>
          </div>
        </Card>

        {/* User Details */}
        <Card className="p-5 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">Your Details</h2>
          <div className="space-y-4">
            <Input 
              label="Full Name" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <Input 
              label="Phone Number" 
              placeholder="+91 98765 43210" 
              type="tel"
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
            <p className="text-xs text-zinc-500">We'll send the booking confirmation to this number.</p>
          </div>
        </Card>

        {/* Payment Selection */}
        <Card className="p-5 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">Payment Options</h2>
          
          <div className="grid gap-3 md:gap-4 mb-6">
            <div 
              onClick={() => setPaymentMode('ADVANCE')}
              className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                paymentMode === 'ADVANCE' 
                  ? 'border-turf-500 bg-turf-900/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                  : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${paymentMode === 'ADVANCE' ? 'border-turf-500' : 'border-zinc-500'}`}>
                  {paymentMode === 'ADVANCE' && <div className="w-2.5 h-2.5 bg-turf-500 rounded-full" />}
                </div>
                <div>
                  <p className="font-bold text-white text-sm md:text-base">Pay Advance (30%)</p>
                  <p className="text-[10px] md:text-xs text-zinc-400">Pay rest at the venue</p>
                </div>
              </div>
              <span className="font-bold text-white text-sm md:text-base">{formatPrice(advanceAmount)}</span>
            </div>

            <div 
              onClick={() => setPaymentMode('FULL')}
              className={`p-4 rounded-lg border cursor-pointer flex items-center justify-between transition-all ${
                paymentMode === 'FULL' 
                  ? 'border-turf-500 bg-turf-900/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                  : 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${paymentMode === 'FULL' ? 'border-turf-500' : 'border-zinc-500'}`}>
                  {paymentMode === 'FULL' && <div className="w-2.5 h-2.5 bg-turf-500 rounded-full" />}
                </div>
                <div>
                  <p className="font-bold text-white text-sm md:text-base">Pay Full Amount</p>
                  <p className="text-[10px] md:text-xs text-zinc-400">Fast checkout at venue</p>
                </div>
              </div>
              <span className="font-bold text-white text-sm md:text-base">{formatPrice(total)}</span>
            </div>
          </div>

          <Button 
            onClick={handlePayment} 
            className="w-full text-lg h-14"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ${formatPrice(paymentMode === 'FULL' ? total : advanceAmount)}`}
          </Button>
          
          <div className="mt-4 flex items-center justify-center text-zinc-500 text-xs gap-2">
            <CreditCard className="w-3 h-3" /> Secured by Razorpay
          </div>
        </Card>
      </div>
    </div>
  );
};