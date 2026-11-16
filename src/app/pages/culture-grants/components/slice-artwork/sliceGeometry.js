// Geometry of the supplied 1440 × 854 Culture Grants artwork (Figma export).
// Five columns; each holds one full circle on the artwork centre line and
// four horizontal slices of the same circle (two above, two below). Every
// slice is the circle at `cy`, clipped to a 280 × 140 band centred on the
// column; `bandTop` is the band's top edge.
export const ARTWORK = { width: 1440, height: 854, centerY: 427 };

export const BAND = { width: 280, height: 140 };

export const COLUMNS = [
  { id: "outer-left", cx: 148, r: 100 },
  { id: "inner-left", cx: 434, r: 120 },
  { id: "centre", cx: 720, r: 140 },
  { id: "inner-right", cx: 1006, r: 120 },
  { id: "outer-right", cx: 1292, r: 100 },
];

export const SLICES = [
  { id: "top-outer", cy: 167, bandTop: -5 },
  { id: "top-inner", cy: 281, bandTop: 141 },
  { id: "bottom-inner", cy: 573, bandTop: 573 },
  { id: "bottom-outer", cy: 687, bandTop: 719 },
];
