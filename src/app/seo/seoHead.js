import content from "./seo-content.json" with { type: "json" };

// Per-page <head> tags (title, description, canonical, Open Graph, Twitter)
// from seo-content.json. A page entry overrides the defaults field by field;
// a path without an entry gets the 404 values. The tags live between the
// SEO markers in index.html, so injectSeo works on the raw template and on a
// file that was already filled (re-filling replaces the old tags).
const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;

const toPath = (url) => url.split(/[?#]/)[0].replace(/\/$/, "") || "/";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const SEO_PATHS = Object.keys(content.pages);

export function getSeo(url) {
  const path = toPath(url);
  const page = content.pages[path];
  const seo = { ...content.defaults, ...(page ?? content.notFound) };
  const image = { ...content.defaults.image, ...seo.image };
  return {
    ...seo,
    image: { ...image, url: new URL(image.src, content.site.url).href },
    // A 404 has no address of its own to point search engines to.
    canonical: page ? new URL(path, content.site.url).href : null,
  };
}

export function renderSeoTags(url) {
  const seo = getSeo(url);
  const meta = (key, name, value) =>
    `<meta ${key}="${name}" content="${escapeHtml(value)}" />`;
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta("name", "description", seo.description),
    seo.noindex && meta("name", "robots", "noindex"),
    seo.canonical && `<link rel="canonical" href="${seo.canonical}" />`,
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", content.site.name),
    meta("property", "og:title", seo.title),
    meta("property", "og:description", seo.description),
    seo.canonical && meta("property", "og:url", seo.canonical),
    meta("property", "og:image", seo.image.url),
    meta("property", "og:image:width", seo.image.width),
    meta("property", "og:image:height", seo.image.height),
    meta("property", "og:image:alt", seo.image.alt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", seo.title),
    meta("name", "twitter:description", seo.description),
    meta("name", "twitter:image", seo.image.url),
  ]
    .filter(Boolean)
    .join("\n    ");
}

export const injectSeo = (html, url) =>
  html.replace(SEO_BLOCK, `<!--seo-->\n    ${renderSeoTags(url)}\n    <!--/seo-->`);
