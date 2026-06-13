/* =========================================================================
   Larry The Barber — site behavior
   ========================================================================= */

/* -------------------------------------------------------------------------
   1) BOOKSY BOOKING CONFIG  ←★ EDIT THIS ONE LINE
   -------------------------------------------------------------------------
   Paste Larry's Booksy business profile URL below. Every "Book Online" /
   "Book Appointment" button on the site points here automatically.

   How to find it:
     • Log in to Booksy Biz  →  your business page on booksy.com
     • Copy the public link, e.g.
       https://booksy.com/en-us/123456_larry-the-barber_barber-shop_atlanta
   Until it's set, the buttons fall back to a Booksy search so nothing breaks.
   ------------------------------------------------------------------------- */
var BOOKSY_URL = "https://booksy.com/en-us/s/?query=Larry%20The%20Barber";

(function () {
  "use strict";

  /* ---- Wire every booking button to Booksy ---- */
  function initBooking() {
    var buttons = document.querySelectorAll(".js-book");
    for (var i = 0; i < buttons.length; i++) {
      var el = buttons[i];
      el.setAttribute("href", BOOKSY_URL);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  }

  /* ---- Graceful image placeholders ----
     Content images use data-photo (the expected filename) + data-label.
     If the real photo isn't in /assets/images yet, show a labeled
     placeholder so the layout stays intact and you know what to drop in. */
  function buildPlaceholder(img) {
    var label = img.getAttribute("data-label") || "Photo";
    var name = img.getAttribute("data-photo") || (img.getAttribute("src") || "").split("/").pop();
    var ph = document.createElement("div");
    ph.className = "img-placeholder";
    ph.innerHTML =
      '<div class="ph-icon">✂</div>' +
      '<div class="ph-name">' + name + "</div>" +
      '<div class="ph-hint">' + label + "</div>";
    if (img.parentNode) img.parentNode.replaceChild(ph, img);
  }
  function initImages() {
    var imgs = document.querySelectorAll("img[data-photo]");
    for (var i = 0; i < imgs.length; i++) {
      (function (img) {
        img.addEventListener("error", function () { buildPlaceholder(img); });
        // Catch images that already failed before listener attached.
        if (img.complete && img.naturalWidth === 0) buildPlaceholder(img);
      })(imgs[i]);
    }
  }

  /* ---- Mobile nav toggle ---- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      links.classList.toggle("is-open");
    });
    var anchors = links.querySelectorAll("a");
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener("click", function () { links.classList.remove("is-open"); });
    }
  }

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add("is-visible");
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    for (var j = 0; j < els.length; j++) obs.observe(els[j]);
  }

  /* ---- Footer year ---- */
  function initYear() {
    var y = document.querySelector(".js-year");
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initBooking();
    initImages();
    initNav();
    initReveal();
    initYear();
  });
})();
