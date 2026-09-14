'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, Lock, Mail } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@kirtidesai.com');
  const [password, setPassword] = useState('superadmin2026');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/atelier/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Access denied. Administrative privileges required.');
        setIsLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setErrorMessage('Authorization server unreachable. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-md bg-[#FAF7F2] border-2 border-[#171717] p-8 sm:p-10 shadow-[0_8px_32px_rgba(23,23,23,0.06)] relative">
        {/* Strict Security Top Banner */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#171717] text-[#FAF7F2] px-3.5 py-1 font-mono text-[9px] tracking-[0.26em] uppercase flex items-center gap-1.5 whitespace-nowrap">
          <ShieldCheck className="w-3 h-3 text-[#A85E43]" />
          <span>RESTRICTED ATELIER ACCESS</span>
        </div>

        {/* Brand Anchor */}
        <div className="flex flex-col items-center text-center mb-8 mt-2">
          <Logo variant="primary" size="md" href="/" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#171717] uppercase font-bold mt-4">
            ATELIER CONTROL
          </span>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl text-[#171717] font-normal mt-1">
            STAFF PORTAL
          </h1>
          <p className="font-mono text-[11px] text-[#171717]/65 mt-2">
            Super Admin, Atelier Managers & Curators Only.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-950/10 border border-red-800/40 font-mono text-[11px] text-red-900">
            {errorMessage}
          </div>
        )}

        {/* Staff SSO with Google Workspace */}
        <div className="mb-6 space-y-3">
          <GoogleSignInButton
            targetRole="ADMIN"
            label="SIGN IN WITH GOOGLE WORKSPACE"
            onError={(msg) => setErrorMessage(msg)}
          />

          <div className="relative flex items-center justify-center py-2">
            <div className="border-t border-[#171717]/15 w-full"></div>
            <span className="bg-[#FAF7F2] px-3 font-mono text-[9px] tracking-[0.2em] text-[#171717]/50 uppercase whitespace-nowrap">
              OR STAFF ACCESS KEY
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-[#171717] uppercase mb-1.5 font-semibold">
              Authorized Staff Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@kirtidesai.com"
                className="w-full px-3.5 py-2.5 bg-white border border-[#171717]/30 text-[#171717] font-mono text-xs focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717]"
              />
              <Mail className="w-4 h-4 text-[#171717]/40 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#171717] uppercase font-semibold">
                Access Key / Password
              </label>
              <Link
                href="/admin/forgot-password"
                className="font-mono text-[9px] text-[#171717]/70 hover:underline uppercase tracking-wider"
              >
                Reset Key
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#171717]/30 text-[#171717] font-mono text-xs focus:outline-none focus:border-[#171717] focus:ring-1 focus:ring-[#171717]"
              />
              <Lock className="w-4 h-4 text-[#171717]/40 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.24em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span>VERIFYING PRIVILEGES...</span>
              ) : (
                <>
                  <span>AUTHENTICATE & ENTER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Fast Fill Indicators */}
        <div className="mt-6 pt-5 border-t border-[#171717]/15 font-mono text-[10px] text-[#171717]/70 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#171717]">STAFF CREDENTIALS:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@kirtidesai.com');
                  setPassword('superadmin2026');
                }}
                className="text-[#A85E43] font-semibold underline hover:no-underline"
              >
                Admin
              </button>
              <span className="text-[#171717]/30">·</span>
              <button
                type="button"
                onClick={() => {
                  setEmail('kirti@kirtidesai.com');
                  setPassword('superadmin2026');
                }}
                className="text-[#A85E43] font-semibold underline hover:no-underline"
              >
                Kirti (Director)
              </button>
            </div>
          </div>
          <p className="text-[9px] text-[#171717]/50 pt-1">
            Attempts are recorded in the immutable administrative audit log.
          </p>
        </div>
      </div>
    </div>
  );
}
