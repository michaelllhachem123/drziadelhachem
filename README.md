# Dr. Ziad Boutros El Hachem — Website

A luxurious, informational website for **Dr. Ziad Boutros El Hachem**, specialist in
**Pediatrics & Infectious Diseases** (Jbeil / Byblos, Lebanon).

**No database, no backend, no Supabase.** Fully static (HTML + CSS + JavaScript) — fast,
free to host, maintenance-free. No online appointments; the clinic keeps its own records.

**Trilingual** (English / French / Arabic) with a language switcher (EN / FR / ع) in the
nav. Arabic flips the whole layout right-to-left. The chosen language is remembered. All
wording lives in `js/i18n.js`.

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero, highlights, care preview, latest update, contact call-to-action |
| `about.html` | About Dr. Ziad — bio, specialty, philosophy of care, services |
| `updates.html` | Updates / Health Tips — the doctor's posts + share buttons |
| `contact.html` | Contact & Hours — clinic hours, address, phones, email, hospitals, map |
| `feedback.html` | Feedback form (rating + message) — the page the clinic QR code points to |

Shared files: `css/styles.css` (all styling/colors), `js/i18n.js` (all text in 3 languages),
`js/main.js` (menu, animations, share buttons).

## How to view it

Double-click `index.html`, **or** run a local server:
```
cd "clinic dr ziad"
python3 -m http.server 8000      # then open http://localhost:8000
```

## Already filled in

- **Name / specialty:** Dr. Ziad Boutros El Hachem — Pediatrics & Infectious Diseases
- **Address:** Centre Matignon, 4th floor — Jbeil (Byblos), Lebanon
- **Booking — Layla (secretary):** +961 70 338 272 (also "Call to Book" + WhatsApp)
- **Dr. Ziad direct / on-call:** +961 3 338 272
- **Email:** ziadelhashem@hotmail.com
- **Clinic hours:** Mon/Wed/Fri 3:00–8:00 PM · Tue/Thu 10:00 AM–2:00 PM · 24/7 on call
- **Hospitals (affiliations):** Notre-Dame Maritime, Saint Maounet — Jbeil

To change any wording, edit `js/i18n.js` (each text appears under `en`, `fr`, `ar` — change
all three to keep them in sync). To change phone/email links, edit the `tel:` / `mailto:` /
`wa.me` links in the relevant `.html` file.

## Still to confirm / add

1. **Hospital spellings** — confirm "Notre-Dame Maritime" and "Saint Maounet" (keys
   `hosp1.name`, `hosp2.name` in `js/i18n.js`).
2. **"20+ years"** in the hero badge / trust strip — adjust if needed.
3. **Dr. Ziad's photo** and **the Google Map** — see below.

### Add Dr. Ziad's photo
1. Put the photo in `assets/`, e.g. `assets/dr-ziad.jpg`.
2. In `index.html` and `about.html`, find the `portrait-placeholder` block and replace it with:
   ```html
   <img src="assets/dr-ziad.jpg" alt="Dr. Ziad Boutros El Hachem" />
   ```

### Add the real Google Map
In `contact.html`, find the `map-placeholder` block and replace it with the `<iframe>` from
Google Maps → Share → **Embed a map**.

## Adding / editing an update (post)

Each post on `updates.html` is one `<article class="post">…</article>` block. To add a new
post, copy an existing block, paste it at the top of `<div class="posts">`, and change the
tag, date, title and paragraphs. To keep all three languages, also add matching `postX.*`
keys in `js/i18n.js` — or, if a post will only ever be in one language, replace the
`data-i18n` attributes in that block with the text directly.

> Note: this is the "edit a file to post" method. If your father wants to publish posts
> himself from a simple admin screen (no code), or let visitors leave comments, that needs a
> small add-on service — see the conversation; it's a quick setup once you choose an option.

## Feedback form + clinic QR code

`feedback.html` is a branded form (star rating + message + optional name/phone) for patients
to leave feedback — the page the in-clinic QR code will point to.

**A static site can't store submissions on its own**, so the form posts to a free form
handler. It's pre-wired for **Netlify Forms**: if you deploy on Netlify (see below), it works
with zero extra setup — submissions show up in your Netlify dashboard under **Forms**, and you
can turn on email notifications so Dr. Ziad gets each one by email. Nothing to code.

- Locally (before deploying) the form shows the thank-you message but does **not** record
  anything — that's expected; storage only activates once it's hosted.
- Prefer a different host? Use **Formspree** (free): create a form there, then set
  `action="https://formspree.io/f/XXXX"` on the `<form>` in `feedback.html`. The rest works as-is.

**The QR code** simply encodes the live feedback URL (e.g. `https://drziad.netlify.app/feedback.html`).
Once the site is deployed and we know the address, the QR can be generated in seconds (any free
QR generator, or I can produce a print-ready PNG/SVG for you). Print it and place it at the
clinic desk — patients scan it to open the feedback page before leaving.

## Adding / editing an update (post)

Drag the whole folder onto **netlify.com/drop** (easiest), or use Vercel / GitHub Pages.
You can connect a custom domain (e.g. `drziadelhachem.com`) afterward.

## Colors / fonts

Defined at the top of `css/styles.css` under `:root` — teal-green (`--ink`) + warm coral
(`--gold`) + cream. Change those values to retune the whole look.
