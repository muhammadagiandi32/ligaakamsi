import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Button from './ui/Button';
import ImagePlaceholder from './ui/ImagePlaceholder';
import { EASE, lineMask } from '../lib/animations';
import { IMAGES } from '../data/images';

/* =============================================================================
   SECTION 1 — HERO
   -----------------------------------------------------------------------------
   Tiga lapis kedalaman yang bergerak dengan kecepatan berbeda saat scroll:
     BACKGROUND (foto)  -> turun +22% & membesar (paling lambat, terasa jauh)
     MIDGROUND (teks)   -> naik  -14%            (kecepatan "normal")
     FOREGROUND (stats) -> naik  -30%            (paling cepat, terasa dekat)
   Perbedaan kecepatan inilah yang menciptakan ilusi ruang. Nilainya sengaja
   kecil — parallax yang terlalu agresif bikin mata lelah.

   Entrance (saat load, bukan scroll): headline tersingkap baris demi baris
   dengan masking, delay bertingkat 0.15s per baris.
   ============================================================================= */

// Stagger khusus hero: jeda awal 0.3s memberi ruang "hening" sepersekian detik
// sebelum halaman mulai bicara — trik pacing sinematik.
const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

// GANTI: angka-angka ini placeholder. Sesuaikan dengan data Liga Akamsi asli.
const HERO_STATS = [
  { value: '2019', label: 'Mulai dari Sawah Lio' },
  { value: '64', label: 'Tim terdaftar' },
  { value: '900+', label: 'Pemain akamsi' },
];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // offset: animasi berjalan dari "hero mulai di atas viewport" sampai
  // "ujung bawah hero menyentuh atas viewport" — yaitu sepanjang hero discroll.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const statsY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  // Konten memudar sebelum hero habis discroll, jadi transisi ke section
  // berikutnya terasa seperti cross-fade, bukan potongan kasar.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  // Reduce motion: matikan seluruh parallax, render statis.
  const p = (v) => (reduce ? undefined : v);

  return (
    <section
      ref={ref}
      id="hero"
      // pb-40 di mobile: bar statistik di bawah posisinya absolute, dan di
      // layar kecil tingginya jauh lebih besar daripada di desktop (stat-nya
      // jadi 3 kolom sempit dengan label yang membungkus). Padding ini yang
      // mencegahnya menimpa tombol CTA.
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-asphalt-950 pb-40 pt-24 sm:pb-32 sm:pt-28"
    >
      {/* ---------- LAPIS 1: BACKGROUND ---------- */}
      <motion.div style={{ y: p(bgY), scale: p(bgScale) }} className="absolute inset-0 -z-10">
        {/*
          GANTI FOTO HERO DI SINI (isi prop src).
          Foto ideal: lanskap malam hari, pertandingan Liga Akamsi di Jalan
          Sawah Lio — lampu sorot seadanya, penonton berdiri rapat di pinggir
          gang, motor terparkir, kabel dan jemuran di atas kepala.
          Resolusi minimal 2400px lebar, agak digelapkan saat export.
        */}
        <ImagePlaceholder
          src={IMAGES.hero}
          alt="Pertandingan Liga Akamsi di Jalan Sawah Lio, Tambora"
          ratio="h-full w-full"
          zoomOnHover={false}
          label="FOTO HERO — pertandingan malam di gang Sawah Lio, penonton berdiri rapat di pinggir jalan"
          className="h-full w-full"
        />
      </motion.div>

      {/* Overlay gelap + tekstur aspal. Dipisah dari foto supaya intensitasnya
          bisa diatur tanpa menyentuh gambar aslinya. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-asphalt-950 via-asphalt-950/75 to-asphalt-950/45" />
      <div className="texture-asphalt pointer-events-none absolute inset-0 -z-10 opacity-[0.18] mix-blend-overlay" />
      {/* Glow oranye dari sudut — kesan lampu sorot jalanan */}
      <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-flare/20 blur-[130px]" />

      {/* ---------- LAPIS 2: KONTEN ---------- */}
      <motion.div
        style={{ y: p(contentY), opacity: p(contentOpacity) }}
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        <motion.div variants={heroStagger} initial="hidden" animate="show">
          {/* Eyebrow lokasi */}
          <motion.div variants={heroItem} className="eyebrow mb-7 flex flex-wrap items-center gap-3">
            <span className="relative flex h-2 w-2">
              {/* Titik berdenyut — penanda "live". Loop infinite, satu-satunya
                  animasi berulang di hero supaya tidak berisik. */}
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-flare"
                animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-flare" />
            </span>
            {/* GANTI: tahun berdiri — pastikan 2019 sesuai fakta */}
            Tambora - Jakarta Barat - Sejak 2019
          </motion.div>

          {/* Headline — tiap baris di-mask terpisah */}
          <h1 className="headline text-[clamp(3.2rem,13vw,10.5rem)]">
            {['Jalanan', 'Jadi'].map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span variants={lineMask} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span variants={lineMask} className="block text-flare">
                Lapangan.
              </motion.span>
            </span>
          </h1>

          {/* Tagline */}
          <motion.p
            variants={heroItem}
            className="mt-8 max-w-xl text-base leading-relaxed text-chalk/70 sm:text-lg"
          >
            Nggak punya lapangan, nggak punya duit buat sewa futsal. Yang kami punya
            cuma aspal, bola, dan anak-anak kampung yang nggak mau berhenti main.
            <span className="text-chalk"> Ya sudah, jalanan kami sulap jadi stadion.</span>
          </motion.p>

          {/* CTA ganda: aksi utama (daftar) + aksi sekunder (lihat dulu) */}
          <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#bergabung" variant="primary">
              Gabung Liga
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Button>
            <Button href="#galeri" variant="ghost">
              Lihat Aksinya
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---------- LAPIS 3: STATS + SCROLL CUE ---------- */}
      <motion.div
        style={{ y: p(statsY), opacity: p(contentOpacity) }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-chalk/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
          {/* Mobile: grid 3 kolom dengan teks kecil, supaya tingginya terkendali.
              Desktop: flex melebar seperti semula. */}
          <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-14">
            {HERO_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                // Delay panjang (1.1s+) — stats muncul paling akhir, setelah
                // headline selesai "bicara".
                transition={{ duration: 0.7, ease: EASE, delay: 1.1 + i * 0.12 }}
              >
                <div className="font-display text-lg leading-none text-chalk sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase leading-snug tracking-[0.1em] text-chalk/45 sm:mt-1.5 sm:text-[10px] sm:tracking-[0.16em]">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll cue — panah turun-naik pelan. Isyarat halus bahwa halaman
              ini panjang dan layak discroll. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            // Disembunyikan di mobile: ruang vertikal di hero HP sudah sempit,
            // dan isyarat "gulir" tidak diperlukan di layar sentuh.
            className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk/40 sm:flex"
          >
            Gulir terus
            <motion.svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path d="M12 5v14M6 13l6 6 6-6" />
            </motion.svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
