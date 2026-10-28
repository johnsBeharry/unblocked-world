const MIN_LAYER_HEIGHT = 3.63

// Full artwork geometry, measured from the supplied 2720 x 1778 mockup.
// Each motif is one animation target. Every visible layer below is one complete
// rectangle/div; a layer is never split into separate left, center, or right
// fragments. Layer counts follow the mockup instead of being forced to five.
const ARTWORK_LAYER_ROWS = [
  [[1245, 0, 229, 40], [1172, 4, 376, 33], [686, 17, 1347, 7]],
  [[1178, 142, 363, 53], [1084, 152, 552, 33], [855, 158, 1010, 18], [370, 166, 1980, 7]],
  [[1111, 283, 497, 67], [1030, 290, 660, 54], [902, 300, 915, 27], [673, 307, 1373, 7], [190, 314, 2340, 4]],
  [[1030, 428, 659, 73], [889, 434, 942, 61], [761, 448, 1198, 27], [586, 455, 1548, 19], [103, 463, 2514, 4]],
  [[963, 566, 794, 80], [821, 576, 1077, 48], [694, 590, 1332, 32], [525, 596, 1669, 20], [44, 603, 2631, 7]],
  [[1013, 697, 693, 100], [909, 707, 901, 81], [768, 718, 1184, 47], [639, 731, 1441, 27], [485, 738, 1750, 14], [0, 745, 2719, 6]],
  [[997, 838, 726, 101], [882, 849, 956, 71], [740, 859, 1239, 60], [612, 872, 1495, 34], [485, 879, 1750, 14], [0, 886, 2719, 6]],
  [[1013, 980, 693, 101], [909, 990, 901, 81], [768, 1000, 1184, 47], [639, 1014, 1441, 27], [485, 1021, 1750, 14], [0, 1027, 2719, 7]],
  [[963, 1131, 794, 81], [821, 1141, 1077, 48], [694, 1155, 1332, 27], [525, 1162, 1693, 20], [42, 1168, 2636, 7]],
  [[1030, 1276, 659, 74], [889, 1283, 942, 60], [761, 1296, 1198, 33], [586, 1303, 1548, 27], [103, 1309, 2514, 7]],
  [[1111, 1428, 497, 67], [1030, 1434, 660, 54], [902, 1445, 915, 33], [673, 1452, 1373, 19], [190, 1457, 2340, 7]],
  [[1178, 1583, 363, 53], [1084, 1593, 552, 33], [855, 1599, 1010, 19], [370, 1606, 1980, 7]],
  [[1245, 1737, 229, 40], [1172, 1741, 376, 33], [686, 1754, 1347, 7]],
]

export const ARTWORK_MOTIFS = ARTWORK_LAYER_ROWS.map((rawLayers) => {
  const measuredLayers = rawLayers.map(([x, top, width, height]) => ({
    x,
    centerY: top + (height / 2),
    width,
    height: Math.max(height, MIN_LAYER_HEIGHT),
  }))
  const referenceLayer = measuredLayers.reduce((largest, layer) => (
    layer.height > largest.height ? layer : largest
  ))
  const referenceCenterY = referenceLayer.centerY
  const layers = measuredLayers.map((layer) => ({
    ...layer,
    centerY: referenceCenterY,
  }))
  const x = Math.min(...layers.map((layer) => layer.x))
  const y = referenceCenterY - (referenceLayer.height / 2)
  const right = Math.max(...layers.map((layer) => layer.x + layer.width))
  const bottom = referenceCenterY + (referenceLayer.height / 2)

  return {
    x,
    y,
    width: right - x,
    height: bottom - y,
    layers,
  }
})
