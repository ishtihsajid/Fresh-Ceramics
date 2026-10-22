import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="py-12 px-[8vw]"
      style={{ background: '#080806', color: 'var(--ash)' }}
    >
      <div
        className="mb-10 h-px"
        style={{ background: 'rgba(245,243,239,0.08)' }}
      />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <Link href="/" data-hover className="flex items-center">
          <Image
            src="/images/fresh-ceramics-reverse-logo.png"
            alt="Fresh Ceramics"
            width={112}
            height={42}
            className="h-7 w-auto object-contain"
          />
        </Link>
        <div className="flex gap-8 flex-wrap">
          {['Products','Catalogue','Showrooms','Visualizer','Learn'].map(l => (
            <Link
              key={l}
              href={`/${l.toLowerCase()}`}
              data-hover
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ash/30 hover:text-ash transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {l}
            </Link>
          ))}
        </div>
        <p
          className="text-[0.6rem] tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(245,243,239,0.2)' }}
        >
          © {new Date().getFullYear()} Fresh Ceramics Ltd.
        </p>
      </div>
    </footer>
  );
}
