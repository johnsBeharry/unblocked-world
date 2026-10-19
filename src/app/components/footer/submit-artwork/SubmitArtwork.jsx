import React from 'react'
import styles from './SubmitArtwork.module.scss'

const ARTWORK_WIDTH = 2720
const ARTWORK_HEIGHT = 1778
const MIN_LAYER_HEIGHT = 3.63

// Full artwork geometry, measured from the supplied 2720 x 1778 mockup.
// Each motif is one animation target. Every visible layer below is one complete
// rectangle/div; a layer is never split into separate left, center, or right
// fragments. Layer counts follow the mockup instead of being forced to five.
const ARTWORK_MOTIFS = [
  { layers: [[1245, 0, 229, 40], [1172, 4, 376, 33], [686, 17, 1347, 7]] },
  { layers: [[1178, 142, 363, 53], [1084, 152, 552, 33], [855, 158, 1010, 18], [370, 166, 1980, 7]] },
  { layers: [[1111, 283, 497, 67], [1030, 290, 660, 54], [902, 300, 915, 27], [673, 307, 1373, 7], [190, 314, 2340, 4]] },
  { layers: [[1030, 428, 659, 73], [889, 434, 942, 61], [761, 448, 1198, 27], [586, 455, 1548, 19], [103, 463, 2514, 4]] },
  { layers: [[963, 566, 794, 80], [821, 576, 1077, 48], [694, 590, 1332, 32], [525, 596, 1669, 20], [44, 603, 2631, 7]] },
  { layers: [[1013, 697, 693, 100], [909, 707, 901, 81], [768, 718, 1184, 47], [639, 731, 1441, 27], [485, 738, 1750, 14], [0, 745, 2719, 6]] },
  { layers: [[997, 838, 726, 101], [882, 849, 956, 71], [740, 859, 1239, 60], [612, 872, 1495, 34], [485, 879, 1750, 14], [0, 886, 2719, 6]] },
  { layers: [[1013, 980, 693, 101], [909, 990, 901, 81], [768, 1000, 1184, 47], [639, 1014, 1441, 27], [485, 1021, 1750, 14], [0, 1027, 2719, 7]] },
  { layers: [[963, 1131, 794, 81], [821, 1141, 1077, 48], [694, 1155, 1332, 27], [525, 1162, 1693, 20], [42, 1168, 2636, 7]] },
  { layers: [[1030, 1276, 659, 74], [889, 1283, 942, 60], [761, 1296, 1198, 33], [586, 1303, 1548, 27], [103, 1309, 2514, 7]] },
  { layers: [[1111, 1428, 497, 67], [1030, 1434, 660, 54], [902, 1445, 915, 33], [673, 1452, 1373, 19], [190, 1457, 2340, 7]] },
  { layers: [[1178, 1583, 363, 53], [1084, 1593, 552, 33], [855, 1599, 1010, 19], [370, 1606, 1980, 7]] },
  { layers: [[1245, 1737, 229, 40], [1172, 1741, 376, 33], [686, 1754, 1347, 7]] },
].map((motif) => {
  const measuredLayers = motif.layers.map(([x, top, width, height]) => ({
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

function toCanvasPixels(value) {
  return `${value}px`
}

export function SubmitArtwork({ className = '' }) {
  const artworkClassName = [styles.artwork, className].filter(Boolean).join(' ')

  return (
    <div className={artworkClassName} aria-hidden="true">
      {ARTWORK_MOTIFS.map((motif, motifIndex) => (
        <div
          key={motifIndex}
          className={styles.motif}
          data-artwork-motif={motifIndex}
          style={{
            left: toCanvasPixels(motif.x),
            top: toCanvasPixels(motif.y),
            width: toCanvasPixels(motif.width),
            height: toCanvasPixels(motif.height),
          }}
        >
          {motif.layers.map((layer, layerIndex) => (
            <div
              key={layerIndex}
              className={styles.layer}
              data-artwork-layer={`${motifIndex}-${layerIndex}`}
              style={{
                left: toCanvasPixels(layer.x - motif.x),
                top: toCanvasPixels(layer.centerY - motif.y - (layer.height / 2)),
                width: toCanvasPixels(layer.width),
                height: toCanvasPixels(layer.height),
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
