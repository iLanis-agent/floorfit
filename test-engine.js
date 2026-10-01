var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
// Worked example (tradesppl.com, homecalcify.com): 12 x 15 room = 180 sq ft; 10% waste = 198; 20 sq ft box -> 9.9 -> 10 boxes
eq(E.area(12, 15), 180, 'area'); eq(E.withWaste(180, 0.10), 198, 'waste'); eq(E.boxes(198, 20), 10, 'boxes');
var p = E.plan([{ l: 12, w: 15 }], E.LAYOUTS.straight, 20, 55); eq(p.area, 180, 'plan area'); eq(p.need, 198, 'plan need', 1e-9); eq(p.boxes, 10, 'plan boxes'); eq(p.covers, 200, 'covers'); eq(p.spare, 20, 'spare'); eq(p.cost, 550, 'cost');
// exact multiple does not add a box
eq(E.boxes(200, 20), 10, 'exact'); eq(E.boxes(200.01, 20), 11, 'just over'); eq(E.boxes(1, 20), 1, 'tiny');
// L-shape split into two rectangles (tradesppl): add areas
eq(E.netArea([{ l: 10, w: 12 }, { l: 6, w: 5 }]), 150, 'L shape');
// subtract an island
eq(E.netArea([{ l: 12, w: 15 }, { l: 3, w: 4, sub: true }]), 168, 'island');
// layouts ordered by waste
eq(E.LAYOUTS.tight < E.LAYOUTS.straight && E.LAYOUTS.straight < E.LAYOUTS.diagonal ? 1 : 0, 1, 'order');
p = E.plan([{ l: 15, w: 12 }], 0.05, 20, null); eq(p.need, 189, 'tight need'); eq(p.boxes, 10, 'tight boxes'); eq(p.cost == null ? 1 : 0, 1, 'no price');
p = E.plan([{ l: 15, w: 12 }], 0.15, 20, null); eq(p.need, 207, 'diag need'); eq(p.boxes, 11, 'diag boxes');
p = E.plan([{ l: 10, w: 10 }], 0.10, 24, null); eq(p.boxes, 5, '100 sqft @24'); eq(p.sparePct, 0.2, 'sparePct', 1e-9);
console.log(n + ' assertions, ' + bad + ' failed'); process.exit(bad ? 1 : 0);
