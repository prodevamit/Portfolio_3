/* ==========================================================================
   06 — HEADLINE
   1. Splits the hero headline into letters ([data-split] elements).
   2. Magnetic type: letters lift, tilt, grow and turn to the accent colour
      as the cursor gets near, driven by a spring so they overshoot and settle.
   3. The Grotesk / Serif / Mono switch under the hero buttons.
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var title, letters = [], fontSize = 80;

  function split(el) {
    var words = el.textContent.split(/\s+/).filter(Boolean);
    el.textContent = "";
    words.forEach(function (word, wi) {
      var w = document.createElement("span");
      w.className = "w";
      word.split("").forEach(function (ch) {
        var c = document.createElement("span");
        c.className = "ch";
        c.textContent = ch;
        w.appendChild(c);
      });
      el.appendChild(w);
      if (wi < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  }

  function measure() {
    if (title) fontSize = parseFloat(getComputedStyle(title).fontSize) || 80;
  }

  function frame(f, p) {
    if (f.reduced) return;
    var R = Math.max(140, fontSize * 1.7);
    var box = title.getBoundingClientRect();
    var near =
      p.inside &&
      p.sx > box.left - R && p.sx < box.right + R &&
      p.sy > box.top - R && p.sy < box.bottom + R;

    for (var i = 0; i < letters.length; i++) {
      var el = letters[i];
      var s = el.__s;
      if (!near && !s.on) continue;

      var target = 0;
      if (near) {
        var r = el.getBoundingClientRect();
        // centre without our own translation, so the maths doesn't feed back on itself
        var cx = r.left + r.width / 2 - s.tx;
        var cy = r.top + r.height / 2 - s.ty;
        s.dx = p.sx - cx;
        s.dy = p.sy - cy;
        var d = Math.sqrt(s.dx * s.dx + s.dy * s.dy);
        target = d < R ? Math.pow(1 - d / R, 1.6) : 0;
      }

      // spring: stiffness 260, damping 20
      s.v += (260 * (target - s.s) - 20 * s.v) * f.dt;
      s.s += s.v * f.dt;

      if (target === 0 && Math.abs(s.s) < 0.002 && Math.abs(s.v) < 0.01) {
        if (s.on) {
          s.on = false; s.s = 0; s.v = 0; s.tx = 0; s.ty = 0;
          el.style.transform = el.style.color = el.style.fontVariationSettings = "";
        }
        continue;
      }

      s.on = true;
      var v = s.s;
      s.tx = s.dx * v * 0.05;
      s.ty = s.dy * v * 0.05 - v * fontSize * 0.1;
      var rot = U.clamp(s.dx / R, -1, 1) * v * 12;
      el.style.transform =
        "translate3d(" + s.tx.toFixed(2) + "px," + s.ty.toFixed(2) + "px,0) rotate(" + rot.toFixed(2) + "deg) scale(" + (1 + v * 0.24).toFixed(3) + ")";
      el.style.fontVariationSettings = "'wght' " + Math.round(U.clamp(500 + v * 300, 500, 800));
      el.style.color = "color-mix(in srgb, var(--accent) " + Math.round(U.clamp(v, 0, 1) * 100) + "%, var(--fg))";
    }
  }

  function setFace(face) {
    title.setAttribute("data-face", face);
    U.qsa("[data-face-btn]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-face-btn") === face));
    });
    U.store.set("site-face", face);
    measure();
  }

  S.headline = {
    init: function () {
      title = U.qs("[data-headline]");
      if (!title) return;

      U.qsa("[data-split]", title).forEach(split);
      letters = U.qsa(".ch", title);
      letters.forEach(function (el) { el.__s = { s: 0, v: 0, tx: 0, ty: 0, dx: 0, dy: 0, on: false }; });
      measure();
      window.addEventListener("resize", measure);

      U.qsa("[data-face-btn]").forEach(function (b) {
        b.addEventListener("click", function () { setFace(b.getAttribute("data-face-btn")); });
      });
      var saved = U.normalizeFace(U.store.get("site-face") || document.documentElement.getAttribute("data-face"));
      setFace(saved);

      S.engine.add(frame);
    }
  };
})(window.Site = window.Site || {});
