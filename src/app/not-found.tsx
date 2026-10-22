'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0F0D] text-[#F5F3EF] flex flex-col items-center justify-center px-6 py-24 text-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(237,28,36,0.06),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#ED1C24] font-semibold">
          // 404 • ARCHITECTURAL VOID
        </span>

        <h1 
          className="text-6xl sm:text-8xl font-light text-[#F5F3EF] tracking-tight"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
        >
          404
        </h1>

        <p className="text-lg text-[#B5A99A] font-editorial max-w-md mx-auto leading-relaxed">
          The plane you are looking for has not been cast or sintered yet. Return to our curated collections or visit a flagship display center.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
          <Link
            href="/"
            className="px-6 py-3 bg-[#ED1C24] hover:bg-[#d0171e] text-white uppercase tracking-wider font-semibold rounded-sm transition-all flex items-center gap-2 shadow-lg shadow-[#ED1C24]/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Flagship</span>
          </Link>

          <Link
            href="/products"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-[#F5F3EF] border border-white/10 hover:border-white/20 uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#ED1C24]" />
            <span>Browse Collections</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
