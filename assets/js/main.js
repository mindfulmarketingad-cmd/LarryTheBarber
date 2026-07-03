/* =========================================================================
   Larry The Barber — site behavior
   ========================================================================= */

(function () {
  "use strict";

  /* ---- Wire every booking button straight to Booksy ---- */
  var BOOKSY_URL = "https://larry-thebarber.booksy.com";
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
      toggle.setAttribute("aria-expanded", links.classList.contains("is-open"));
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

  /* ---- Booking form (book.html only) ---- */
  function initBookingForm() {
    var form = document.getElementById("booking-form");
    if (!form) return;

    /* Service category filter */
    var catBtns = document.querySelectorAll(".cat-filter-btn");
    var serviceGroups = document.querySelectorAll(".service-group");
    catBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        catBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-cat");
        serviceGroups.forEach(function (g) {
          g.style.display = (cat === "all" || g.getAttribute("data-cat") === cat) ? "" : "none";
        });
      });
    });

    /* Service card selection */
    var serviceCards = document.querySelectorAll(".svc-pick");
    serviceCards.forEach(function (card) {
      card.addEventListener("click", function () {
        serviceCards.forEach(function (c) { c.classList.remove("selected"); });
        card.classList.add("selected");
        var hidden = document.getElementById("selected-service");
        if (hidden) hidden.value = card.getAttribute("data-service");
        var priceField = document.getElementById("service-price-display");
        if (priceField) priceField.textContent = card.getAttribute("data-price");
        /* Scroll to step 2 */
        var step2 = document.getElementById("step-details");
        if (step2) { step2.scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    });

    /* Form validation + submit */
    form.addEventListener("submit", function (e) {
      var service = document.getElementById("selected-service");
      if (!service || !service.value) {
        e.preventDefault();
        var err = document.getElementById("service-error");
        if (err) { err.style.display = "block"; }
        document.getElementById("step-service").scrollIntoView({ behavior: "smooth" });
        return;
      }
    });
  }

  /* ---- Inline date min (no past dates) ---- */
  function initDateMin() {
    var d = document.getElementById("pref-date");
    if (!d) return;
    var today = new Date();
    var mm = ("0" + (today.getMonth() + 1)).slice(-2);
    var dd = ("0" + today.getDate()).slice(-2);
    d.min = today.getFullYear() + "-" + mm + "-" + dd;
  }

  document.addEventListener("DOMContentLoaded", function () {
    initBooking();
    initImages();
    initNav();
    initReveal();
    initYear();
    initBookingForm();
    initDateMin();
  });
})();
