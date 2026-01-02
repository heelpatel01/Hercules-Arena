import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, DollarSign, Calendar, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { Booking } from '../types';
import { getBookings, updateBookingStatus } from '../services/mockData';
import { Button, Card, Badge } from '../components/UI';
import { formatDateForDisplay, formatPrice } from '../utils';

interface AdminProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminProps> = ({ onLogout }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'TODAY'>('ALL');

  useEffect(() => {
    // Refresh data
    const data = getBookings();
    // Sort by most recent
    setBookings(data.sort((a, b) => b.timestamp - a.timestamp));
  }, []);

  const handleStatusChange = (id: string, newStatus: Booking['status']) => {
    updateBookingStatus(id, newStatus);
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  // Stats Logic
  const totalRevenue = bookings
    .filter(b => b.status !== 'CANCELLED')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysBookings = bookings.filter(b => b.date === todayStr);

  const chartData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 9000 }, // Mock Data for visualization
    { name: 'Sun', sales: 8500 },
  ];

  const filteredBookings = filter === 'TODAY' ? todaysBookings : bookings;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-zinc-400 text-sm">Welcome back, Owner</p>
        </div>
        <Button variant="secondary" onClick={onLogout} className="flex items-center gap-2 self-start sm:self-auto">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <Card className="p-5 md:p-6 border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 font-medium text-sm md:text-base">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">{formatPrice(totalRevenue)}</p>
        </Card>
        <Card className="p-5 md:p-6 border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 font-medium text-sm md:text-base">Total Bookings</h3>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">{bookings.length}</p>
        </Card>
        <Card className="p-5 md:p-6 border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-zinc-400 font-medium text-sm md:text-base">Today's Slots</h3>
            <Users className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white">{todaysBookings.length}</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Recent Bookings List */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-bold">Bookings</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter('ALL')}
                className={`text-xs md:text-sm px-3 py-1 rounded-full ${filter === 'ALL' ? 'bg-zinc-700 text-white' : 'text-zinc-400'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('TODAY')}
                className={`text-xs md:text-sm px-3 py-1 rounded-full ${filter === 'TODAY' ? 'bg-zinc-700 text-white' : 'text-zinc-400'}`}
              >
                Today
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[600px]">
                <thead className="bg-zinc-950 text-zinc-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Slot</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredBookings.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-zinc-500">No bookings found.</td></tr>
                  ) : (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-white">{booking.customerName}</p>
                          <p className="text-zinc-500 text-xs">{booking.customerPhone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-white">{booking.date}</p>
                          <p className="text-zinc-400 text-xs">{booking.startTime} ({booking.durationMinutes}m)</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge color={
                            booking.status === 'CONFIRMED' ? 'green' : 
                            booking.status === 'CANCELLED' ? 'red' : 'gray'
                          }>
                            {booking.status}
                          </Badge>
                          <div className="mt-1 text-xs text-zinc-500">
                             {booking.paymentStatus}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-white">
                          {formatPrice(booking.totalAmount)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {booking.status === 'CONFIRMED' && (
                              <button 
                                onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                                className="p-1 hover:bg-red-900/30 rounded text-red-400" 
                                title="Cancel Booking"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                            {booking.status === 'CONFIRMED' && (
                              <button 
                                onClick={() => handleStatusChange(booking.id, 'COMPLETED')}
                                className="p-1 hover:bg-green-900/30 rounded text-green-400" 
                                title="Mark Completed"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="lg:col-span-1 space-y-6">
           <h2 className="text-lg md:text-xl font-bold">Weekly Revenue</h2>
           <Card className="p-4 h-64 bg-zinc-900 border-zinc-800">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                 <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#4ade80' }}
                 />
                 <Bar dataKey="sales" fill="#22c55e" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </Card>

           <Card className="p-6 border-zinc-800">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm">Block a Date</Button>
                <Button variant="outline" className="w-full justify-start text-sm">Update Pricing</Button>
                <Button variant="outline" className="w-full justify-start text-sm">Export CSV</Button>
              </div>
           </Card>
        </div>

      </div>
    </div>
  );
};