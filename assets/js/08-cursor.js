/* ==========================================================================
   08 — CURSOR
   A glass ring that trails the pointer and grows over links and buttons.
   Only on mouse / trackpad devices; the real cursor is never hidden.
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var el, scale = 1;

  function frame(f, p) {
    if (!f.fine || f.reduced) { el.classList.remove("is-on"); return; }
    if (!p.inside || p.sx < -5000) { el.classList.remove("is-on"); return; }

    scale += ((p.hot ? 1.9 : 1) - scale) * (1 - Math.exp(-f.dt * 12));
    el.style.transform = "translate3d(" + (p.sx - 18).toFixed(1) + "px," + (p.sy - 18).toFixed(1) + "px,0) scale(" + scale.toFixed(3) + ")";
    el.classList.add("is-on");
    el.classList.toggle("is-hot", p.hot);
  }

  S.cursor = {
    init: function () {
      el = U.qs("[data-cursor]");
      if (!el || !U.fine()) return;
      S.engine.add(frame);
    }
  };
})(window.Site = window.Site || {});
