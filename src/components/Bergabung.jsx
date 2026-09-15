import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import { staggerContainerCustom, fadeUp, pressable, VIEWPORT, EASE } from '../lib/animations';

/* =============================================================================
   SECTION 8 — BERGABUNG / DUKUNG KAMI
   -----------------------------------------------------------------------------
   Dua jalur aksi yang dipisah tegas: JADI PEMAIN (anak & orang tua) dan
   JADI PENDUKUNG (donatur, relawan, warga kampung lain).

   Animasi:
   - Teks raksasa di latar bergerak horizontal mengikuti scroll (parallax teks).
     Ini pemisah visual yang bikin section terakhir terasa seperti klimaks.
   - Dua kartu masuk dari arah berlawanan (kiri & kanan) — menegaskan bahwa
     ini dua pilihan yang setara, bukan satu daftar bertingkat.
   - Kartu di-hover: border menyala + panah bergeser.
   ============================================================================= */

const JALUR = [
  {
    tag: 'Buat Anak & Orang Tua',
    title: 'Daftar Main',
    points: [
      'Gratis, nggak ada biaya pendaftaran',
      'Kategori U-12, U-15, dan umum',
      'Cukup bawa sepatu — perlengkapan lain kami bantu',
      'Boleh daftar per tim atau sendirian, nanti dicarikan tim',
    ],
    cta: 'Daftar Sekarang',
    // GANTI: tautkan ke WhatsApp/Google Form pendaftaran asli
    href: '#kontak',
    variant: 'primary',
    from: -40,
  },
  {
    tag: 'Buat Pendukung',
    title: 'Ikut Patungan',
    points: [
      'Donasi bola, jersey, gawang, atau P3K',
      'Bantu biaya lampu, sound, dan wasit tiap pekan',
      'Jadi relawan dokumentasi, wasit, atau panitia',
      'Bawa format Liga Akamsi ke kampung kamu sendiri',
    ],
    cta: 'Dukung Liga',
    // GANTI: tautkan ke halaman donasi / rekening resmi
    href: '#kontak',
    variant: 'ghost',
    from: 40,
  },
];

export default function Bergabung() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Teks latar raksasa bergeser -18% sepanjang section — pelan, hanya terasa
  // kalau diperhatikan. Inilah yang dimaksud "parallax halus".
  const bgTextX = useTransform(scrollYProgress, [0, 1], ['8%', '-18%']);

  return (
    <section
      id="bergabung"
      ref={ref}
      className="relative overflow-hidden border-t border-chalk/10 bg-asphalt-950 py-24 sm:py-32"
    >
      {/* Teks latar raksasa — dekoratif, aria-hidden supaya tidak dibaca
          screen reader dua kali. */}
      <motion.div
        aria-hidden="true"
        style={{ x: reduce ? undefined : bgTextX }}
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 select-none whitespace-nowrap"
      >
        <span className="headline text-stroke text-[22vw] opacity-[0.07]">
          AKAMSI AKAMSI AKAMSI
        </span>
      </motion.div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Bergabung"
          title={['Turun ke Jalan', 'Bareng Kami.']}
          description="Mau jadi pemainnya, mau jadi yang bantu di pinggir lapangan — dua-duanya kami butuh."
          align="center"
          titleClass="text-[clamp(2.6rem,7vw,5.5rem)] text-center"
          className="mx-auto text-center"
        />

        {/* ---------- DUA JALUR ---------- */}
        <div className="mt-16 grid gap-6 sm:mt-24 lg:grid-cols-2">
          {JALUR.map((j) => (
            <motion.div
              key={j.title}
              // Masuk dari arah berlawanan: kartu kiri dari kiri, kanan dari kanan
              initial={{ opacity: 0, x: reduce ? 0 : j.from, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE }}
              whileHover={reduce ? undefined : 'hover'}
              className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-chalk/10 bg-asphalt-900 p-8 transition-colors duration-500 hover:border-flare/40 sm:p-11"
            >
              {/* Glow oranye yang membesar dari sudut saat hover */}
              <motion.div
                variants={{ hover: { opacity: 1, scale: 1 } }}
                initial={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-flare/20 blur-[90px]"
              />

              <div className="relative">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-flare">
                  {j.tag}
                </span>
                <h3 className="headline mt-5 text-[clamp(2.2rem,5vw,3.5rem)] text-chalk">
                  {j.title}
                </h3>

                <motion.ul
                  variants={staggerContainerCustom(0.07, 0.15)}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                  className="mt-8 space-y-4"
                >
                  {j.points.map((p) => (
                    <motion.li key={p} variants={fadeUp} className="flex gap-3 text-chalk/65">
                      <svg
                        className="mt-1 h-4 w-4 shrink-0 text-flare"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="m5 13 4 4L19 7" />
                      </svg>
                      <span className="text-sm leading-relaxed sm:text-base">{p}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="relative mt-10">
                <Button href={j.href} variant={j.variant}>
                  {j.cta}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ---------- FORM PENDAFTARAN CEPAT ---------- */}
        <Reveal distance={32} className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-sm border border-chalk/10 bg-asphalt-900 p-8 sm:p-12">
            <div className="texture-grid absolute inset-0 opacity-30" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <h3 className="font-display text-3xl uppercase leading-none text-chalk sm:text-4xl">
                  Tinggalkan Kontak
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-chalk/60">
                  Isi sebentar, nanti panitia yang hubungi kamu duluan. Nggak perlu
                  formal-formal.
                </p>
              </div>

              {/*
                CATATAN TEKNIS — FORM INI BELUM TERHUBUNG KE MANA PUN.
                Pilihan tercepat: arahkan action ke Google Form / Formspree /
                Netlify Forms, atau ganti onSubmit dengan fetch ke API sendiri.
              */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // GANTI: kirim data ke backend / layanan form pilihan
                }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="text"
                  required
                  placeholder="Nama kamu"
                  className="w-full rounded-full border border-chalk/15 bg-asphalt-800 px-6 py-4 text-sm text-chalk outline-none transition-colors placeholder:text-chalk/30 focus:border-flare"
                />
                <input
                  type="tel"
                  required
                  placeholder="Nomor WhatsApp"
                  className="w-full rounded-full border border-chalk/15 bg-asphalt-800 px-6 py-4 text-sm text-chalk outline-none transition-colors placeholder:text-chalk/30 focus:border-flare"
                />
                <motion.button
                  type="submit"
                  variants={pressable}
                  whileHover="hover"
                  whileTap="tap"
                  className="shrink-0 rounded-full bg-flare px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-asphalt-950"
                >
                  Kirim
                </motion.button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
