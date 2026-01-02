import React from 'react';
import { Menu, X, Shield, Phone, Instagram, Code2 } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Our Turfs', id: 'turfs-section' },
    { label: 'Gallery', id: 'gallery-section' },
    { label: 'Book Slot', id: 'booking' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'turfs-section' || id === 'gallery-section') {
      if (currentPage !== 'home') {
        onNavigate('home');
        // Allow time for navigation before scrolling
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(id);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white flex flex-col font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-dark-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => onNavigate('home')}
            >
              <div className="bg-turf-500 p-1.5 rounded-lg">
                <Shield className="h-6 w-6 text-black fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight">HERCULES<span className="text-turf-500">ARENA</span></span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`${
                      currentPage === item.id ? 'text-turf-500' : 'text-gray-300 hover:text-white'
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                  >
                    {item.label}
                  </button>
                ))}
                <button 
                  onClick={() => onNavigate('admin-login')}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-zinc-800 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate('admin-login');
                  setIsMenuOpen(false);
                }}
                className="text-turf-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Owner Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Hercules Sports Arena</h3>
              <p className="text-zinc-400 text-sm">
                Premium turf booking experience in Bhayli, Vadodara. Open 24/7 for Cricket & Pickleball enthusiasts.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><button onClick={() => onNavigate('booking')} className="hover:text-turf-500 transition-colors">Book Now</button></li>
                <li><a href="#" className="hover:text-turf-500 transition-colors">Rules & Regulations</a></li>
                <li><a href="#" className="hover:text-turf-500 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-turf-500" /> +91 98765 43210</p>
                <p className="flex items-center gap-2"><Instagram className="w-4 h-4 text-turf-500" /> @herculesarena</p>
                <p className="flex items-center gap-2"><Shield className="w-4 h-4 text-turf-500" /> Bhayli, Vadodara, Gujarat</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-zinc-600">
              &copy; 2024 Hercules Sports Arena. All rights reserved.
            </div>
            
            {/* Cortax IT Solutions Attribution */}
            <div className="flex items-center gap-2 group">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Developed By</span>
              <a 
                href="https://cortax.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-full transition-all duration-300 group-hover:border-indigo-500/30 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
              >
                <Code2 className="w-3 h-3 text-indigo-500" />
                <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  CORTAX IT SOLUTIONS
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};