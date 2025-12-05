"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { removeToken } from '@/utils/auth';

export const Header = ({ onToggle, isMenuOpen }: { onToggle: () => void; isMenuOpen?: boolean }) => {
  const router = useRouter();

  const handleLogout = () => {
    // simple client-side logout: remove token and redirect
    removeToken();
    // small delay so animation can play if needed
    setTimeout(() => router.push('/login'), 150);
  };

  return (
    <header className="w-full z-10 bg-gray-300 border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          className={`px-3 py-2 rounded transition-colors duration-200 ${
            isMenuOpen ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          aria-label="Toggle menu"
        >
          {/* Hamburger Menu Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold">User Management</h1>
      </div>

      <div>
        <button
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded shadow transition transform hover:-translate-y-0.5 hover:scale-105 active:translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4z" clipRule="evenodd" />
            <path d="M12.293 9.293a1 1 0 011.414 0L16 11.586V7a1 1 0 112 0v6a1 1 0 01-1 1h-6a1 1 0 110-2h4.586l-2.293-2.293a1 1 0 010-1.414z" />
          </svg>
          <span className="text-sm text-red-700 font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
