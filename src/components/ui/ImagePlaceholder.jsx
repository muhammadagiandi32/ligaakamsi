import { motion } from 'framer-motion';

/* =============================================================================
   ImagePlaceholder
   -----------------------------------------------------------------------------
   CARA GANTI DENGAN FOTO ASLI:
   Cukup isi prop `src` (dan `alt`). Kalau `src` ada, komponen merender <img>;
   kalau kosong, merender kotak placeholder berisi deskripsi foto yang
   seharusnya ada di situ.

   <ImagePlaceholder
     src="/img/hero.jpg"
     alt="Pertandingan malam di Jalan Sawah Lio"
     ratio="aspect-[4/5]"
     label="..."
   />
   ============================================================================= */

export default function ImagePlaceholder({
  src,
  alt = '',
  label = 'Foto',
  ratio = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  zoomOnHover = true,
}) {
  return (
    <div className={`relative overflow-hidden bg-asphalt-800 ${ratio} ${className}`}>
      {src ? (
        // Foto asli. Animasi: scale 1 → 1.06 saat hover pada parent `group`,
        // durasi panjang (700ms) supaya terasa seperti kamera mendekat pelan,
        // bukan zoom mendadak.
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            zoomOnHover ? 'group-hover:scale-[1.06]' : ''
          } ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          {/* Garis diagonal — penanda visual "ini belum diisi" */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #F4F1EC 0, #F4F1EC 1px, transparent 1px, transparent 12px)',
            }}
          />
          <svg
            className="relative h-7 w-7 text-flare/70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10" r="1.5" />
            <path d="m3 16 5-4 4 3 3-2 6 5" />
          </svg>
          <p className="relative font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-chalk/45">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}
