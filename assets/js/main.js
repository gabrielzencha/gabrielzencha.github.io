// Theme toggle (light / dark), remembered per browser
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");

  function current() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  if (btn) {
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }
})();

// Mobile navigation
(function () {
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

// Publication "abs" / "bib" toggles
document.querySelectorAll("[data-toggle]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var pub = btn.closest(".pub");
    var kind = btn.getAttribute("data-toggle");
    var target = pub.querySelector("." + kind);
    if (!target) return;
    // Close the sibling panel so only one is open at a time
    pub.querySelectorAll(".abstract, .bibtex").forEach(function (el) {
      if (el !== target) el.classList.remove("open");
    });
    target.classList.toggle("open");
  });
});

// Footer year
document.querySelectorAll(".year").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
