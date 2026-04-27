// ════════════════════════════════════════════════════════════════════
// NVitschDEV Blog — app.js
// ════════════════════════════════════════════════════════════════════

// Theme toggle
(function() {
    const btn = document.getElementById('theme-toggle');
    let isLight = localStorage.getItem('journal-theme') === 'light';
    function apply() {
        document.body.classList.toggle('light', isLight);
        btn.textContent = isLight ? '🌑 Dark' : '☀ Light';
    }
    apply();
    btn.addEventListener('click', function() {
        isLight = !isLight;
        localStorage.setItem('journal-theme', isLight ? 'light' : 'dark');
        apply();
    });
})();

// ════════════════════════════════════════════════════════════════════
// Blog posts
// Add an "order" field to control display sequence manually.
// Lower numbers appear first. Posts without an "order" field fall
// to the end, sorted by date descending as a tiebreaker.
// ════════════════════════════════════════════════════════════════════

const posts = [
    {
        order: 1,                          // ← set this to control position
        slug: "first-entry-hello-world",
        title: "Hello, world! (Again...)",
        excerpt: "Starting a journal. Less manifesto, more sketchbook — what I'm building, breaking, and reading this week.",
        date: "2026-04-26",
        readingMinutes: 1,
        tags: ["Hi", "writing"],
        content: "Every developer eventually starts a blog. Then deletes it. Then starts another one. This is mine — Notes from the workbench. — and I'm trying something different: no audience, no SEO, no engagement metrics. Just notes from the workbench.\n\n## Why bother\n\nI forget things. A lot. Every time I solve a tricky shell problem or finally tame a Godot quirk, I tell myself I'll remember. I never do. So this is partly a second brain, partly an excuse to write more carefully than my git commit messages allow.\n\n## What you'll find here\n\n- **Build logs** — what I'm working on, what's stuck\n- **Linux notes** — Arch tips, dotfile experiments, terminal tooling\n- **3D & video** — Blender scenes, Resolve workflows, render disasters\n- **Reading** — books, papers, weird corners of the internet\n- **My life** — Stories worthy of sharing\n\n> The best software is the one that a developer created with passion.\n\nThat's the bar. See you in the next entry."
    },
    {
        order: 2,                          // ← set this to control position
        slug: "arch-usage-guide_1",
        title: "How to use Arch Linux; guide number 1:",
        excerpt: "Probably the first guide on using Arch Linux. I'm not a Linux expert, but I've been using it for years. This is a quick overview of the basics.",
        date: "2026-04-27",
        readingMinutes: 2,
        tags: ["Linux", "Arch", "Guides"],
        content: "Arch Linux is a great operating system. You always get the new features, newest security updates and even the newest bugs (I am just kidding, obviously).\n" +
            "## My first guide on using Arch Linux\n" +
            "```bash\n" +
            "echo My first guide on using Arch Linux\n" +
            "```\n" +
            "This was a terminal command; it shows you how to print messages in Arch Linux (or any other distro for that matter).\n" +
            "## After the installation\n" +
            "After finishing the Arch Linux installation you will have (in most scenarios at least) learned a lot. I will go over the basics:\n" +
            "```bash\n" +
            "sudo\n" +
            "## gives administrator rights\n" +
            "```\n" +
            "sudo (or su if written alone) will give you administrator rights. If you have used Windows or macOS you will recognise it as a popup that said something like ***Run as Administrator*** or ***You do not have permission to open the application \"Application Name\".*** Sudo is the central command in Linux and can be very dangerous (realistically this won't be the case), that is why you shouldn't run commands you find on the internet without checking them first.\n" +
            "```bash\n" +
            "sudo pacman -S\n" +
            "or pacman -S\n" +
            "## you can use this command to install apps: pacman -S appname\n" +
            "```\n" +
            "You probably used this command to install a lot of things in Arch Linux (especially if you didn't use archinstall). Pacman is the ***package manager*** for Arch Linux, think of it like the App Store for Arch Linux. To see all your installed applications and dependencies (dependencies are apps that your apps need to use to function) you can run this command:\n" +
            "```bash\n" +
            "pacman -Q ## No administrator rights are needed here.\n" +
            "```\n" +
            "If you want to remove an application you can use this command:\n" +
            "```bash\n" +
            "sudo pacman -R\n" +
            "## Usage: sudo pacman -R applicationname\n" +
            "sudo pacman -Rs\n" +
            "## Same usage but also removes unused dependencies\n" +
            "sudo pacman -Rns\n" +
            "## Same usage but also removes configuration files\n" +
            "```\n" +
            "The sole reason why one would tell you not to use -Rns for every uninstallation is that it could hypothetically uninstall an important dependency (this never happened to me but feel free to decide for yourself).\n" +
            "## System & Update\n" +
            "Those are just a few commands you need to remember:\n" +
            "```bash\n" +
            "sudo pacman -Syy\n" +
            "## syncs the databases\n" +
            "sudo pacman -Syu\n" +
            "## update\n" +
            "sudo pacman -Syyu\n" +
            "## syncs the databases and updates\n" +
            "```\n" +
            "## The AUR\n" +
            "The [AUR](https://aur.archlinux.org) (Arch User Repository) is probably a reason why you installed Arch Linux. It is one of the biggest package repos for Linux but the biggest caveat is that the packages aren't being controlled. This is the reason why you should only download stuff that you think is safe.\n" +
            "The biggest mistake I see beginners make is just installing an AUR helper but not knowing what it does. So I decided to write it down.\n" +
            "It is basically like this:\n" +
            "```bash\n" +
            "git clone https://aur.archlinux.org/packagename.git ## get the installer \n" +
            "cd packagename ## go into the installer folder\n" +
            "makepkg -si ## run the installer\n" +
            "## Note: in order to use git clone you need to have base-devel and git installed; use pacman for this\n" +
            "```\n" +
            "As a quick summary on using the [AUR](https://aur.archlinux.org):\n" +
            " **Security** — Only download things that you trust\n" +
            " **Knowledge** — Try understanding the stuff that is happening, it will help you in the long run.\n" +
            "## AUR helpers\n" +
            "[AUR](https://aur.archlinux.org) helpers make your life easier. Instead of running all of these prior commands you can run paru (the helper) -S packagename like with pacman; all of the tags (the -S addition) are the same. The two most popular helpers are paru and yay. I recommend paru because it is newer and faster. In order to use them, you need to install them from the [AUR](https://aur.archlinux.org).\n" +
            "\n" +
            "---\n" +
            "I hope this helped you understand Arch Linux a little bit and I hope to see you in another article.\n" +
            "> If Bill Gates is the Devil then Linus Torvalds must be the Messiah. — Unknown author\n\n" +
            "> I finally understand why everybody calls Arch bleeding edge. In order to get it working you need to bleed first. — Me",
    },
];

// ════════════════════════════════════════════════════════════════════
// Helpers
// ════════════════════════════════════════════════════════════════════

/**
 * Returns posts sorted by their manual "order" field (ascending).
 * Posts without an order fall to the end, sorted by date descending.
 */
function getSortedPosts() {
    return [...posts].sort(function(a, b) {
        const aHasOrder = a.order != null;
        const bHasOrder = b.order != null;
        if (aHasOrder && bHasOrder) return a.order - b.order;
        if (aHasOrder) return -1;
        if (bHasOrder) return 1;
        // Fallback: newest date first
        return a.date < b.date ? 1 : -1;
    });
}

function getPostBySlug(slug) {
    return posts.find(function(p) { return p.slug === slug; });
}

function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// ════════════════════════════════════════════════════════════════════
// Markdown renderer
// ════════════════════════════════════════════════════════════════════

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

// ════════════════════════════════════════════════════════════════════
// Routing
// ════════════════════════════════════════════════════════════════════

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

// ════════════════════════════════════════════════════════════════════
// Renderers
// ════════════════════════════════════════════════════════════════════

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

// ════════════════════════════════════════════════════════════════════
// Init
// ════════════════════════════════════════════════════════════════════

window.addEventListener("popstate", function() {
    const match = location.pathname.match(/^\/post\/(.+)$/);
    if (match) showPost(match[1]); else showIndex();
});

(function() {
    const match = location.pathname.match(/^\/post\/(.+)$/);
    if (match) showPost(match[1]); else showIndex();
})();