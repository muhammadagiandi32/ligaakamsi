import { useEffect, useRef } from 'react';
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { EASE } from '../../lib/animations';

/**
 * Counter — angka yang menghitung naik saat masuk viewport.
 *
 * Animasi: pakai MotionValue, bukan useState. Alasannya angka berubah puluhan
 * kali per detik; kalau lewat state, React re-render seluruh subtree tiap frame.
 * MotionValue meng-update textContent langsung di luar render cycle React.
 *
 * amount: 0.5 — counter baru mulai saat setengah elemen kelihatan, supaya user
 * tidak melewatkan awal hitungannya saat scroll cepat.
 */
export default function Counter({
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => {
    const n = latest.toLocaleString('id-ID', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${prefix}${n}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return undefined;

    // Reduce motion: langsung tampilkan angka akhir, tanpa hitungan.
    if (reduce) {
      count.set(to);
      return undefined;
    }

    const controls = animate(count, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, to, duration, reduce, count]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
