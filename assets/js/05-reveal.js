/* ==========================================================================
   05 — REVEAL
   Fades and lifts every .reveal element in as it scrolls into view.
   (The hidden starting state only applies when <html class="js">.)
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  S.reveal = {
    init: function () {
      var els = U.qsa(".reveal");
      if (U.reduced() || typeof IntersectionObserver === "undefined") {
        els.forEach(function (el) { el.classList.add("is-in"); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
      els.forEach(function (el) { io.observe(el); });
    }
  };
})(window.Site = window.Site || {});
