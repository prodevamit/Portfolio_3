/* ==========================================================================
   09 — MAGNETIC BUTTONS
   Buttons lean toward the cursor when it gets close, on a spring.
   Uses the independent CSS `translate` property so the hover lift
   (which uses `transform`) keeps working at the same time.
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var items = [];

  function frame(f, p) {
    if (!f.fine || f.reduced) return;

    for (var i = 0; i < items.length; i++) {
      var s = items[i];
      var tx = 0, ty = 0;

      if (p.inside) {
        var r = s.el.getBoundingClientRect();
        var cx = r.left + r.width / 2 - s.x;
        var cy = r.top + r.height / 2 - s.y;
        var dx = p.sx - cx, dy = p.sy - cy;
        var reach = Math.max(r.width, r.height) * 0.9;
        if (Math.sqrt(dx * dx + dy * dy) < reach) { tx = dx * 0.28; ty = dy * 0.28; }
      }

      s.vx += (200 * (tx - s.x) - 18 * s.vx) * f.dt;
      s.vy += (200 * (ty - s.y) - 18 * s.vy) * f.dt;
      s.x += s.vx * f.dt;
      s.y += s.vy * f.dt;

      if (Math.abs(s.x) > 0.05 || Math.abs(s.y) > 0.05 || tx || ty) {
        s.el.style.translate = s.x.toFixed(2) + "px " + s.y.toFixed(2) + "px";
      } else if (s.el.style.translate) {
        s.el.style.translate = "";
        s.x = s.y = s.vx = s.vy = 0;
      }
    }
  }

  S.magnetic = {
    init: function () {
      if (!U.fine()) return;
      items = U.qsa(".btn").map(function (el) { return { el: el, x: 0, y: 0, vx: 0, vy: 0 }; });
      S.engine.add(frame);
    }
  };
})(window.Site = window.Site || {});
