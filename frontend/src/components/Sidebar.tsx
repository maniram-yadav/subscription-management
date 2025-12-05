"use client";

import React from 'react';

type MenuKey = 'my-profile' | 'create-user' | 'view-users' | 'update-user' | 'subscriptions';

export const Sidebar = ({
  isOpen,
  onSelect,
}: {
  isOpen: boolean;
  onSelect: (key: MenuKey) => void;
}) => {
  return (
    <aside className="h-full bg-white flex flex-col">
      <div className="p-4 border-b sticky top-0 bg-white">
        <h2 className="text-lg font-semibold">Menu</h2>
      </div>
      <nav className="p-4 space-y-2">
        <button
          onClick={() => onSelect('my-profile')}
          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
        >
          My Profile
        </button>
        <button
          onClick={() => onSelect('create-user')}
          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
        >
          Create User
        </button>
        <button
          onClick={() => onSelect('view-users')}
          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
        >
          View Users
        </button>
        <button
          onClick={() => onSelect('update-user')}
          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
        >
          Update User Details
        </button>
        <hr className="my-2" />
        <button
          onClick={() => onSelect('subscriptions')}
          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-blue-600 font-medium"
        >
          Subscriptions
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
