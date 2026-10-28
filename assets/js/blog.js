// Builds the blog sidebar, the post index, and prev/next links from blog/posts.js
(function () {
  var posts = (window.BLOG_POSTS || []).slice();
  var categories = window.BLOG_CATEGORIES || {};

  // Newest first; drafts (no date) last
  posts.sort(function (a, b) {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });

  var current = location.pathname.split("/").pop().replace(/\.html$/, "");

  function formatDate(iso) {
    if (!iso) return "Draft";
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text != null) node.textContent = text;
    return node;
  }

  function countBy(cat) {
    return posts.filter(function (p) { return p.category === cat; }).length;
  }

  // ---------- Sidebar ----------
  var sidebar = document.getElementById("blog-sidebar");
  if (sidebar) {
    sidebar.appendChild(el("div", { class: "side-heading" }, "categories"));
    var catList = el("ul", { class: "side-cats" });
    var all = el("li");
    all.appendChild(el("a", { href: "index.html", "data-cat": "" }, "All posts"));
    all.firstChild.appendChild(el("span", { class: "count" }, String(posts.length)));
    catList.appendChild(all);
    Object.keys(categories).forEach(function (cat) {
      var n = countBy(cat);
      if (!n) return;
      var li = el("li");
      var a = el("a", { href: "index.html#" + cat, "data-cat": cat }, categories[cat]);
      a.appendChild(el("span", { class: "count" }, String(n)));
      li.appendChild(a);
      catList.appendChild(li);
    });
    sidebar.appendChild(catList);

    var details = el("details", { class: "side-posts" });
    details.open = window.matchMedia("(min-width: 721px)").matches;
    details.appendChild(el("summary", { class: "side-heading" }, "all posts"));
    var lastYear = null;
    var list = el("ul");
    posts.forEach(function (p) {
      var year = p.date ? p.date.slice(0, 4) : "Drafts";
      if (year !== lastYear) {
        list.appendChild(el("li", { class: "side-year" }, year));
        lastYear = year;
      }
      var li = el("li");
      var a = el("a", { href: p.slug + ".html" }, p.title);
      if (p.slug === current) a.className = "current";
      li.appendChild(a);
      list.appendChild(li);
    });
    details.appendChild(list);
    sidebar.appendChild(details);
  }

  // ---------- Post index (blog/index.html) ----------
  var index = document.getElementById("post-index");
  var heading = document.getElementById("post-index-heading");
  function renderIndex() {
    if (!index) return;
    var cat = decodeURIComponent(location.hash.slice(1));
    if (!categories[cat]) cat = "";
    index.innerHTML = "";
    if (heading) heading.textContent = cat ? categories[cat] : "all posts";
    document.querySelectorAll(".side-cats a").forEach(function (a) {
      a.classList.toggle("current", a.getAttribute("data-cat") === cat);
    });
    posts
      .filter(function (p) { return !cat || p.category === cat; })
      .forEach(function (p) {
        var li = el("li");
        var h = el("h3");
        h.appendChild(el("a", { href: p.slug + ".html" }, p.title));
        li.appendChild(h);
        var meta = [formatDate(p.date), categories[p.category]].concat(p.tags || []).join(" · ");
        li.appendChild(el("div", { class: "post-meta" }, meta));
        if (p.summary) li.appendChild(el("p", { class: "muted small" }, p.summary));
        index.appendChild(li);
      });
  }
  renderIndex();
  window.addEventListener("hashchange", renderIndex);

  // ---------- Post pages: meta line + prev/next ----------
  var i = posts.findIndex(function (p) { return p.slug === current; });
  if (i === -1) return;
  var post = posts[i];

  var metaEl = document.getElementById("post-meta");
  if (metaEl) {
    metaEl.textContent = [formatDate(post.date), categories[post.category]].concat(post.tags || []).join(" · ");
  }

  var nav = document.getElementById("post-nav");
  if (nav) {
    var newer = posts[i - 1];
    var older = posts[i + 1];
    if (newer) {
      var n = el("a", { href: newer.slug + ".html", class: "newer" });
      n.appendChild(el("span", { class: "dir" }, "← newer"));
      n.appendChild(el("span", null, newer.title));
      nav.appendChild(n);
    }
    if (older) {
      var o = el("a", { href: older.slug + ".html", class: "older" });
      o.appendChild(el("span", { class: "dir" }, "older →"));
      o.appendChild(el("span", null, older.title));
      nav.appendChild(o);
    }
  }
})();
