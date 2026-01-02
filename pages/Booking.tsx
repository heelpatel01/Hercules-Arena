import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Sun, Moon, Sunset, Sunrise, CalendarDays, CheckCircle2 } from 'lucide-react';
import { Turf, Booking, TimeSlot } from '../types';
import { TURFS, getBookings } from '../services/mockData';
import { generateTimeSlots, formatDateForDisplay, getDayName, formatPrice } from '../utils';
import { Button, Card } from '../components/UI';

interface BookingPageProps {
  onBack: () => void;
  onProceed: (details: Partial<Booking>) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ onBack, onProceed }) => {
  const [selectedTurf, setSelectedTurf] = useState<Turf>(TURFS[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // Calculate next 14 days
  const dates = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  }), []);

  useEffect(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const bookings = getBookings();
    const slots = generateTimeSlots(selectedTurf, dateStr, bookings);
    setAvailableSlots(slots);
    setSelectedSlots([]);
  }, [selectedTurf, selectedDate]);

  const handleSlotClick = (slot: TimeSlot) => {
    if (!slot.available) return;
    
    if (selectedSlots.includes(slot.time)) {
      setSelectedSlots(selectedSlots.filter(t => t !== slot.time));
    } else {
      const newSlots = [...selectedSlots, slot.time].sort();
      setSelectedSlots(newSlots);
    }
  };

  const calculateTotal = () => {
    return selectedSlots.reduce((acc, time) => {
      const slot = availableSlots.find(s => s.time === time);
      return acc + (slot ? slot.price : 0);
    }, 0);
  };

  const handleProceed = () => {
    if (selectedSlots.length === 0) return;
    const sorted = [...selectedSlots].sort();
    onProceed({
      turfId: selectedTurf.id,
      date: selectedDate.toISOString().split('T')[0],
      startTime: sorted[0],
      durationMinutes: sorted.length * 30,
      totalAmount: calculateTotal(),
    });
  };

  // Group slots by time of day
  const slotsByPeriod = useMemo(() => {
    const periods = {
      'Morning': { icon: <Sunrise className="w-4 h-4 text-yellow-500" />, slots: [] as TimeSlot[], desc: '06:00 - 12:00' },
      'Afternoon': { icon: <Sun className="w-4 h-4 text-orange-500" />, slots: [] as TimeSlot[], desc: '12:00 - 16:00' },
      'Evening': { icon: <Sunset className="w-4 h-4 text-purple-500" />, slots: [] as TimeSlot[], desc: '16:00 - 21:00' },
      'Night': { icon: <Moon className="w-4 h-4 text-blue-500" />, slots: [] as TimeSlot[], desc: '21:00 - 02:00' },
    };

    availableSlots.forEach(slot => {
      const hour = parseInt(slot.time.split(':')[0]);
      if (hour >= 6 && hour < 12) periods['Morning'].slots.push(slot);
      else if (hour >= 12 && hour < 16) periods['Afternoon'].slots.push(slot);
      else if (hour >= 16 && hour < 21) periods['Evening'].slots.push(slot);
      else periods['Night'].slots.push(slot);
    });

    return periods;
  }, [availableSlots]);

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      
      {/* Header & Date Navigation - Stays Fixed */}
      <div className="sticky top-0 z-40 bg-black/95 md:bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 h-14 md:h-16">
                <div className="flex items-center gap-3 md:gap-4">
                    <button onClick={onBack} className="w-8 h-8 flex items-center justify-center bg-zinc-900 rounded-full border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-sm md:text-base font-bold text-white leading-tight">Select Slots</h1>
                        <p className="text-[10px] text-zinc-400 font-medium tracking-wider uppercase">
                            {selectedTurf.name}
                        </p>
                    </div>
                </div>
                
                {/* Turf Switcher - Professional Toggle */}
                <div className="flex bg-zinc-900/80 p-1 rounded-lg border border-zinc-800">
                     {TURFS.map(turf => (
                       <button
                         key={turf.id}
                         onClick={() => setSelectedTurf(turf)}
                         className={`
                           px-2 md:px-3 py-1.5 rounded-md text-[10px] font-bold transition-all uppercase tracking-wider flex items-center gap-1.5
                           ${selectedTurf.id === turf.id 
                             ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700' 
                             : 'text-zinc-500 hover:text-zinc-300'
                           }
                         `}
                       >
                         {turf.type === 'CRICKET' ? '🏏' : '🏓'} <span className="hidden sm:inline">{turf.type}</span>
                       </button>
                     ))}
                </div>
            </div>

            {/* Date Scroller - Improved Padding and Visuals */}
            <div className="pb-3 px-4 overflow-x-auto no-scrollbar pt-2">
                <div className="flex gap-3 min-w-max">
                  {dates.map((date) => {
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    const isToday = new Date().toDateString() === date.toDateString();
                    
                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`
                          group relative flex flex-col items-center justify-center w-[4rem] h-[4.5rem] md:w-[4.5rem] md:h-[5rem] rounded-2xl border transition-all duration-300
                          ${isSelected 
                            ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105 z-10' 
                            : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:border-zinc-700'
                          }
                        `}
                      >
                        {isToday && (
                           <div className={`absolute -top-2.5 px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-wider shadow-sm ${isSelected ? 'bg-turf-500 text-black' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                             Today
                           </div>
                        )}
                        <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-0.5 md:mb-1">{getDayName(date.toISOString()).slice(0, 3)}</span>
                        <span className={`text-xl md:text-2xl font-black leading-none ${isSelected ? 'text-black' : 'text-zinc-300'}`}>{date.getDate()}</span>
                      </button>
                    );
                  })}
                </div>
            </div>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 pb-32 lg:pb-12 grid lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Main Slot Grid */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          
            {/* Legend - Professional Look */}
            <div className="flex flex-wrap gap-4 md:gap-6 text-[10px] md:text-xs justify-start pb-4 border-b border-white/5">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600"></div> <span className="text-zinc-400">Available</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-turf-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div> <span className="text-white font-medium">Selected</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 opacity-50 relative overflow-hidden"><div className="absolute inset-0 bg-white/10 -rotate-45"></div></div> <span className="text-zinc-600">Booked</span></div>
            </div>

            {Object.entries(slotsByPeriod).map(([period, { icon, slots, desc }]) => (
                slots.length > 0 && (
                    <div key={period} className="animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                             <div className="p-1.5 md:p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                                {icon}
                             </div>
                             <div>
                                 <h3 className="text-white font-bold text-sm tracking-wide uppercase">{period}</h3>
                                 <span className="text-zinc-600 text-[10px] font-mono">{desc}</span>
                             </div>
                        </div>
                        
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-3">
                            {slots.map((slot) => {
                                const isSelected = selectedSlots.includes(slot.time);
                                return (
                                <button
                                    key={slot.time}
                                    disabled={!slot.available}
                                    onClick={() => handleSlotClick(slot)}
                                    className={`
                                    relative h-11 md:h-12 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center overflow-hidden
                                    ${!slot.available 
                                        ? 'bg-zinc-950 border-zinc-900 text-zinc-800 cursor-not-allowed opacity-60' 
                                        : isSelected 
                                        ? 'bg-turf-500 border-turf-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)] scale-[1.02]' 
                                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800'
                                    }
                                    `}
                                >
                                    {/* Unavailable Striped Background */}
                                    {!slot.available && (
                                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,transparent)] bg-[length:10px_10px]"></div>
                                    )}

                                    <span className={`text-xs md:text-sm font-bold tracking-tight z-10 ${!slot.available ? 'line-through' : ''}`}>{slot.time}</span>
                                    {slot.available && (
                                        <span className={`text-[8px] md:text-[9px] font-medium z-10 mt-0.5 ${isSelected ? 'text-black/80' : 'text-turf-500'}`}>
                                            ₹{slot.price}
                                        </span>
                                    )}
                                    
                                    {/* Peak Dot */}
                                    {slot.isPeak && slot.available && !isSelected && (
                                        <div className="absolute top-1.5 right-1.5 w-1 h-1 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                                    )}
                                </button>
                                );
                            })}
                        </div>
                    </div>
                )
            ))}

            {availableSlots.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 md:py-20 text-zinc-500 bg-zinc-900/30 rounded-3xl border border-zinc-800/50">
                    <CalendarDays className="w-10 h-10 md:w-12 md:h-12 mb-4 opacity-30" />
                    <p className="text-sm md:text-base font-medium text-zinc-400">All slots booked for this date</p>
                    <Button variant="outline" onClick={() => {
                         const nextDay = new Date(selectedDate);
                         nextDay.setDate(nextDay.getDate() + 1);
                         setSelectedDate(nextDay);
                    }} className="mt-4 text-xs h-8">
                        Check Tomorrow
                    </Button>
                </div>
            )}
        </div>

        {/* Desktop Sidebar Summary */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28">
             <BookingSummaryCard 
                turf={selectedTurf} 
                date={selectedDate} 
                slots={selectedSlots} 
                total={calculateTotal()} 
                onProceed={handleProceed} 
             />
          </div>
        </div>

      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 pb-6 z-50 safe-area-bottom shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
         <div className="max-w-7xl mx-auto flex items-center gap-4">
             <div className="flex-1">
                 {selectedSlots.length > 0 ? (
                     <div className="animate-fade-in-up">
                        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Total Payable</p>
                        <div className="flex items-baseline gap-2">
                             <p className="text-2xl font-black text-white leading-none">{formatPrice(calculateTotal())}</p>
                             <span className="text-xs text-turf-500 font-medium">{selectedSlots.length} slot{selectedSlots.length > 1 ? 's' : ''}</span>
                        </div>
                     </div>
                 ) : (
                    <div className="flex items-center gap-2 text-zinc-500">
                        <CheckCircle2 className="w-4 h-4" />
                        <p className="text-sm font-medium">Select slots to proceed</p>
                    </div>
                 )}
             </div>
             <Button 
                onClick={handleProceed} 
                disabled={selectedSlots.length === 0}
                className={`px-8 py-3 rounded-xl text-sm font-bold shadow-lg transition-all transform active:scale-95 ${
                    selectedSlots.length > 0 
                    ? 'bg-turf-500 text-black shadow-turf-500/20' 
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                }`}
            >
                 Book Now
             </Button>
         </div>
      </div>
    </div>
  );
};

// Extracted Component for Desktop Summary
const BookingSummaryCard: React.FC<{
    turf: Turf;
    date: Date;
    slots: string[];
    total: number;
    onProceed: () => void;
}> = ({ turf, date, slots, total, onProceed }) => (
    <Card className="p-0 overflow-hidden border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-sm">
        <div className="p-6 border-b border-zinc-800/50">
             <div className="flex items-start justify-between mb-4">
                 <div>
                    <span className="text-xs text-turf-500 font-bold uppercase tracking-wider block mb-1">{turf.type}</span>
                    <h3 className="font-bold text-white text-xl leading-none">{turf.name}</h3>
                 </div>
                 {/* Mini Thumbnail */}
                 <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden border border-zinc-700">
                     <img src={turf.image} className="w-full h-full object-cover" />
                 </div>
             </div>
             
             <div className="flex items-center gap-2 text-sm text-zinc-400">
                <CalendarDays className="w-4 h-4" />
                <span>{formatDateForDisplay(date)}</span>
             </div>
        </div>
        
        <div className="p-6 bg-black/20 min-h-[140px]">
             <div className="flex justify-between items-center mb-3">
                 <span className="text-sm font-medium text-zinc-300">Selected Slots</span>
                 <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{slots.length}</span>
             </div>
             
             <div className="flex flex-wrap gap-2">
                {slots.length > 0 ? slots.sort().map(s => (
                    <span key={s} className="bg-zinc-800 text-white text-xs font-mono px-2.5 py-1 rounded-md border border-zinc-700 shadow-sm">{s}</span>
                )) : <p className="text-zinc-600 text-xs italic py-4">No slots selected yet.</p>}
             </div>
        </div>

        <div className="p-6 bg-zinc-950 border-t border-zinc-800">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-1">Total Amount</span>
                    <span className="text-3xl font-black text-white tracking-tight">{formatPrice(total)}</span>
                </div>
            </div>
            <Button 
                onClick={onProceed} 
                disabled={slots.length === 0} 
                className={`w-full py-4 text-base rounded-xl font-bold transition-all ${
                    slots.length > 0 
                    ? 'shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-[1.02]' 
                    : 'opacity-50 grayscale'
                }`}
            >
                Proceed to Pay
            </Button>
             <p className="text-center text-[10px] text-zinc-600 mt-3">
                 By proceeding, you agree to our booking terms.
             </p>
        </div>
    </Card>
);