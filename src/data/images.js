/* =============================================================================
   IMAGES — sumber gambar terpusat
   -----------------------------------------------------------------------------
   SEMUA FOTO DI SINI MASIH SEMENTARA.

   Ini foto stok dari Pexels (Pexels License: bebas dipakai, komersial boleh,
   tanpa wajib atribusi). Dipilih berdasarkan deskripsi resmi tiap foto —
   futsal indoor, aksi di lapangan keras, bola — karena itu yang paling dekat
   dengan nuansa Liga Akamsi. Tapi tetap saja: ini bukan foto Liga Akamsi.
   Tidak ada gang Tambora, tidak ada penonton di teras rumah, tidak ada aspal.

   CARA MENGGANTI DENGAN FOTO ASLI:
   Taruh file di folder public/img/, lalu ganti nilainya jadi path lokal:

       hero: '/img/hero-sawah-lio.jpg',

   Komponen tidak perlu disentuh sama sekali — semuanya baca dari sini.
   Deskripsi di tiap baris adalah foto yang IDEALNYA ada di slot itu.
   ============================================================================= */

/**
 * Pembentuk URL Pexels dengan crop sesuai rasio yang dibutuhkan slot.
 * fit=crop + w/h memastikan rasionya pas, jadi tidak ada gambar yang gepeng.
 */
const px = (id, w, h) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg` +
  `?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const IMAGES = {
  // Hero — lanskap lebar. Ideal: pertandingan malam di Jl. Sawah Lio, lampu
  // sorot seadanya, penonton berdiri rapat di pinggir gang.
  hero: px(14690057, 2000, 1250),

  // Tentang Kami — potret 4:5. Ideal: anak menggiring bola di gang sempit,
  // latar rumah padat Tambora. (Stok ini hitam-putih, cocok dengan mood.)
  tentang: px(11434111, 1200, 1500),

  // Mitra — potret 4:5. Ideal: suasana pertandingan dari sudut tinggi,
  // terlihat jalan dikelilingi penonton dan padatnya permukiman.
  mitra: px(14690053, 1200, 1500),

  // Program — 4 panel, mengikuti urutan STEPS di Program.jsx
  program: [
    px(12888525, 1200, 900), // 01 Aspal Disulap — ideal: warga menutup jalan, garis kapur
    px(14690051, 1200, 900), // 02 Peluit Pertama — ideal: kick-off malam di bawah lampu sorot
    px(13521967, 1200, 900), // 03 Panggungnya Akamsi — ideal: selebrasi gol, penonton bersorak
    px(7850928, 1200, 900), // 04 Jalan Dikembalikan — ideal: lapangan dibereskan, jalan kosong
  ],

  // Galeri — 6 slot, mengikuti urutan GALLERY di Galeri.jsx
  galeri: [
    px(13241581, 1400, 1100), // Final Musim 4 (kartu besar)
    px(9517917, 1000, 1250), // Wajah Akamsi (potret)
    px(9519554, 1000, 1250), // Modal Seadanya (potret)
    px(5886522, 1400, 900), // Tribun Kampung (lebar)
    px(12239377, 1000, 1250), // Juara Kampung (potret)
    px(10923061, 1000, 1250), // Di Balik Layar (potret)
  ],
};
