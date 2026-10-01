(function (root) {
  'use strict';
  // Layout waste presets (typical ranges 5-15%; heuristics, not code)
  var LAYOUTS = { straight: 0.10, diagonal: 0.15, herringbone: 0.15, tight: 0.05 };
  function area(l, w) { return l * w; }
  // rooms: [{l,w,sign}] sign -1 subtracts (closet island, cabinet block)
  function netArea(rooms) { return rooms.reduce(function (s, r) { return s + (r.sub ? -1 : 1) * r.l * r.w; }, 0); }
  function withWaste(a, waste) { return a * (1 + waste); }
  function boxes(need, perBox) { return Math.ceil(need / perBox - 1e-9); }
  function plan(rooms, waste, perBox, price) {
    var a = netArea(rooms), need = withWaste(a, waste), n = boxes(need, perBox), cover = n * perBox;
    return { area: a, need: need, boxes: n, covers: cover, spare: cover - a, sparePct: a > 0 ? (cover - a) / a : 0, cost: price != null ? n * price : null };
  }
  var api = { LAYOUTS: LAYOUTS, area: area, netArea: netArea, withWaste: withWaste, boxes: boxes, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Floor = api;
})(typeof window !== 'undefined' ? window : this);
