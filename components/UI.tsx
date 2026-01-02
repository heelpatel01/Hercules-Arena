import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger' }> = ({ 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-3 border text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-transparent text-black bg-turf-500 hover:bg-turf-400 focus:ring-turf-500 font-bold",
    secondary: "border-transparent text-white bg-zinc-700 hover:bg-zinc-600 focus:ring-zinc-500",
    outline: "border-zinc-600 text-zinc-300 hover:bg-zinc-800 focus:ring-zinc-500",
    danger: "border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props} />
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'yellow' | 'red' | 'gray' }> = ({ children, color = 'gray' }) => {
  const colors = {
    green: 'bg-green-900/30 text-green-400 border-green-800',
    yellow: 'bg-yellow-900/30 text-yellow-400 border-yellow-800',
    red: 'bg-red-900/30 text-red-400 border-red-800',
    gray: 'bg-zinc-800 text-zinc-400 border-zinc-700'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-zinc-400 mb-1">{label}</label>}
    <input 
      className={`block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-turf-500 focus:border-turf-500 sm:text-sm ${className}`}
      {...props}
    />
  </div>
);