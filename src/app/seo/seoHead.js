import content from "./seo-content.json" with { type: "json" };

// Per-page <head> tags (title, description, canonical, Open Graph, Twitter)
// from seo-content.json. A page entry overrides the defaults field by field;
// a path without an entry gets the 404 values. The tags live between the
// SEO markers in index.html, so injectSeo works on the raw template and on a
// file that was already filled (re-filling replaces the old tags).
// `origin` is the site serving the page (e.g. https://unblocked-hazel.vercel.app);
// canonical, og:url and a relative image src resolve against it. Without
// one, `site.url` from the JSON is used. An absolute image src is kept.
const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;

const toPath = (url) => url.split(/[?#]/)[0].replace(/\/$/, "") || "/";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const SEO_PATHS = Object.keys(content.pages);

// Only a valid http(s) origin is used; anything else (e.g. a malformed Host
// header) falls back to site.url.
const toOrigin = (origin) => {
  try {
    const { protocol, origin: clean } = new URL(origin);
    if (protocol === "http:" || protocol === "https:") return clean;
  } catch {
    // invalid or missing origin
  }
  return content.site.url;
};

export function getSeo(url, requestOrigin) {
  const origin = toOrigin(requestOrigin);
  const path = toPath(url);
  const page = content.pages[path];
  const seo = { ...content.defaults, ...(page ?? content.notFound) };
  const image = { ...content.defaults.image, ...seo.image };
  return {
    ...seo,
    image: { ...image, url: new URL(image.src, origin).href },
    // A 404 has no address of its own to point search engines to.
    canonical: page ? new URL(path, origin).href : null,
  };
}

export function renderSeoTags(url, origin) {
  const seo = getSeo(url, origin);
  const meta = (key, name, value) =>
    `<meta ${key}="${name}" content="${escapeHtml(value)}" />`;
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta("name", "description", seo.description),
    seo.noindex && meta("name", "robots", "noindex"),
    seo.canonical &&
      `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
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

export const injectSeo = (html, url, origin) =>
  html.replace(
    SEO_BLOCK,
    `<!--seo-->\n    ${renderSeoTags(url, origin)}\n    <!--/seo-->`,
  );
