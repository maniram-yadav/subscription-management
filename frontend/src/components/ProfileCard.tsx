"use client";

import React from 'react';
import { authApi } from '@/utils/api';

export default function ProfileCard() {
  const [user, setUser] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await authApi.getProfile();
        if (mounted) setUser(res.user || res);
      } catch (err: any) {
        if (mounted) setError(err?.response?.data?.error || err?.message || 'Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!user) return <div className="p-6">No profile available.</div>;

  return (
    <div className="p-6 max-w-xl bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Username: </span>
          <span>{user.username}</span>
        </div>
        <div>
          <span className="font-medium">Email: </span>
          <span>{user.email}</span>
        </div>
        {user.first_name !== undefined && (
          <div>
            <span className="font-medium">First name: </span>
            <span>{user.first_name}</span>
          </div>
        )}
        {user.last_name !== undefined && (
          <div>
            <span className="font-medium">Last name: </span>
            <span>{user.last_name}</span>
          </div>
        )}
        {user.created_at && (
          <div>
            <span className="font-medium">Joined: </span>
            <span>{new Date(user.created_at).toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
