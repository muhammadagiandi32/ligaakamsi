/* =============================================================================
   ANIMATIONS.JS — Pusat konfigurasi Framer Motion
   -----------------------------------------------------------------------------
   Semua section mengambil variant dari sini supaya ritme animasi seragam
   ("cinematic pacing" ala Apple): durasi panjang, easing custom, stagger halus.

   Prinsip yang dipakai:
   1. SATU EASING untuk semua. Curve [0.16, 1, 0.3, 1] = "expo out" — mulai cepat,
      berhenti pelan. Ini yang bikin gerakan terasa mahal, bukan "bouncy".
   2. JARAK GERAK KECIL. Elemen naik 24–40px saja. Gerakan besar = murahan.
   3. VIEWPORT once:true. Animasi cuma jalan sekali; kalau diulang tiap scroll
      user akan merasa halaman "gelisah".
   4. amount: 0.25 — animasi mulai saat 25% elemen kelihatan, bukan saat
      elemen baru nongol 1px. Bikin reveal terasa disengaja.
   ============================================================================= */

/** Easing utama — expo-out. Dipakai hampir di semua transisi. */
export const EASE = [0.16, 1, 0.3, 1];

/** Easing untuk gerakan yang "berat" (panel besar, sticky section). */
export const EASE_HEAVY = [0.65, 0, 0.35, 1];

/** Preset viewport standar untuk whileInView. once = tidak berulang. */
export const VIEWPORT = { once: true, amount: 0.25 };

/** Viewport lebih longgar untuk elemen tinggi (hero image, panel full-height)
 *  yang tidak akan pernah kelihatan 25% sekaligus di layar mobile. */
export const VIEWPORT_LOOSE = { once: true, amount: 0.15 };

/* ---------------------------------------------------------------------------
   1. FADE UP — kuda beban. Teks, kartu, tombol.
   Naik 28px sambil fade. Durasi 0.8s terasa lambat tapi pas untuk landing
   sinematik; di bawah 0.5s reveal-nya kerasa "kedip".
--------------------------------------------------------------------------- */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Varian fade-up dengan jarak & delay custom.
 *  Contoh: variants={fadeUpCustom(40, 0.2)} */
export const fadeUpCustom = (distance = 28, delay = 0) => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  },
});

/* ---------------------------------------------------------------------------
   2. FADE IN — tanpa gerak. Untuk background, overlay, elemen dekoratif
   yang kalau ikut gerak malah bikin layout terasa goyang.
--------------------------------------------------------------------------- */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

/* ---------------------------------------------------------------------------
   3. STAGGER CONTAINER — parent yang mengatur ritme anak-anaknya.
   delayChildren memberi "jeda napas" sebelum anak pertama muncul, jadi
   heading sempat terbaca dulu sebelum grid ikut masuk.
--------------------------------------------------------------------------- */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

/** Stagger dengan tempo custom — grid besar pakai stagger lebih rapat (0.06)
 *  supaya total durasinya tidak kelamaan. */
export const staggerContainerCustom = (stagger = 0.1, delayChildren = 0.12) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/* ---------------------------------------------------------------------------
   4. CLIP REVEAL — teks/gambar "tersingkap" dari bawah pakai clip-path.
   Efek paling sinematik: kontennya tidak fade, tapi ter-crop lalu dibuka.
   Dipakai untuk headline besar dan foto hero.
--------------------------------------------------------------------------- */
export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: 12 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    transition: { duration: 1, ease: EASE },
  },
};

/* ---------------------------------------------------------------------------
   5. LINE MASK — untuk headline per baris. Parent punya overflow-hidden,
   anaknya (satu baris teks) digeser 100% ke bawah lalu naik.
   Ini trik klasik title sequence film.
--------------------------------------------------------------------------- */
export const lineMask = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.95, ease: EASE },
  },
};

/* ---------------------------------------------------------------------------
   6. SCALE IN — kartu/gambar masuk sambil sedikit membesar (0.94 → 1).
   Scale-nya sengaja kecil; lompatan besar bikin gambar terasa "pop-up iklan".
--------------------------------------------------------------------------- */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

/* ---------------------------------------------------------------------------
   7. SLIDE FROM SIDE — untuk layout dua kolom (teks kiri, visual kanan).
   Arah masuk mengikuti posisi elemen, jadi gerakannya terasa logis.
--------------------------------------------------------------------------- */
export const slideFrom = (direction = 'left', distance = 48) => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -distance : distance,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE },
  },
});

/* ---------------------------------------------------------------------------
   8. MICRO-INTERACTION — hover/tap untuk tombol & kartu.
   Spring (bukan durasi tetap) karena interaksi pointer harus terasa responsif
   dan bisa di-interupsi di tengah jalan.
--------------------------------------------------------------------------- */
export const pressable = {
  hover: { scale: 1.035, transition: { type: 'spring', stiffness: 400, damping: 22 } },
  tap: { scale: 0.97, transition: { type: 'spring', stiffness: 600, damping: 26 } },
};

/** Hover untuk kartu: naik sedikit, tidak membesar (biar grid tidak "napas").
 *  'hidden' dan 'show' didefinisikan eksplisit di y:0 karena variant ini dipakai
 *  pada anak dari container stagger — tanpa state diam yang jelas, Framer harus
 *  menebak posisi awal saat hover dilepas. */
export const cardHover = {
  hidden: { y: 0 },
  show: { y: 0 },
  hover: { y: -8, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

/* ---------------------------------------------------------------------------
   9. HELPER — props siap pakai untuk scroll reveal.
   Dipakai sebagai {...revealProps} biar tidak mengulang 4 baris yang sama.
--------------------------------------------------------------------------- */
export const revealProps = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: VIEWPORT,
};

export const revealPropsLoose = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: VIEWPORT_LOOSE,
};
