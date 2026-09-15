import { useEffect, useState } from 'react';

/**
 * useMediaQuery — dipakai untuk memilih varian animasi berdasarkan lebar layar.
 *
 * Kenapa perlu: efek scroll horizontal yang "dipin" hanya masuk akal di layar
 * lebar. Di HP, pin + scroll-jacking bikin halaman terasa macet. Jadi komponen
 * yang memakainya merender layout vertikal biasa di mobile.
 *
 * Nilai awal false supaya render pertama (termasuk SSR) selalu pakai versi
 * mobile — lebih aman daripada sebaliknya.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);

    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
