import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import Counter from './ui/Counter';
import Reveal from './ui/Reveal';
import {
  staggerContainerCustom,
  fadeUp,
  scaleIn,
  cardHover,
  VIEWPORT,
  EASE,
} from '../lib/animations';

/* =============================================================================
   SECTION 3 — VISI & MISI
   -----------------------------------------------------------------------------
   Tiga beat animasi:
   1. Heading + pernyataan visi (masking + fade).
   2. Deretan STAT COUNTER yang menghitung naik saat masuk viewport — angka
      yang bergerak menahan mata lebih lama daripada angka statis.
   3. Grid MISI: stagger 0.08 (rapat) supaya empat kartu selesai masuk dalam
      ~0.5 detik, tidak terasa lambat.

   Garis vertikal oranye di latar memanjang mengikuti scroll (scaleY 0 -> 1)
   sebagai metafora "perjalanan dari Tambora ke Indonesia".
   ============================================================================= */

// GANTI SEMUA ANGKA: ini estimasi placeholder, belum data resmi.
const STATS = [
  { to: 64, suffix: '', label: 'Tim ikut serta', note: '[PLACEHOLDER]' },
  { to: 900, suffix: '+', label: 'Pemain terdaftar', note: '[PLACEHOLDER]' },
  { to: 12, suffix: '', label: 'RW terlibat', note: '[PLACEHOLDER]' },
  { to: 5, suffix: '', label: 'Wilayah target 2026', note: '[PLACEHOLDER]' },
];

const MISI = [
  {
    no: '01',
    title: 'Buka Panggung di Tiap Gang',
    desc: 'Bikin kompetisi rutin yang gratis dan dekat rumah. Nggak perlu duit sewa, nggak perlu jauh-jauh — cukup turun ke jalan depan.',
    icon: (
      <path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6M3 13h18" />
    ),
  },
  {
    no: '02',
    title: 'Sebar ke Kampung Lain',
    desc: 'Format Liga Akamsi kami buka buat siapa pun. Kampung mana pun boleh pakai, boleh contek, boleh kembangin sendiri.',
    icon: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />,
  },
  {
    no: '03',
    title: 'Bangun Akademi Beneran',
    desc: 'Cita-cita jangka panjangnya bukan turnamen terus-terusan, tapi akademi: pelatih bersertifikat, jadwal latihan tetap, dan jalur buat anak yang serius.',
    icon: <path d="M12 3 2 8l10 5 10-5-10-5ZM6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5M22 8v6" />,
  },
  {
    no: '04',
    title: 'Jaga Anak Tetap di Jalur',
    desc: 'Liga ini juga soal menjauhkan anak dari hal-hal yang nggak bener. Tiap akhir pekan mereka punya alasan buat ada di lapangan.',
    icon: <path d="M12 3 4 6v6c0 4.4 3.4 8.3 8 9 4.6-.7 8-4.6 8-9V6l-8-3ZM9 12l2 2 4-4" />,
  },
];

export default function VisiMisi() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.4'],
  });
  // Garis vertikal "tumbuh" seiring scroll. transform-origin top supaya
  // tumbuhnya dari atas ke bawah, searah dengan arah baca.
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="visi"
      ref={ref}
      className="relative overflow-hidden border-t border-chalk/10 bg-asphalt-900 py-24 sm:py-32"
    >
      {/* Tekstur grid tipis — kesan denah / petak kota */}
      <div className="texture-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-flare/10 blur-[140px]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Visi & Misi"
          title={['Dari Sawah Lio', 'ke Seluruh', 'Indonesia.']}
          description="Target kami bukan sekadar bikin turnamen tiap minggu. Kami mau format ini jalan di kampung-kampung lain, lalu berujung pada satu hal: akademi yang benar-benar membina."
          titleClass="text-[clamp(2.6rem,7.5vw,6rem)]"
        />

        {/* ---------- GARIS PERJALANAN + STAT COUNTER ---------- */}
        <div className="relative mt-20 sm:mt-28">
          {/* Garis vertikal yang memanjang mengikuti scroll */}
          <motion.div
            style={{ scaleY: reduce ? 1 : lineScale }}
            className="absolute left-0 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-flare via-flare/40 to-transparent sm:block"
          />

          <motion.div
            variants={staggerContainerCustom(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:pl-10 lg:grid-cols-4 lg:gap-x-8"
          >
            {STATS.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <div className="font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-none text-chalk">
                  <Counter to={s.to} suffix={s.suffix} duration={2.2} />
                </div>
                <div className="mt-3 h-px w-10 bg-flare" />
                <div className="mt-3 text-sm text-chalk/60">{s.label}</div>
                {/* Penanda data placeholder — hapus setelah diganti angka asli */}
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-chalk/25">
                  {s.note}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ---------- PERNYATAAN VISI ---------- */}
        <Reveal distance={36} className="mt-24 sm:mt-32">
          <div className="relative overflow-hidden rounded-sm border border-chalk/10 bg-asphalt-800 p-8 sm:p-14">
            <div className="texture-asphalt absolute inset-0 opacity-[0.12] mix-blend-overlay" />
            <div className="relative">
              <span className="eyebrow">Visi</span>
              <p className="headline mt-6 max-w-4xl text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.05] text-chalk">
                Setiap anak kampung di Indonesia punya tempat main yang layak —
                dan yang punya bakat, punya jalan untuk{' '}
                <span className="text-flare">naik kelas.</span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* ---------- GRID MISI ---------- */}
        <div className="mt-20 sm:mt-28">
          <Reveal className="eyebrow mb-10 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-flare" />
            Misi Kami
          </Reveal>

          <motion.div
            // Stagger rapat (0.08) — empat kartu, jangan sampai kartu terakhir
            // muncul setelah user sudah scroll lewat.
            variants={staggerContainerCustom(0.08, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="grid gap-px overflow-hidden rounded-sm bg-chalk/10 sm:grid-cols-2"
          >
            {MISI.map((m) => (
              <motion.div
                key={m.no}
                variants={scaleIn}
                whileHover={reduce ? undefined : 'hover'}
                className="group relative bg-asphalt-900 p-8 transition-colors duration-500 hover:bg-asphalt-800 sm:p-10"
              >
                {/* Icon: stroke oranye, ikut naik sedikit saat kartu di-hover */}
                <motion.svg
                  variants={cardHover}
                  className="h-8 w-8 text-flare"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {m.icon}
                </motion.svg>

                <div className="mt-7 flex items-baseline gap-4">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-chalk/30">
                    {m.no}
                  </span>
                  <h3 className="font-display text-2xl uppercase leading-tight text-chalk sm:text-3xl">
                    {m.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-md leading-relaxed text-chalk/60">{m.desc}</p>

                {/* Garis bawah menyapu dari kiri saat hover — penanda kartu aktif.
                    'hidden' dan 'show' sengaja sama-sama scaleX 0 supaya garis
                    punya state diam yang eksplisit; hanya 'hover' (diwariskan
                    dari parent kartu) yang membukanya. */}
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-flare"
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
