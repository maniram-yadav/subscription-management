"use client";

import React from 'react';

export default function SubscriptionForm({
  onSubmit,
  initialData,
  isLoading,
}: {
  onSubmit: (data: any) => Promise<void>;
  initialData?: any | null;
  isLoading?: boolean;
}) {
  const [form, setForm] = React.useState({
    name: initialData?.name || '',
    amount: initialData?.amount || '',
    due_date: initialData?.due_date || '',
    web_url: initialData?.web_url || '',
    description: initialData?.description || '',
    status: initialData?.status || 'active',
  });
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [msgType, setMsgType] = React.useState<'success' | 'error'>('success');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await onSubmit(form);
      setMsgType('success');
      setMsg(initialData ? 'Subscription updated' : 'Subscription created');
      if (!initialData) {
        setForm({
          name: '',
          amount: '',
          due_date: '',
          web_url: '',
          description: '',
          status: 'active',
        });
      }
    } catch (err: any) {
      setMsgType('error');
      setMsg(err?.message || err?.response?.data?.error || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="p-4 max-w-2xl bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{initialData ? 'Update Subscription' : 'Create Subscription'}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., Netflix, AWS, etc."
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($) *</label>
            <input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0.00"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
            <input
              type="date"
              value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Web URL</label>
          <input
            type="url"
            value={form.web_url}
            onChange={(e) => setForm({ ...form, web_url: e.target.value })}
            placeholder="https://example.com"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Additional notes..."
            rows={3}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={loading || isLoading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {loading || isLoading ? 'Saving...' : initialData ? 'Update Subscription' : 'Create Subscription'}
          </button>
        </div>

        {msg && (
          <div
            className={`text-sm p-2 rounded ${
              msgType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {msg}
          </div>
        )}
      </div>
    </form>
  );
}
