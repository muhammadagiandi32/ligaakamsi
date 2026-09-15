# Liga Akamsi — Company Profile Landing Page

Landing page satu halaman untuk Liga Akamsi (ligaakamsi.com).
React + Vite + Tailwind CSS + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Struktur

```
src/
├── App.jsx                     # Susunan urutan section + scroll progress bar
├── index.css                   # Tailwind base + tekstur aspal + kelas .headline / .eyebrow
├── lib/
│   ├── animations.js           # SEMUA variant Framer Motion (easing, stagger, fade, mask)
│   └── useMediaQuery.js        # Deteksi desktop untuk mematikan pinned-scroll di HP
└── components/
    ├── Navbar.jsx              # Auto-hide saat scroll turun, blur setelah 40px
    ├── Hero.jsx                # 1. Hero — parallax 3 lapis
    ├── TentangKami.jsx         # 2. Asal usul — kolom kiri sticky
    ├── VisiMisi.jsx            # 3. Visi & misi — counter angka
    ├── Program.jsx             # 4. Program — pinned horizontal scroll
    ├── Galeri.jsx              # 5. Galeri — bento grid + parallax zig-zag
    ├── Liputan.jsx             # 6. Liputan media — marquee + kartu
    ├── Mitra.jsx               # 7. Mitra — section oranye
    ├── Bergabung.jsx           # 8. CTA pemain & pendukung + form
    ├── Footer.jsx              # 9. Kontak, sosial, tagline penutup
    └── ui/                     # Reveal, SectionHeading, Counter, Button,
                                # ImagePlaceholder, Ticker
```

## Cara mengganti konten

Semua teks ada langsung di dalam file section-nya, biasanya sebagai array konstan
di bagian atas file (`STORY`, `MISI`, `STEPS`, `GALLERY`, `LIPUTAN`, `BENEFIT`,
`JALUR`, `SOCIAL`, `KONTAK`).

**Cari kata `GANTI` dan `[PLACEHOLDER]`** di seluruh `src/` — dua penanda itu
menandai setiap tempat yang isinya masih tebakan:

```bash
grep -rn "GANTI\|\[PLACEHOLDER\]" src/
```

### Mengganti foto

Semua slot foto memakai `<ImagePlaceholder />`. Isi prop `src` saja:

```jsx
<ImagePlaceholder
  src="/img/hero.jpg"          // taruh file di folder public/
  alt="Pertandingan malam di Sawah Lio"
  ratio="aspect-[4/5]"
  label="..."                   // deskripsi foto yang seharusnya ada di sini
/>
```

Selama `src` kosong, komponen merender kotak abu bergaris dengan deskripsi foto
yang dimaksud — jadi mudah dicocokkan saat mengumpulkan aset.

### Data yang perlu diverifikasi sebelum tayang

| Di mana | Apa |
|---|---|
| `Hero.jsx` → `HERO_STATS` | Tahun berdiri, jumlah tim, jumlah pemain |
| `VisiMisi.jsx` → `STATS` | Semua angka counter |
| `Program.jsx` → `STEPS` + kartu bawah | Hari, jam, format, biaya, kategori usia |
| `Liputan.jsx` → `MEDIA`, `LIPUTAN`, `PENCAPAIAN` | Daftar media & artikel — pastikan hanya yang benar-benar meliput |
| `Mitra.jsx` → `MITRA_SAAT_INI` | Logo mitra; hapus blok ini kalau belum ada mitra resmi |
| `Bergabung.jsx` → form | Belum terhubung ke mana pun (lihat catatan di file) |
| `Footer.jsx` → `SOCIAL`, `KONTAK` | Email, WhatsApp, alamat, URL sosial media |
| `TentangKami.jsx` → pull quote | Nama & jabatan narasumber |

## Catatan animasi

Semua timing terpusat di `src/lib/animations.js`. Mau seluruh halaman terasa
lebih cepat/lambat? Ubah `duration` di variant `fadeUp` dan `lineMask` di situ,
jangan per-komponen.

- **Easing tunggal** `[0.16, 1, 0.3, 1]` (expo-out) dipakai di hampir semua
  transisi — ini yang bikin gerakan terasa "mahal", bukan bouncy.
- **`once: true`** di semua `viewport` — animasi jalan sekali, tidak berulang
  tiap scroll.
- **`prefers-reduced-motion`** dihormati: parallax, pinned-scroll, dan marquee
  otomatis mati; konten tetap tampil penuh.
- **Pinned horizontal scroll** di section Program hanya aktif di layar ≥1024px.
  Di HP otomatis jadi stack vertikal.
