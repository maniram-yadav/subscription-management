"use client";

import React from 'react';
import ProfileCard from './ProfileCard';
import UsersTable from './UsersTable';
import SubscriptionsList from './SubscriptionsList';
import SubscriptionForm from './SubscriptionForm';

type MenuKey = ''| 'my-profile' | 'create-user' | 'view-users' | 'update-user' | 'subscriptions';

export const MainPanel = ({
  active,
  users,
  onCreate,
  onUpdate,
  onSelectUser,
  selectedUser,
  onMyProfile,
  subscriptions,
  onCreateSubscription,
  onUpdateSubscription,
  onDeleteSubscription,
  selectedSubscription,
}: {
  active: MenuKey;
  users: any[];
  onCreate: (payload: any) => Promise<void>;
  onUpdate: (id: number, payload: any) => Promise<void>;
  onSelectUser: (id: number) => void;
  selectedUser?: any | null;
  onMyProfile: (payload: any) => Promise<void>;
  subscriptions?: any[];
  onCreateSubscription?: (payload: any) => Promise<void>;
  onUpdateSubscription?: (id: number, payload: any) => Promise<void>;
  onDeleteSubscription?: (id: number) => Promise<void>;
  selectedSubscription?: any | null;
}) => {
  if (active === 'my-profile') {
    // return (
    //   <div className="p-6">
    //     {
            onMyProfile();
    //     }
    //   </div>
    // );
  }

  if (active === 'create-user') {
    return <CreateUserForm onCreate={onCreate} />;
  }

  if (active === 'view-users') {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <UsersTable users={users} onEdit={onSelectUser} />
      </div>
    );
  }

  if (active === 'update-user') {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Update User</h2>
        {selectedUser ? (
          <UpdateUserForm user={selectedUser} onUpdate={onUpdate} />
        ) : (
          <p>Select a user from "View Users" to edit.</p>
        )}
      </div>
    );
  }

  if (active === 'subscriptions') {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subscription Form */}
          <div className="lg:col-span-1">
            {onCreateSubscription && onUpdateSubscription && (
              <SubscriptionForm
                onSubmit={selectedSubscription ? (data) => onUpdateSubscription(selectedSubscription.id, data) : onCreateSubscription}
                initialData={selectedSubscription}
              />
            )}
          </div>

          {/* Subscriptions List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">My Subscriptions</h2>
            {subscriptions && onDeleteSubscription && (
              <SubscriptionsList
                subscriptions={subscriptions}
                onEdit={(id) => {
                  // In a real app, you'd fetch the subscription here
                }}
                onDelete={onDeleteSubscription}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

function CreateUserForm({ onCreate }: { onCreate: (p: any) => Promise<void> }) {
  const [form, setForm] = React.useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await onCreate(form);
      setMsg('User created');
      setForm({ username: '', email: '', password: '', first_name: '', last_name: '' });
    } catch (err: any) {
      setMsg(err?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="p-4 max-w-lg">
      <div className="space-y-3">
        <input name="username" value={form.username} onChange={(e)=>setForm({...form, username:e.target.value})} placeholder="Username" className="w-full p-2 border rounded" required />
        <input name="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" required />
        <input name="password" type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} placeholder="Password" className="w-full p-2 border rounded" required />
        <input name="first_name" value={form.first_name} onChange={(e)=>setForm({...form, first_name:e.target.value})} placeholder="First name" className="w-full p-2 border rounded" />
        <input name="last_name" value={form.last_name} onChange={(e)=>setForm({...form, last_name:e.target.value})} placeholder="Last name" className="w-full p-2 border rounded" />
        <div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>
        {msg && <div className="text-sm text-gray-700 mt-2">{msg}</div>}
      </div>
    </form>
  );
}

function UpdateUserForm({ user, onUpdate }: { user: any; onUpdate: (id:number, p:any)=>Promise<void>}) {
  const [form, setForm] = React.useState({
    username: user.username || '',
    email: user.email || '',
    first_name: user.first_name || '',
    last_name: user.last_name || '',
  });
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await onUpdate(user.id, form);
      setMsg('Updated');
    } catch (err: any) {
      setMsg(err?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="p-4 max-w-lg">
      <div className="space-y-3">
        <input name="username" value={form.username} onChange={(e)=>setForm({...form, username:e.target.value})} placeholder="Username" className="w-full p-2 border rounded" required />
        <input name="email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" required />
        <input name="first_name" value={form.first_name} onChange={(e)=>setForm({...form, first_name:e.target.value})} placeholder="First name" className="w-full p-2 border rounded" />
        <input name="last_name" value={form.last_name} onChange={(e)=>setForm({...form, last_name:e.target.value})} placeholder="Last name" className="w-full p-2 border rounded" />
        <div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
        {msg && <div className="text-sm text-gray-700 mt-2">{msg}</div>}
      </div>
    </form>
  );
}

export default MainPanel;
