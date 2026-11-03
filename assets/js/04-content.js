/* ==========================================================================
   04 — CONTENT
   Writes the values from 01-config.js into the page:
     data-bind="name|role|city|email|initials"   -> element text
     data-bind-href="email"                      -> mailto: link
     data-social="github|linkedin|dribbble"      -> link address
     data-year                                   -> current year
   ========================================================================== */

(function (S) {
  "use strict";
  var U = S.utils;

  function initialsOf(name) {
    var parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "";
    var first = parts[0].charAt(0);
    var last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase();
  }

  S.content = {
    init: function () {
      var cfg = window.SITE_CONFIG || {};
      var values = {
        name: cfg.name,
        role: cfg.role,
        city: cfg.city,
        email: cfg.email,
        initials: cfg.initials || initialsOf(cfg.name || "")
      };

      U.qsa("[data-bind]").forEach(function (el) {
        var v = values[el.getAttribute("data-bind")];
        if (v) el.textContent = v;
      });

      U.qsa("[data-bind-href]").forEach(function (el) {
        if (cfg.email) el.setAttribute("href", "mailto:" + cfg.email);
      });

      U.qsa("[data-social]").forEach(function (el) {
        var url = cfg.social && cfg.social[el.getAttribute("data-social")];
        if (!url || url === "#") return;
        el.setAttribute("href", url);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      });

      U.qsa("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

      if (cfg.name) document.title = cfg.name + (cfg.role ? " — " + cfg.role : "");
    }
  };
})(window.Site = window.Site || {});
