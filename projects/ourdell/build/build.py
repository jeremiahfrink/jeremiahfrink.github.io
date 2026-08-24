#!/usr/bin/env python3
"""Build the Dell K-12 State Education Landscape site from Word profiles.
Pure HTML/CSS core; search.js is a removable enhancement layer.
"""
import json, os, re, subprocess, html as htmllib
from bs4 import BeautifulSoup, NavigableString

ROOT = "/home/claude/site"
UP = "/mnt/user-data/uploads"
OUT = os.path.join(ROOT, "dist")
os.makedirs(os.path.join(OUT, "states"), exist_ok=True)
os.makedirs(os.path.join(OUT, "assets"), exist_ok=True)

STATES = [
    # (file stem, display name, slug, abbr, status)
    ("State_Profile_Connecticut", "Connecticut", "connecticut", "CT", "complete"),
    ("State_Profile_Maine", "Maine", "maine", "ME", "complete"),
    ("State_Profile_Maryland", "Maryland", "maryland", "MD", "complete"),
    ("State_Profile_Massachusetts", "Massachusetts", "massachusetts", "MA", "complete"),
    ("State_Profile_NewHampshire", "New Hampshire", "new-hampshire", "NH", "complete"),
    ("State_Profile_NewJersey", "New Jersey", "new-jersey", "NJ", "complete"),
    ("State_Profile_NewYork", "New York", "new-york", "NY", "complete"),
    ("State_Profile_Ohio", "Ohio", "ohio", "OH", "complete"),
    ("State_Profile_Pennsylvania", "Pennsylvania", "pennsylvania", "PA", "complete"),
    ("State_Profile_RhodeIsland", "Rhode Island", "rhode-island", "RI", "complete"),
    ("State_Profile_Vermont", "Vermont", "vermont", "VT", "complete"),
    ("State_Profile_Virginia", "Virginia", "virginia", "VA", "complete"),
]
DEVELOPING = [
    ("Washington, DC", "washington-dc", "DC", "Available by 8/25/2026"),
    ("New York City", "new-york-city", "NYC", "Available by 8/25/2026"),
    ("Delaware", "delaware", "DE", "In development (Batch 4)"),
    ("West Virginia", "west-virginia", "WV", "In development (Batch 4)"),
]
ALL_JURIS = [(n, s, a, "complete", "") for (_, n, s, a, _x) in STATES] + [
    (n, s, a, "developing", note) for (n, s, a, note) in DEVELOPING
]
ALL_JURIS.sort(key=lambda t: t[0])

MAP_NAME_TO_SLUG = {
    "Maine": "maine", "NewHampshire": "new-hampshire", "Vermont": "vermont",
    "Massachusetts": "massachusetts", "RhodeIsland": "rhode-island",
    "Connecticut": "connecticut", "NewYork": "new-york", "NewJersey": "new-jersey",
    "Pennsylvania": "pennsylvania", "Ohio": "ohio", "Maryland": "maryland",
    "Delaware": "delaware", "Virginia": "virginia", "WestVirginia": "west-virginia",
    "DC": "washington-dc",
}
MAP_ABBR = {
    "Maine": "ME", "NewHampshire": "NH", "Vermont": "VT", "Massachusetts": "MA",
    "RhodeIsland": "RI", "Connecticut": "CT", "NewYork": "NY", "NewJersey": "NJ",
    "Pennsylvania": "PA", "Ohio": "OH", "Maryland": "MD", "Delaware": "DE",
    "Virginia": "VA", "WestVirginia": "WV", "DC": "DC",
}
DEV_MAP = {"Delaware", "WestVirginia", "DC"}
# states large enough on the cropped map to carry their own label
LABELED = {"Maine", "NewHampshire", "Vermont", "NewYork", "Pennsylvania", "Ohio",
           "Virginia", "WestVirginia", "Massachusetts"}
LABEL_NUDGE = {  # manual centroid nudges (x, y)
    "Maine": (2, 8), "NewHampshire": (1, 8), "Vermont": (-2, -4),
    "Massachusetts": (-6, -1), "Virginia": (8, -6), "NewYork": (-4, 2),
}

def slugify(t):
    t = re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")
    return t or "section"

def read_docx_html(stem):
    r = subprocess.run(["pandoc", "-t", "html", "--wrap=none",
                        os.path.join(UP, stem + ".docx")],
                       capture_output=True, text=True, check=True)
    return r.stdout

def normalize(raw_html, display_name):
    """Normalize a profile (any of the three spec generations) to a common shape.
    Returns (header_meta, body_html, toc list, sections list for search)."""
    soup = BeautifulSoup(raw_html, "lxml")
    body = soup.body or soup

    # ---- header block: STATE PROFILE / name / subtitle / how-to ----
    meta = {"subtitle": "", "howto": ""}
    kill = []
    tops = [el for el in body.find_all(["p", "h1"], recursive=True)][:6]
    for el in tops:
        txt = el.get_text(" ", strip=True)
        if txt == "STATE PROFILE" or txt == display_name:
            kill.append(el)
        elif txt.startswith("K-12 Education Landscape"):
            meta["subtitle"] = txt
            kill.append(el)
        elif txt.startswith("How to use this profile"):
            meta["howto"] = txt
            kill.append(el)
    for el in kill:
        el.decompose()

    # ---- promote bold-paragraph headings to h2; normalize h1 -> h2 ----
    for p in list(body.find_all("p")):
        kids = [k for k in p.children if not (isinstance(k, NavigableString) and not k.strip())]
        if len(kids) == 1 and getattr(kids[0], "name", None) == "strong":
            t = kids[0].get_text(" ", strip=True)
            if re.match(r"^\d{1,2}\.\s", t):
                h = soup.new_tag("h2")
                h.string = t
                p.replace_with(h)
    for h1 in list(body.find_all("h1")):
        h1.name = "h2"
        for st in h1.find_all("strong"):
            st.unwrap()
        if h1.has_attr("id"):
            del h1["id"]

    # ---- assign ids, build TOC ----
    toc = []
    for h in body.find_all("h2"):
        t = h.get_text(" ", strip=True)
        m = re.match(r"^(\d{1,2})\.\s*(.*)$", t)
        num, title = (m.group(1), m.group(2)) if m else ("", t)
        sid = "s" + num if num else slugify(t)
        h["id"] = sid
        toc.append({"id": sid, "num": num, "title": title})

    # ---- classify tables ----
    for tbl in body.find_all("table"):
        rows = tbl.find_all("tr")
        maxcells = max((len(tr.find_all(["td", "th"])) for tr in rows), default=0)
        if maxcells <= 1:
            tbl["class"] = tbl.get("class", []) + ["callout"]
        else:
            tbl["class"] = tbl.get("class", []) + ["kv"]
            for tr in rows:
                cells = tr.find_all(["td", "th"])
                if len(cells) == 1:
                    cells[0]["colspan"] = str(maxcells)
                    cells[0]["class"] = cells[0].get("class", []) + ["band"]
        wrap = soup.new_tag("div", **{"class": "table-scroll"})
        tbl.replace_with(wrap)
        wrap.append(tbl)

    # ---- verified + sources styling ----
    for p in body.find_all("p"):
        txt = p.get_text(" ", strip=True)
        if txt.startswith("Last verified"):
            p["class"] = p.get("class", []) + ["verified"]
        elif re.match(r"^(Sources|Section sources)\s*:", txt):
            p["class"] = p.get("class", []) + ["sources"]

    # ---- sections list for the search index ----
    sections = []
    cur = None
    for el in body.children:
        if getattr(el, "name", None) == "h2":
            if cur:
                sections.append(cur)
            t = el.get_text(" ", strip=True)
            cur = {"id": el["id"], "title": t, "text": ""}
        elif cur is not None and getattr(el, "get_text", None):
            cur["text"] += " " + el.get_text(" ", strip=True)
    if cur:
        sections.append(cur)

    inner = "".join(str(c) for c in body.children)
    return meta, inner, toc, sections

# ---------------------------------------------------------------- templates
def page(title, content, depth=0, active_slug=None, search_mount=True):
    pre = "../" * depth
    opts = []
    for (n, s, a, status, note) in ALL_JURIS:
        sel = ' selected' if s == active_slug else ''
        label = n if status == "complete" else f"{n} (developing)"
        opts.append(f'<option value="{pre}states/{s}.html"{sel}>{label}</option>')
    links = []
    for (n, s, a, status, note) in ALL_JURIS:
        cur = ' aria-current="page"' if s == active_slug else ''
        cls = ' class="devlink"' if status != "complete" else ''
        links.append(f'<li><a{cls}{cur} href="{pre}states/{s}.html">{n}</a></li>')
    jump = f"""<details class="jump">
      <summary>Go to a jurisdiction</summary>
      <ul class="jumplist">{''.join(links)}</ul>
    </details>
"""
    mount = '<div class="search-mount" data-search-mount></div>' if search_mount else ''
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{htmllib.escape(title)}</title>
<link rel="stylesheet" href="{pre}assets/site.css">
</head>
<body>
<header class="topbar">
  <div class="topbar-inner">
    <a class="brand" href="{pre}index.html">
      <span class="brand-mark">DELL</span>
      <span class="brand-title">K-12 State Education Landscape</span>
    </a>
    <nav class="topnav">
      <a href="{pre}index.html">Home</a>
      <a href="{pre}matrix.html">Cross-State Matrix</a>
      <a href="{pre}all-states.html">All Profiles (one page)</a>
    </nav>
    {jump}
  </div>
</header>
{mount}
<main class="wrap">
{content}
</main>
<footer class="foot">
  <div class="wrap">
    <p>Internal reference for Dell education account teams. Compiled from public state sources; each section carries its own Last Verified date. Check dates before use in a meeting.</p>
  </div>
</footer>
<script src="{pre}assets/search.js" defer></script>
</body>
</html>'''

def build_map_svg():
    md = json.load(open(os.path.join(ROOT, "mapdata.json")))
    vb = md["viewBox"]
    pad = 8
    vb = [vb[0]-pad, vb[1]-pad, vb[2]+2*pad, vb[3]+2*pad]
    paths, labels = [], []
    for name, d in md["states"].items():
        slug = MAP_NAME_TO_SLUG[name]
        abbr = MAP_ABBR[name]
        dev = name in DEV_MAP
        cls = "st dev" if dev else "st"
        disp = dict(ALL_JURIS_BY_SLUG[slug])
        tip = disp["name"] + (" (profile in development)" if dev else "")
        paths.append(
            f'<a href="states/{slug}.html" aria-label="{htmllib.escape(tip)}">'
            f'<path class="{cls}" d="{d["d"]}"><title>{htmllib.escape(tip)}</title></path></a>'
        )
        if name in LABELED:
            cx, cy = d["centroid"]
            nx, ny = LABEL_NUDGE.get(name, (0, 0))
            lcls = "stlbl devlbl" if dev else "stlbl"
            labels.append(f'<text class="{lcls}" x="{cx+nx:.0f}" y="{cy+ny:.0f}">{abbr}</text>')
    mesh = f'<path class="mesh" d="{md["mesh"]}"/>'
    nyc = '''<a href="states/new-york-city.html" aria-label="New York City (profile in development)">
      <circle class="nycdot" cx="869.7" cy="215.7" r="4.2"><title>New York City (profile in development)</title></circle></a>'''
    inner_style = ('<style>.st{fill:#0672CB;stroke:#FFFFFF;stroke-width:.6}'
                   '.st.dev{fill:#DDE3E9}.mesh{fill:none;stroke:#FFFFFF;stroke-width:.7}'
                   '.stlbl{font-family:Segoe UI,Arial,sans-serif;font-size:9px;font-weight:700;'
                   'fill:#FFFFFF;text-anchor:middle}.stlbl.devlbl{fill:#5A6372}.nycdot{fill:#FFB000;stroke:#FFFFFF;stroke-width:1.2}</style>')
    return f'''<svg class="regionmap" viewBox="{vb[0]:.0f} {vb[1]:.0f} {vb[2]:.0f} {vb[3]:.0f}" role="img" aria-label="Clickable map of the region. Every state links to its profile; small jurisdictions are also listed beside the map.">
{inner_style}
{''.join(paths)}
{mesh}
{''.join(labels)}
{nyc}
</svg>'''

ALL_JURIS_BY_SLUG = {s: {"name": n, "abbr": a, "status": st, "note": note}
                     for (n, s, a, st, note) in ALL_JURIS}

# ---------------------------------------------------------------- state pages
search_index = []
state_cards = []
fragments_for_combined = []

for stem, name, slug, abbr, _st in STATES:
    raw = read_docx_html(stem)
    meta, inner, toc, sections = normalize(raw, name)
    for sec in sections:
        search_index.append({
            "j": name, "u": f"states/{slug}.html#{sec['id']}",
            "t": sec["title"],
            "x": re.sub(r"\s+", " ", sec["text"]).strip()[:12000],
        })
    toc_html = "".join(
        f'<li><a href="#{i["id"]}"><span class="tocnum">{i["num"]}</span> {htmllib.escape(i["title"])}</a></li>'
        for i in toc)
    howto = f'<p class="howto">{htmllib.escape(meta["howto"])}</p>' if meta["howto"] else ""
    content = f'''
<div class="crumbs"><a href="../index.html">All jurisdictions</a> <span>/</span> {name}</div>
<div class="statehead">
  <div class="statehead-abbr">{abbr}</div>
  <div>
    <p class="eyebrow">State Profile</p>
    <h1>{name}</h1>
    <p class="subtitle">{htmllib.escape(meta["subtitle"])}</p>
  </div>
</div>
{howto}
<div class="layout">
  <nav class="toc" aria-label="Sections">
    <p class="toc-title">Sections</p>
    <ul>{toc_html}</ul>
    <p class="toc-back"><a href="../index.html">&#8592; Back to the map</a></p>
  </nav>
  <article class="profile">
  {inner}
  </article>
</div>'''
    open(os.path.join(OUT, "states", slug + ".html"), "w").write(
        page(f"{name} | K-12 State Education Landscape", content, depth=1, active_slug=slug))
    state_cards.append((name, slug, abbr, "complete", meta["subtitle"]))
    fragments_for_combined.append((name, slug, abbr, inner))

# developing pages
for name, slug, abbr, note in DEVELOPING:
    content = f'''
<div class="crumbs"><a href="../index.html">All jurisdictions</a> <span>/</span> {name}</div>
<div class="statehead">
  <div class="statehead-abbr dev">{abbr}</div>
  <div>
    <p class="eyebrow">State Profile</p>
    <h1>{name}</h1>
  </div>
</div>
<div class="devnotice">
  <p class="devnotice-title">Developing</p>
  <p>{htmllib.escape(note)}.</p>
  <p>This profile is in production. In the meantime, the <a href="../matrix.html">Cross-State Matrix</a> and the completed profiles cover the rest of the region.</p>
  <p><a class="btn" href="../index.html">Back to the map</a></p>
</div>'''
    open(os.path.join(OUT, "states", slug + ".html"), "w").write(
        page(f"{name} | Developing", content, depth=1, active_slug=slug))

# ---------------------------------------------------------------- matrix page
mx = subprocess.run(["pandoc", "-f", "markdown", "-t", "html", "--wrap=none",
                     os.path.join(UP, "Cross_State_Matrix.md")],
                    capture_output=True, text=True, check=True).stdout
msoup = BeautifulSoup(mx, "lxml")
mbody = msoup.body or msoup
h1 = mbody.find("h1")
if h1:
    h1.decompose()
for tbl in mbody.find_all("table"):
    tbl["class"] = tbl.get("class", []) + ["matrix"]
    wrap = msoup.new_tag("div", **{"class": "table-scroll wide"})
    tbl.replace_with(wrap)
    wrap.append(tbl)
# link state names in matrix headers to their pages
matrix_inner = "".join(str(c) for c in mbody.children)
for (n, s, a, st, note) in ALL_JURIS:
    if st == "complete":
        matrix_inner = matrix_inner.replace(f"<th>{n}</th>", f'<th><a href="states/{s}.html">{n}</a></th>')
matrix_content = f'''
<p class="eyebrow">Cross-state comparison</p>
<h1>Cross-State Matrix</h1>
{matrix_inner}'''
open(os.path.join(OUT, "matrix.html"), "w").write(
    page("Cross-State Matrix | K-12 State Education Landscape", matrix_content))
msec = []
cur = None
for el in mbody.children:
    if getattr(el, "name", None) == "h2":
        if cur: msec.append(cur)
        cur = {"id": slugify(el.get_text(strip=True)), "title": el.get_text(" ", strip=True), "text": ""}
    elif cur is not None and getattr(el, "get_text", None):
        cur["text"] += " " + el.get_text(" ", strip=True)
if cur: msec.append(cur)
for sec in msec:
    search_index.append({"j": "Cross-State Matrix", "u": "matrix.html",
                         "t": sec["title"], "x": re.sub(r"\s+", " ", sec["text"]).strip()[:12000]})

# ---------------------------------------------------------------- combined page
parts = []
for name, slug, abbr, inner in fragments_for_combined:
    inner_anch = re.sub(r'id="s(\d{1,2})"', f'id="{slug}-s\\1"', inner)
    parts.append(f'<section class="combined-state" id="{slug}"><h1 class="combined-h1"><span class="statechip">{abbr}</span> {name}</h1>{inner_anch}</section>')
combined_toc = " &middot; ".join(f'<a href="#{s}">{n}</a>' for n, s, a, i in fragments_for_combined)
combined = f'''
<p class="eyebrow">Every completed profile, one page</p>
<h1>All Profiles</h1>
<p class="lede">Use your browser's Find (Ctrl+F or Cmd+F) to search across every state at once. Jump: {combined_toc}</p>
{''.join(parts)}'''
open(os.path.join(OUT, "all-states.html"), "w").write(
    page("All Profiles | K-12 State Education Landscape", combined))

# ---------------------------------------------------------------- index page
map_svg = build_map_svg()
chips = []
for (n, s, a, st, note) in ALL_JURIS:
    if a in ("MA", "RI", "CT", "NJ", "DE", "MD", "DC", "NYC"):
        cls = "chip dev" if st == "developing" else "chip"
        chips.append(f'<a class="{cls}" href="states/{s}.html"><span class="chip-abbr">{a}</span> {n}</a>')
cards = []
for (n, s, a, st, note) in ALL_JURIS:
    if st == "complete":
        sub = ALL_JURIS_BY_SLUG[s]
        subtitle = next((c[4] for c in state_cards if c[1] == s), "")
        vdate = ""
        m = re.search(r"(Enriched|Prepared|Updated)\s+([A-Z][a-z]+ \d{1,2}, \d{4}|[A-Z][a-z]+ \d{4})", subtitle)
        if m:
            vdate = f"{m.group(1)} {m.group(2)}"
        cards.append(f'''<a class="card" href="states/{s}.html">
  <div class="card-abbr">{a}</div>
  <div class="card-body"><h3>{n}</h3><p>{vdate}</p></div>
  <div class="card-go">&#8594;</div></a>''')
    else:
        cards.append(f'''<a class="card dev" href="states/{s}.html">
  <div class="card-abbr">{a}</div>
  <div class="card-body"><h3>{n}</h3><p>Developing. {htmllib.escape(note)}</p></div>
  <div class="card-go">&#8594;</div></a>''')
index_content = f'''
<div class="hero">
  <div class="hero-copy">
    <p class="eyebrow">Dell Technologies &middot; Education Strategy</p>
    <h1>K-12 State Education Landscape</h1>
    <p class="lede">Reference profiles for every jurisdiction in the region: funding flows, budget timing, procurement paths, governance, technology posture, and what each state is driving right now. Click a state on the map, pick from the menu above, or scroll to the full list.</p>
    <p class="lede-links"><a class="btn" href="matrix.html">Compare all states in the matrix</a> <a class="btn ghost" href="all-states.html">Search everything on one page</a></p>
  </div>
</div>
<div class="maprow">
  <div class="mapbox">
    {map_svg}
    <p class="maplegend"><span class="lg complete"></span> Profile available <span class="lg devl"></span> Developing <span class="lg nyc"></span> New York City</p>
  </div>
  <div class="chipcol">
    <p class="chipcol-title">Small on the map, easy to tap here</p>
    {''.join(chips)}
    <p class="chipcol-note">Every jurisdiction is also in the list below and the menu in the header.</p>
  </div>
</div>
<h2 class="listhead" id="jurisdictions">All jurisdictions</h2>
<div class="cards">
{''.join(cards)}
</div>'''
open(os.path.join(OUT, "index.html"), "w").write(
    page("K-12 State Education Landscape | Dell Education Strategy", index_content))

# ---------------------------------------------------------------- search layer
idx_js = json.dumps(search_index, ensure_ascii=False)
search_js = '''/* Removable enhancement layer. Delete this file (and the script tag) for the
   no-JavaScript build; every page works without it and the search UI simply
   does not appear, because this script is what creates it. */
(function () {
  var mount = document.querySelector("[data-search-mount]");
  if (!mount) return;
  var here = location.pathname;
  var prefix = here.indexOf("/states/") !== -1 ? "../" : "";
  var INDEX = __INDEX__;
  mount.innerHTML =
    '<div class="searchbar"><div class="wrap">' +
    '<label class="visually-hidden" for="sitesearch">Search all profiles</label>' +
    '<input id="sitesearch" type="search" placeholder="Search every profile: try BOCES, levy cap, student data privacy, Town Meeting Day&#8230;" autocomplete="off">' +
    '<div id="siteresults" class="results" hidden></div>' +
    "</div></div>";
  var input = document.getElementById("sitesearch");
  var box = document.getElementById("siteresults");
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function snippet(text, pos, len) {
    var start = Math.max(0, pos - 60);
    var end = Math.min(text.length, pos + len + 120);
    return (start > 0 ? "&#8230;" : "") + esc(text.slice(start, pos)) +
      "<mark>" + esc(text.slice(pos, pos + len)) + "</mark>" +
      esc(text.slice(pos + len, end)) + (end < text.length ? "&#8230;" : "");
  }
  var timer = null;
  input.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(run, 120);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== input &&
        !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      e.preventDefault(); input.focus();
    }
    if (e.key === "Escape") { box.hidden = true; }
  });
  function run() {
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) { box.hidden = true; box.innerHTML = ""; return; }
    var hits = [];
    for (var i = 0; i < INDEX.length; i++) {
      var e = INDEX[i];
      var hay = (e.j + " " + e.t + " " + e.x).toLowerCase();
      var p = hay.indexOf(q);
      if (p === -1) continue;
      var inTitle = (e.j + " " + e.t).toLowerCase().indexOf(q) !== -1;
      var bodyPos = e.x.toLowerCase().indexOf(q);
      hits.push({ e: e, score: (inTitle ? 0 : 1), bodyPos: bodyPos });
      if (hits.length > 400) break;
    }
    hits.sort(function (a, b) { return a.score - b.score; });
    hits = hits.slice(0, 30);
    if (!hits.length) {
      box.innerHTML = '<p class="noresults">No matches. The combined <a href="' + prefix + 'all-states.html">All Profiles page</a> plus your browser&#39;s Find covers anything this search misses.</p>';
      box.hidden = false; return;
    }
    var out = hits.map(function (h) {
      var e = h.e;
      var body = h.bodyPos !== -1 ? '<p class="r-snip">' + snippet(e.x, h.bodyPos, q.length) + "</p>" : "";
      return '<a class="r-hit" href="' + prefix + e.u + '"><span class="r-state">' + esc(e.j) +
        '</span><span class="r-sec">' + esc(e.t) + "</span>" + body + "</a>";
    }).join("");
    box.innerHTML = out;
    box.hidden = false;
  }
})();
'''.replace("__INDEX__", idx_js)
open(os.path.join(OUT, "assets", "search.js"), "w").write(search_js)

print("pages written:", len(os.listdir(os.path.join(OUT, "states"))), "state pages")
print("search index entries:", len(search_index))
