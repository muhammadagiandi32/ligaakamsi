import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import ImagePlaceholder from './ui/ImagePlaceholder';
import Reveal from './ui/Reveal';
import useMediaQuery from '../lib/useMediaQuery';
import { IMAGES } from '../data/images';
import { staggerContainer, fadeUp, VIEWPORT } from '../lib/animations';

/* =============================================================================
   SECTION 4 — PROGRAM / KEGIATAN
   -----------------------------------------------------------------------------
   Ini "scene" paling sinematik di halaman: section di-PIN (sticky) sementara
   empat panel bergeser HORIZONTAL mengikuti scroll vertikal user.

   Cara kerjanya:
   - Wrapper diberi tinggi = jumlah panel x 100vh. Tinggi inilah yang jadi
     "jatah scroll" untuk animasi horizontal.
   - Anaknya sticky top-0 h-screen, jadi terlihat diam menempel di layar.
   - useScroll(target: wrapper) -> progress 0..1 dipetakan ke translateX track.
   - Jarak geser dihitung dari lebar track sebenarnya (diukur via ref), bukan
     persentase tebakan, supaya panel terakhir berhenti pas di tepi kanan.

   Di MOBILE dan saat "reduce motion" aktif, semua ini dimatikan dan panel
   dirender sebagai daftar vertikal biasa — pin + scroll-jacking di layar kecil
   bikin halaman terasa macet.
   ============================================================================= */

// GANTI: sesuaikan hari, jam, dan format pertandingan dengan jadwal asli.
const STEPS = [
  {
    no: '01',
    time: 'Jumat malam',
    title: 'Aspal Disulap',
    desc: 'Warga gotong royong: jalan ditutup pakai kerucut dan bambu, gawang besi dikeluarkan dari gudang RT, garis lapangan digambar pakai kapur. Satu jam, jalan berubah jadi stadion.',
    photo: 'FOTO — warga menutup jalan & menggambar garis lapangan dengan kapur',
    img: IMAGES.program[0],
  },
  {
    no: '02',
    time: 'Sabtu, 19.00',
    title: 'Peluit Pertama',
    desc: 'Babak penyisihan dimulai. Format 5 lawan 5, dua babak masing-masing 12 menit. Lampu sorot pinjaman, sound system dari toko sebelah, komentator dari anak RT sendiri.',
    photo: 'FOTO — kick-off malam hari di bawah lampu sorot, penonton mengelilingi lapangan',
    img: IMAGES.program[1],
  },
  {
    no: '03',
    time: 'Minggu, 16.00',
    title: 'Panggungnya Akamsi',
    desc: 'Semifinal dan final. Ini bagian di mana anak yang biasanya cuma main di gang tiba-tiba ditonton ratusan orang — dan direkam, lalu ditonton ribuan lagi di media sosial.',
    photo: 'FOTO — pemain merayakan gol, penonton berdiri dan bersorak',
    img: IMAGES.program[2],
  },
  {
    no: '04',
    time: 'Minggu malam',
    title: 'Jalan Dikembalikan',
    desc: 'Selesai tanding, semua dibereskan. Sampah dipungut, gawang disimpan, kerucut diangkat. Besok pagi jalan ini kembali jadi jalan — sampai akhir pekan berikutnya.',
    photo: 'FOTO — anak-anak membereskan lapangan malam hari, jalan kembali kosong',
    img: IMAGES.program[3],
  },
];

/* ---------- Panel tunggal (dipakai versi desktop maupun mobile) ----------
   Lebarnya dioper dari luar: versi horizontal butuh lebar tetap dalam vw agar
   track-nya bisa digeser, versi vertikal di mobile harus ikut lebar container
   (w-full) supaya tidak menyisakan celah kanan. */
function StepPanel({ step, widthClass = 'w-[86vw] shrink-0 sm:w-[62vw] lg:w-[46vw]' }) {
  return (
    <div
      className={`flex h-full flex-col gap-6 border border-chalk/10 bg-asphalt-900 p-6 sm:p-10 ${widthClass}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-[clamp(3rem,7vw,5rem)] leading-none text-flare">
          {step.no}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-chalk/45">
          {step.time}
        </span>
      </div>

      {/* Foto panel. GANTI: isi prop src masing-masing. */}
      <div className="group relative flex-1 overflow-hidden">
        <ImagePlaceholder src={step.img} alt={step.title} ratio="h-full min-h-[180px] w-full" label={step.photo} />
      </div>

      <div>
        <h3 className="font-display text-3xl uppercase leading-none text-chalk sm:text-4xl">
          {step.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-chalk/60 sm:text-base">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export default function Program() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduce = useReducedMotion();
  const useHorizontal = isDesktop && !reduce;

  // Ukur berapa jauh track harus digeser: lebar total track dikurangi lebar
  // viewport, plus padding kanan supaya panel terakhir tidak mepet tepi.
  useEffect(() => {
    if (!useHorizontal) {
      setDistance(0);
      return undefined;
    }
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [useHorizontal]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // [0.05, 0.95] bukan [0, 1]: sisakan sedikit "bantalan" di awal dan akhir
  // supaya panel pertama sempat terbaca sebelum bergeser, dan panel terakhir
  // sempat dibaca sebelum pin dilepas.
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  // Progress bar tipis di bawah sticky panel — memberi tahu user bahwa
  // section ini punya ujung, jadi pin-nya tidak terasa seperti halaman macet.
  const progressScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section id="program" className="relative border-t border-chalk/10 bg-asphalt-950">
      {/* ---------- HEADING ---------- */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
        <SectionHeading
          eyebrow="Program & Kegiatan"
          title={['Satu Akhir Pekan,', 'Satu Musim Kecil.']}
          description="Begini cara Liga Akamsi jalan tiap minggu. Semua dikerjakan warga sendiri, tanpa panitia bayaran, tanpa sponsor besar."
          titleClass="text-[clamp(2.4rem,6.5vw,5rem)]"
        />
      </div>

      {/* wrapperRef selalu terpasang (di kedua mode) supaya useScroll tidak
          kehilangan target-nya saat layout berganti ke versi mobile — kalau ref
          sempat kosong, Framer melempar peringatan "target ref not attached". */}
      <div
        ref={wrapperRef}
        style={useHorizontal ? { height: `${STEPS.length * 100}vh` } : undefined}
        className="relative"
      >
        {useHorizontal ? (
          /* ---------- VERSI DESKTOP: PINNED HORIZONTAL SCROLL ---------- */
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div ref={trackRef} style={{ x }} className="flex gap-6 pl-8 pr-16">
              {STEPS.map((step) => (
                <div key={step.no} className="h-[64vh]">
                  <StepPanel step={step} />
                </div>
              ))}
            </motion.div>

            {/* Indikator progres horizontal */}
            <div className="absolute inset-x-8 bottom-12 h-px bg-chalk/10">
              <motion.div
                style={{ scaleX: progressScale }}
                className="h-full w-full origin-left bg-flare"
              />
            </div>
            <div className="absolute bottom-16 left-8 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk/35">
              Gulir untuk lanjut
            </div>
          </div>
        ) : (
          /* ---------- VERSI MOBILE / REDUCE MOTION: STACK VERTIKAL ---------- */
          <div className="mx-auto w-full max-w-7xl px-5 pb-8 sm:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="flex flex-col gap-6"
            >
              {STEPS.map((step) => (
                // min-h, bukan h tetap: di layar sempit deskripsi bisa lebih
                // panjang dan tinggi tetap akan memotong teksnya.
                <motion.div key={step.no} variants={fadeUp} className="min-h-[30rem]">
                  <StepPanel step={step} widthClass="w-full" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* ---------- CATATAN TAMBAHAN ---------- */}
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-px overflow-hidden rounded-sm bg-chalk/10 sm:grid-cols-3">
          {[
            {
              k: 'Biaya ikut',
              v: 'Rp0',
              d: 'Gratis buat tim kampung. Operasional ditanggung patungan warga dan donatur.',
            },
            {
              k: 'Kategori',
              v: 'U-12 / U-15 / Open',
              d: 'Dibagi per usia supaya yang kecil nggak dilindas yang besar.',
            },
            {
              k: 'Jadwal',
              v: 'Tiap akhir pekan',
              d: 'Sabtu malam penyisihan, Minggu sore babak gugur. Libur kalau hujan deras.',
            },
          ].map((item, i) => (
            <Reveal
              key={item.k}
              // delay berjenjang manual: tiga kartu, masing-masing 0.1s
              delay={i * 0.1}
              className="bg-asphalt-950 p-7 sm:p-9"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-chalk/40">
                {item.k}
              </div>
              <div className="mt-3 font-display text-2xl uppercase text-flare sm:text-3xl">
                {item.v}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-chalk/55">{item.d}</p>
              {/* GANTI: pastikan detail biaya, kategori usia, dan jadwal ini benar */}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
