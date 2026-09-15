import { motion, useReducedMotion } from 'framer-motion';
import { fadeUpCustom, VIEWPORT } from '../../lib/animations';

/**
 * Reveal — pembungkus scroll-reveal generik.
 *
 * Kenapa ada: 90% elemen di halaman ini butuh perilaku yang sama persis
 * (fade + naik saat masuk viewport, sekali saja). Daripada mengulang
 * initial/whileInView/viewport/variants di puluhan tempat, dibungkus di sini.
 *
 * Kalau user mengaktifkan "reduce motion" di OS-nya, komponen ini merender
 * elemen biasa tanpa animasi sama sekali — bukan animasi yang dipercepat.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  distance = 28,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={fadeUpCustom(distance, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
