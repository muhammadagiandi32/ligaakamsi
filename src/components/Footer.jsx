import { motion } from 'framer-motion';
import Reveal from './ui/Reveal';
import { staggerContainerCustom, fadeUp, lineMask, VIEWPORT, EASE } from '../lib/animations';

/* =============================================================================
   SECTION 9 — KONTAK & FOOTER
   -----------------------------------------------------------------------------
   Penutup halaman. Animasi sengaja lebih tenang daripada section sebelumnya —
   setelah klimaks di section "Bergabung", footer berfungsi sebagai pendaratan.

   Satu-satunya gerakan besar: tagline penutup raksasa yang tersingkap dengan
   masking saat masuk viewport, lalu diam. Sisanya fade sederhana.

   GANTI SEMUA KONTAK DI BAWAH INI — email, WhatsApp, alamat, dan tautan
   media sosial masih placeholder.
   ============================================================================= */

const SOCIAL = [
  // GANTI: username & URL asli
  {
    name: 'Instagram',
    handle: '@ligaakamsi',
    href: '#',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: 'TikTok',
    handle: '@ligaakamsi',
    href: '#',
    icon: <path d="M16 3v9.5a4.5 4.5 0 1 1-4-4.47M16 3c.4 2.4 2 4 4.5 4.2" />,
  },
  {
    name: 'YouTube',
    handle: 'Liga Akamsi TV',
    href: '#',
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="m10.5 9.5 5 2.5-5 2.5v-5Z" />
      </>
    ),
  },
  {
    name: 'WhatsApp',
    handle: '+62 8xx-xxxx-xxxx',
    href: '#',
    icon: <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.6-4.5a8.4 8.4 0 1 1 15.4-4.4ZM8.8 8.4c-.3.6-.2 1.6.4 2.6a9 9 0 0 0 3.6 3.4c1.1.5 2 .5 2.5.1l.5-.6-1.8-1-.7.7a6 6 0 0 1-2.4-2.4l.7-.7-1-1.8-.6.5Z" />,
  },
];

const KONTAK = [
  { label: 'Email', value: 'halo@ligaakamsi.com', href: 'mailto:halo@ligaakamsi.com' },
  { label: 'WhatsApp', value: '+62 8xx-xxxx-xxxx', href: '#' },
  {
    label: 'Basecamp',
    value: 'Jl. Sawah Lio, Tambora, Jakarta Barat',
    href: '#',
  },
];

const NAV_FOOTER = [
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Visi & Misi', href: '#visi' },
  { label: 'Program', href: '#program' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Liputan Media', href: '#liputan' },
  { label: 'Mitra', href: '#mitra' },
];

export default function Footer() {
  return (
    <footer id="kontak" className="relative overflow-hidden border-t border-chalk/10 bg-asphalt-950">
      <div className="texture-asphalt pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

      {/* ---------- BLOK KONTAK ---------- */}
      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Reveal className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-flare" />
              Kontak
            </Reveal>

            <h2 className="headline text-[clamp(2.2rem,5.5vw,4rem)]">
              {['Mampir ke', 'Sawah Lio.'].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    variants={lineMask}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    // Delay per baris dihitung manual karena tiap baris punya
                    // animasi sendiri (tidak dibungkus container stagger).
                    transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
                    className={`block ${i === 1 ? 'text-flare' : ''}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>

            <Reveal delay={0.2} className="mt-6 max-w-md leading-relaxed text-chalk/60">
              Tiap akhir pekan kami ada di jalan. Mau liput, mau ikut main, mau bantu —
              datang aja, atau chat dulu biar nggak nyasar.
            </Reveal>

            {/* Daftar kontak */}
            <motion.div
              variants={staggerContainerCustom(0.08, 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-12 flex flex-col gap-px overflow-hidden rounded-sm bg-chalk/10"
            >
              {KONTAK.map((k) => (
                <motion.a
                  key={k.label}
                  href={k.href}
                  variants={fadeUp}
                  className="group flex items-center justify-between gap-6 bg-asphalt-950 px-6 py-5 transition-colors duration-300 hover:bg-asphalt-900"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/40">
                    {k.label}
                  </span>
                  <span className="flex items-center gap-3 text-right text-sm text-chalk/85 transition-colors group-hover:text-flare sm:text-base">
                    {k.value}
                    {/* Panah geser saat hover — micro-interaction CSS murni */}
                    <svg
                      className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </motion.a>
              ))}
            </motion.div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk/25">
              [PLACEHOLDER] Ganti email, nomor WhatsApp, dan alamat basecamp
            </p>
          </div>

          {/* ---------- KOLOM KANAN: SOSIAL + NAV ---------- */}
          <div className="flex flex-col gap-12">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/40">
                Ikuti Kami
              </div>
              <motion.div
                variants={staggerContainerCustom(0.07, 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="mt-5 grid gap-3 sm:grid-cols-2"
              >
                {SOCIAL.map((s) => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    variants={fadeUp}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    className="group flex items-center gap-3 rounded-sm border border-chalk/10 px-4 py-3.5 transition-colors duration-300 hover:border-flare/50 hover:bg-asphalt-900"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-chalk/50 transition-colors group-hover:text-flare"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {s.icon}
                    </svg>
                    <span className="min-w-0">
                      <span className="block text-sm text-chalk/85">{s.name}</span>
                      <span className="block truncate font-mono text-[10px] text-chalk/35">
                        {s.handle}
                      </span>
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/40">
                Halaman
              </div>
              <div className="mt-5 grid grid-cols-2 gap-y-3">
                {NAV_FOOTER.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    className="text-sm text-chalk/55 transition-colors hover:text-flare"
                  >
                    {n.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- TAGLINE PENUTUP RAKSASA ---------- */}
      <div className="relative border-t border-chalk/10 px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden">
          <motion.h2
            variants={lineMask}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="headline text-center text-[clamp(2.8rem,11.5vw,10rem)] leading-[0.85] text-chalk"
          >
            Jalanan Jadi <span className="text-flare">Lapangan</span>
          </motion.h2>
        </div>
      </div>

      {/* ---------- BARIS HAK CIPTA ---------- */}
      <div className="relative border-t border-chalk/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-chalk/35 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left">
          <span>© {new Date().getFullYear()} Liga Akamsi — Tambora, Jakarta Barat</span>
          <span>Dibikin di pinggir lapangan, bukan di kantor.</span>
        </div>
      </div>
    </footer>
  );
}
