// Blog posts — edit this array to add or update entries.

const posts = [
  {
    slug: "arch-survived-the-update",
    title: "Arch survived the update. Barely.",
    excerpt: "Ran pacman -Syu after two weeks of procrastinating. Everything broke. Then it didn't. A story in three acts.",
    date: "2026-04-26",
    readingMinutes: 4,
    tags: ["linux", "arch", "pacman"],
    content: "Two weeks of ignored update notifications. The little red dot mocking me every time I opened a terminal. Fine. Let's do it.\n\n## Act I — The Update\n\n```bash\nsudo pacman -Syu\n```\n\n316 packages. Of course it's 316 packages. I made a coffee.\n\n## Act II — The Breaking\n\nBooted into a blank screen. Classic. Turns out **linux-firmware** and my GPU driver had a disagreement. The kind of disagreement where neither side talks to the other and you're left staring at a cursor that doesn't blink.\n\nDropped to a TTY, which still worked — small mercies.\n\n```bash\nsudo pacman -S nvidia-dkms linux-headers\nsudo mkinitcpio -P\n```\n\n> When in doubt, rebuild the initramfs. This is the way.\n\n## Act III — The Not Breaking\n\nRebooted. Desktop came up. Everything fine. The two weeks of dread amounted to about 40 minutes of actual work.\n\n## Lessons\n\n- **Don't ignore updates for two weeks.** You know this. You keep forgetting it.\n- Keep a live USB nearby. Not because you'll need it — but because having it means you won't.\n- `journalctl -xb` is your best friend when things go sideways.\n\nNext time I'll update weekly. I say this every time."
  },
  {
    slug: "first-entry-hello-world",
    title: "Hello, world. Again.",
    excerpt: "Starting a journal. Less manifesto, more sketchbook — what I'm building, breaking, and reading this week.",
    date: "2026-04-25",
    readingMinutes: 3,
    tags: ["meta", "writing"],
    content: "Every developer eventually starts a blog. Then deletes it. Then starts another one. This is mine — version *n* — and I'm trying something different: no audience, no SEO, no engagement metrics. Just notes from the workbench.\n\n## Why bother\n\nI forget things. A lot. Every time I solve a tricky shell problem or finally tame a Godot quirk, I tell myself I'll remember. I never do. So this is partly a second brain, partly an excuse to write more carefully than my git commit messages allow.\n\n## What you'll find here\n\n- **Build logs** — what I'm working on, what's stuck\n- **Linux notes** — Arch tips, dotfile experiments, terminal tooling\n- **3D & video** — Blender scenes, Resolve workflows, render disasters\n- **Reading** — books, papers, weird corners of the internet\n\n> The best software has both elegance under the hood and beauty on the surface.\n\nThat's the bar. See you in the next entry."
  },
  {
    slug: "tuesday-tinkering-ptodo",
    title: "Tuesday tinkering: ptodo gets a config file",
    excerpt: "Spent the evening adding a TOML config to ptodo. Sounds small. Took four hours and one existential crisis.",
    date: "2026-04-22",
    readingMinutes: 5,
    tags: ["python", "ptodo", "linux"],
    content: "Today's quest: let users theme **ptodo** without recompiling. Should be trivial. It was not.\n\n## The plan\n\nA simple `~/.config/ptodo/config.toml` with colors, keybindings, and the date format. Read it once at startup, fall back to defaults, ship it.\n\n```toml\n[theme]\naccent = \"#e8b16a\"\nmuted = \"#9a9489\"\n\n[keys]\ntoggle = \"space\"\ndelete = \"d\"\n```\n\n## The reality\n\nPython's stdlib finally has `tomllib` (3.11+) — great. But curses doesn't care about hex colors. It wants `init_color` with values 0-1000. So now I'm writing a hex to curses-RGB converter at 1am. Classic.\n\n## What worked\n\nI cached the parsed config in a frozen dataclass and exposed a single `load_config()` entry point. No globals, no surprises.\n\n```python\n@dataclass(frozen=True)\nclass Config:\n    accent: tuple\n    muted: tuple\n    keys: object\n```\n\nTomorrow: writing tests for the fallback path. Or Blender. Probably Blender."
  },
  {
    slug: "blender-donut-tax",
    title: "Paying the Blender donut tax",
    excerpt: "Twelve years late, I finally did the donut tutorial. Notes on what I learned and what I'd skip.",
    date: "2026-04-18",
    readingMinutes: 4,
    tags: ["3d", "blender"],
    content: "Everyone says you have to pay the **donut tax** before Blender clicks. They're not wrong.\n\n## What I underestimated\n\nGeometry is the easy part. The real lesson is in the *workflow* — how often you flip between edit mode and object mode, how shortcuts compound, how shading nodes feel like a tiny visual programming language wedged inside a 3D app.\n\n## What I'd skip\n\nThe intro setup videos. Just install Blender, set your theme, and start modeling. You'll find the buttons faster than you think.\n\n## What surprised me\n\nHow much **lighting** matters. A mediocre model under good lighting looks better than a great model under bad lighting. Three-point lighting is not a cliche — it's a survival skill.\n\nNext: low-poly diorama for the portfolio. A tiny Arch Linux desk scene, because of course."
  }
];

// Helpers
function getSortedPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}
function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Markdown renderer
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inline(s) {
  let out = escapeHtml(s);
  out = out.replace(/`([^`]+)`/g, function(_, c) { return "<code>" + c + "</code>"; });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(_, t, u) {
    return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + "</a>";
  });
  return out;
}
function renderMarkdown(md) {
  const lines = md.split("\n");
  const html = [];
  let i = 0;
  let inList = null;
  const closeList = function() {
    if (inList) { html.push("</" + inList + ">"); inList = null; }
  };
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      closeList();
      const lang = line.slice(3).trim();
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { buf.push(lines[i]); i++; }
      i++;
      html.push("<pre><code" + (lang ? ' class="lang-' + lang + '"' : "") + ">" + escapeHtml(buf.join("\n")) + "</code></pre>");
      continue;
    }
    const hMatch = /^(#{1,4})\s+(.*)$/.exec(line);
    if (hMatch) {
      closeList();
      const level = hMatch[1].length;
      html.push("<h" + level + ">" + inline(hMatch[2]) + "</h" + level + ">");
      i++; continue;
    }
    if (/^---+$/.test(line.trim())) {
      closeList(); html.push("<hr/>"); i++; continue;
    }
    if (line.startsWith("> ")) {
      closeList();
      const buf = [];
      while (i < lines.length && lines[i].startsWith("> ")) { buf.push(lines[i].slice(2)); i++; }
      html.push("<blockquote>" + inline(buf.join(" ")) + "</blockquote>");
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      if (inList !== "ul") { closeList(); html.push("<ul>"); inList = "ul"; }
      html.push("<li>" + inline(line.replace(/^[-*]\s+/, "")) + "</li>");
      i++; continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      if (inList !== "ol") { closeList(); html.push("<ol>"); inList = "ol"; }
      html.push("<li>" + inline(line.replace(/^\d+\.\s+/, "")) + "</li>");
      i++; continue;
    }
    if (line.trim() === "") { closeList(); i++; continue; }
    closeList();
    const buf = [line]; i++;
    while (i < lines.length && lines[i].trim() !== "" && !/^(#{1,4}\s|>\s|[-*]\s|\d+\.\s|```|---+$)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    html.push("<p>" + inline(buf.join(" ")) + "</p>");
  }
  closeList();
  return html.join("\n");
}

// Routing
function showIndex() {
  document.getElementById("page-index").classList.remove("hidden");
  document.getElementById("page-post").classList.add("hidden");
  document.getElementById("page-404").classList.add("hidden");
  document.getElementById("nav-back").classList.add("hidden");
  document.title = "Journal \u00b7 NVitschDEV \u2014 Notes from the workbench";
  try { history.pushState(null, "", "/"); } catch(e) {}
  renderIndex();
}
function showPost(slug) {
  const post = getPostBySlug(slug);
  if (!post) { show404(); return; }
  document.getElementById("page-index").classList.add("hidden");
  document.getElementById("page-post").classList.remove("hidden");
  document.getElementById("page-404").classList.add("hidden");
  document.getElementById("nav-back").classList.remove("hidden");
  document.title = post.title + " \u00b7 NVitschDEV Journal";
  try { history.pushState(null, "", "/post/" + slug); } catch(e) {}
  window.scrollTo({ top: 0, behavior: "instant" });
  renderPost(post);
}
function show404() {
  document.getElementById("page-index").classList.add("hidden");
  document.getElementById("page-post").classList.add("hidden");
  document.getElementById("page-404").classList.remove("hidden");
  document.getElementById("nav-back").classList.add("hidden");
}

// Renderers
function renderIndex() {
  const sorted = getSortedPosts();
  document.getElementById("entry-count").textContent = sorted.length + " entries";
  document.getElementById("footer-year").textContent = "\u00a9 " + new Date().getFullYear() + " NVitschDEV";
  const grid = document.getElementById("posts-grid");
  grid.innerHTML = sorted.map(function(p, i) {
    return '<div class="post-card anim-fade-up" style="animation-delay:' + (i * 90) + 'ms" onclick="showPost(\'' + p.slug + '\')">'
      + '<div class="card-meta">'
      + '<span class="card-index">' + String(i + 1).padStart(2, "0") + '</span>'
      + '<span class="card-sep"></span>'
      + '<time class="card-date">' + formatDate(p.date) + '</time>'
      + '</div>'
      + '<h2 class="card-title">' + escapeHtml(p.title) + '</h2>'
      + '<p class="card-excerpt">' + escapeHtml(p.excerpt) + '</p>'
      + '<div class="card-footer">'
      + '<div class="card-tags">' + p.tags.map(function(t) { return '<span class="tag">' + escapeHtml(t) + '</span>'; }).join("") + '</div>'
      + '<span class="card-read">' + p.readingMinutes + ' min read \u2192</span>'
      + '</div></div>';
  }).join("");
}
function renderPost(post) {
  const all = getSortedPosts();
  const idx = all.findIndex(function(p) { return p.slug === post.slug; });
  const prev = all[idx + 1];
  const next = all[idx - 1];
  document.getElementById("post-header").innerHTML =
    '<div class="post-meta-row"><time>' + formatDate(post.date) + '</time><span class="post-meta-sep"></span><span>' + post.readingMinutes + ' min read</span></div>'
    + '<h1 class="post-title">' + escapeHtml(post.title) + '</h1>'
    + '<p class="post-excerpt">' + escapeHtml(post.excerpt) + '</p>'
    + '<div class="post-tags">' + post.tags.map(function(t) { return '<span class="tag">' + escapeHtml(t) + '</span>'; }).join("") + '</div>';
  document.getElementById("post-body").innerHTML = renderMarkdown(post.content);
  document.getElementById("post-pagination").innerHTML =
    '<div>' + (prev ? '<div class="pagination-link" onclick="showPost(\'' + prev.slug + '\')" style="cursor:pointer"><p class="pagination-label">\u2190 previous</p><p class="pagination-title">' + escapeHtml(prev.title) + '</p></div>' : '<span></span>') + '</div>'
    + '<div class="pagination-next">' + (next ? '<div class="pagination-link" onclick="showPost(\'' + next.slug + '\')" style="cursor:pointer"><p class="pagination-label">next \u2192</p><p class="pagination-title">' + escapeHtml(next.title) + '</p></div>' : '<span></span>') + '</div>';
}

// Init
window.addEventListener("popstate", function() {
  const match = location.pathname.match(/^\/post\/(.+)$/);
  if (match) showPost(match[1]); else showIndex();
});
(function() {
  const match = location.pathname.match(/^\/post\/(.+)$/);
  if (match) showPost(match[1]); else showIndex();
})();
