'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function PublicProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from('users').select('*').eq('id', id).single().then(({ data }) => setProfile(data));
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Public Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Skills Offered: {profile.skills_offered?.join(', ')}</p>
          <p>Skills Wanted: {profile.skills_wanted?.join(', ')}</p>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
}