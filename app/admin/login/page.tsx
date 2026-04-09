'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, Lock } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth')
      .then(r => r.json())
      .then(data => {
        if (data.authenticated) router.replace('/admin');
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.replace('/admin');
      } else {
        setError('INVALID_CREDENTIALS');
      }
    } catch {
      setError('NETWORK_ERROR');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 size={20} className="animate-spin text-white/30" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-12">
          <div className="text-2xl font-bold tracking-tighter mb-2">NOVAVOX</div>
          <div className="text-[10px] font-mono tracking-[0.3em] text-white/30">ADMIN_ACCESS</div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ENTER_USERNAME"
              autoFocus
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/40 transition-colors font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER_PASSWORD"
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/40 transition-colors font-mono"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-[10px] font-mono tracking-widest">
              <AlertCircle size={12} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className={`w-full flex items-center justify-center gap-2 py-3 text-[10px] font-mono tracking-widest font-bold transition-all ${
              loading || !username || !password
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            {loading ? (
              <><Loader2 size={12} className="animate-spin" /> AUTHENTICATING...</>
            ) : (
              <><Lock size={12} /> AUTHENTICATE</>
            )}
          </button>
        </form>

        <div className="mt-16 text-center">
          <div className="text-[9px] font-mono tracking-[0.2em] text-white/10">NOVAVOX_ADMIN_SYSTEM</div>
        </div>
      </div>
    </div>
  );
}
