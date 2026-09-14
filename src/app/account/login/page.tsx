'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

export default function ClientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('elena.rossi@milan.it');
  const [password, setPassword] = useState('atelier2026');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/atelier/auth/client/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Login failed. Please check credentials.');
        setIsLoading(false);
        return;
      }

      router.push('/account');
      router.refresh();
    } catch {
      setErrorMessage('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#171717]/10 p-8 sm:p-10 shadow-[0_4px_24px_rgba(23,23,23,0.03)]">
        {/* Brand Anchor */}
        <div className="flex flex-col items-center text-center mb-8">
          <Logo variant="primary" size="md" href="/" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#A85E43] uppercase font-semibold mt-4">
            CLIENT ATELIER
          </span>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl text-[#171717] font-normal mt-1">
            MY ATELIER
          </h1>
          <p className="font-sans text-xs text-[#171717]/65 mt-2 font-light">
            Sign in to access your bespoke commissions, orders, and private appointments.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 bg-[#A85E43]/10 border border-[#A85E43]/30 font-mono text-[11px] text-[#A85E43]">
            {errorMessage}
          </div>
        )}

        {/* Primary Action: Google Authentication */}
        <div className="mb-6 space-y-3">
          <GoogleSignInButton
            targetRole="CLIENT"
            label="CONTINUE WITH GOOGLE"
            onError={(msg) => setErrorMessage(msg)}
          />

          <div className="relative flex items-center justify-center py-2">
            <div className="border-t border-[#171717]/15 w-full"></div>
            <span className="bg-[#FAF7F2] px-3 font-mono text-[9px] tracking-[0.2em] text-[#171717]/50 uppercase whitespace-nowrap">
              OR EMAIL CREDENTIALS
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-[#171717]/70 uppercase mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@atelier.com"
                className="w-full px-3.5 py-2.5 bg-transparent border border-[#171717]/20 text-[#171717] font-sans text-sm focus:outline-none focus:border-[#A85E43] transition-colors"
              />
              <Mail className="w-4 h-4 text-[#171717]/40 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#171717]/70 uppercase">
                Password
              </label>
              <Link
                href="/account/forgot-password"
                className="font-mono text-[9px] text-[#A85E43] hover:underline uppercase tracking-wider"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-transparent border border-[#171717]/20 text-[#171717] font-sans text-sm focus:outline-none focus:border-[#A85E43] transition-colors"
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
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>SIGN IN TO ATELIER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Fast Fill Indicator */}
        <div className="mt-6 pt-5 border-t border-[#171717]/10 font-mono text-[10px] text-[#171717]/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#171717]">DEMO CLIENT ACCESS:</span>
            <button
              type="button"
              onClick={() => {
                setEmail('elena.rossi@milan.it');
                setPassword('atelier2026');
              }}
              className="text-[#A85E43] underline hover:no-underline"
            >
              Autofill Elena Rossi
            </button>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span>New to the Atelier?</span>
            <Link href="/account/register" className="text-[#171717] font-semibold hover:text-[#A85E43]">
              CREATE ACCOUNT →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
