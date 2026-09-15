import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { EASE } from '../lib/animations';

/* =============================================================================
   NAVBAR
   -----------------------------------------------------------------------------
   Dua perilaku animasi:
   1. AUTO-HIDE: nav menyembunyikan diri saat user scroll ke bawah dan muncul
      lagi saat scroll ke atas. Alasannya halaman ini sinematik — saat user
      sedang "menonton" ke bawah, nav cuma mengganggu; saat scroll balik ke
      atas berarti user sedang mencari navigasi.
   2. BACKDROP: background blur + border baru muncul setelah lewat 40px,
      supaya di hero nav-nya benar-benar transparan (mengambang di atas foto).

   Menu mobile: slide dari atas dengan AnimatePresence supaya exit animation
   ikut jalan (tanpa AnimatePresence, menu langsung hilang begitu state false).
   ============================================================================= */

const NAV_LINKS = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Visi & Misi', href: '#visi' },
  { label: 'Program', href: '#program' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Liputan', href: '#liputan' },
  { label: 'Mitra', href: '#mitra' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // useMotionValueEvent: lebih murah daripada useState + listener scroll
  // karena tidak memicu render kecuali nilainya benar-benar berubah kategori.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    // Ambang 150px supaya nav tidak berkedip saat scroll kecil di area hero
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: '-105%' } }}
      animate={hidden && !open ? 'hidden' : 'visible'}
      transition={{ duration: 0.45, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'border-b border-chalk/10 bg-asphalt-950/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo. GANTI: ganti dengan file logo asli (SVG) kalau sudah ada. */}
        <a href="#hero" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-flare font-display text-base leading-none text-asphalt-950">
            LA
          </span>
          <span className="font-display text-lg uppercase leading-none tracking-tight text-chalk">
            Liga Akamsi
          </span>
        </a>

        {/* Link desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.16em] text-chalk/60 transition-colors hover:text-chalk"
            >
              {l.label}
              {/* Underline menyapu dari kiri saat hover — micro-interaction
                  paling murah tapi paling kerasa. Pakai CSS transform, bukan
                  Framer, karena tidak perlu orchestration. */}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-flare transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#bergabung"
            className="hidden rounded-full bg-chalk px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-asphalt-950 transition-colors hover:bg-flare sm:inline-block"
          >
            Daftar Tim
          </a>

          {/* Tombol menu mobile */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-chalk/15 lg:hidden"
          >
            {/* Dua garis yang berputar jadi tanda silang saat menu terbuka */}
            <motion.span
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="block h-[1.5px] w-4 bg-chalk"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="block h-[1.5px] w-4 bg-chalk"
            />
          </button>
        </div>
      </nav>

      {/* Panel menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  // Stagger manual lewat delay — tiap link masuk berurutan
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: EASE }}
                  className="border-b border-chalk/5 py-3 font-display text-2xl uppercase text-chalk/80"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#bergabung"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-flare px-6 py-3.5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-asphalt-950"
              >
                Daftar Tim
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
