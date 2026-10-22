'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Products',   href: '/products' },
  { label: 'Catalogue',  href: '/catalogue' },
  { label: 'Showrooms',  href: '/showrooms' },
  { label: 'Visualizer', href: '/visualizer' },
  { label: 'Craftsmen',  href: '/craftsmen' },
  { label: 'Innovation', href: '/innovation' },
  { label: 'Learn',      href: '/learn' },
];

export default function FloatingNav() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const isCatalogue = pathname === '/catalogue';
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false);
        lastY.current = y;
        return;
      }
      setHidden(y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      y: hidden ? -100 : 0,
      opacity: hidden ? 0 : 1,
      duration: 0.4,
      ease: 'power2.inOut',
    });
  }, [hidden]);

  const handleNavClick = (href: string) => {
    if (typeof window !== 'undefined') {
      ScrollTrigger.getAll().forEach(t => t.kill(true));
    }
    router.push(href);
  };

  const handleToggleMode = () => {
    if (typeof window !== 'undefined') {
      ScrollTrigger.getAll().forEach(t => t.kill(true));
    }
    if (isCatalogue) {
      router.push('/');
    } else {
      router.push('/catalogue');
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-4 sm:top-6 left-1/2 z-[500] -translate-x-1/2 flex items-center gap-2.5 sm:gap-5 px-3 sm:px-6 py-2 sm:py-3 max-w-[96vw] sm:max-w-[94vw]"
      style={{
        background: 'rgba(15,15,13,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '999px',
        border: '1px solid rgba(245,243,239,0.14)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        data-hover
        onClick={() => {
          if (typeof window !== 'undefined') {
            ScrollTrigger.getAll().forEach(t => t.kill(true));
          }
        }}
        className="flex items-center shrink-0 pr-1"
      >
        <Image
          src="/images/fresh-ceramics-reverse-logo.png"
          alt="Fresh Ceramics"
          width={96}
          height={32}
          className="h-5 sm:h-7 w-auto object-contain"
          priority
        />
      </Link>

      {/* Hairline divider */}
      <span className="w-px h-3.5 sm:h-4 bg-white/10 shrink-0" />

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-4 xl:gap-5">
        {NAV_LINKS.map(l => {
          const isActive = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              data-hover
              onClick={() => {
                if (typeof window !== 'undefined') {
                  ScrollTrigger.getAll().forEach(t => t.kill(true));
                }
              }}
              className={`font-mono-fc text-[0.62rem] tracking-[0.18em] uppercase transition-colors duration-300 ${
                isActive ? 'text-fresh-red font-semibold' : 'text-ash/70 hover:text-ash'
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile / Tablet compact links */}
      <div className="flex lg:hidden items-center gap-2 sm:gap-3">
        <Link
          href="/products"
          data-hover
          onClick={() => {
            if (typeof window !== 'undefined') {
              ScrollTrigger.getAll().forEach(t => t.kill(true));
            }
          }}
          className={`font-mono text-[0.58rem] sm:text-[0.6rem] tracking-[0.12em] uppercase ${
            pathname === '/products' ? 'text-fresh-red font-semibold' : 'text-ash/80'
          }`}
        >
          Tiles
        </Link>
        <Link
          href="/visualizer"
          data-hover
          onClick={() => {
            if (typeof window !== 'undefined') {
              ScrollTrigger.getAll().forEach(t => t.kill(true));
            }
          }}
          className={`font-mono text-[0.58rem] sm:text-[0.6rem] tracking-[0.12em] uppercase ${
            pathname === '/visualizer' ? 'text-fresh-red font-semibold' : 'text-ash/80'
          }`}
        >
          3D
        </Link>
      </div>

      {/* Hairline divider */}
      <span className="w-px h-3.5 sm:h-4 bg-white/10 shrink-0" />

      {/* Mode toggle pill */}
      <button
        type="button"
        data-hover
        onClick={handleToggleMode}
        className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[0.52rem] sm:text-[0.58rem] tracking-[0.15em] uppercase font-mono transition-all duration-300 shrink-0 cursor-pointer"
        style={{
          background: isCatalogue ? 'var(--fresh-red)' : 'rgba(245,243,239,0.12)',
          color: 'var(--ash)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
        title={isCatalogue ? 'Return to Immersive Journey' : 'Switch to Catalogue View'}
      >
        {isCatalogue ? '⬡ Journey' : '≡ Catalog'}
      </button>
    </nav>
  );
}
