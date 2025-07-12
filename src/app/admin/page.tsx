'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminDashboardPage() {
  const [swaps, setSwaps] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('swaps').select('*').then(({ data }) => setSwaps(data || []));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <ul className="space-y-2">
        {swaps.map((swap) => (
          <li key={swap.id} className="border p-2">
            <p>Swap ID: {swap.id}</p>
            <p>Status: {swap.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
