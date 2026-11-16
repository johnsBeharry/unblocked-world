// Curtain colour = the hero section colour of each page.
// Keep in sync with the inline boot-cover script in index.html.
const CURTAIN_COLORS = {
  '/': '#2850fe',
  '/posters': '#000000',
  '/guidelines': '#101010',
  '/grants': '#101010',
  '/grants/culture-grants': '#2449ed',
  '/grants/open-systems': '#f546a4',
  '/submit': '#dc91a8',
}

// Submit shows its pink column only in the two-column layout; stacked
// (tablet portrait / mobile) it is all black.
const STACKED_QUERY = '(max-width: 600px), (max-width: 864px) and (orientation: portrait)'

export function getCurtainColor(pathname) {
  const path = pathname.replace(/\/$/, '') || '/'
  if (path.startsWith('/submit')) {
    return window.matchMedia(STACKED_QUERY).matches ? '#000000' : CURTAIN_COLORS['/submit']
  }
  return CURTAIN_COLORS[path] ?? CURTAIN_COLORS['/']
}
