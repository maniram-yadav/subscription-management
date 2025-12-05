'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/profile');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">User Management</h1>
          <p className="text-xl text-gray-600 mb-8">Manage your account with ease</p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
            <Link
              href="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Register
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-2">👤</div>
              <h3 className="font-semibold text-gray-800">Easy Registration</h3>
              <p className="text-gray-600 text-sm mt-2">Create your account in seconds</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-2">🔐</div>
              <h3 className="font-semibold text-gray-800">Secure Login</h3>
              <p className="text-gray-600 text-sm mt-2">JWT token-based authentication</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-800">Manage Profile</h3>
              <p className="text-gray-600 text-sm mt-2">View and manage your profile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
