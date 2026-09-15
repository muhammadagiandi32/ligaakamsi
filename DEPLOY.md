# Deploy — ligaakamsi.com

## Kondisi saat ini

| Bagian | Status |
|---|---|
| Repo | https://github.com/muhammadagiandi32/ligaakamsi (public, branch `main`) |
| VPS | `srv1240820.hstgr.cloud` — `72.62.125.68` (KVM 4, Ubuntu 24.04) |
| Docker project | `ligaakamsi` di `/docker/ligaakamsi/docker-compose.yml` — **jalan** |
| Container | `ligaakamsi-web` (nginx:1.27-alpine) di `127.0.0.1:3001` |
| DNS | A `@` dan CNAME `www` → `72.62.125.68` — **sudah pindah** |
| vhost nginx host | **aktif** — `/etc/nginx/sites-enabled/ligaakamsi.com` |
| SSL | **aktif** — Let's Encrypt, berlaku s/d 14 Des 2026, auto-renew certbot |

Situs live di **https://ligaakamsi.com** (HTTP otomatis redirect ke HTTPS).

## Riwayat: dua langkah yang dulu dikerjakan manual

```bash
ssh root@72.62.125.68

# 1. vhost — bikin nginx host meneruskan ligaakamsi.com ke container
cat > /etc/nginx/sites-available/ligaakamsi.com <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name ligaakamsi.com www.ligaakamsi.com;

    access_log /var/log/nginx/ligaakamsi.access.log;
    error_log  /var/log/nginx/ligaakamsi.error.log;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -sf /etc/nginx/sites-available/ligaakamsi.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# cek: harus HTTP 200
curl -I http://ligaakamsi.com

# 2. SSL (DNS sudah mengarah ke VPS, jadi HTTP-01 challenge akan lolos)
certbot --nginx -d ligaakamsi.com -d www.ligaakamsi.com
```

## Cara update konten setelah ini

Build dilakukan di lokal — VPS tidak pernah menjalankan `npm`. Jadi `dist/`
**sengaja ikut di-commit** ke repo.

```bash
# 1. ubah kontennya, lalu build ulang
npm run build

# 2. commit termasuk dist/
git add -A
git commit -m "update konten"
git push

# 3. suruh VPS ambil versi baru
ssh root@72.62.125.68 "cd /docker/ligaakamsi && docker compose up -d --force-recreate"
```

Langkah 3 memicu ulang container `site-fetch`, yang meng-clone repo terbaru
dan menimpa isi volume. Container nginx-nya baru start setelah fetch selesai
(`condition: service_completed_successfully`), jadi tidak ada momen di mana
situs menyajikan folder kosong.

Kalau lupa `npm run build` sebelum commit, yang ter-deploy adalah `dist/`
versi lama — bukan error, tapi perubahanmu tidak muncul.

## Catatan

- **Repo harus tetap public.** `site-fetch` meng-clone tanpa kredensial.
  Kalau mau di-private, ganti URL clone jadi SSH dan pasang deploy key di VPS.
- **Port 3001** dipilih karena 3000 dipakai `kolibrinektara`. Port lain yang
  sudah terpakai di VPS ini: 3100, 3306–3309, 6380, 6381, 8085, 8100, 8199,
  8200, 9090, 9200, 9202, 9300.
- `docker-compose.yml` (yang pakai `build:`) **tidak dipakai di VPS** — itu
  untuk build lokal saja: `docker compose up --build`. Yang dipakai di server
  adalah `docker-compose.vps.yml`.
- Hostinger VPS API tidak menjalankan tahap `build:` dari compose. Percobaan
  pertama dengan `build.context` berupa URL git menghasilkan project dengan
  nol container. Itu sebabnya pola clone + serve ini yang dipakai.
