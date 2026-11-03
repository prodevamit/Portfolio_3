/* ==========================================================================
   02 — UTILS
   Tiny helpers shared by every module. Exposed as Site.utils.
   ========================================================================== */

(function (S) {
  "use strict";

  var reducedQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var fineQuery = window.matchMedia ? window.matchMedia("(hover: hover) and (pointer: fine)") : null;

  S.utils = {
    clamp: function (v, a, b) { return v < a ? a : v > b ? b : v; },
    lerp: function (a, b, t) { return a + (b - a) * t; },

    /** one element / many elements */
    qs: function (sel, root) { return (root || document).querySelector(sel); },
    qsa: function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); },

    /** visitor prefers less motion? */
    reduced: function () { return !!(reducedQuery && reducedQuery.matches); },
    /** mouse / trackpad (hover capable) device? */
    fine: function () { return !!(fineQuery && fineQuery.matches); },

    normalizeTheme: function (value) {
      if (value === "aurora" || value === "sunset" || value === "ocean") return value;
      return "aurora";
    },
    normalizeFace: function (value) {
      if (value === "grotesk" || value === "serif" || value === "mono") return value;
      return "grotesk";
    },

    /** safe localStorage (private modes can throw) */
    store: {
      get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
    }
  };
})(window.Site = window.Site || {});
