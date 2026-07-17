# Pinterest Studio for Authors

Upload your book cover. Download Pinterest-ready book pins.

A single-file web app for authors: upload a cover and it becomes a realistic 3D book mockup, the pin colors re-match themselves to the cover automatically, and one click exports Pinterest-ready PNGs with an "Available on Amazon" badge. No install, no account — just open the file in a browser.

## Using the app

1. Open `pinterest-studio-authors.html` in any modern browser (double-click it).
2. Upload your book cover — the pin palette is extracted from it automatically (adjust any swatch afterward).
3. Fill in your book title, author name, marketing blurb, review quote, and reader hooks.
4. Download individual pins with **PNG ↓**, or grab everything with **Download all**.

### The three pin designs

| Pin | What it's for |
|---|---|
| **A — Spotlight** | New-release announcement: badge, title, blurb, 3D book, Amazon badge, CTA |
| **B — Quote** | Dark review-spotlight: star rating, pull quote, book, CTA |
| **C — Reader** | "Your next read" hook: headline, tilted book with corner tape, reader hooks list |

Pins export at 2× resolution for crisp text:

| Size option | Exported PNG | Notes |
|---|---|---|
| Standard 2:3 | 2000 × 3000 px | Pinterest's recommended format |
| Tall | 2000 × 4200 px | More room, but may crop in the feed |

Everything saves automatically in the browser. Use **Save book kit** to export your book's settings as a JSON file you can back up, or load for another book with **Load book kit**.

## Development

`pinterest-studio-authors.html` is a **generated file** — don't edit it directly, or your changes will be overwritten by the next build.

The real source lives in the `build/` folder:

- `build/app-template.html` — the app itself (layout, labels, styles, and all the JavaScript)
- `build/build.mjs` — the build script that inlines fonts, Vue, and images into one self-contained HTML file
- `build/fonts.css`, `build/vue.global.prod.js`, `build/logo-small.png`, `build/paper-texture.svg`, `build/sample-cover.svg` — assets that get embedded

### Making a change

1. Edit `build/app-template.html` (or another file in `build/`).
2. Rebuild from this folder:

   ```sh
   node build/build.mjs pinterest-studio-authors.html
   ```

   You should see: `wrote pinterest-studio-authors.html (0.64 MB)`

3. Open `pinterest-studio-authors.html` in the browser to check your change.

Requires [Node.js](https://nodejs.org) (any recent version).

### How the 3D book works

The mockup is a single CSS `perspective(...) rotateY(...)` transform on one wrapper (cover image + spine-crease and sheen gradient overlays), with the page block faked as layered `box-shadow` strips that rotate with the element. This one-transform approach is deliberate: the PNG exporter serializes each pin into an SVG `<foreignObject>` and rasterizes it on a canvas, and nested `preserve-3d` scenes don't survive that pipeline — a single flat transform does.

## Credits

Modeled on the original [Pin Studio](../pin-studio/README.md) in the sibling folder, which makes freebie/lead-magnet pins for any brand.
