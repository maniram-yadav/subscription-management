"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MainPanel from '@/components/MainPanel';
import { authApi } from '@/utils/api';
import { useRouter } from 'next/navigation';

type MenuKey = ''|'my-profile' | 'create-user' | 'view-users' | 'update-user' | 'subscriptions';

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState<MenuKey>('');
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<any | null>(null);
  const router = useRouter();
  const toggle = () => setIsOpen((s) => !s);

  const loadUsers = async () => {
    try {
      const res = await authApi.getAllUsers();
      setUsers(res.users || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSubscriptions = async () => {
    try {
      const res = await authApi.getUserSubscriptions();
      setSubscriptions(res.subscriptions || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (active === 'view-users') {
      loadUsers();
    }
    if (active === 'subscriptions') {
      loadSubscriptions();
    }
  }, [active]);

  const handleSelect = (k: MenuKey) => {
    setActive(k);
  };

  const handleCreate = async (payload: any) => {
    const res = await authApi.register(payload.username, payload.email, payload.password, payload.first_name, payload.last_name);
    await loadUsers();
    return res;
  };

  const handleMyProfile = async (payload: any) => {
    router.push('/profile');
  };

  const handleSelectUser = async (id: number) => {
    try {
      const res = await authApi.getUser(id);
      setSelectedUser(res.user);
      setActive('update-user');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: number, payload: any) => {
    const res = await authApi.updateUser(id, payload);
    await loadUsers();
    return res;
  };

  const handleCreateSubscription = async (payload: any) => {
    const res = await authApi.createSubscription(payload);
    setSelectedSubscription(null);
    await loadSubscriptions();
    return res;
  };

  const handleUpdateSubscription = async (id: number, payload: any) => {
    const res = await authApi.updateSubscription(id, payload);
    setSelectedSubscription(null);
    await loadSubscriptions();
    return res;
  };

  const handleDeleteSubscription = async (id: number) => {
    if (confirm('Are you sure you want to delete this subscription?')) {
      await authApi.deleteSubscription(id);
      await loadSubscriptions();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header onToggle={toggle} isMenuOpen={isOpen} />
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="transition-all duration-300 ease-in-out overflow-y-auto bg-white border-r"
          style={{
            width: isOpen ? '25%' : '0px',
            minWidth: isOpen ? '256px' : '0px',
          }}
        >
          {isOpen && <Sidebar isOpen={isOpen} onSelect={handleSelect} />}
        </div>
        
        {/* Main Panel */}
        <div className="flex-1 overflow-y-auto">
          <main className="bg-gray-50 p-6 h-full">
            <MainPanel
              active={active}
              users={users}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onSelectUser={handleSelectUser}
              selectedUser={selectedUser}
              onMyProfile={handleMyProfile}
              subscriptions={subscriptions}
              onCreateSubscription={handleCreateSubscription}
              onUpdateSubscription={handleUpdateSubscription}
              onDeleteSubscription={handleDeleteSubscription}
              selectedSubscription={selectedSubscription}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
