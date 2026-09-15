import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import ImagePlaceholder from './ui/ImagePlaceholder';
import Reveal from './ui/Reveal';
import Ticker from './ui/Ticker';
import { IMAGES } from '../data/images';
import { staggerContainer, fadeUp, lineMask, clipReveal, VIEWPORT, VIEWPORT_LOOSE } from '../lib/animations';

/* =============================================================================
   SECTION 2 — TENTANG KAMI
   -----------------------------------------------------------------------------
   Struktur "scene": kolom kiri STICKY (foto diam menempel di layar) sementara
   kolom kanan terus bergulir. Ini bikin foto terasa seperti latar sebuah adegan
   dan teksnya seperti narasi yang berjalan di atasnya — pacing ala Apple.

   Foto di kolom sticky juga digeser pelan (parallax halus) supaya tidak terasa
   benar-benar "beku" saat teks di sebelahnya bergerak.
   ============================================================================= */

// Paragraf cerita asal-usul. GANTI: cek detail faktualnya dengan tim.
const STORY = [
  {
    year: '2019',
    text: 'Semua berawal dari kekesalan sederhana: sewa lapangan futsal per jam harganya nggak masuk akal buat kantong anak kampung. Sementara ruang terbuka di Tambora? Hampir nol.',
  },
  {
    year: 'Sawah Lio',
    text: 'Jadi kami lihat ke bawah, ke aspal yang tiap hari kami injak. Jalan Sawah Lio yang sempit itu kami tutup tiap akhir pekan. Gawang dari besi seadanya, garis lapangan dari kapur, tribun dari teras rumah tetangga.',
  },
  {
    year: 'Akamsi',
    text: 'Namanya diambil dari panggilan kami sehari-hari: anak kampung sini. Bukan nama keren-kerenan. Ini memang liganya anak kampung, dibikin anak kampung, buat anak kampung.',
  },
  {
    year: 'Hari ini',
    text: 'Yang tadinya cuma tanding antar-RT, sekarang ditonton ratusan orang tiap malam minggu. Jalanan yang sama, semangat yang sama — cuma penontonnya makin banyak.',
  },
];

const TICKER_ITEMS = [
  'ANAK KAMPUNG SINI',
  'JALANAN JADI LAPANGAN',
  'TAMBORA, JAKARTA BARAT',
  'LIGA ASPAL',
  'GRATIS BUAT SEMUA',
];

export default function TentangKami() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax halus: foto bergerak -8% berlawanan arah scroll.
  const imageY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <section id="tentang" ref={ref} className="relative bg-asphalt-950 py-24 sm:py-32">
      {/* Pita teks berjalan sebagai pembatas antara hero dan cerita.
          Fungsinya ritmis: memberi "napas" sebelum section berikutnya. */}
      <div className="border-y border-chalk/10 py-5">
        <Ticker
          items={TICKER_ITEMS.map((t) => (
            <>
              <span className="font-display text-xl uppercase text-chalk/85 sm:text-2xl">{t}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-flare" />
            </>
          ))}
          speed={34}
        />
      </div>

      <div className="mx-auto mt-20 w-full max-w-7xl px-5 sm:mt-28 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          {/* ---------- KOLOM KIRI: STICKY ---------- */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.div variants={fadeUp} className="eyebrow mb-5 flex items-center gap-3">
                <span className="inline-block h-px w-8 bg-flare" />
                Tentang Kami
              </motion.div>

              <h2 className="headline text-[clamp(2.4rem,6vw,4.5rem)]">
                {['Bukan', 'Kurang', 'Bakat.'].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.05em]">
                    <motion.span
                      variants={lineMask}
                      className={`block ${i === 2 ? 'text-flare' : ''}`}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h2>

              <motion.p variants={fadeUp} className="mt-6 max-w-md text-lg leading-relaxed text-chalk/60">
                Kami cuma kurang lapangan. Jadi kami bikin sendiri — dari aspal,
                kapur, dan nekat.
              </motion.p>
            </motion.div>

            {/* Foto sticky dengan parallax mikro */}
            <motion.div
              style={{ y: reduce ? undefined : imageY }}
              variants={clipReveal}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT_LOOSE}
              className="group mt-10 hidden lg:block"
            >
              {/*
                GANTI FOTO: potret vertikal seorang anak Liga Akamsi sedang
                menggiring bola di gang sempit, sore hari, dengan latar rumah
                padat dan kabel listrik. Rasio 4:5.
              */}
              <ImagePlaceholder
                src={IMAGES.tentang}
                alt="Anak-anak bermain bola di gang Tambora"
                ratio="aspect-[4/5]"
                label="FOTO — anak menggiring bola di gang sempit, latar rumah padat Tambora"
                className="rounded-sm"
              />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk/35">
                {/* GANTI: caption/kredit foto */}
                Jl. Sawah Lio, Tambora — dok. Liga Akamsi
              </p>
            </motion.div>
          </div>

          {/* ---------- KOLOM KANAN: NARASI BERGULIR ---------- */}
          <div className="flex flex-col">
            {STORY.map((item, i) => (
              <Reveal
                key={item.year}
                // delay kecil per blok; blok-blok ini muncul terpisah saat
                // discroll, jadi stagger-nya tidak perlu besar
                delay={0.05}
                className="border-t border-chalk/10 py-8 first:border-t-0 first:pt-0 sm:py-10"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                  <div className="shrink-0 sm:w-32">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-flare">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-lg leading-relaxed text-chalk/75 sm:text-xl">{item.text}</p>
                </div>
              </Reveal>
            ))}

            {/* Pull quote — dibedakan total dari paragraf di atasnya supaya
                terasa seperti "jeda dramatis" di tengah narasi. */}
            <Reveal distance={36} className="mt-6 border-l-2 border-flare pl-6 sm:mt-10 sm:pl-10">
              <blockquote className="headline text-[clamp(1.9rem,4.2vw,3.2rem)] text-chalk">
                &ldquo;Kalau nggak ada lapangan, ya kita bikin lapangan.&rdquo;
              </blockquote>
              {/* GANTI: nama & jabatan narasumber asli */}
              <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-chalk/45">
                [PLACEHOLDER] Nama Penggagas — Pendiri Liga Akamsi
              </figcaption>
            </Reveal>

            {/* Foto versi mobile (kolom sticky disembunyikan di layar kecil) */}
            <Reveal className="group mt-12 lg:hidden">
              <ImagePlaceholder
                src={IMAGES.tentang}
                alt="Anak-anak bermain bola di gang Tambora"
                ratio="aspect-[4/5]"
                label="FOTO — anak menggiring bola di gang sempit, latar rumah padat Tambora"
                className="rounded-sm"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
