'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SwapDetailPage() {
  const { id } = useParams();
  const [swap, setSwap] = useState<any>(null);

  useEffect(() => {
    supabase.from('swaps').select('*').eq('id', id).single().then(({ data }) => setSwap(data));
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Swap Details</h2>
      {swap ? (
        <div>
          <p>Skill: {swap.skill}</p>
          <p>Status: {swap.status}</p>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}