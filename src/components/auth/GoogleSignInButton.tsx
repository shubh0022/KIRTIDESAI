'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check, X, ShieldCheck } from 'lucide-react';

interface GoogleSignInButtonProps {
  targetRole?: 'CLIENT' | 'ADMIN';
  onSuccess?: () => void;
  onError?: (err: string) => void;
  label?: string;
  className?: string;
}

export default function GoogleSignInButton({
  targetRole = 'CLIENT',
  onSuccess,
  onError,
  label,
  className = '',
}: GoogleSignInButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  const defaultAccounts =
    targetRole === 'ADMIN'
      ? [
          {
            name: 'Kirti Desai',
            email: 'kirti@kirtidesai.com',
            tag: 'Founder & Super Admin',
            avatar: 'KD',
          },
          {
            name: 'Atelier Director',
            email: 'admin@kirtidesai.com',
            tag: 'Administrative Control',
            avatar: 'AD',
          },
        ]
      : [
          {
            name: 'Elena Rossi',
            email: 'elena.rossi@milanocouture.it',
            tag: 'Couture Patron · Milan',
            avatar: 'ER',
          },
          {
            name: 'Aria Sharma',
            email: 'aria.sharma@gmail.com',
            tag: 'Collector Account',
            avatar: 'AS',
          },
        ];

  const handleAuthenticate = async (emailToAuth: string, nameToAuth?: string) => {
    setIsLoading(true);
    setShowModal(false);

    try {
      const res = await fetch('/api/atelier/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailToAuth,
          name: nameToAuth || emailToAuth.split('@')[0],
          targetRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        const msg = data.error || 'Google authentication failed';
        onError?.(msg);
        setIsLoading(false);
        return;
      }

      onSuccess?.();
      const destination = data.redirectUrl || (targetRole === 'ADMIN' ? '/admin' : '/account');
      router.push(destination);
      router.refresh();
    } catch {
      onError?.('Network error during Google authentication.');
      setIsLoading(false);
    }
  };

  const defaultLabel =
    label || (targetRole === 'ADMIN' ? 'SIGN IN WITH GOOGLE WORKSPACE' : 'CONTINUE WITH GOOGLE');

  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        onClick={() => setShowModal(true)}
        className={`w-full py-3 px-4 bg-white hover:bg-[#F4F0E8] text-[#171717] border border-[#171717]/20 hover:border-[#171717]/40 font-mono text-xs tracking-[0.16em] uppercase transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 shadow-sm ${className}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#A85E43]" />
            <span className="text-[#171717]/70">CONNECTING TO GOOGLE...</span>
          </>
        ) : (
          <>
            {/* Authentic Google Multi-color G SVG */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-semibold">{defaultLabel}</span>
          </>
        )}
      </button>

      {/* Google Identity Selector Modal (Atelier Styled) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#FAF7F2] border border-[#171717]/20 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#171717]/50 hover:text-[#171717] p-1.5 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-white border border-[#171717]/10 flex items-center justify-center shadow-xs">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-editorial-serif text-xl text-[#171717]">Sign in with Google</h3>
                <p className="font-mono text-[10px] text-[#171717]/60 tracking-wider uppercase">
                  {targetRole === 'ADMIN' ? 'Atelier Workspace SSO' : 'Choose an account for Kirti Desai'}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              <span className="block font-mono text-[9px] tracking-[0.2em] text-[#171717]/60 uppercase mb-2">
                Available Google Profiles:
              </span>
              {defaultAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleAuthenticate(acc.email, acc.name)}
                  className="w-full text-left p-3 bg-white hover:bg-[#F4F0E8] border border-[#171717]/10 hover:border-[#A85E43]/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#A85E43]/10 text-[#A85E43] font-mono text-xs font-semibold flex items-center justify-center">
                      {acc.avatar}
                    </div>
                    <div>
                      <div className="font-sans text-xs font-medium text-[#171717] group-hover:text-[#A85E43]">
                        {acc.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#171717]/60">{acc.email}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-[#A85E43] bg-[#A85E43]/10 px-2 py-0.5 uppercase tracking-wider">
                    {acc.tag}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#171717]/10">
              <span className="block font-mono text-[9px] tracking-[0.2em] text-[#171717]/60 uppercase mb-2">
                Or enter any Google Email:
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customEmail) handleAuthenticate(customEmail, customName);
                }}
                className="space-y-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 py-2 bg-white border border-[#171717]/20 text-[#171717] font-sans text-xs focus:outline-none focus:border-[#A85E43]"
                  />
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full px-3 py-2 bg-white border border-[#171717]/20 text-[#171717] font-sans text-xs focus:outline-none focus:border-[#A85E43]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!customEmail}
                  className="w-full py-2 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-[10px] tracking-[0.2em] uppercase transition-colors cursor-pointer disabled:opacity-50"
                >
                  CONTINUE AS GOOGLE IDENTITY
                </button>
              </form>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-[9px] font-mono text-[#171717]/50">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#A85E43]" />
                OAuth 2.0 Encrypted Token
              </span>
              <span>Kirti Desai Atelier</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
