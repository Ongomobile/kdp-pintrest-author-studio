// Fuse app-template.html + fonts + Vue + logo + textures + sample cover into one self-contained HTML file.
// Usage: node build.mjs <output-path>
import { readFileSync, writeFileSync } from 'node:fs';

const here = (f) => new URL('./' + f, import.meta.url);
const out = process.argv[2] || 'pinterest-studio-authors.html';

let html = readFileSync(here('app-template.html'), 'utf8');
const fonts = readFileSync(here('fonts.css'), 'utf8');
// Escape any </script> sequence so inlining can't terminate the script tag early
const vue = readFileSync(here('vue.global.prod.js'), 'utf8').replaceAll('</script', '<\\/script');
const logo = 'data:image/png;base64,' + readFileSync(here('logo-small.png')).toString('base64');
const paper = 'data:image/svg+xml;base64,' +
  readFileSync(here('paper-texture.svg')).toString('base64');
const cover = 'data:image/svg+xml;base64,' +
  readFileSync(here('sample-cover.svg')).toString('base64');

html = html
  .split('/*__FONTS_CSS__*/').join(fonts)
  .split('/*__VUE_JS__*/').join(vue)
  .split('__LOGO_DATA__').join(logo)
  .split('__PAPER_DATA__').join(paper)
  .split('__COVER_DATA__').join(cover);

for (const token of ['__FONTS_CSS__', '__VUE_JS__', '__LOGO_DATA__', '__PAPER_DATA__', '__COVER_DATA__']) {
  if (html.includes(token)) throw new Error('unreplaced token: ' + token);
}
writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
