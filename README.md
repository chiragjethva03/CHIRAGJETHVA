# chiragjethva.tech

Personal portfolio for Chirag Jethva. Next.js 16, React Three Fiber, GSAP, Lenis, Tailwind CSS 4.

## Edit content

All text, projects, experience and links live in `src/lib/data.ts`.
The downloadable résumé is `public/Chirag_Jethva_Resume.pdf`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy to a VPS (Ubuntu + Node 20 + PM2 + Nginx)

The build uses `output: "standalone"`, so the server only needs the `.next/standalone` folder.

```bash
# on the VPS
git clone <your-repo> site && cd site
npm ci
npm run build
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
PORT=3000 pm2 start .next/standalone/server.js --name portfolio
pm2 save
```

Nginx reverse proxy (`/etc/nginx/sites-available/portfolio`):

```nginx
server {
  server_name chiragjethva.tech www.chiragjethva.tech;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Then `sudo certbot --nginx -d chiragjethva.tech -d www.chiragjethva.tech` for HTTPS.
In Hostinger DNS, point an `A` record for `@` and `www` at the VPS IP.

## SEO

Built in: title/description tuned for "full stack / software developer in Surat", canonical URL,
`/sitemap.xml`, `/robots.txt`, web manifest, generated share image (`/opengraph-image`),
Surat geo tags, JSON-LD (Person, ProfessionalService, WebSite, projects, FAQPage) and a visible FAQ section.
SEO copy lives in `src/lib/seo.ts`; FAQ answers in `src/lib/data.ts`.

Optional environment variables (set before `npm run build`, e.g. in a `.env.production` file):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | Overrides the Google Analytics 4 measurement ID (defaults to `G-QN4TNES6SY`). |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification code. |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification code. |
| `NEXT_PUBLIC_SITE_URL` | Overrides the default `https://chiragjethva.tech` (e.g. for staging). |

After going live: verify the site in Google Search Console and submit `https://chiragjethva.tech/sitemap.xml`.
