import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { BookingPage } from './pages/Booking';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';
import { AdminDashboard } from './pages/Admin';
import { Input, Button, Card } from './components/UI';
import { Booking } from './types';
import { saveBooking } from './services/mockData';

type View = 'home' | 'booking' | 'checkout' | 'confirmation' | 'admin-login' | 'admin-dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [bookingDraft, setBookingDraft] = useState<Partial<Booking>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Admin Auth State (Mock)
  const [adminUser, setAdminUser] = useState<string>('');
  const [adminPass, setAdminPass] = useState<string>('');

  const handleNavigate = (view: string) => {
    // Basic mapping
    if (view === 'contact') {
        document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    setCurrentView(view as View);
  };

  const startBooking = () => setCurrentView('booking');

  const proceedToCheckout = (details: Partial<Booking>) => {
    setBookingDraft(details);
    setCurrentView('checkout');
  };

  const handleBookingConfirm = (finalBooking: Booking) => {
    saveBooking(finalBooking);
    setConfirmedBooking(finalBooking);
    setCurrentView('confirmation');
  };

  const handleAdminLogin = () => {
    if (adminUser === 'admin' && adminPass === 'hero123') {
      setCurrentView('admin-dashboard');
    } else {
      alert('Invalid credentials. Use admin / hero123');
    }
  };

  // Admin Login View
  if (currentView === 'admin-login') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
          <div className="space-y-4">
            <Input 
              placeholder="Username" 
              value={adminUser} 
              onChange={(e) => setAdminUser(e.target.value)} 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={adminPass} 
              onChange={(e) => setAdminPass(e.target.value)} 
            />
            <Button onClick={handleAdminLogin} className="w-full">Login</Button>
            <Button variant="outline" onClick={() => setCurrentView('home')} className="w-full">Back to Site</Button>
          </div>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  if (currentView === 'admin-dashboard') {
    return <AdminDashboard onLogout={() => setCurrentView('home')} />;
  }

  // Customer Views wrapped in Layout
  return (
    <Layout onNavigate={handleNavigate} currentPage={currentView}>
      {currentView === 'home' && (
        <Home onBookNow={startBooking} />
      )}
      
      {currentView === 'booking' && (
        <BookingPage 
          onBack={() => setCurrentView('home')} 
          onProceed={proceedToCheckout} 
        />
      )}

      {currentView === 'checkout' && (
        <Checkout 
          bookingDetails={bookingDraft} 
          onBack={() => setCurrentView('booking')}
          onConfirm={handleBookingConfirm}
        />
      )}

      {currentView === 'confirmation' && confirmedBooking && (
        <Confirmation 
          booking={confirmedBooking} 
          onHome={() => setCurrentView('home')}
        />
      )}
    </Layout>
  );
};

export default App;