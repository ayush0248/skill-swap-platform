'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Dashboard</h2>
      {user ? <p>Welcome, {user.email}</p> : <p>Loading...</p>}
      {/* Add components to list your skills, wanted skills, availability, swaps */}
    </div>
  );
}
