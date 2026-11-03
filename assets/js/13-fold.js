/* ==========================================================================
   13 — FOLD (about steps)
   Opens one step at a time. The paper-fold look is CSS (rotateX +
   grid-template-rows, in 05-components.css); this file only toggles state
   and keeps closed content out of the tab order and screen readers.
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var folds = [];

  function set(f, open) {
    f.el.classList.toggle("is-open", open);
    f.head.setAttribute("aria-expanded", String(open));
    f.body.toggleAttribute("inert", !open);
  }

  S.fold = {
    init: function () {
      folds = U.qsa("[data-fold]").map(function (el) {
        return { el: el, head: U.qs(".fold__head", el), body: U.qs(".fold__body", el) };
      });

      folds.forEach(function (f) {
        set(f, f.el.classList.contains("is-open"));
        f.head.addEventListener("click", function () {
          var willOpen = !f.el.classList.contains("is-open");
          folds.forEach(function (o) { set(o, false); });
          if (willOpen) set(f, true);
        });
      });
    }
  };
})(window.Site = window.Site || {});
