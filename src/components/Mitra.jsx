import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import ImagePlaceholder from './ui/ImagePlaceholder';
import { staggerContainerCustom, fadeUp, VIEWPORT } from '../lib/animations';

/* =============================================================================
   SECTION 7 — MITRA & DUKUNGAN
   -----------------------------------------------------------------------------
   Section ini harus terasa "berbeda kelas" dari sekitarnya karena target
   pembacanya beda (brand/sponsor, bukan warga). Caranya: background lebih
   terang (oranye penuh) dan foto besar yang di-reveal dengan clip-path.

   Animasi utama:
   - Foto besar: clip-path terbuka dari bawah + scale turun pelan mengikuti
     scroll (1.15 -> 1). Efeknya seperti shot kamera yang "settle" — gerakan
     berhenti tepat saat teks di sebelahnya selesai terbaca.
   - Daftar benefit: stagger fadeUp, dipisah garis tipis.
   ============================================================================= */

// GANTI: sesuaikan bentuk kerja sama yang benar-benar ditawarkan.
const BENEFIT = [
  {
    title: 'Logo di Lapangan & Jersey',
    desc: 'Banner di pinggir jalan, logo di jersey tim, dan penyebutan komentator di tiap pertandingan.',
  },
  {
    title: 'Konten Dokumentasi',
    desc: 'Foto dan video tiap pekan yang bisa dipakai brand — konten jalanan yang autentik, bukan hasil studio.',
  },
  {
    title: 'Dampak yang Bisa Dihitung',
    desc: 'Laporan sederhana tiap musim: berapa anak ikut, berapa kampung terlibat, ke mana dana dipakai.',
  },
  {
    title: 'Aktivasi di Lokasi',
    desc: 'Booth, coaching clinic, atau pembagian perlengkapan langsung di tengah keramaian pertandingan.',
  },
];

// GANTI: isi dengan mitra asli. Kalau belum ada, section ini boleh disembunyikan.
const MITRA_SAAT_INI = [
  '[LOGO MITRA 1]',
  '[LOGO MITRA 2]',
  '[LOGO MITRA 3]',
  '[LOGO MITRA 4]',
];

export default function Mitra() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });
  // Scale "settle": gambar berhenti membesar tepat saat section berada
  // di tengah viewport.
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  return (
    <section id="mitra" ref={ref} className="relative overflow-hidden bg-flare text-asphalt-950">
      {/* Tekstur aspal di atas oranye — supaya warnanya tidak terlihat "flat
          digital", tetap terasa kotor/jalanan. */}
      <div className="texture-asphalt pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---------- KOLOM KIRI: PESAN ---------- */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7 }}
              className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-asphalt-950/70"
            >
              <span className="inline-block h-px w-8 bg-asphalt-950/50" />
              Mitra & Dukungan
            </motion.div>

            <SectionHeading
              title={['Liga Ini', 'Jalan Karena', 'Patungan.']}
              titleClass="text-[clamp(2.6rem,7vw,5.5rem)] text-asphalt-950"
              className="[&_p]:text-asphalt-950/70"
            />

            <Reveal className="mt-8 max-w-lg space-y-5 text-base leading-relaxed text-asphalt-950/75 sm:text-lg">
              <p>
                Sampai hari ini, Liga Akamsi hidup dari uang warga, sumbangan tetangga,
                dan tenaga orang-orang yang nggak dibayar. Itu bisa jalan — tapi ada
                batasnya.
              </p>
              <p className="font-semibold text-asphalt-950">
                Kalau brand kamu mau namanya ada di tempat yang benar-benar dilihat
                orang — bukan di billboard sepi, tapi di tengah jalan yang tiap akhir
                pekan penuh — kita ngobrol.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <Button href="#kontak" variant="light" className="!text-asphalt-950">
                Ajukan Kerja Sama
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>
            </Reveal>

            {/* Daftar benefit */}
            <motion.div
              variants={staggerContainerCustom(0.09, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-14 border-t border-asphalt-950/20"
            >
              {BENEFIT.map((b, i) => (
                <motion.div
                  key={b.title}
                  variants={fadeUp}
                  className="group flex gap-5 border-b border-asphalt-950/20 py-6"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-asphalt-950/50">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl uppercase leading-none text-asphalt-950 sm:text-2xl">
                      {b.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-asphalt-950/70">
                      {b.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ---------- KOLOM KANAN: VISUAL ---------- */}
          <div className="lg:pt-24">
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-sm"
            >
              <motion.div style={{ scale: reduce ? 1 : imgScale }}>
                {/*
                  GANTI FOTO: suasana lebar pertandingan dari sudut tinggi
                  (dari lantai 2 rumah warga) — terlihat jalan, gawang, penonton
                  mengelilingi, dan padatnya permukiman. Rasio 4:5.
                */}
                <ImagePlaceholder
                  src=""
                  alt="Suasana pertandingan Liga Akamsi dari atas"
                  ratio="aspect-[4/5]"
                  label="FOTO — suasana pertandingan dari sudut tinggi, jalan dikelilingi penonton"
                  zoomOnHover={false}
                  className="bg-asphalt-900"
                />
              </motion.div>
            </motion.div>

            {/* Mitra saat ini */}
            <Reveal delay={0.2} className="mt-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-asphalt-950/60">
                Sudah mendukung
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {MITRA_SAAT_INI.map((m) => (
                  <div
                    key={m}
                    className="flex h-16 items-center justify-center rounded-sm border border-dashed border-asphalt-950/30 px-2 text-center font-mono text-[9px] uppercase tracking-[0.1em] text-asphalt-950/50"
                  >
                    {m}
                  </div>
                ))}
              </div>
              {/* GANTI: ganti kotak di atas dengan <img> logo mitra asli,
                  atau hapus blok ini kalau belum ada mitra resmi. */}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
