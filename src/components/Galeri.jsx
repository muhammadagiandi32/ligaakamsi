import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import ImagePlaceholder from './ui/ImagePlaceholder';
import { staggerContainerCustom, scaleIn, VIEWPORT_LOOSE, EASE } from '../lib/animations';
import { IMAGES } from '../data/images';

/* =============================================================================
   SECTION 5 — GALERI / DOKUMENTASI
   -----------------------------------------------------------------------------
   Grid "bento": ukuran kartu sengaja tidak seragam supaya mata bergerak,
   tidak membaca grid seperti tabel.

   Tiga lapis animasi:
   1. MASUK: stagger 0.07 (rapat) + scaleIn. Kartu banyak, jadi stagger harus
      cepat; kalau 0.15 kartu terakhir baru muncul 1 detik setelah yang pertama.
   2. PARALLAX: kolom ganjil dan genap bergerak berlawanan beberapa persen saat
      scroll, jadi grid terasa "bernapas" — bukan blok mati.
   3. HOVER: foto zoom 1.06 (900ms, pelan seperti kamera mendekat) + overlay
      gelap + caption naik dari bawah.

   CARA GANTI FOTO: isi field `src` di array GALLERY.
   ============================================================================= */

const GALLERY = [
  {
    src: IMAGES.galeri[0],
    label: 'FOTO — tendangan bebas di bawah lampu sorot, penonton rapat di pinggir jalan',
    caption: 'Final Musim 4',
    meta: 'Jl. Sawah Lio',
    span: 'sm:col-span-2 sm:row-span-2',
    ratio: 'aspect-[4/3] sm:aspect-auto sm:h-full',
  },
  {
    src: IMAGES.galeri[1],
    label: 'FOTO — potret close-up pemain muda berkeringat, ekspresi serius',
    caption: 'Wajah Akamsi',
    meta: 'U-15',
    span: '',
    ratio: 'aspect-[4/5]',
  },
  {
    src: IMAGES.galeri[2],
    label: 'FOTO — sepatu bola lusuh dan bola di atas aspal bergaris kapur',
    caption: 'Modal Seadanya',
    meta: 'Detail',
    span: '',
    ratio: 'aspect-[4/5]',
  },
  {
    src: IMAGES.galeri[3],
    label: 'FOTO — penonton menonton dari atas motor dan teras rumah',
    caption: 'Tribun Kampung',
    meta: 'Sabtu malam',
    span: 'sm:col-span-2',
    ratio: 'aspect-[16/10]',
  },
  {
    src: IMAGES.galeri[4],
    label: 'FOTO — selebrasi juara, tim mengangkat piala sederhana',
    caption: 'Juara Kampung',
    meta: 'Musim 4',
    span: '',
    ratio: 'aspect-[4/5]',
  },
  {
    src: IMAGES.galeri[5],
    label: 'FOTO — panitia warga menyiapkan gawang sebelum pertandingan',
    caption: 'Di Balik Layar',
    meta: 'Panitia RT',
    span: '',
    ratio: 'aspect-[4/5]',
  },
];

function GalleryCard({ item, parallaxY }) {
  return (
    <motion.figure
      variants={scaleIn}
      style={{ y: parallaxY }}
      className={`group relative overflow-hidden rounded-sm bg-asphalt-800 ${item.span}`}
    >
      <ImagePlaceholder
        src={item.src}
        alt={item.caption}
        ratio={item.ratio}
        label={item.label}
        className="h-full w-full"
      />

      {/* Overlay gradien: opacity 0 -> 1 saat hover. Dibuat dari bawah supaya
          caption tetap terbaca tanpa menutupi wajah di tengah foto. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-asphalt-950 via-asphalt-950/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-95" />

      {/* Caption naik 12px saat hover — gerakan kecil, cuma penegas. */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <div className="font-display text-xl uppercase leading-none text-chalk">
          {item.caption}
        </div>
        <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-flare">
          {item.meta}
        </div>
      </figcaption>

      {/* Bingkai oranye tipis muncul saat hover — menandai kartu aktif tanpa
          menggeser layout (inset ring, bukan border). */}
      <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-flare/0 transition-all duration-500 group-hover:ring-flare/60" />
    </motion.figure>
  );
}

export default function Galeri() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Dua arah parallax berlawanan. Nilainya kecil (maks 26px) — cukup untuk
  // terasa hidup, tidak cukup untuk merusak ritme grid.
  const upY = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const downY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  return (
    <section
      id="galeri"
      ref={ref}
      className="relative border-t border-chalk/10 bg-asphalt-900 py-24 sm:py-32"
    >
      <div className="texture-asphalt pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Galeri & Dokumentasi"
            title={['Aspal, Keringat,', 'Sorak Penonton.']}
            titleClass="text-[clamp(2.4rem,6.5vw,5rem)]"
          />
          <motion.a
            href="#"
            /* GANTI: arahkan ke Instagram/TikTok Liga Akamsi yang asli */
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_LOOSE}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="group inline-flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-chalk/60 transition-colors hover:text-flare"
          >
            Lihat semua dokumentasi
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-chalk/20 transition-all duration-300 group-hover:border-flare group-hover:bg-flare group-hover:text-asphalt-950">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </motion.a>
        </div>

        {/* Grid bento. auto-rows dipakai supaya kartu besar bisa span 2 baris
            tanpa merusak tinggi baris lain. */}
        <motion.div
          variants={staggerContainerCustom(0.07, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_LOOSE}
          className="mt-14 grid grid-cols-1 gap-4 sm:mt-20 sm:auto-rows-[minmax(0,240px)] sm:grid-cols-4"
        >
          {GALLERY.map((item, i) => (
            <GalleryCard
              key={item.label}
              item={item}
              // Kartu index genap naik, ganjil turun — pola zig-zag halus.
              parallaxY={reduce ? undefined : i % 2 === 0 ? upY : downY}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
