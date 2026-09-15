import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import Ticker from './ui/Ticker';
import { staggerContainerCustom, fadeUp, cardHover, VIEWPORT, EASE } from '../lib/animations';

/* =============================================================================
   SECTION 6 — PENCAPAIAN & LIPUTAN MEDIA
   -----------------------------------------------------------------------------
   Dua blok:
   A. MARQUEE LOGO MEDIA — deretan nama media berjalan terus-menerus. Gerakan
      konstan di tengah halaman yang penuh reveal sekali-jalan berfungsi sebagai
      "denyut": halaman terasa hidup walau user berhenti scroll.
   B. KARTU LIPUTAN — fade-in berurutan, hover mengangkat kartu 8px.

   PENTING — GANTI SEMUA ISI DI SINI:
   Nama media di bawah ini sebagian nyata (Kompas, Suara.com pernah meliput)
   dan sebagian TEBAKAN PLACEHOLDER. Pastikan hanya memasang media yang benar-
   benar pernah meliput, dan ganti judul/tanggal/tautan artikel dengan yang asli.
   Untuk logo asli, ganti elemen teks dengan <img src="/logo-media.svg" />.
   ============================================================================= */

// [PLACEHOLDER] — verifikasi dulu media mana saja yang benar-benar meliput.
const MEDIA = [
  'KOMPAS',
  'SUARA.COM',
  'DETIKCOM',
  'KUMPARAN',
  'TRIBUN JAKARTA',
  'CNN INDONESIA',
  'JAKARTA POST',
];

// [PLACEHOLDER] — ganti judul, kutipan, tanggal, dan URL dengan artikel asli.
const LIPUTAN = [
  {
    outlet: 'Kompas',
    date: '[PLACEHOLDER] 2024',
    title: 'Ketika Jalan Kampung Tambora Berubah Jadi Stadion Akhir Pekan',
    excerpt:
      'Liputan tentang bagaimana warga Sawah Lio menutup jalan tiap Sabtu malam dan mengubahnya jadi arena sepak bola untuk ratusan anak.',
    href: '#',
  },
  {
    outlet: 'Suara.com',
    date: '[PLACEHOLDER] 2024',
    title: 'Liga Akamsi dan Gelombang Liga Aspal di Jakarta',
    excerpt:
      'Fenomena liga jalanan yang tumbuh dari keterbatasan ruang terbuka di permukiman padat ibu kota.',
    href: '#',
  },
  {
    outlet: '[PLACEHOLDER] Media',
    date: '[PLACEHOLDER] 2025',
    title: 'Pemprov DKI Sorot Geliat Liga Jalanan Warga',
    excerpt:
      'Perhatian pemerintah daerah terhadap inisiatif olahraga warga yang lahir tanpa anggaran resmi.',
    href: '#',
  },
];

// [PLACEHOLDER] — pencapaian ini karangan, ganti dengan capaian nyata.
const PENCAPAIAN = [
  { label: 'Musim terselenggara', value: 'Musim ke-5' },
  { label: 'Ditonton langsung', value: '500+ orang / malam' },
  { label: 'Jangkauan media sosial', value: 'Jutaan tayangan' },
  { label: 'Kampung yang mengadopsi', value: '6 kampung' },
];

export default function Liputan() {
  return (
    <section id="liputan" className="relative border-t border-chalk/10 bg-asphalt-950 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pencapaian & Liputan"
          title={['Dari Gang Sempit,', 'Masuk Layar Kaca.']}
          description="Awalnya cuma ditonton warga satu RT. Sekarang kamera datang sendiri ke gang kami."
          titleClass="text-[clamp(2.4rem,6.5vw,5rem)]"
        />
      </div>

      {/* ---------- A. MARQUEE LOGO MEDIA ---------- */}
      <div className="mt-16 border-y border-chalk/10 py-8 sm:mt-24">
        <Ticker
          speed={26}
          items={MEDIA.map((m) => (
            <>
              {/*
                GANTI DENGAN LOGO ASLI:
                <img src="/media/kompas.svg" alt="Kompas" className="h-6 opacity-50" />
                Sementara ini dipakai wordmark teks.
              */}
              <span className="font-display text-2xl uppercase tracking-tight text-chalk/35 transition-colors duration-300 hover:text-chalk sm:text-3xl">
                {m}
              </span>
              <span className="h-4 w-px bg-chalk/15" />
            </>
          ))}
        />
        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/25">
          [PLACEHOLDER] Verifikasi daftar media sebelum tayang
        </p>
      </div>

      {/* ---------- ANGKA PENCAPAIAN ---------- */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={staggerContainerCustom(0.09, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-b border-chalk/10 pb-16 lg:grid-cols-4"
        >
          {PENCAPAIAN.map((p) => (
            <motion.div key={p.label} variants={fadeUp}>
              <div className="font-display text-xl uppercase leading-tight text-flare sm:text-2xl">
                {p.value}
              </div>
              <div className="mt-2 text-sm text-chalk/55">{p.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- B. KARTU LIPUTAN ---------- */}
        <motion.div
          variants={staggerContainerCustom(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {LIPUTAN.map((l) => (
            <motion.a
              key={l.title}
              href={l.href}
              variants={fadeUp}
              whileHover="hover"
              className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-chalk/10 bg-asphalt-900 p-7 transition-colors duration-500 hover:border-flare/40 sm:p-8"
            >
              {/* Seluruh kartu terangkat 8px saat hover (spring), bukan membesar —
                  supaya grid di sebelahnya tidak ikut terasa bergeser. */}
              <motion.div variants={cardHover}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-lg uppercase text-chalk">{l.outlet}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-chalk/35">
                    {l.date}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold leading-snug text-chalk/90 sm:text-xl">
                  {l.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk/50">{l.excerpt}</p>

                <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-flare">
                  Baca liputan
                  <motion.svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    // Panah bergeser 4px ke kanan saat kartu di-hover: isyarat
                    // arah, memperkuat bahwa ini tautan keluar.
                    variants={{ hidden: { x: 0 }, show: { x: 0 }, hover: { x: 4 } }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </motion.svg>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        <Reveal className="mt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-chalk/25">
            [PLACEHOLDER] Ganti judul, tanggal, kutipan, dan tautan artikel dengan data asli
          </p>
        </Reveal>
      </div>
    </section>
  );
}
