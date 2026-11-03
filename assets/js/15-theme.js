/* ==========================================================================
   15 — THEME
   Aurora / Sunset / Ocean colour switch in the footer. The choice is
   remembered. (The colours themselves live in 01-tokens.css.)
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    U.qsa("[data-theme-btn]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-theme-btn") === theme));
    });
    U.store.set("site-theme", theme);
  }

  S.theme = {
    init: function () {
      var btns = U.qsa("[data-theme-btn]");
      btns.forEach(function (b) {
        b.addEventListener("click", function () { apply(b.getAttribute("data-theme-btn")); });
      });

      var current = U.normalizeTheme(U.store.get("site-theme") || document.documentElement.getAttribute("data-theme") || "aurora");
      apply(current);
    }
  };
})(window.Site = window.Site || {});
