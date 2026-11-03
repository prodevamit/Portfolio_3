/* ==========================================================================
   03 — ENGINE
   ONE animation loop shared by every effect, plus the pointer position.
   Modules call Site.engine.add(function (frame, pointer) { ... }).
     frame:   { dt (seconds), vw, vh, reduced, fine }
     pointer: { x, y }   raw position
              { sx, sy } smoothed position (eased towards x, y)
              { inside, hot, type }  hot = hovering a link or button
   A task that throws is removed and logged once, so one bug can't freeze the rest.
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, inside: false, hot: false, type: "mouse" };
  var frame = { dt: 0.016, vw: window.innerWidth, vh: window.innerHeight, reduced: U.reduced(), fine: U.fine() };
  var tasks = [];
  var raf = 0;
  var last = 0;

  function add(fn) {
    tasks.push(fn);
    return function remove() {
      var i = tasks.indexOf(fn);
      if (i > -1) tasks.splice(i, 1);
    };
  }

  function onMove(e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.inside = true;
    pointer.type = e.pointerType || "mouse";
    if (pointer.sx < -5000) { pointer.sx = pointer.x; pointer.sy = pointer.y; }
    var t = e.target;
    pointer.hot = !!(t && t.closest && t.closest("a, button"));
  }
  function onLeave() { pointer.inside = false; pointer.hot = false; }
  function onUp(e) { if (e.pointerType && e.pointerType !== "mouse") onLeave(); }

  function loop(t) {
    raf = requestAnimationFrame(loop);
    frame.dt = last ? Math.min(0.05, (t - last) / 1000) : 0.016;
    last = t;
    frame.vw = window.innerWidth;
    frame.vh = window.innerHeight;
    frame.reduced = U.reduced();
    frame.fine = U.fine();

    if (pointer.x > -5000) {
      var k = 1 - Math.exp(-frame.dt * 14);
      pointer.sx += (pointer.x - pointer.sx) * k;
      pointer.sy += (pointer.y - pointer.sy) * k;
    }

    for (var i = tasks.length - 1; i >= 0; i--) {
      try {
        tasks[i](frame, pointer);
      } catch (err) {
        console.error("[site] effect stopped after an error:", err);
        tasks.splice(i, 1);
      }
    }
  }

  function start() {
    if (raf) return;
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointercancel", onLeave, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
  }

  S.engine = { add: add, start: start, pointer: pointer, frame: frame };
})(window.Site = window.Site || {});
