// Sitemap built from the files in src/pages, so new pages are included automatically.
// No extra package needed.
const pages = import.meta.glob('./**/*.astro');

export function GET({ site }) {
  const base = (site ? site.href : 'https://rubixmep.com/').replace(/\/$/, '');
  const paths = Object.keys(pages)
    .map((f) => f.replace(/^\.\//, '/').replace(/\.astro$/, '').replace(/\/index$/, '').replace(/^\/index$/, ''))
    .map((p) => (p === '' ? '/' : p))
    .filter((p) => !p.includes('['))
    .sort();
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((p) => `  <url><loc>${base}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
