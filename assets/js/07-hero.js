/* ==========================================================================
   07 — HERO
   Pointer-reactive hero: tilting ID card with a moving glare, a soft
   spotlight that follows the cursor, and the background glows (which also
   drift at different speeds as you scroll, for depth).
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var hero, spot, tilt, glare, page, orbs = [];
  var mx = 0, my = 0;

  function frame(f, p) {
    if (f.reduced) return;
    var k = 1 - Math.exp(-f.dt * 5);
    var hr = hero.getBoundingClientRect();

    var inHero =
      p.inside && p.x >= hr.left && p.x <= hr.right && p.y >= hr.top && p.y <= hr.bottom;
    var tx = inHero ? U.clamp(((p.sx - hr.left) / hr.width) * 2 - 1, -1, 1) : 0;
    var ty = inHero ? U.clamp(((p.sy - hr.top) / hr.height) * 2 - 1, -1, 1) : 0;
    mx += (tx - mx) * k;
    my += (ty - my) * k;

    if (tilt) tilt.style.transform = "perspective(900px) rotateX(" + (-my * 7).toFixed(2) + "deg) rotateY(" + (mx * 9).toFixed(2) + "deg)";
    if (glare) glare.style.background = "radial-gradient(circle at " + (50 + mx * 40).toFixed(1) + "% " + (30 + my * 40).toFixed(1) + "%, rgba(255,255,255,.24), transparent 55%)";

    if (spot) {
      spot.style.opacity = inHero ? "1" : "0";
      if (inHero) spot.style.background = "radial-gradient(520px circle at " + (p.sx - hr.left).toFixed(0) + "px " + (p.sy - hr.top).toFixed(0) + "px, rgba(255,255,255,.1), transparent 62%)";
    }

    var scrolled = -page.getBoundingClientRect().top;
    for (var i = 0; i < orbs.length; i++) {
      var o = orbs[i];
      if (o.par) o.el.style.transform = "translate3d(" + (mx * o.par[0]).toFixed(1) + "px," + (my * o.par[1]).toFixed(1) + "px,0)";
      o.el.style.translate = "0 " + (scrolled * -o.depth).toFixed(1) + "px";
    }
  }

  S.hero = {
    init: function () {
      hero = U.qs("[data-hero]");
      page = U.qs(".page");
      if (!hero || !page) return;
      spot = U.qs("[data-spot]");
      tilt = U.qs("[data-tilt]");
      glare = U.qs("[data-glare]");

      orbs = U.qsa(".orb-wrap").map(function (el) {
        var par = el.getAttribute("data-par");
        return {
          el: el,
          depth: parseFloat(el.getAttribute("data-depth")) || 0,
          par: par ? par.split(",").map(parseFloat) : null
        };
      });

      S.engine.add(frame);
    }
  };
})(window.Site = window.Site || {});
