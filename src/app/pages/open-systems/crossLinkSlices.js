// Culture Grants cross-link panel of the Open Systems page: the shared
// SliceArtwork with three columns, measured from the 1440 × 800 mockup
// (720 × 800 panel, centre line 400). Each column holds a full circle on
// the centre line; above it the upper half of the same circle (centre 280,
// cut at 280) and a cap (centre 186.3, cut at 160.06), mirrored below
// (centre 520 cut at 520, centre 613.7 cut at 639.94). Radii and centres
// fitted to the mockup's row widths. A 140px band covers every slice.
const ARTWORK = { width: 720, height: 800, centerY: 400 };
const BAND = { width: 280, height: 140 };
const COLUMNS = [
  { id: "left", cx: 125, r: 98.6 },
  { id: "centre", cx: 360, r: 115.05 },
  { id: "right", cx: 595, r: 98.6 },
];
const SLICES = [
  { id: "top-cap", cy: 186.3, bandTop: 20.06 },
  { id: "top-half", cy: 280, bandTop: 140 },
  { id: "bottom-half", cy: 520, bandTop: 520 },
  { id: "bottom-cap", cy: 613.7, bandTop: 639.94 },
];

export const CROSS_LINK_SLICES = { artwork: ARTWORK, band: BAND, columns: COLUMNS, slices: SLICES };
