/* ==========================================================================
   10 — MARQUEE (type band)
   Two rows of big type moving in opposite directions. They speed up in the
   direction you scroll and the whole band skews with your scroll speed.
   The word list is cloned automatically so the loop never shows a gap.
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var band, rows = [];
  var lastTop = null, vel = 0;

  function fill() {
    rows.forEach(function (r) {
      var w = r.list.offsetWidth;
      if (!w) return;
      r.w = w;
      var need = Math.ceil((window.innerWidth * 1.2) / w) + 1;
      while (r.el.children.length < need) {
        var c = r.list.cloneNode(true);
        c.removeAttribute("data-row-list");
        c.setAttribute("aria-hidden", "true");
        r.el.appendChild(c);
      }
    });
  }

  function frame(f) {
    var br = band.getBoundingClientRect();
    var d = lastTop === null ? 0 : lastTop - br.top; // + when scrolling down
    lastTop = br.top;
    vel += (U.clamp(d, -60, 60) - vel) * (1 - Math.exp(-f.dt * 8));

    if (br.bottom < -80 || br.top > f.vh + 80) return;

    var base = f.reduced ? 0 : 70 * f.dt;
    var boost = f.reduced ? 0 : vel * 0.9;

    rows.forEach(function (r) {
      var x = r.x + r.dir * (base + boost); // dir -1 moves left, +1 moves right
      if (r.w) { x = x % r.w; if (x > 0) x -= r.w; }
      r.x = x;
      r.el.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0)";
    });

    var skew = f.reduced ? 0 : U.clamp(-vel * 0.15, -9, 9);
    band.style.transform = "rotate(-2.4deg) skewX(" + skew.toFixed(2) + "deg)";
  }

  S.marquee = {
    init: function () {
      band = U.qs("[data-band]");
      if (!band) return;
      rows = U.qsa("[data-row]", band).map(function (el) {
        // data-row="-1" => moves left (outline row), "1" => moves right
        return { el: el, list: U.qs("[data-row-list]", el), dir: parseInt(el.getAttribute("data-row"), 10) || -1, x: 0, w: 0 };
      });
      fill();
      window.addEventListener("resize", fill);
      // fonts load after first paint and change the width, so measure again
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fill);
      S.engine.add(frame);
    }
  };
})(window.Site = window.Site || {});
