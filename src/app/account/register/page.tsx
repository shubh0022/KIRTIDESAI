'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, User, Phone } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

export default function ClientRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/atelier/auth/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create account. Please try again.');
        setIsLoading(false);
        return;
      }

      router.push('/account');
      router.refresh();
    } catch {
      setError('Network error during registration. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#171717]/10 p-8 sm:p-10 shadow-[0_4px_24px_rgba(23,23,23,0.03)]">
        <div className="flex flex-col items-center text-center mb-8">
          <Logo variant="primary" size="md" href="/" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#A85E43] uppercase font-semibold mt-4">
            CLIENT ATELIER
          </span>
          <h1 className="font-editorial-serif text-3xl sm:text-4xl text-[#171717] font-normal mt-1">
            CREATE ACCOUNT
          </h1>
          <p className="font-sans text-xs text-[#171717]/65 mt-2 font-light">
            Register your private profile to initiate bespoke commissions and track fitting sessions.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-[#A85E43]/10 border border-[#A85E43]/30 font-mono text-[11px] text-[#A85E43]">
            {error}
          </div>
        )}

        {/* Primary Action: Google Sign-Up */}
        <div className="mb-6 space-y-3">
          <GoogleSignInButton
            targetRole="CLIENT"
            label="SIGN UP WITH GOOGLE"
            onError={(msg) => setError(msg)}
          />

          <div className="relative flex items-center justify-center py-2">
            <div className="border-t border-[#171717]/15 w-full"></div>
            <span className="bg-[#FAF7F2] px-3 font-mono text-[9px] tracking-[0.2em] text-[#171717]/50 uppercase whitespace-nowrap">
              OR REGISTER WITH EMAIL
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-[#171717]/70 uppercase mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya Chen"
                className="w-full px-3.5 py-2.5 bg-transparent border border-[#171717]/20 text-[#171717] font-sans text-sm focus:outline-none focus:border-[#A85E43] transition-colors"
              />
              <User className="w-4 h-4 text-[#171717]/40 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

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
                placeholder="client@domain.com"
                className="w-full px-3.5 py-2.5 bg-transparent border border-[#171717]/20 text-[#171717] font-sans text-sm focus:outline-none focus:border-[#A85E43] transition-colors"
              />
              <Mail className="w-4 h-4 text-[#171717]/40 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-[#171717]/70 uppercase mb-1.5">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 / international"
                className="w-full px-3.5 py-2.5 bg-transparent border border-[#171717]/20 text-[#171717] font-sans text-sm focus:outline-none focus:border-[#A85E43] transition-colors"
              />
              <Phone className="w-4 h-4 text-[#171717]/40 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-[0.2em] text-[#171717]/70 uppercase mb-1.5">
              Password
            </label>
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
                <span>CREATING PROFILE...</span>
              ) : (
                <>
                  <span>COMPLETE REGISTRATION</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-[#171717]/10 font-mono text-[10px] text-[#171717]/60 flex items-center justify-between">
          <span>Already have an atelier account?</span>
          <Link href="/account/login" className="text-[#171717] font-semibold hover:text-[#A85E43]">
            SIGN IN →
          </Link>
        </div>
      </div>
    </div>
  );
}
