import { motion, useReducedMotion } from 'framer-motion';

/* =============================================================================
   Ticker — pita teks berjalan tanpa henti.
   -----------------------------------------------------------------------------
   Animasi: satu track berisi konten yang DIDUPLIKASI persis, lalu digeser
   dari 0% ke -50%. Karena separuh track adalah salinan identik, saat mencapai
   -50% posisinya terlihat sama dengan 0% — jadi loop-nya mulus tanpa jeda.

   repeatType tidak dipakai; cukup repeat: Infinity dengan ease 'linear' —
   easing apa pun selain linear akan terlihat seperti pita yang "tersendat".
   ============================================================================= */

export default function Ticker({
  items = [],
  speed = 30, // detik untuk satu putaran penuh. Makin besar = makin pelan.
  direction = 'left',
  className = '',
  itemClassName = '',
}) {
  const reduce = useReducedMotion();
  const track = [...items, ...items];

  return (
    <div className={`relative flex w-full overflow-hidden ${className}`}>
      {/* Fade di kiri-kanan supaya teks tidak terpotong kasar di tepi layar */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-asphalt-950 to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-asphalt-950 to-transparent sm:w-28" />

      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
        animate={
          reduce ? undefined : { x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }
        }
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {track.map((item, i) => (
          <span key={i} className={`flex shrink-0 items-center gap-8 sm:gap-12 ${itemClassName}`}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
