import { motion } from 'framer-motion';
import { pressable } from '../../lib/animations';

/**
 * Button — CTA dengan micro-interaction.
 *
 * Animasi: dua lapis.
 * 1. Seluruh tombol scale 1.035 saat hover, 0.97 saat ditekan (spring, bukan
 *    tween — interaksi pointer harus bisa diinterupsi di tengah jalan).
 * 2. Lapisan background menyapu dari bawah ke atas saat hover (scaleY 0 → 1
 *    dengan transform-origin bottom). Ini yang bikin tombol terasa "hidup"
 *    tanpa perlu ganti warna mendadak.
 *
 * variant: 'primary' (oranye solid) | 'ghost' (outline) | 'light' (putih)
 */
export default function Button({
  children,
  href = '#',
  variant = 'primary',
  className = '',
  ...rest
}) {
  const base =
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-300';

  const styles = {
    primary: 'bg-flare text-asphalt-950',
    ghost: 'border border-chalk/25 text-chalk hover:text-asphalt-950',
    light: 'bg-chalk text-asphalt-950',
  };

  // Warna lapisan sapuan hover, disesuaikan per variant
  const sweep = {
    primary: 'bg-chalk',
    ghost: 'bg-flare',
    light: 'bg-flare',
  };

  return (
    <motion.a
      href={href}
      className={`${base} ${styles[variant]} ${className}`}
      variants={pressable}
      whileHover="hover"
      whileTap="tap"
      {...rest}
    >
      {/* Sapuan background. Pointer-events none supaya tidak mencuri klik. */}
      <span
        className={`pointer-events-none absolute inset-0 origin-bottom scale-y-0 ${sweep[variant]} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100`}
      />
      <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-asphalt-950">
        {children}
      </span>
    </motion.a>
  );
}
