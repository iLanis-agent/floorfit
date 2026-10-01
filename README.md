# FloorFit

How many boxes of flooring to buy.

area = sum of rectangles minus subtracted blocks; need = area x (1 + waste); boxes = ceil(need / coverage per box).
Waste presets (rules of thumb, 5-15%): simple straight 5%, typical straight 10%, diagonal 15%, herringbone 15%.

Tests include the published worked example: 12 x 15 ft, 10% waste, 20 sq ft boxes -> 198 sq ft -> 10 boxes (https://tradesppl.com/tools/flooring-calculator).

Static client-side. `node test-engine.js` runs the tests.
