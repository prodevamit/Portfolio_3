/* ==========================================================================
   14 — NAV
   - scroll-progress line along the bottom of the nav pill
   - highlights the link of the section you're in
   - mobile menu button (closes on link click, Escape, or tap outside)
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  var nav, toggle, bar;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function frame(f) {
    var doc = document.documentElement;
    var total = doc.scrollHeight - f.vh;
    var p = total > 0 ? U.clamp((window.scrollY || doc.scrollTop) / total, 0, 1) : 0;
    bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
  }

  S.nav = {
    init: function () {
      nav = U.qs("[data-nav]");
      if (!nav) return;
      toggle = U.qs(".nav__toggle", nav);
      bar = U.qs("[data-progress]", nav);

      if (toggle) {
        toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
        U.qsa(".nav__links a", nav).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
        nav.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
        });
        document.addEventListener("click", function (e) {
          if (nav.classList.contains("is-open") && !nav.contains(e.target)) setOpen(false);
        });
      }

      if (bar) S.engine.add(frame);

      // current-section highlight
      if (typeof IntersectionObserver !== "undefined") {
        var links = {};
        U.qsa(".nav__links a", nav).forEach(function (a) { links[a.getAttribute("href")] = a; });
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            var a = links["#" + en.target.id];
            if (!a) return;
            if (en.isIntersecting) {
              Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); });
              a.setAttribute("aria-current", "true");
            }
          });
        }, { rootMargin: "-40% 0px -55% 0px" });
        ["work", "toolkit", "about", "contact"].forEach(function (id) {
          var s = document.getElementById(id);
          if (s) io.observe(s);
        });
      }
    }
  };
})(window.Site = window.Site || {});
