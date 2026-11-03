/* ==========================================================================
   12 — RING (3D skills carousel)
   Spins by itself, pauses while the pointer is over it, and can be
   dragged. Letting go keeps the momentum, which then eases back to the
   slow auto-spin. Vertical page scrolling still works on touch screens.
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var stage, ring;
  var angle = 0, vel = -11.25; // degrees, degrees/second (full turn in ~32s)
  var dragging = false, hovering = false, lastX = 0, lastT = 0;

  function frame(f) {
    var r = stage.getBoundingClientRect();
    if (r.bottom < -100 || r.top > f.vh + 100) return;

    if (!dragging) {
      var target = hovering || f.reduced ? 0 : -11.25;
      vel += (target - vel) * (1 - Math.exp(-f.dt * 2.2));
      angle += vel * f.dt;
    }
    ring.style.transform = "rotateY(" + angle.toFixed(2) + "deg)";
  }

  S.ring = {
    init: function () {
      stage = U.qs("[data-stage]");
      ring = U.qs("[data-ring]");
      if (!stage || !ring) return;

      function end() {
        if (!dragging) return;
        dragging = false;
        stage.style.cursor = "grab";
      }

      stage.addEventListener("pointerdown", function (e) {
        dragging = true;
        vel = 0;
        lastX = e.clientX;
        lastT = performance.now();
        stage.style.cursor = "grabbing";
        try { stage.setPointerCapture(e.pointerId); } catch (err) {}
      });
      stage.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        var now = performance.now();
        var dx = e.clientX - lastX;
        var dt = Math.max(1, now - lastT) / 1000;
        angle += dx * 0.35;
        vel = U.clamp(vel * 0.6 + ((dx * 0.35) / dt) * 0.4, -900, 900);
        lastX = e.clientX;
        lastT = now;
      });
      stage.addEventListener("pointerup", end);
      stage.addEventListener("pointercancel", end);
      stage.addEventListener("pointerenter", function () { hovering = true; });
      stage.addEventListener("pointerleave", function () { hovering = false; end(); });

      S.engine.add(frame);
    }
  };
})(window.Site = window.Site || {});
