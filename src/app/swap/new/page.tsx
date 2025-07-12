'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NewSwapPage() {
  const [skill, setSkill] = useState('');
  const [toUser, setToUser] = useState('');

  const createSwap = async () => {
    await supabase.from('swaps').insert({ skill, to_user: toUser });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Request a Swap</h2>
      <input
        className="w-full border p-2 mb-4"
        placeholder="Skill"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-4"
        placeholder="User ID to Request"
        value={toUser}
        onChange={(e) => setToUser(e.target.value)}
      />
      <button onClick={createSwap} className="bg-blue-600 text-white py-2 px-4">
        Send Request
      </button>
    </div>
  );
}
