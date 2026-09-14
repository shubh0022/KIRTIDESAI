'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function ClientForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-md bg-[#FAF7F2] border border-[#171717]/10 p-8 sm:p-10 shadow-[0_4px_24px_rgba(23,23,23,0.03)]">
        <div className="flex flex-col items-center text-center mb-8">
          <Logo variant="primary" size="md" href="/" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#A85E43] uppercase font-semibold mt-4">
            PASSWORD RECOVERY
          </span>
          <h1 className="font-editorial-serif text-3xl text-[#171717] font-normal mt-1">
            RESET ACCESS
          </h1>
          <p className="font-sans text-xs text-[#171717]/65 mt-2 font-light">
            Enter the email associated with your client account to receive a secure login link.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-10 h-10 text-[#A85E43] mx-auto" />
            <p className="font-sans text-xs text-[#171717]/80">
              A recovery link has been dispatched to <strong>{email}</strong>. Please check your inbox.
            </p>
            <div className="pt-4">
              <Link
                href="/account/login"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#A85E43] tracking-widest uppercase hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#171717]/70 uppercase mb-1.5">
                Registered Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@atelier.com"
                className="w-full px-3.5 py-2.5 bg-transparent border border-[#171717]/20 text-[#171717] font-sans text-sm focus:outline-none focus:border-[#A85E43] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.24em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              SEND RESET INSTRUCTIONS
            </button>

            <div className="pt-4 text-center">
              <Link
                href="/account/login"
                className="inline-flex items-center gap-2 font-mono text-[10px] text-[#171717]/60 tracking-wider uppercase hover:text-[#A85E43]"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Client Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
