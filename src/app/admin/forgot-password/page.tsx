'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-md bg-[#FAF7F2] border-2 border-[#171717] p-8 sm:p-10 shadow-[0_8px_32px_rgba(23,23,23,0.06)]">
        <div className="flex flex-col items-center text-center mb-8">
          <Logo variant="primary" size="md" href="/" />
          <span className="font-mono text-[10px] tracking-[0.28em] text-[#171717] uppercase font-bold mt-4">
            ATELIER SECURITY
          </span>
          <h1 className="font-editorial-serif text-3xl text-[#171717] font-normal mt-1">
            KEY RECOVERY
          </h1>
          <p className="font-mono text-[11px] text-[#171717]/65 mt-2">
            Authorized administrative key reset requests require security council clearance.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-10 h-10 text-[#171717] mx-auto" />
            <p className="font-mono text-xs text-[#171717]/80">
              A key reset dispatch was logged for <strong>{email}</strong>. Please check your internal staff console.
            </p>
            <div className="pt-4">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 font-mono text-xs text-[#171717] tracking-widest uppercase hover:underline font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Staff Portal
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#171717] uppercase mb-1.5 font-semibold">
                Staff Identity Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@kirtidesai.com"
                className="w-full px-3.5 py-2.5 bg-white border border-[#171717]/30 text-[#171717] font-mono text-xs focus:outline-none focus:border-[#171717]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#171717] hover:bg-[#A85E43] text-[#FAF7F2] font-mono text-xs tracking-[0.24em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-semibold"
            >
              REQUEST CREDENTIAL RESET
            </button>

            <div className="pt-4 text-center">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 font-mono text-[10px] text-[#171717]/70 tracking-wider uppercase hover:text-[#A85E43]"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Staff Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
