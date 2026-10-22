'use client';
// Minimal navbar for inner pages — homepage uses FloatingNav
import Link from 'next/link';
import Image from 'next/image';

const LINKS = [
  { label: 'Products',   href: '/products' },
  { label: 'Catalogue',  href: '/catalogue' },
  { label: 'Showrooms',  href: '/showrooms' },
  { label: 'Visualizer', href: '/visualizer' },
];

export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[400] flex items-center justify-between px-8 py-4"
      style={{
        background: 'rgba(15,15,13,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245,243,239,0.06)',
      }}
    >
      <Link href="/" data-hover className="flex items-center">
        <Image
          src="/images/fresh-ceramics-reverse-logo.png"
          alt="Fresh Ceramics"
          width={112}
          height={42}
          className="h-7 w-auto object-contain"
          priority
        />
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            data-hover
            className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-ash/50 hover:text-ash transition-colors duration-300"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
