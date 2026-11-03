/* ==========================================================================
   99 — MAIN
   Starts everything, in order. Each module is wrapped so that if one ever
   fails the rest of the page keeps working.
   ========================================================================== */

(function (S) {
  "use strict";

  var order = [
    "content",   // 04 fill in name / role / city / links
    "reveal",    // 05 scroll fade-ins
    "headline",  // 06 magnetic letters + typeface switch
    "hero",      // 07 tilt card, spotlight, glows
    "cursor",    // 08 glass cursor
    "magnetic",  // 09 magnetic buttons
    "marquee",   // 10 type band
    "projects",  // 11 flex panels
    "ring",      // 12 3D ring
    "fold",      // 13 folding steps
    "nav",       // 14 progress line, menu, current section
    "theme"      // 15 colour theme
  ];

  order.forEach(function (name) {
    try {
      if (S[name] && S[name].init) S[name].init();
    } catch (err) {
      console.error("[site] " + name + " failed to start:", err);
    }
  });

  S.engine.start();
})(window.Site = window.Site || {});
