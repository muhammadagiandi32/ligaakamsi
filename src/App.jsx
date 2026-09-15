import { motion, useScroll, useSpring } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TentangKami from './components/TentangKami';
import VisiMisi from './components/VisiMisi';
import Program from './components/Program';
import Galeri from './components/Galeri';
import Liputan from './components/Liputan';
import Mitra from './components/Mitra';
import Bergabung from './components/Bergabung';
import Footer from './components/Footer';

/* =============================================================================
   APP — susunan "scene" halaman
   -----------------------------------------------------------------------------
   Urutan section sengaja dibangun seperti alur cerita:
     Hero (kejutan) -> Tentang (kenapa ada) -> Visi (mau ke mana) ->
     Program (gimana jalannya) -> Galeri (buktinya) -> Liputan (pengakuan) ->
     Mitra (ajakan ke brand) -> Bergabung (ajakan ke orang) -> Footer (pendaratan)

   Ritme warna antar-section juga diatur bergantian
   (asphalt-950 -> asphalt-900 -> asphalt-950 -> ... -> flare) supaya section
   "Mitra" yang oranye terasa seperti puncak terang sebelum turun lagi.
   ============================================================================= */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  // useSpring membuat bar tidak "kedutan" mengikuti setiap event scroll.
  // Damping tinggi + stiffness sedang = gerakan yang menyusul halus,
  // bukan melompat 1:1 dengan posisi scroll.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-flare"
      aria-hidden="true"
    />
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-asphalt-950">
      <ScrollProgressBar />
      <Navbar />

      <main>
        <Hero />
        <TentangKami />
        <VisiMisi />
        <Program />
        <Galeri />
        <Liputan />
        <Mitra />
        <Bergabung />
      </main>

      <Footer />
    </div>
  );
}
