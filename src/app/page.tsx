'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mapPathsData from '@/data/bangladesh-svg-paths.json';
import showroomsJson from '@/data/showrooms.json';
import defaultSiteContent from '@/data/site-content.json';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function projectMapCoords(lat: number, lng: number): { x: number; y: number } {
  const rad = Math.PI / 180;
  const lambda = (lng - 90.3563) * rad;
  const phi = lat * rad;
  const phi0 = 23.6850 * rad;
  const yMerc = Math.log(Math.tan(Math.PI / 4 + phi / 2));
  const yMerc0 = Math.log(Math.tan(Math.PI / 4 + phi0 / 2));
  const x = 380 + 6800 * lambda;
  const y = 480 - 6800 * (yMerc - yMerc0);
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

/* ─────────────────────────────────────────────
   CHAPTER 0: THRESHOLD  (full-bleed dark opener)
   The first breath. A line of earth.
───────────────────────────────────────────── */
function ChapterThreshold({ data }: { data: typeof defaultSiteContent.chapter0 }) {
  const ref = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef  = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop & Laptop viewports (>= 768px): full pinned cinematic realm
    mm.add('(min-width: 768px)', () => {
      // Ensure initial resting elements are visible
      gsap.set([wordRef.current, lineRef.current, subRef.current], { opacity: 1, y: 0, scaleX: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1.2,
          pinSpacing: true,
          onUpdate: (self) => {
            if (self.progress <= 0.02) {
              gsap.set([wordRef.current, lineRef.current, subRef.current], {
                opacity: 1,
                y: 0,
                scaleX: 1,
              });
            }
          },
          onLeaveBack: () => {
            // Absolute guarantee: when returning to top, restore full visibility
            gsap.set([wordRef.current, lineRef.current, subRef.current], {
              opacity: 1,
              y: 0,
              scaleX: 1,
              clearProps: 'transform,opacity',
            });
          },
        },
      });

      // Synchronize exit motion in lockstep: text and red line track together
      tl.to(wordRef.current, { y: -70, opacity: 0, duration: 1, ease: 'power2.in' }, 0.25)
        .to(lineRef.current, { y: -60, scaleX: 0.3, opacity: 0, duration: 1, ease: 'power2.in' }, 0.25)
        .to(subRef.current,  { y: -50, opacity: 0, duration: 0.9, ease: 'power2.in' }, 0.3);
    });

    // Mobile viewports (< 768px): smooth fade out on scroll without pin
    mm.add('(max-width: 767px)', () => {
      gsap.to([wordRef.current, lineRef.current, subRef.current], {
        scrollTrigger: {
          trigger: ref.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
          onLeaveBack: () => {
            gsap.set([wordRef.current, lineRef.current, subRef.current], {
              opacity: 1,
              y: 0,
              scaleX: 1,
              clearProps: 'transform,opacity',
            });
          },
        },
        y: -35,
        opacity: 0,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter bg-soil noise flex flex-col items-center justify-center py-16 px-6"
        style={{ background: 'var(--soil)' }}
      >
        {/* Background texture — abstract tile grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,243,239,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,243,239,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <div ref={wordRef} className="mb-2">
            <h1
              className="display-xl text-ash"
              style={{ fontStyle: 'italic', fontWeight: 300 }}
            >
              {data.title || 'Fresh'}
              <br />
              <span style={{ fontStyle: 'normal', fontWeight: 400 }}>{data.brandName || 'Ceramics'}</span>
            </h1>
          </div>

          {/* Red signature accent line — precision hairline with luminous glow, locked to text layout */}
          <div
            ref={lineRef}
            className="w-28 sm:w-36 h-[1.5px] rounded-full my-4 sm:my-5"
            style={{
              background: 'var(--fresh-red)',
              boxShadow: '0 0 10px rgba(237,28,36,0.4)',
            }}
          />

          <div ref={subRef} className="space-y-2.5">
            <p className="chapter-label text-clay text-[11px] sm:text-xs md:text-sm tracking-[0.22em] sm:tracking-[0.25em]">
              {data.taglineEn || 'A Fresh Start to an Aesthetic Life'}
            </p>
            <p
              className="body-editorial text-ash/70 text-xs sm:text-sm md:text-base max-w-md mx-auto"
              style={{ fontStyle: 'italic' }}
            >
              {data.taglineBn || 'নান্দনিক জীবনের ফ্রেশ সূচনা'}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 select-none pointer-events-none">
          <span className="chapter-label text-ash text-[10px] tracking-widest">{data.scrollLabel || 'Scroll'}</span>
          <div
            className="w-px h-8 sm:h-10"
            style={{
              background: 'linear-gradient(to bottom, var(--ash), transparent)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 1: GROUND  (light alabaster)
   From the earth of Bangladesh. Raw. Honest.
───────────────────────────────────────────── */
function ChapterGround({ data }: { data: typeof defaultSiteContent.chapter1 }) {
  const ref  = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      tl.from(txtRef.current, { x: -40, opacity: 0, duration: 1.5 }, 0)
        .from(imgRef.current, { scale: 1.08, opacity: 0, duration: 2 }, 0.2)
        .to(imgRef.current,   { scale: 1.01, duration: 3 }, 1);
    });

    mm.add('(max-width: 767px)', () => {
      gsap.from(txtRef.current, {
        scrollTrigger: { trigger: txtRef.current, start: 'top 85%' },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });
      gsap.from(imgRef.current, {
        scrollTrigger: { trigger: imgRef.current, start: 'top 85%' },
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col md:flex-row overflow-hidden"
        style={{ background: 'var(--ash)' }}
      >
        {/* Text pane — left */}
        <div
          ref={txtRef}
          className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-[7vw] pt-20 md:pt-24 pb-12 md:pb-20 z-10"
          style={{ color: 'var(--soil)' }}
        >
          <div className="chapter-label text-graphite mb-4 sm:mb-6" style={{ color: 'var(--graphite)' }}>
            {data.label || 'I — Ground'}
          </div>
          <h2
            className="display-lg mb-4 sm:mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: 'var(--soil)', fontStyle: 'italic', fontWeight: 300 }}
          >
            {data.headingItalic || 'Born from'}
            <br />
            <span style={{ fontStyle: 'normal' }}>{data.headingBold || 'Bangladesh'}</span>
          </h2>
          <div className="hairline-h mb-4 sm:mb-6" style={{ width: '3rem', background: 'var(--fresh-red)', opacity: 1, height: '2px' }} />
          <p className="body-editorial text-xs sm:text-sm md:text-base max-w-md leading-relaxed" style={{ color: 'var(--graphite)' }}>
            {data.body1}
          </p>
          <p className="body-editorial text-xs sm:text-sm md:text-base max-w-md mt-3 sm:mt-4 leading-relaxed" style={{ color: 'var(--graphite)', opacity: 0.8 }}>
            {data.body2}
          </p>
        </div>

        {/* Full bleed image right half */}
        <div
          ref={imgRef}
          className="w-full md:w-1/2 min-h-[260px] md:min-h-full relative overflow-hidden"
        >
          <div
            className="w-full h-full min-h-[260px]"
            style={{
              background: `
                linear-gradient(135deg, #c4b8a8 0%, #8d7d6e 50%, #5c4d3c 100%)
              `,
            }}
          />
          {/* Caption */}
          <div className="absolute inset-0 flex items-end p-6 md:p-8">
            <span className="chapter-label text-white/70 bg-black/40 px-3 py-1 rounded-xs backdrop-blur-xs text-[10px] sm:text-xs">
              {data.imageCaption}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 2: CRAFT  (dark soil)
   Inside the kiln. 14 quality tests. 1300°C.
───────────────────────────────────────────── */
function ChapterCraft({ data }: { data: typeof defaultSiteContent.chapter2 }) {
  const ref    = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      tl.from(numRef.current, { opacity: 0, scale: 1.15, duration: 1.5 }, 0);
      statRefs.current.forEach((el, i) => {
        if (el) tl.from(el, { x: 30, opacity: 0, duration: 1 }, 0.2 + i * 0.15);
      });
    });

    mm.add('(max-width: 767px)', () => {
      statRefs.current.forEach((el, i) => {
        if (el) {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 90%' },
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.08,
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col justify-center px-6 md:px-[8vw] py-16 md:py-20"
        style={{ background: 'var(--soil)' }}
      >
        {/* Giant background watermark */}
        <div
          ref={numRef}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 300,
            color: 'rgba(245,243,239,0.03)',
            lineHeight: 1,
            letterSpacing: '-0.05em',
          }}
        >
          FC
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center gap-6 sm:gap-8 md:gap-10">
          {/* Top */}
          <div>
            <div className="chapter-label text-clay mb-2 sm:mb-3">{data.label || 'II — Craft'}</div>
            <h2 className="display-lg text-ash leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontWeight: 300, fontStyle: 'italic' }}>
              {data.headingItalic || 'Precision'}<br />
              <span style={{ fontStyle: 'normal' }}>{data.headingBold || 'is our promise'}</span>
            </h2>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {data.stats.map((s, i) => (
              <div
                key={i}
                ref={el => { statRefs.current[i] = el; }}
                className="border-t border-ash/15 pt-3 sm:pt-4 md:pt-6"
              >
                <div
                  className="display-md text-fresh-red mb-1 text-2xl sm:text-3xl md:text-4xl"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--fresh-red)' }}
                >
                  {s.num}
                </div>
                <div className="body-editorial text-ash/60 text-xs sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap pt-2">
            <Link
              href="/products"
              data-hover
              onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
              className="pill-btn text-ash border-ash/30"
            >
              {data.ctaExplore || 'Explore All Products →'}
            </Link>
            <Link
              href="/catalogue"
              data-hover
              onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
              className="body-editorial text-ash/60 text-xs sm:text-sm hover:text-ash transition-colors"
            >
              {data.ctaCatalogue || 'Download Catalogue'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 3: RESPONSIBILITY  (light + verdigris)
   The six pillars of our planet-first factory.
───────────────────────────────────────────── */
function ChapterResponsibility({ data }: { data: typeof defaultSiteContent.chapter3 }) {
  const ref     = useRef<HTMLElement>(null);
  const pillars = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      pillars.current.forEach((el, i) => {
        if (el) tl.from(el, { y: 25, opacity: 0, duration: 1 }, i * 0.12);
      });
    });

    mm.add('(max-width: 767px)', () => {
      pillars.current.forEach((el, i) => {
        if (el) {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 90%' },
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: (i % 3) * 0.08,
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col justify-center px-6 md:px-[8vw] py-14 md:py-16"
        style={{ background: 'var(--ash)' }}
      >
        {/* Verdigris accent band */}
        <div
          className="absolute top-0 left-0 w-1.5 h-full"
          style={{ background: 'var(--verdigris)' }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center">
          <div className="chapter-label mb-2" style={{ color: 'var(--verdigris)' }}>
            {data.label || 'III — Responsibility'}
          </div>
          <h2
            className="display-md text-2xl sm:text-3xl md:text-4xl mb-0.5 leading-snug"
            style={{ color: 'var(--soil)', fontStyle: 'italic', fontWeight: 300 }}
          >
            {data.heading1}
          </h2>
          <h2
            className="display-md text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8 leading-snug"
            style={{ color: 'var(--soil)', fontWeight: 400 }}
          >
            {data.heading2}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {data.pillars.map((p, i) => (
              <div
                key={i}
                ref={el => { pillars.current[i] = el; }}
                className="flex flex-col gap-1.5 p-3 rounded-xs bg-black/[0.03] border border-black/5 shadow-xs"
              >
                <span style={{ color: 'var(--verdigris)', fontSize: '1.25rem' }}>{p.icon}</span>
                <h4 className="font-mono-fc text-[11px] sm:text-xs tracking-wider uppercase font-bold" style={{ color: 'var(--soil)' }}>
                  {p.title}
                </h4>
                <p className="body-editorial text-xs leading-relaxed" style={{ color: 'var(--graphite)' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 4: SURFACE  (dark soil)
   The surfaces — PGVT Mirror, Double Charge, High Glossy, Matte, Rustic Stone, Candy Satin.
───────────────────────────────────────────── */
function ChapterSurface({ data }: { data: typeof defaultSiteContent.chapter4 }) {
  const ref      = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);
  const [activeSurfaceId, setActiveSurfaceId] = useState<string | null>(null);
  const [surfaceViewMode, setSurfaceViewMode] = useState<'slab' | 'texture'>('slab');

  const surfaces = data?.surfaces || (defaultSiteContent.chapter4 as any).surfaces;

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=450%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      tl.from(titleRef.current, { y: 30, opacity: 0, duration: 1.2 }, 0)
        .from(gridRef.current,  { y: 40, opacity: 0, duration: 1.5 }, 0.2);
    });

    mm.add('(max-width: 767px)', () => {
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });
      gsap.from(gridRef.current, {
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        y: 35,
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col justify-center px-4 sm:px-6 md:px-[6vw] py-8 sm:py-10 md:py-12"
        style={{ background: 'var(--soil)' }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-3 sm:gap-4 md:gap-5 max-h-[92vh] justify-center">
          {/* Header */}
          <div ref={titleRef} className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
            <div>
              <div className="chapter-label text-clay mb-1">{data.label || 'IV — Surface'}</div>
              <h2 className="display-lg text-ash leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontWeight: 300, fontStyle: 'italic' }}>
                {data.headingItalic || 'Every surface,'}<br />
                <span style={{ fontStyle: 'normal' }}>{data.headingBold || 'a declaration'}</span>
              </h2>
            </div>
            
            {/* View Mode Switcher + CTAs */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="inline-flex rounded-full border border-white/15 bg-black/40 p-0.5 text-[10px] sm:text-xs">
                <button
                  type="button"
                  onClick={() => setSurfaceViewMode('slab')}
                  className={`px-3 py-1 rounded-full transition-all duration-300 ${surfaceViewMode === 'slab' ? 'bg-white/20 text-white font-medium' : 'text-ash/60 hover:text-white'}`}
                >
                  Slab View
                </button>
                <button
                  type="button"
                  onClick={() => setSurfaceViewMode('texture')}
                  className={`px-3 py-1 rounded-full transition-all duration-300 ${surfaceViewMode === 'texture' ? 'bg-fresh-red text-white font-medium shadow-[0_0_12px_rgba(237,28,36,0.5)]' : 'text-ash/60 hover:text-white'}`}
                >
                  Raking Light & Texture
                </button>
              </div>

              <Link
                href="/products"
                data-hover
                onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
                className="pill-btn text-ash border-ash/20 text-[11px] sm:text-xs py-1.5 px-3.5 hidden md:flex"
              >
                {data.ctaCollection || 'Full Collection →'}
              </Link>
            </div>
          </div>

          {/* Surface Grid (6 signature finishes with dual-layer hover/animation) */}
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5">
            {surfaces.slice(0, 6).map((s: any, i: number) => {
              const isHoveredOrActive = activeSurfaceId === s.id;
              const showTexture = surfaceViewMode === 'texture' || isHoveredOrActive;

              return (
                <div
                  key={s.id || i}
                  onMouseEnter={() => setActiveSurfaceId(s.id)}
                  onMouseLeave={() => setActiveSurfaceId(null)}
                  onClick={() => setActiveSurfaceId(activeSurfaceId === s.id ? null : s.id)}
                  className="relative group overflow-hidden rounded-xs border border-white/10 bg-black/40 h-28 sm:h-32 md:h-36 lg:h-40 flex flex-col justify-end p-2.5 sm:p-3.5 cursor-pointer transition-all duration-300 hover:border-white/30"
                >
                  {/* Primary: Slab image */}
                  <img
                    src={s.slabImage}
                    alt={s.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      showTexture ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                    loading="lazy"
                  />

                  {/* Secondary: Macro-texture & Raking light reflection image */}
                  <img
                    src={s.textureImage}
                    alt={`${s.name} surface texture`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      showTexture ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                    }`}
                    loading="lazy"
                  />

                  {/* Dynamic ceramic specular sheen beam on hover */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent surface-sheen-active"
                    />
                  </div>

                  {/* Vignette / gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10 opacity-80 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none" />

                  {/* Content over image */}
                  <div className="relative z-10 w-full">
                    {/* Top status tag */}
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="chapter-label text-fresh-red text-[9px] sm:text-[10px] tracking-wider font-mono uppercase">
                        {s.finish}
                      </span>
                      <span className="text-[9px] font-mono text-white/50 bg-black/50 px-1.5 py-0.5 rounded-xs backdrop-blur-xs hidden sm:inline-block">
                        {showTexture ? s.lightBehavior : s.glossIndex}
                      </span>
                    </div>

                    {/* Surface Title & Bengali */}
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="font-display text-white text-xs sm:text-sm md:text-base font-bold truncate">
                        {s.name}
                      </h3>
                      {s.bengali && (
                        <span className="text-[10px] text-ash/60 italic truncate hidden lg:inline">
                          {s.bengali}
                        </span>
                      )}
                    </div>

                    {/* Quick technical metrics (shown on hover or when expanded) */}
                    <div className="mt-1 flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-ash/70 font-mono">
                      <span className="text-white/90">{s.punchDepth}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-emerald-400/90">{s.slipRating}</span>
                      <span className="text-white/30 hidden sm:inline">·</span>
                      <span className="text-ash/60 truncate hidden sm:inline">
                        {showTexture ? 'Tactile Reflection' : 'Slab Overview'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA row */}
          <div className="flex items-center justify-between gap-4 pt-1 flex-wrap">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <Link
                href="/visualizer"
                data-hover
                onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
                className="pill-btn text-ash border-ash/20 text-xs py-1.5 px-4"
              >
                {data.ctaVisualizer || 'Try Room Visualizer →'}
              </Link>
              <Link
                href="/catalogue"
                data-hover
                onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
                className="chapter-label text-ash/60 hover:text-ash transition-colors text-xs"
              >
                {data.ctaCatalogue || 'Download 2026 Catalogue'}
              </Link>
            </div>
            
            <span className="chapter-label text-white/40 text-[10px] hidden sm:inline-block">
              Hover over surfaces to observe specular reflection & tactile punch depth
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 5: HOME  (ash light)
   What we make, makes homes. Aspirational spaces.
───────────────────────────────────────────── */
function ChapterHome({ data }: { data: typeof defaultSiteContent.chapter5 }) {
  const ref     = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const imgGrid  = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });
      tl.from(quoteRef.current, { y: 30, opacity: 0, duration: 1.2 }, 0)
        .from(imgGrid.current,  { x: 30, opacity: 0, duration: 1.5 }, 0.2);
    });

    mm.add('(max-width: 767px)', () => {
      gsap.from(quoteRef.current, {
        scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });
      gsap.from(imgGrid.current, {
        scrollTrigger: { trigger: imgGrid.current, start: 'top 85%' },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col md:flex-row items-center px-6 md:px-[8vw] py-14 md:py-16"
        style={{ background: 'var(--ash)' }}
      >
        {/* Left: quote + CTA */}
        <div
          ref={quoteRef}
          className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-10 mb-8 md:mb-0"
          style={{ color: 'var(--soil)' }}
        >
          <div className="chapter-label mb-3 sm:mb-4" style={{ color: 'var(--graphite)' }}>{data.label || 'V — Home'}</div>
          <blockquote
            className="display-md mb-4 sm:mb-6 leading-tight text-2xl sm:text-3xl md:text-4xl"
            style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--soil)' }}
          >
            "{data.quote}"
          </blockquote>
          <div className="hairline-h mb-4 sm:mb-6" style={{ width: '2.5rem', background: 'var(--fresh-red)', opacity: 1, height: '2px' }} />
          <p className="body-editorial max-w-sm text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: 'var(--graphite)' }}>
            {data.body}
          </p>
          <Link
            href="/visualizer"
            data-hover
            onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
            className="pill-btn mt-4 sm:mt-6 self-start border-soil text-soil hover:text-white"
          >
            {data.ctaText || 'Design Your Space →'}
          </Link>
        </div>

        {/* Right: 2×2 interactive space grid */}
        <div
          ref={imgGrid}
          className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {data.spaces.map((s, i) => (
            <Link
              key={i}
              href={`/visualizer?preset=${s.presetId}`}
              data-hover
              onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
              className="relative overflow-hidden group rounded-xs border border-black/10 shadow-sm flex flex-col justify-between p-3.5 sm:p-4 min-h-[120px] sm:min-h-[135px]"
              style={{ background: s.gradient }}
            >
              <div className="flex items-center justify-between z-10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-fresh-red font-bold">
                  [{s.label}]
                </span>
                <span className="text-[10px] font-mono text-white/70 group-hover:text-white transition-colors">
                  Try 3D →
                </span>
              </div>
              <div className="z-10 mt-4 sm:mt-6">
                <div className="text-white font-display text-xs sm:text-sm md:text-base font-bold uppercase truncate">{s.desc}</div>
                <div className="text-white/70 font-mono text-[10px] mt-0.5">Applied: {s.tileCode}</div>
              </div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 6: HANDS  (dark earth)
   The craftsmen. The fitter meets. The people.
───────────────────────────────────────────── */
function ChapterHands({ data }: { data: typeof defaultSiteContent.chapter6 }) {
  const ref       = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });
      tl.from(portraitRef.current, { scale: 1.08, opacity: 0, duration: 2 }, 0)
        .from(textRef.current,     { x: 30, opacity: 0, duration: 1.5 }, 0.2);
    });

    mm.add('(max-width: 767px)', () => {
      gsap.from(portraitRef.current, {
        scrollTrigger: { trigger: portraitRef.current, start: 'top 85%' },
        opacity: 0,
        duration: 0.8,
      });
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: textRef.current, start: 'top 85%' },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col md:flex-row items-center px-6 md:px-[8vw] py-14 md:py-16"
        style={{ background: 'var(--earth)' }}
      >
        {/* Left portrait block */}
        <div ref={portraitRef} className="w-full md:w-1/2 min-h-[220px] sm:min-h-[280px] md:h-[400px] relative overflow-hidden rounded-xs border border-white/10 mb-8 md:mb-0">
          <div
            className="w-full h-full min-h-[220px] sm:min-h-[280px] md:h-[400px]"
            style={{
              background: 'linear-gradient(160deg, #3c3020 0%, #1e1408 100%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="chapter-label text-white/40 mb-2">[Craftsman Portrait — Narsingdi Facility]</div>
              <div
                className="text-white/20"
                style={{ fontSize: '4.5rem', fontFamily: 'var(--font-display)' }}
              >
                ✋
              </div>
            </div>
          </div>
        </div>

        {/* Right text */}
        <div
          ref={textRef}
          className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-10 lg:pl-12"
        >
          <div className="chapter-label text-clay mb-3 sm:mb-4">{data.label || 'VI — Hands'}</div>
          <h2
            className="display-lg text-ash mb-3 sm:mb-4 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ fontWeight: 300, fontStyle: 'italic' }}
          >
            {data.headingItalic || 'The hands'}
            <br /><span style={{ fontStyle: 'normal' }}>{data.headingBold || 'behind every tile'}</span>
          </h2>
          <p className="body-editorial text-ash/70 text-xs sm:text-sm md:text-base max-w-md mb-3 leading-relaxed">
            {data.body1}
          </p>
          <p className="body-editorial text-ash/50 text-xs sm:text-sm max-w-md mb-6 italic">
            {data.body2}
          </p>
          <Link
            href="/craftsmen"
            data-hover
            onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
            className="pill-btn text-ash border-ash/30 self-start"
          >
            {data.ctaText || 'Meet Our Craftsmen →'}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 7: PLACES  (dark soil)
   81 showrooms. One nation. Your nearest door.
───────────────────────────────────────────── */
function ChapterPlaces({ data }: { data: typeof defaultSiteContent.chapter7 }) {
  const ref      = useRef<HTMLElement>(null);
  const mapRef   = useRef<HTMLDivElement>(null);
  const numRef2  = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });
      tl.from(numRef2.current, { opacity: 0, y: 30, duration: 1.5 }, 0)
        .from(mapRef.current,  { opacity: 0, scale: 0.96, duration: 2 }, 0.2);
    });

    mm.add('(max-width: 767px)', () => {
      gsap.from(numRef2.current, {
        scrollTrigger: { trigger: numRef2.current, start: 'top 85%' },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });
      gsap.from(mapRef.current, {
        scrollTrigger: { trigger: mapRef.current, start: 'top 85%' },
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col md:flex-row items-center px-6 md:px-[8vw] gap-6 md:gap-10 py-14 md:py-16"
        style={{ background: 'var(--soil)' }}
      >
        {/* Left text */}
        <div ref={numRef2} className="w-full md:w-2/5">
          <div className="chapter-label text-clay mb-2 sm:mb-3">{data.label || 'VII — Places'}</div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 8vw, 7.5rem)',
              fontWeight: 300,
              color: 'var(--fresh-red)',
              lineHeight: 0.9,
            }}
          >
            {data.statNum || '81'}
          </div>
          <h2
            className="display-md text-ash mt-2 mb-3 leading-tight text-2xl sm:text-3xl md:text-4xl"
            style={{ fontWeight: 300 }}
          >
            {data.heading || 'showrooms across Bangladesh'}
          </h2>
          <p className="body-editorial text-ash/60 text-xs sm:text-sm md:text-base max-w-sm mb-5 leading-relaxed">
            {data.body}
          </p>
          <Link
            href="/showrooms"
            data-hover
            onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
            className="pill-btn text-ash border-ash/20"
          >
            {data.ctaText || 'Find Your Showroom →'}
          </Link>
        </div>

        {/* Right: Authentic Bangladesh Geographic Vector Map */}
        <div
          ref={mapRef}
          className="w-full md:flex-1 flex items-center justify-center"
        >
          <Link
            href="/showrooms"
            data-hover
            onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
            className="relative block w-full max-w-[340px] sm:max-w-[380px] aspect-[760/980] p-4 rounded-sm border border-white/10 bg-white/[0.02] hover:border-fresh-red/40 transition-all duration-500 shadow-2xl group"
          >
            <div className="absolute top-3 left-4 text-[9px] font-mono tracking-widest text-ash/40 uppercase">
              {data.mapBadge || 'Geographic Network • 81 Showrooms'}
            </div>
            <div className="absolute top-3 right-4 text-[9px] font-mono text-fresh-red flex items-center gap-1 group-hover:underline">
              <span>Interactive Map</span>
              <span>→</span>
            </div>

            <svg
              viewBox="0 0 760 980"
              className="w-full h-full filter drop-shadow-md select-none mt-2"
            >
              {/* Authentic Bangladesh 8 Divisions Vector Geometry */}
              <g>
                {(mapPathsData.divisions as any[]).map((d: any) => (
                  <path
                    key={d.id}
                    d={d.path}
                    fill="rgba(245, 243, 239, 0.05)"
                    stroke="rgba(245, 243, 239, 0.15)"
                    strokeWidth="1.0"
                    strokeLinejoin="round"
                    className="group-hover:fill-white/[0.08] transition-colors"
                  />
                ))}
              </g>

              {/* Real Showroom Geographic Pins */}
              <g>
                {(showroomsJson as any[]).map((shw) => {
                  const pt = projectMapCoords(shw.lat, shw.lng);
                  const isFlagship = shw.type.includes("Own");

                  if (isFlagship) {
                    return (
                      <g key={shw.id} transform={`translate(${pt.x}, ${pt.y})`}>
                        <circle r="12" className="fill-fresh-red/25 animate-ping" />
                        <circle r="5" className="fill-fresh-red stroke-2 stroke-white" />
                        <circle r="1.5" fill="#ffffff" />
                        <text
                          x="9"
                          y="3"
                          className="text-[10px] font-mono font-bold fill-white uppercase tracking-wider select-none pointer-events-none"
                        >
                          {shw.area.includes("Hatirpool") ? "Dhaka Flagship" : "Ctg Flagship"}
                        </text>
                      </g>
                    );
                  }

                  return (
                    <circle
                      key={shw.id}
                      cx={pt.x}
                      cy={pt.y}
                      r="3.5"
                      fill="var(--fresh-red)"
                      stroke="#0F0F0D"
                      strokeWidth="1"
                      className="opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  );
                })}
              </g>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 8: LEARNING  (ash light)
   Knowledge series. 96K–230K views. Community.
───────────────────────────────────────────── */
function ChapterLearning({ data }: { data: typeof defaultSiteContent.chapter8 }) {
  const ref     = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });
      cardsRef.current.forEach((el, i) => {
        if (el) tl.from(el, { y: 35, opacity: 0, duration: 1 }, i * 0.15);
      });
    });

    mm.add('(max-width: 767px)', () => {
      cardsRef.current.forEach((el, i) => {
        if (el) {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 90%' },
            y: 25,
            opacity: 0,
            duration: 0.6,
            delay: (i % 2) * 0.1,
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col justify-center px-6 md:px-[8vw] py-14 md:py-16"
        style={{ background: 'var(--ash)' }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-5 sm:gap-7">
          <div>
            <div className="chapter-label mb-1.5 sm:mb-2" style={{ color: 'var(--graphite)' }}>{data.label || 'VIII — Learning'}</div>
            <h2
              className="display-lg leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ color: 'var(--soil)', fontStyle: 'italic', fontWeight: 300 }}
            >
              {data.headingItalic || 'Knowledge'}
              <br /><span style={{ fontStyle: 'normal' }}>{data.headingBold || 'is our gift'}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {data.videos.map((v, i) => (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="relative group flex flex-col overflow-hidden rounded-xs border border-black/10 bg-soil"
              >
                <div
                  className="h-28 sm:h-32 md:h-36 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, #1a1a16, #${['2c2416','1e2820','2c2416','1e1e1e'][i % 4]})`,
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl text-ash/40 group-hover:text-fresh-red transition-colors">▶</div>
                    <div className="chapter-label text-clay mt-1 text-[10px]">{v.views} views</div>
                  </div>
                </div>
                <div className="p-3 bg-soil">
                  <div className="chapter-label text-clay text-[9px] mb-1">{v.tag}</div>
                  <p className="body-editorial text-ash text-xs leading-snug line-clamp-2">{v.title}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/learn"
            data-hover
            onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
            className="pill-btn self-start border-soil text-soil"
          >
            {data.ctaText || 'Visit Knowledge Hub →'}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 9: CAMPAIGNS  (dark earth)
   Eid Express. Brand activations. Community.
───────────────────────────────────────────── */
function ChapterCampaigns({ data }: { data: typeof defaultSiteContent.chapter9 }) {
  const ref    = useRef<HTMLElement>(null);
  const bgRef  = useRef<HTMLDivElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });
      tl.from(bgRef.current, { scale: 1.08, duration: 2 }, 0)
        .from(txtRef.current, { y: 25, opacity: 0, duration: 1.2 }, 0.2);
    });

    mm.add('(max-width: 767px)', () => {
      gsap.from(txtRef.current, {
        scrollTrigger: { trigger: txtRef.current, start: 'top 85%' },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col justify-center items-center text-center px-6 md:px-[8vw] py-14 md:py-16"
        style={{ background: 'var(--earth)' }}
      >
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 30% 50%, rgba(237,28,36,0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(74,124,89,0.10) 0%, transparent 50%),
              var(--earth)
            `,
          }}
        />

        <div
          ref={txtRef}
          className="relative z-10 w-full max-w-2xl mx-auto flex flex-col justify-center items-center"
        >
          <div className="chapter-label text-clay mb-3 sm:mb-4">{data.label || 'IX — Campaigns'}</div>
          <h2
            className="display-xl text-ash mb-4 sm:mb-6 leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontStyle: 'italic', fontWeight: 300 }}
          >
            {data.title || 'Eid Express'}
          </h2>
          <p className="body-editorial text-ash/70 text-xs sm:text-sm md:text-base max-w-lg mb-2.5 leading-relaxed">
            {data.body1}
          </p>
          <p className="body-editorial text-ash/50 text-xs sm:text-sm max-w-md mb-6 sm:mb-8 italic">
            {data.body2}
          </p>

          <Link
            href="/innovation"
            data-hover
            onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
            className="pill-btn text-ash border-ash/30"
          >
            {data.ctaText || 'Our Initiatives →'}
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAPTER 10: HORIZON  (full dark — closing)
   The vision. The commitment. The invitation.
───────────────────────────────────────────── */
function ChapterHorizon({ data }: { data: typeof defaultSiteContent.chapter10 }) {
  const ref    = useRef<HTMLElement>(null);
  const txtRef = useRef<HTMLDivElement>(null);
  const lineRef2 = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });
      tl.from(txtRef.current,  { y: 35, opacity: 0, duration: 1.5 }, 0)
        .from(lineRef2.current, { scaleX: 0, duration: 1.5, transformOrigin: 'center center' }, 0.2);
    });

    mm.add('(max-width: 767px)', () => {
      gsap.from(txtRef.current, {
        scrollTrigger: { trigger: txtRef.current, start: 'top 85%' },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="chapter-wrapper w-full relative">
      <section
        ref={ref}
        className="chapter relative flex flex-col justify-center items-center text-center px-6 md:px-[8vw] py-14 md:py-16"
        style={{ background: 'var(--soil)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(237,28,36,0.06) 0%, transparent 70%)',
          }}
        />

        <div
          ref={txtRef}
          className="relative z-10 w-full max-w-3xl mx-auto flex flex-col justify-center items-center"
        >
          <div className="chapter-label text-clay mb-4 sm:mb-6">{data.label || 'X — Horizon'}</div>

          <h2
            className="display-xl text-ash mb-4 sm:mb-6 leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontStyle: 'italic', fontWeight: 300 }}
          >
            {data.headingItalic || 'The future'}
            <br />
            <span style={{ fontStyle: 'normal', color: 'var(--fresh-red)' }}>{data.headingBold || 'is Fresh'}</span>
          </h2>

          <div
            ref={lineRef2}
            className="w-24 sm:w-28 h-[1.5px] mb-4 sm:mb-6 rounded-full"
            style={{ background: 'var(--fresh-red)', boxShadow: '0 0 10px rgba(237,28,36,0.4)' }}
          />

          <p className="body-editorial text-ash/70 text-xs sm:text-sm md:text-base max-w-lg mb-2.5 leading-relaxed">
            {data.body1}
          </p>
          <p className="body-editorial text-ash/40 text-xs sm:text-sm max-w-md mb-8 sm:mb-10 italic">
            {data.body2}
          </p>

          {/* Final CTA row */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/products"
              data-hover
              onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
              className="pill-btn text-white"
              style={{ borderColor: 'var(--fresh-red)', background: 'var(--fresh-red)' }}
            >
              {data.ctaExplore || 'Explore Full Collection →'}
            </Link>
            <Link
              href="/showrooms"
              data-hover
              onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
              className="pill-btn text-ash border-ash/20"
            >
              {data.ctaShowroom || 'Find a Showroom'}
            </Link>
            <Link
              href="/visualizer"
              data-hover
              onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
              className="pill-btn text-ash border-ash/20"
            >
              {data.ctaVisualizer || 'Room Visualizer'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FOOTER  (minimal dark)
───────────────────────────────────────────── */
function SiteFooter({ data }: { data: typeof defaultSiteContent.footer }) {
  return (
    <footer
      className="relative py-16 px-6 md:px-[8vw]"
      style={{ background: '#080806', color: 'var(--ash)' }}
    >
      <div className="hairline-h mb-12 opacity-20" style={{ background: 'var(--ash)' }} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Image
            src="/images/fresh-ceramics-reverse-logo.png"
            alt="Fresh Ceramics"
            width={120}
            height={45}
            className="h-8 w-auto object-contain mb-4"
          />
          <p className="body-editorial text-ash/50 text-xs leading-relaxed max-w-xs whitespace-pre-line">
            {data.tagline}
          </p>
        </div>

        {/* Products */}
        <div>
          <div className="chapter-label text-clay mb-4">Products</div>
          {['Floor Tiles','Wall Tiles','Double Charge','Outdoor','Catalogue'].map(l => (
            <Link
              key={l}
              href="/products"
              data-hover
              onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
              className="block body-editorial text-ash/50 text-xs mb-2 hover:text-ash transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div>
          <div className="chapter-label text-clay mb-4">Company</div>
          {[
            { label: 'Craftsmen',     href: '/craftsmen' },
            { label: 'Innovation',    href: '/innovation' },
            { label: 'Learning Hub',  href: '/learn' },
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              data-hover
              onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
              className="block body-editorial text-ash/50 text-xs mb-2 hover:text-ash transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Connect */}
        <div>
          <div className="chapter-label text-clay mb-4">Connect</div>
          {[
            { label: '81 Showrooms →', href: '/showrooms' },
            { label: 'Room Visualizer', href: '/visualizer' },
            { label: data.phone || '+880 9666-777-666', href: `tel:${data.phone}` },
            { label: data.email || 'info@freshceramics.com', href: `mailto:${data.email}` },
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              data-hover
              onClick={() => ScrollTrigger.getAll().forEach(t => t.kill(true))}
              className="block body-editorial text-ash/50 text-xs mb-2 hover:text-ash transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/5 pt-6 max-w-7xl mx-auto">
        <p className="chapter-label text-ash/40 text-[10px]">
          {data.copyright || `© ${new Date().getFullYear()} Fresh Ceramics Ltd. All rights reserved.`}
        </p>
        <p className="chapter-label text-ash/40 text-[10px]">
          {data.certifications || 'ISO 9001 · ISO 14001 · UN SDG 11 Aligned'}
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   ROOT PAGE — assembles all chapters with wrappers
───────────────────────────────────────────── */
export default function HomePage() {
  const [content, setContent] = useState(defaultSiteContent);

  useEffect(() => {
    fetch('/api/admin/content')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.chapter0) {
          setContent(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full relative selection:bg-fresh-red selection:text-white">
      <ChapterThreshold data={content.chapter0 || defaultSiteContent.chapter0} />
      <ChapterGround data={content.chapter1 || defaultSiteContent.chapter1} />
      <ChapterCraft data={content.chapter2 || defaultSiteContent.chapter2} />
      <ChapterResponsibility data={content.chapter3 || defaultSiteContent.chapter3} />
      <ChapterSurface data={content.chapter4 || defaultSiteContent.chapter4} />
      <ChapterHome data={content.chapter5 || defaultSiteContent.chapter5} />
      <ChapterHands data={content.chapter6 || defaultSiteContent.chapter6} />
      <ChapterPlaces data={content.chapter7 || defaultSiteContent.chapter7} />
      <ChapterLearning data={content.chapter8 || defaultSiteContent.chapter8} />
      <ChapterCampaigns data={content.chapter9 || defaultSiteContent.chapter9} />
      <ChapterHorizon data={content.chapter10 || defaultSiteContent.chapter10} />
      <SiteFooter data={content.footer || defaultSiteContent.footer} />
    </div>
  );
}
