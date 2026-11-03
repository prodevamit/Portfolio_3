/* ==========================================================================
   11 — PROJECTS (flex panels)
   One panel is open at a time. Mouse: hover (with a tiny delay so the
   layout doesn't flicker while it grows). Touch: tap. Keyboard: arrow keys.
   The growing itself is a CSS flex transition (05-components.css).
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var panels = [], timer = 0;

  function activate(i, focus) {
    panels.forEach(function (p, n) {
      var on = n === i;
      p.el.classList.toggle("is-active", on);
      p.hit.setAttribute("aria-expanded", String(on));
    });
    if (focus) panels[i].hit.focus();
  }

  S.projects = {
    init: function () {
      panels = U.qsa("[data-panel]").map(function (el) {
        return { el: el, hit: U.qs(".panel__hit", el) };
      });
      if (!panels.length) return;

      panels.forEach(function (p, i) {
        p.hit.addEventListener("click", function () { activate(i); });

        p.hit.addEventListener("pointerenter", function (e) {
          if (e.pointerType !== "mouse") return;
          clearTimeout(timer);
          timer = setTimeout(function () { activate(i); }, 90);
        });
        p.hit.addEventListener("pointerleave", function () { clearTimeout(timer); });

        p.hit.addEventListener("keydown", function (e) {
          var next = null;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % panels.length;
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + panels.length) % panels.length;
          if (e.key === "Home") next = 0;
          if (e.key === "End") next = panels.length - 1;
          if (next === null) return;
          e.preventDefault();
          activate(next, true);
        });
      });
    }
  };
})(window.Site = window.Site || {});
