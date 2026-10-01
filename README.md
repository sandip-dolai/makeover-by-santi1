# Santi's Makeover & Beauty Salon — website

The official website of Santi's Makeover & Beauty Salon | Academy in Debra Bazaar, West Bengal.
It is built with Next.js 16 (App Router), Tailwind CSS v4 and next-intl, and works in English (`/en`) and Bengali (`/bn`).

**Pages:** Home · Services & prices · Academy · Gallery · About · Contact

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are pre-rendered)
npm run lint
```

## How to update content (no coding needed)

| What | Where |
| --- | --- |
| Prices, services, courses, fees, reviews, FAQ, gallery list, phone, address, social links | `src/content/site.ts` |
| Button labels, headings and other page text | `src/messages/en.json` and `src/messages/bn.json` |
| Photos | `public/images/` |

- **Prices:** every price marked `// TODO price` in `site.ts` is a placeholder. Confirm or replace them.
- **Photos:** the current photos are stock placeholders from Unsplash. To use a real photo, save it in
  `public/images/` under the **same file name** (for example `founder.jpg` or `bridal-saree.jpg`), or add a new
  file and update its path in `site.ts`. Portrait photos work best for `hero-bride.jpg`, `bridal-saree.jpg` and `founder.jpg`.
- **Gallery:** add a line to the `gallery` list in `site.ts`. Set `tall: true` on portrait photos.
- **Instagram:** paste the profile URL into `business.social.instagram`. The icon appears automatically.
- **Other TODOs:** search `site.ts` for `TODO` to find details that still need confirming, such as the year the
  academy started and the FAQ answers about instalments and on-location makeup.

## Deploy on Vercel (makeoverbysanti.in)

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com/new), choose **Import Project** and select the repo. The defaults work as they are.
3. In **Project → Settings → Domains**, add `makeoverbysanti.in` and `www.makeoverbysanti.in`.
4. At your domain registrar, replace the old GitHub Pages DNS records with the ones Vercel shows (an `A` record
   `76.76.21.21` for the root domain and a `CNAME` to `cname.vercel-dns.com` for `www`).
5. After the site goes live, submit `https://makeoverbysanti.in/sitemap.xml` in Google Search Console, and link the
   website from the salon's Google Business Profile.

## Project structure

```
src/
  app/[locale]/        pages (home, services, academy, gallery, about, contact) + layout + OG image
  app/sitemap.ts       sitemap with en/bn alternates
  components/layout/   Header, Footer, MobileActionBar (Call · WhatsApp · Directions)
  components/sections/ Home page sections
  components/ui/       Buttons, headings, booking form, gallery lightbox, FAQ, …
  content/site.ts      ← all salon content
  messages/*.json      ← interface text (English / Bengali)
  i18n/                next-intl routing
  proxy.ts             language detection and redirect (Next 16's replacement for middleware)
```

## Notes

- Bookings and enquiries open WhatsApp with a pre-filled message. Nothing is stored on a server.
- Pages include structured data for Google: BeautySalon, Course and FAQPage.
- Scroll animations are pure CSS (`animation-timeline: view()`). Content always shows without JavaScript, and
  animations turn off for visitors who have reduced motion set.

Designed and developed by [Sandip Dolai](https://in.linkedin.com/in/sandipdolai).
