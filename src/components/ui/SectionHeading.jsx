import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, lineMask, VIEWPORT } from '../../lib/animations';

/**
 * SectionHeading — eyebrow + judul besar + deskripsi pendek.
 *
 * Animasi: parent stagger, lalu tiap baris judul "tersingkap" dari bawah
 * (lineMask) di dalam wrapper overflow-hidden. Eyebrow dan deskripsi
 * pakai fadeUp biasa supaya perhatian tetap jatuh ke judul.
 *
 * `title` boleh string atau array of string (tiap item = satu baris,
 * masing-masing dapat delay sendiri lewat stagger).
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  titleClass = 'text-[clamp(2.5rem,7vw,5.5rem)]',
  className = '',
}) {
  const lines = Array.isArray(title) ? title : [title];
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      className={`flex flex-col ${alignClass} ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {eyebrow && (
        <motion.div variants={fadeUp} className="eyebrow mb-5 flex items-center gap-3">
          {/* Garis kecil di kiri eyebrow — aksen "marka jalan" */}
          <span className="inline-block h-px w-8 bg-flare" />
          {eyebrow}
        </motion.div>
      )}

      <h2 className={`headline ${titleClass} max-w-5xl`}>
        {lines.map((line, i) => (
          // overflow-hidden wajib: ini "jendela" yang bikin efek masking bekerja
          <span key={i} className="block overflow-hidden pb-[0.06em]">
            <motion.span variants={lineMask} className="block">
              {line}
            </motion.span>
          </span>
        ))}
      </h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={`mt-7 max-w-xl text-base leading-relaxed text-chalk/60 sm:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
