import React from 'react';
import { ArrowRight, Calendar, MapPin, Zap, ImageIcon, Star, Trophy, Users, Clock } from 'lucide-react';
import { Button, Card } from '../components/UI';
import { TURFS, GALLERY_IMAGES } from '../services/mockData';

interface HomeProps {
  onBookNow: () => void;
}

export const Home: React.FC<HomeProps> = ({ onBookNow }) => {
  return (
    <div className="space-y-0 pb-12">
      {/* Modern Hero Section */}
      <div className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=2000" 
            alt="Cricket Stadium Night" 
            className="w-full h-full object-cover scale-105 animate-pulse-slow opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 pb-20 md:pt-20 md:pb-0">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-turf-500/10 border border-turf-500/20 rounded-full px-4 py-1.5 mb-6 md:mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turf-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-turf-500"></span>
              </span>
              <span className="text-turf-400 text-[10px] md:text-xs font-bold tracking-wider uppercase">Open 24/7 • Night Lights Enabled</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.95] md:leading-[0.9]">
              UNLEASH YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-turf-400 via-turf-500 to-green-600">
                INNER ATHLETE
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-zinc-400 mb-8 md:mb-10 max-w-2xl font-light leading-relaxed">
              Vadodara's premium sports destination. 
              <span className="text-white font-medium"> Box Cricket</span> & 
              <span className="text-white font-medium"> Pickleball</span> arena 
              designed for pros and passionate players.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button onClick={onBookNow} className="w-full sm:w-auto h-14 px-8 text-lg rounded-full shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                Book Slot Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="w-full sm:w-auto flex items-center gap-4 px-6 py-4 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[10px] text-zinc-500">
                            <Users className="w-4 h-4" />
                        </div>
                    ))}
                </div>
                <div className="text-sm">
                    <p className="text-white font-bold leading-none">500+ Players</p>
                    <p className="text-zinc-500 text-xs leading-none mt-1">Trusted Community</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Ticker */}
        <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/80 backdrop-blur-md overflow-hidden py-4">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-zinc-400 text-sm font-medium tracking-widest uppercase">
                <div className="flex gap-8 md:gap-16 opacity-80 overflow-x-auto no-scrollbar whitespace-nowrap mask-linear-fade">
                    <span className="flex items-center gap-2 flex-shrink-0"><Trophy className="w-4 h-4 text-turf-500" /> Tournament Grade Turf</span>
                    <span className="flex items-center gap-2 flex-shrink-0"><Zap className="w-4 h-4 text-turf-500" /> 1000W Floodlights</span>
                    <span className="flex items-center gap-2 flex-shrink-0"><Clock className="w-4 h-4 text-turf-500" /> Instant Confirmation</span>
                    <span className="flex items-center gap-2 flex-shrink-0"><MapPin className="w-4 h-4 text-turf-500" /> Prime Location in Bhayli</span>
                </div>
            </div>
        </div>
      </div>

      {/* Turf Types */}
      <div id="turfs-section" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">OUR ARENAS</h2>
            <p className="text-zinc-400 mt-2 text-base md:text-lg">Choose your battleground</p>
          </div>
          <Button variant="outline" className="rounded-full w-full md:w-auto">View All Rules</Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {TURFS.map(turf => (
            <div 
              key={turf.id} 
              onClick={onBookNow}
              className="group cursor-pointer relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-turf-500/50 transition-all duration-500" 
            >
              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                <img 
                  src={turf.image} 
                  alt={turf.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur rounded-full px-4 py-2 border border-white/10">
                    <span className="text-turf-400 font-bold">₹{turf.basePricePerHour}</span>
                    <span className="text-white text-xs">/hr</span>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <div className="mb-4">
                    <span className="bg-turf-500 text-black text-[10px] md:text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block tracking-wider">
                        {turf.type}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-turf-400 transition-colors">{turf.name}</h3>
                    <p className="text-zinc-400 line-clamp-2 text-sm">{turf.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {turf.features.slice(0,3).map((feature, i) => (
                        <span key={i} className="text-[10px] md:text-xs text-zinc-300 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                            {feature}
                        </span>
                    ))}
                  </div>

                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="w-0 h-full bg-turf-500 group-hover:w-full transition-all duration-700 ease-out"></div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery-section" className="bg-zinc-950 py-16 md:py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12 md:mb-16">
              <span className="text-turf-500 font-bold tracking-widest text-xs md:text-sm uppercase mb-2 block">Atmosphere</span>
              <h2 className="text-3xl md:text-5xl font-black text-white">CAPTURED MOMENTS</h2>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[250px]">
             {GALLERY_IMAGES.map((img, i) => (
               <div 
                key={img.id} 
                className={`relative rounded-xl md:rounded-2xl overflow-hidden group border border-white/5 ${i === 0 || i === 3 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : 'col-span-1 h-32 md:h-auto'}`}
               >
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 z-10 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                        <ImageIcon className="text-white w-6 h-6" />
                    </div>
                 </div>
                 <img 
                   src={img.url} 
                   alt={img.title}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 text-center relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-zinc-800 -z-10"></div>
          
          <div className="group">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-zinc-800 group-hover:border-turf-500 transition-colors shadow-2xl relative z-10">
              <Calendar className="w-8 h-8 md:w-10 md:h-10 text-zinc-500 group-hover:text-turf-500 transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">1. Select Slot</h3>
            <p className="text-zinc-500 text-sm px-4 md:px-8">Choose your sport and pick a time that suits your squad.</p>
          </div>
          <div className="group">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-zinc-800 group-hover:border-turf-500 transition-colors shadow-2xl relative z-10">
              <MapPin className="w-8 h-8 md:w-10 md:h-10 text-zinc-500 group-hover:text-turf-500 transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">2. Quick Pay</h3>
            <p className="text-zinc-500 text-sm px-4 md:px-8">Pay a small advance online to lock the turf instantly.</p>
          </div>
          <div className="group">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-zinc-800 group-hover:border-turf-500 transition-colors shadow-2xl relative z-10">
              <Zap className="w-8 h-8 md:w-10 md:h-10 text-zinc-500 group-hover:text-turf-500 transition-colors" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">3. Game On</h3>
            <p className="text-zinc-500 text-sm px-4 md:px-8">Show your booking ID at the venue and start playing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};