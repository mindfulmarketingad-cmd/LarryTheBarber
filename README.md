# Larry The Barber — Grooming Co.

Marketing website for Larry The Barber. A single homepage plus all core legal
pages, built as a fast, dependency-free static site (plain HTML/CSS/JS) so it's
cheap to host and easy to edit.

## What's included
- **Homepage** (`index.html`) — hero, story/"Meet Larry", services, online
  booking band, product line, work gallery, contact & hours, footer.
- **Legal pages** (`legal/`)
  - `privacy-policy.html`
  - `terms-of-service.html`
  - `cookie-policy.html`
  - `accessibility-statement.html`
- **Assets** — `assets/css/styles.css`, `assets/js/main.js`, `assets/images/`.

## Calls to action
- **Primary CTA: Book Online** — every "Book" button is wired to **Booksy**.
- **Secondary CTA: See Products** — jumps to the grooming line section.
- Phone **(404) 490-3052** appears top-right in the nav (and throughout) as a
  click-to-call / text link.

## ⚙️ Set up online booking (Booksy)
Online appointments go through Booksy. To connect Larry's real calendar:

1. Open `assets/js/main.js`.
2. Edit the one line at the top:
   ```js
   var BOOKSY_URL = "https://booksy.com/en-us/s/?query=Larry%20The%20Barber";
   ```
   Replace it with Larry's Booksy business profile URL, e.g.
   `https://booksy.com/en-us/123456_larry-the-barber_barber-shop_atlanta`.

That single change updates **every** "Book Online / Book Appointment" button on
the site. Until it's set, the buttons fall back to a Booksy search so nothing
is broken.

**Optional — inline calendar:** Booksy also offers an embeddable "Book with us"
widget. Paste that snippet into the `<div class="book-widget">` inside the
booking section of `index.html` to show the live calendar directly on the page.

## 🖼️ Add the photos
See `assets/images/README.md` for the exact filenames. Drop the photos in with
those names and they appear automatically (labeled placeholders show until then).

## 🎨 Colors
The palette matches the brand (black canvas, white serif headings, gold accent,
royal-blue CTAs) and lives entirely in CSS variables at the top of
`assets/css/styles.css` (`:root`). Change a value there to retune site-wide.

## Run locally
It's static — open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy
Any static host works (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).
Point the host at the repo root; no build step required.

## Still to confirm (placeholders in the site)
- Real **shop hours** and **address** (currently placeholder values).
- Final **service list & pricing**.
- **Booksy URL** (see above).
- Registered **business name, address, contact email** in the legal pages.
- The legal pages are general templates — have them reviewed by an attorney
  before publishing.
