// Fuse app-template.html + fonts + Vue + logo + textures + sample cover into one self-contained HTML file.
// If default-kit.json exists next to this script, it's baked in as the app's
// default book (what first-time visitors and "Reset" see).
// Usage: node build.mjs <output-path>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const here = (f) => new URL('./' + f, import.meta.url);
const out = process.argv[2] || 'pinterest-studio-authors.html';

let html = readFileSync(here('app-template.html'), 'utf8');

if (existsSync(here('default-kit.json'))) {
  const kit = JSON.stringify(JSON.parse(readFileSync(here('default-kit.json'), 'utf8')));
  html = html.replace('/*__DEFAULT_KIT__*/null', kit.replaceAll('</script', '<\\/script'));
  console.log('baked in default-kit.json');
}
const fonts = readFileSync(here('fonts.css'), 'utf8');
// Escape any </script> sequence so inlining can't terminate the script tag early
const vue = readFileSync(here('vue.global.prod.js'), 'utf8').replaceAll('</script', '<\\/script');
const logo = 'data:image/png;base64,' + readFileSync(here('logo-small.png')).toString('base64');
const paper = 'data:image/svg+xml;base64,' +
  readFileSync(here('paper-texture.svg')).toString('base64');
const cover = 'data:image/svg+xml;base64,' +
  readFileSync(here('sample-cover.svg')).toString('base64');
// The handwritten marker font used on the Paper Strips (f) template.
const markerFont  = 'data:font/ttf;base64,'   + readFileSync(here('marker.ttf')).toString('base64');
// Default photo behind the Paper Strips (f) pins.
const flowersBg = 'data:image/jpeg;base64,' + readFileSync(here('flowers-bg.jpg')).toString('base64');

html = html
  .split('/*__FONTS_CSS__*/').join(fonts)
  .split('/*__VUE_JS__*/').join(vue)
  .split('__LOGO_DATA__').join(logo)
  .split('__PAPER_DATA__').join(paper)
  .split('__COVER_DATA__').join(cover)
  .split('__MARKER_FONT__').join(markerFont)
  .split('__FLOWERS_BG__').join(flowersBg);

for (const token of ['__FONTS_CSS__', '__VUE_JS__', '__LOGO_DATA__', '__PAPER_DATA__', '__COVER_DATA__',
                     '__MARKER_FONT__', '__FLOWERS_BG__']) {
  if (html.includes(token)) throw new Error('unreplaced token: ' + token);
}
writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
