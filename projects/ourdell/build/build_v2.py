#!/usr/bin/env python3
"""Build site v2 per REDESIGN_SPEC_v2.md.
One self-contained index.html + one self-contained matrix.html. Zero JavaScript.
State-level collapse uses display:none so browser Find is scoped to open states.
"""
import json, os, re, subprocess, html as htmllib
from bs4 import BeautifulSoup, NavigableString

ROOT = "/home/claude/site"
UP = "/mnt/user-data/uploads"
OUT = os.path.join(ROOT, "dist_v2")
os.makedirs(os.path.join(OUT, "build"), exist_ok=True)

REFRESH_DATE = "8/25/2026"
REFRESH_SHORT = "8/25/26"

STATES = [
    ("State_Profile_Connecticut", "Connecticut", "connecticut", "CT"),
    ("State_Profile_Maine", "Maine", "maine", "ME"),
    ("State_Profile_Maryland", "Maryland", "maryland", "MD"),
    ("State_Profile_Massachusetts", "Massachusetts", "massachusetts", "MA"),
    ("State_Profile_NewHampshire", "New Hampshire", "new-hampshire", "NH"),
    ("State_Profile_NewJersey", "New Jersey", "new-jersey", "NJ"),
    ("State_Profile_NewYork", "New York", "new-york", "NY"),
    ("State_Profile_Ohio", "Ohio", "ohio", "OH"),
    ("State_Profile_Pennsylvania", "Pennsylvania", "pennsylvania", "PA"),
    ("State_Profile_RhodeIsland", "Rhode Island", "rhode-island", "RI"),
    ("State_Profile_Vermont", "Vermont", "vermont", "VT"),
    ("State_Profile_Virginia", "Virginia", "virginia", "VA"),
]
DEVELOPING = [
    ("Delaware", "delaware", "DE"),
    ("New York City", "new-york-city", "NYC"),
    ("Washington, DC", "washington-dc", "DC"),
    ("West Virginia", "west-virginia", "WV"),
]
ALL_JURIS = sorted(
    [(n, s, a, "complete") for (_f, n, s, a) in STATES] +
    [(n, s, a, "developing") for (n, s, a) in DEVELOPING],
    key=lambda t: t[0])

MAP_NAME_TO_SLUG = {
    "Maine": "maine", "NewHampshire": "new-hampshire", "Vermont": "vermont",
    "Massachusetts": "massachusetts", "RhodeIsland": "rhode-island",
    "Connecticut": "connecticut", "NewYork": "new-york", "NewJersey": "new-jersey",
    "Pennsylvania": "pennsylvania", "Ohio": "ohio", "Maryland": "maryland",
    "Delaware": "delaware", "Virginia": "virginia", "WestVirginia": "west-virginia",
    "DC": "washington-dc",
}
MAP_ABBR = {v: k for k, v in [(a, s) for (_n, s, a, _st) in
            [(n, s, a, st) for (n, s, a, st) in ALL_JURIS]]}
ABBR_BY_SLUG = {s: a for (n, s, a, st) in ALL_JURIS}
NAME_BY_SLUG = {s: n for (n, s, a, st) in ALL_JURIS}
STATUS_BY_SLUG = {s: st for (n, s, a, st) in ALL_JURIS}
DEV_MAP = {"Delaware", "WestVirginia", "DC"}
LABELED = {"Maine", "NewHampshire", "Vermont", "NewYork", "Pennsylvania", "Ohio",
           "Virginia", "WestVirginia", "Massachusetts"}
LABEL_NUDGE = {"Maine": (2, 8), "NewHampshire": (1, 8), "Vermont": (-2, -4),
               "Massachusetts": (-6, -1), "Virginia": (8, -6), "NewYork": (-4, 2)}
SMALL_CHIPS = {"CT", "RI", "NJ", "DE", "MD", "MA", "DC", "NYC"}

# Quick Facts row matchers, in display order. (pattern, max_hits)
QF_PATTERNS = [
    (r"^Governor$", 1),
    (r"^(Secretary of Education|Commissioner of Education|State Superintendent|"
     r"Superintendent of Public Instruction|Commissioner of Elementary and Secondary Education|"
     r"Director, Dept\. of Education and Workforce)$", 2),
    (r"^State chief selection$", 1),
    (r"^Budget cycle$", 1),
    (r"^Local approval mechanism$", 1),
    (r"^District budget rhythm$", 1),
    (r"[Ll]eadership risk", 1),
]

def slugify(t):
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-") or "section"

def esc(t):
    return htmllib.escape(t, quote=True)

# ---------------------------------------------------------------- normalization
def normalize(raw_html, display_name, slug):
    """Normalize any of the three profile spec generations to one shape."""
    soup = BeautifulSoup(raw_html, "lxml")
    body = soup.body or soup
    meta = {"subtitle": "", "howto": ""}
    kill = []
    for el in [e for e in body.find_all(["p", "h1"], recursive=True)][:6]:
        txt = el.get_text(" ", strip=True)
        if txt in ("STATE PROFILE", display_name):
            kill.append(el)
        elif txt.startswith("K-12 Education Landscape"):
            meta["subtitle"] = txt
            kill.append(el)
        elif txt.startswith("How to use this profile"):
            meta["howto"] = txt
            kill.append(el)
    for el in kill:
        el.decompose()

    for p in list(body.find_all("p")):
        kids = [k for k in p.children
                if not (isinstance(k, NavigableString) and not k.strip())]
        if len(kids) == 1 and getattr(kids[0], "name", None) == "strong":
            t = kids[0].get_text(" ", strip=True)
            if re.match(r"^\d{1,2}\.\s", t):
                h = soup.new_tag("h3")
                h.string = t
                p.replace_with(h)
    for h1 in list(body.find_all(["h1", "h2"])):
        h1.name = "h3"
        for st in h1.find_all("strong"):
            st.unwrap()
        if h1.has_attr("id"):
            del h1["id"]

    toc = []
    for h in body.find_all("h3"):
        t = h.get_text(" ", strip=True)
        m = re.match(r"^(\d{1,2})\.\s*(.*)$", t)
        num, title = (m.group(1), m.group(2)) if m else ("", t)
        sid = f"{slug}-s{num}" if num else f"{slug}-{slugify(t)}"
        h["id"] = sid
        toc.append({"id": sid, "num": num, "title": title})

    snapshot_rows = []
    for ti, tbl in enumerate(body.find_all("table")):
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
                elif ti == 0 and len(cells) >= 2:
                    snapshot_rows.append((cells[0].get_text(" ", strip=True),
                                          cells[1].get_text(" ", strip=True)))
        wrap = soup.new_tag("div", **{"class": "table-scroll"})
        tbl.replace_with(wrap)
        wrap.append(tbl)

    for p in body.find_all("p"):
        txt = p.get_text(" ", strip=True)
        if txt.startswith("Last verified"):
            p["class"] = p.get("class", []) + ["verified"]
        elif re.match(r"^(Sources|Section sources)\s*:", txt):
            p["class"] = p.get("class", []) + ["sources"]

    inner = "".join(str(c) for c in body.children)
    return meta, inner, toc, snapshot_rows

def quick_facts(rows):
    out, used = [], set()
    for pat, cap in QF_PATTERNS:
        hits = 0
        for i, (label, val) in enumerate(rows):
            if i in used or hits >= cap:
                continue
            if re.search(pat, label):
                out.append((label, val))
                used.add(i)
                hits += 1
        if len(out) >= 7:
            break
    return out[:7]

# ---------------------------------------------------------------- map
def build_map_svg():
    md = json.load(open(os.path.join(ROOT, "mapdata.json")))
    vb = md["viewBox"]
    pad = 8
    vb = [vb[0] - pad, vb[1] - pad, vb[2] + 2 * pad, vb[3] + 2 * pad]
    paths, labels = [], []
    for name, d in md["states"].items():
        slug = MAP_NAME_TO_SLUG[name]
        dev = name in DEV_MAP
        tip = NAME_BY_SLUG[slug] + (" (profile in development)" if dev else "")
        paths.append(
            f'<a href="#{slug}" aria-label="{esc(tip)}">'
            f'<path class="{"st dev" if dev else "st"}" d="{d["d"]}">'
            f'<title>{esc(tip)}</title></path></a>')
        if name in LABELED:
            cx, cy = d["centroid"]
            nx, ny = LABEL_NUDGE.get(name, (0, 0))
            cls = "stlbl devlbl" if dev else "stlbl"
            labels.append(f'<text class="{cls}" x="{cx+nx:.0f}" y="{cy+ny:.0f}">'
                          f'{ABBR_BY_SLUG[slug]}</text>')
    style = ('<style>.st{fill:#0672CB;stroke:#FFF;stroke-width:.6}'
             '.st.dev{fill:#DDE3E9}.mesh{fill:none;stroke:#FFF;stroke-width:.7}'
             '.stlbl{font-family:Segoe UI,Arial,sans-serif;font-size:9px;font-weight:700;'
             'fill:#FFF;text-anchor:middle}.stlbl.devlbl{fill:#5A6372}'
             '.nycdot{fill:#FFB000;stroke:#FFF;stroke-width:1.2}</style>')
    return (f'<svg class="regionmap" viewBox="{vb[0]:.0f} {vb[1]:.0f} {vb[2]:.0f} {vb[3]:.0f}"'
            f' role="img" aria-label="Clickable map of the region. Every jurisdiction links to'
            f' its panel below; small jurisdictions are also listed beside the map.">'
            f'{style}{"".join(paths)}<path class="mesh" d="{md["mesh"]}"/>{"".join(labels)}'
            f'<a href="#new-york-city" aria-label="New York City (profile in development)">'
            f'<circle class="nycdot" cx="869.7" cy="215.7" r="4.2">'
            f'<title>New York City (profile in development)</title></circle></a></svg>')

# ---------------------------------------------------------------- CSS
CSS = """
:root{--blue:#0672CB;--blue-dark:#0558A0;--navy:#0B2740;--band:#EEF3F8;
--callout:#E8F1FA;--ink:#1F2A36;--gray:#5A6372;--line:#D4DDE6;--dev:#8C97A3;
--dev-fill:#DDE3E9;--amber:#B26A00;--amber-fill:#FFF3DC;--white:#FFF;--maxw:1180px;
--font:"Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",Arial,sans-serif;}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important;animation:none!important}}
body{margin:0;font-family:var(--font);color:var(--ink);background:var(--white);line-height:1.55;font-size:16px}
a{color:var(--blue)}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 20px}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
:focus-visible{outline:3px solid var(--blue);outline-offset:2px}

/* header */
.topbar{background:var(--navy);color:var(--white);position:sticky;top:0;z-index:50;
box-shadow:0 1px 6px rgba(11,39,64,.3)}
.topbar-inner{max-width:var(--maxw);margin:0 auto;padding:9px 20px;display:flex;
align-items:center;gap:18px;flex-wrap:wrap}
.brand{display:flex;align-items:baseline;gap:11px;text-decoration:none;color:var(--white)}
.brand-mark{font-weight:800;letter-spacing:.35em;font-size:14px;background:var(--blue);
padding:4px 5px 4px 9px;border-radius:3px}
.brand-title{font-weight:600;font-size:14.5px}
.topnav a{color:#CFE2F4;text-decoration:none;font-size:14px;font-weight:600}
.topnav a:hover{color:var(--white)}
.jump{margin-left:auto;position:relative}
.jump summary{cursor:pointer;list-style:none;font-size:14px;font-weight:600;color:var(--white);
background:var(--blue);border-radius:4px;padding:7px 14px;user-select:none}
.jump summary::-webkit-details-marker{display:none}
.jump summary::after{content:" \\25BE";font-size:11px}
.jump[open] summary{background:var(--blue-dark)}
.jumplist{position:absolute;right:0;top:calc(100% + 6px);z-index:60;background:var(--white);
border:1px solid var(--line);border-radius:6px;box-shadow:0 6px 20px rgba(11,39,64,.25);
list-style:none;margin:0;padding:6px;min-width:230px;max-height:70vh;overflow:auto}
.jumplist a{display:block;padding:7px 12px;text-decoration:none;color:var(--ink);
border-radius:4px;font-size:14px}
.jumplist a:hover{background:var(--callout);color:var(--blue)}
.jumplist a.devlink{color:var(--gray)}
.jumplist a.devlink::after{content:" (developing)";font-size:11.5px}

/* hero */
.hero{padding:30px 0 6px}
.eyebrow{text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:700;
color:var(--blue);margin:0 0 6px}
h1{font-size:32px;line-height:1.15;margin:0 0 10px;color:var(--navy);letter-spacing:-.01em}
.lede{font-size:16.5px;color:var(--gray);max-width:66ch;margin:0 0 10px}
.refreshnote{display:inline-block;background:var(--amber-fill);color:var(--amber);
border-radius:4px;padding:5px 11px;font-size:13px;font-weight:600;margin:2px 0 6px}

/* map panel */
.mappanel{background:var(--band);border-radius:10px;margin:14px 0 18px;overflow:hidden}
.mappanel>summary{cursor:pointer;list-style:none;padding:11px 18px;font-weight:700;
color:var(--navy);font-size:15px;user-select:none;display:flex;align-items:center;gap:8px}
.mappanel>summary::-webkit-details-marker{display:none}
.mappanel>summary::before{content:"\\2212";display:inline-block;width:18px;height:18px;
line-height:17px;text-align:center;background:var(--blue);color:var(--white);
border-radius:4px;font-weight:800;font-size:13px}
.mappanel:not([open])>summary::before{content:"+"}
.mapinner{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(210px,1fr);gap:24px;
padding:0 18px 18px}
.regionmap{width:100%;height:auto;display:block}
a:hover .st,a:focus .st{fill:var(--navy)}
a:hover .st.dev,a:focus .st.dev{fill:var(--dev)}
a:hover .nycdot,a:focus .nycdot{fill:#E09600}
.maplegend{margin:10px 0 0;font-size:12.5px;color:var(--gray);display:flex;gap:14px;flex-wrap:wrap}
.lg{display:inline-block;width:12px;height:12px;border-radius:3px;margin-right:5px;vertical-align:-2px}
.lg.complete{background:var(--blue)}
.lg.devl{background:var(--dev-fill);border:1px solid var(--dev)}
.lg.nyc{background:#FFB000;border-radius:50%}
.chipcol-title{font-weight:700;color:var(--navy);margin:0 0 9px;font-size:14.5px}
.chip{display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--ink);
background:var(--white);border:1.5px solid var(--line);border-radius:6px;padding:7px 11px;
margin-bottom:7px;font-weight:600;font-size:14px}
.chip:hover{border-color:var(--blue);background:var(--callout)}
.chip-abbr{background:var(--blue);color:var(--white);font-weight:800;font-size:11.5px;
border-radius:4px;padding:3px 6px;min-width:34px;text-align:center}
.chip.dev{color:var(--gray)}
.chip.dev .chip-abbr{background:var(--dev)}

/* filters */
.filterrow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:4px 0 14px}
.filterrow .flabel{font-size:13px;color:var(--gray);font-weight:600;
text-transform:uppercase;letter-spacing:.08em;margin-right:2px}
.filterrow label{cursor:pointer;font-size:14px;font-weight:600;color:var(--ink);
border:1.5px solid var(--line);border-radius:20px;padding:6px 15px;background:var(--white)}
.filterrow label:hover{border-color:var(--blue);color:var(--blue)}
#f-all:checked~.filterrow label[for=f-all],
#f-ready:checked~.filterrow label[for=f-ready],
#f-dev:checked~.filterrow label[for=f-dev]{background:var(--blue);border-color:var(--blue);color:var(--white)}
#f-all:focus-visible~.filterrow label[for=f-all],
#f-ready:focus-visible~.filterrow label[for=f-ready],
#f-dev:focus-visible~.filterrow label[for=f-dev]{outline:3px solid var(--blue);outline-offset:2px}
#f-ready:checked~.panels .panel.devp{display:none}
#f-dev:checked~.panels .panel:not(.devp){display:none}

/* panels */
.panels{padding-bottom:50px}
.panel{border:1.5px solid var(--line);border-radius:8px;margin-bottom:9px;
scroll-margin-top:74px;background:var(--white)}
.bar{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:10px;padding:0 12px 0 0}
.barlabel{display:grid;grid-template-columns:auto minmax(0,1fr) auto auto;
align-items:center;gap:13px;min-width:0;cursor:pointer;padding:11px 12px;user-select:none}
.nmwrap{display:flex;flex-direction:column;min-width:0}
.barlabel:hover .nm{color:var(--blue)}
.abbr{background:var(--blue);color:var(--white);font-weight:800;border-radius:6px;
padding:7px 0;width:48px;text-align:center;font-size:14px;flex-shrink:0}
.panel.devp .abbr{background:var(--dev)}
.nm{font-weight:700;font-size:16.5px;color:var(--navy);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.meta{font-size:12px;color:var(--gray);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tag{font-size:11px;font-weight:700;border-radius:20px;padding:3px 10px;white-space:nowrap;
letter-spacing:.02em}
.tag.upd{background:var(--band);color:var(--gray);border:1px solid var(--line)}
.tag.avail{background:var(--amber-fill);color:var(--amber);border:1px solid #F0D8A8}
.chev{width:24px;height:24px;line-height:22px;text-align:center;border-radius:5px;
background:var(--band);color:var(--blue);font-weight:800;font-size:15px;flex-shrink:0;
transition:transform .15s ease,background .15s ease}
.tog:checked~.bar .chev{transform:rotate(45deg);background:var(--blue);color:var(--white)}
.panel:target .chev{background:var(--blue);color:var(--white)}
.tog:checked~.bar,.panel:target>.bar{background:var(--band);border-radius:6px 6px 0 0}
.panel:has(.tog:checked),.panel:target{border-color:var(--blue);
box-shadow:inset 4px 0 0 var(--blue)}
.tog:focus-visible~.bar{outline:3px solid var(--blue);outline-offset:-2px;border-radius:6px}
.qfbtn{flex:0 0 auto;align-self:center;cursor:pointer;font-family:var(--font);font-size:13px;font-weight:600;
color:var(--blue);background:var(--white);border:1.5px solid var(--blue);border-radius:20px;
padding:6px 13px;white-space:nowrap;flex-shrink:0}
.qfbtn:hover{background:var(--callout)}

/* popover */
[popover]{border:none;padding:0;background:transparent}
/* In browsers without popover support the UA rule that hides closed popovers does
   not exist, so the panels would dump inline and their text would enter Find scope
   even for collapsed states. Hide them there; the button simply does nothing and the
   same facts sit one click deeper in the Snapshot. */
@supports not selector(:popover-open){[popover]{display:none}}
.qf{max-width:520px;width:calc(100vw - 40px);max-height:70vh;overflow:auto;
background:var(--white);border:1px solid var(--line);border-radius:10px;
box-shadow:0 10px 34px rgba(11,39,64,.3);padding:0;margin:auto}
.qf::backdrop{background:rgba(11,39,64,.35)}
.qf-head{background:var(--navy);color:var(--white);padding:11px 18px;font-weight:700;
font-size:15px;border-radius:9px 9px 0 0;position:sticky;top:0}
.qf-head span{font-weight:400;font-size:12.5px;color:#BFD6EA;display:block}
.qf dl{margin:0;padding:6px 18px 16px}
.qf dt{font-weight:700;color:var(--navy);font-size:13px;margin-top:12px}
.qf dd{margin:2px 0 0;font-size:14px;color:var(--ink)}
.qf-foot{padding:0 18px 16px;font-size:12.5px;color:var(--gray)}

/* body */
.body{display:none;padding:4px 18px 24px}
.tog:checked~.body{display:block}
.panel:target>.body{display:block}
@supports selector(:has(*)){.panel:has(:target)>.body{display:block}}
.findhint{background:var(--callout);border-left:4px solid var(--blue);border-radius:0 6px 6px 0;
padding:8px 13px;margin:8px 0 12px;font-size:13.5px;color:var(--gray)}
.rail{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 16px;padding-bottom:12px;
border-bottom:1px solid var(--line)}
.rail a{font-size:12.5px;text-decoration:none;color:var(--ink);background:var(--band);
border-radius:5px;padding:4px 10px;font-weight:600}
.rail a:hover{background:var(--blue);color:var(--white)}
.rail .rnum{color:var(--blue);font-weight:800;margin-right:4px}
.rail a:hover .rnum{color:var(--white)}
.subtitle{color:var(--gray);font-size:13.5px;margin:0 0 4px}
.howto{font-style:italic;color:var(--gray);background:var(--band);border-left:4px solid var(--blue);
padding:9px 13px;border-radius:0 6px 6px 0;margin:10px 0;font-size:14px}
.profile h3{background:var(--band);color:var(--navy);font-size:17.5px;border-left:5px solid var(--blue);
padding:8px 13px;border-radius:0 6px 6px 0;margin:30px 0 9px;scroll-margin-top:80px}
.verified{color:var(--gray);font-style:italic;font-size:13px;margin-top:0}
.sources{font-size:12.5px;color:var(--gray);background:var(--band);padding:8px 12px;
border-radius:6px;word-break:break-word}
.profile ul,.profile ol{padding-left:24px}
.profile li{margin-bottom:6px}
.devbody{background:var(--band);border-left:5px solid var(--dev);border-radius:0 8px 8px 0;
padding:18px 22px;margin:10px 0;max-width:640px}
.devbody-title{text-transform:uppercase;letter-spacing:.12em;font-weight:800;color:var(--gray);
margin:0 0 6px;font-size:12.5px}
.devbody p{margin:6px 0}

/* tables */
.table-scroll{overflow-x:auto;margin:13px 0}
table{border-collapse:collapse;width:100%;font-size:14.5px}
table.kv td{border:1px solid var(--line);padding:8px 12px;vertical-align:top}
table.kv td:first-child{width:30%;background:var(--band)}
table.kv td.band{background:var(--navy);color:var(--white);font-weight:700;width:auto}
table.kv td.band strong{color:var(--white)}
table.callout{background:var(--callout);border-left:5px solid var(--blue);border-radius:0 6px 6px 0}
table.callout td{padding:13px 17px}
table.callout td>p:first-child{margin-top:0}
table.callout td>:last-child{margin-bottom:0}

/* matrix page */
table.matrix{font-size:13.5px;min-width:1600px}
table.matrix th,table.matrix td{border:1px solid var(--line);padding:8px 10px;
vertical-align:top;text-align:left;min-width:180px}
table.matrix th:first-child,table.matrix td:first-child{position:sticky;left:0;
background:var(--band);min-width:130px;z-index:1}
table.matrix thead th{background:var(--navy);color:var(--white)}
table.matrix thead th a{color:#BFE0FB}
.table-scroll.wide{border:1px solid var(--line);border-radius:8px}
.btn{display:inline-block;background:var(--blue);color:var(--white);text-decoration:none;
font-weight:600;font-size:14.5px;padding:9px 16px;border-radius:5px}
.btn:hover{background:var(--blue-dark)}

/* footer */
.foot{background:var(--navy);color:#B9C7D4}
.foot p{padding:16px 0;margin:0;font-size:12.5px}

@media (max-width:900px){
.mapinner{grid-template-columns:1fr}
.jump{margin-left:0;width:100%}
.jumplist{left:0;right:auto;width:100%}
h1{font-size:26px}
.barlabel{gap:10px;padding:10px 8px}
.tag{font-size:10px;padding:3px 7px}
.qfbtn{padding:6px 10px;font-size:12px}
}
@media print{.topbar,.mappanel,.filterrow,.rail,.qfbtn,.findhint,.foot{display:none}
.body{display:block!important}}
"""

def shell(title, content, css_extra=""):
    links = []
    for (n, s, a, st) in ALL_JURIS:
        cls = ' class="devlink"' if st != "complete" else ""
        links.append(f'<li><a{cls} href="index.html#{s}">{esc(n)}</a></li>')
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{esc(title)}</title>
<style>{CSS}{css_extra}</style>
</head>
<body>
<header class="topbar">
  <div class="topbar-inner">
    <a class="brand" href="index.html">
      <span class="brand-mark">DELL</span>
      <span class="brand-title">K-12 State Education Landscape</span>
    </a>
    <nav class="topnav"><a href="matrix.html">Cross-State Matrix</a></nav>
    <details class="jump">
      <summary>Jurisdictions</summary>
      <ul class="jumplist">{''.join(links)}</ul>
    </details>
  </div>
</header>
<main class="wrap">
{content}
</main>
<footer class="foot"><div class="wrap">
<p>Internal reference for Dell education account teams. Compiled from public state sources.
Every section carries its own Last Verified date. All profiles are scheduled for refresh on {REFRESH_DATE}.</p>
</div></footer>
</body>
</html>"""

# ---------------------------------------------------------------- panels
panels = []
for stem, name, slug, abbr in STATES:
    raw = subprocess.run(["pandoc", "-t", "html", "--wrap=none",
                          os.path.join(UP, stem + ".docx")],
                         capture_output=True, text=True, check=True).stdout
    meta, inner, toc, snap = normalize(raw, name, slug)
    qf = quick_facts(snap)
    qf_rows = "".join(f"<dt>{esc(l)}</dt><dd>{esc(v)}</dd>" for l, v in qf)
    # The subtitle is pipe-delimited: "K-12 Education Landscape | <date> | Sections are..."
    # The middle segment carries the date and its wording varies by spec generation
    # (Built / Prepared / Enriched / bare date), so take the segment, not a word list.
    vdate = ""
    parts = [p.strip() for p in meta["subtitle"].split("|")]
    if len(parts) >= 2 and re.search(r"\d{4}", parts[1]):
        vdate = parts[1]
    rail = "".join(
        f'<a href="#{i["id"]}"><span class="rnum">{i["num"]}</span>{esc(i["title"])}</a>'
        for i in toc)
    howto = f'<p class="howto">{esc(meta["howto"])}</p>' if meta["howto"] else ""
    panels.append(f'''<section class="panel" id="{slug}">
<input type="checkbox" class="tog vh" id="t-{slug}">
<div class="bar">
  <label class="barlabel" for="t-{slug}">
    <span class="abbr">{abbr}</span>
    <span class="nmwrap"><span class="nm">{esc(name)}</span>
      <span class="meta">{esc(vdate)}</span></span>
    <span class="tag upd">Update due {REFRESH_SHORT}</span>
    <span class="chev">+</span>
  </label>
  <button class="qfbtn" popovertarget="qf-{slug}">Quick facts</button>
</div>
<div id="qf-{slug}" popover class="qf">
  <div class="qf-head">{esc(name)}: quick facts<span>From the Snapshot section. Press Escape or click outside to close.</span></div>
  <dl>{qf_rows}</dl>
  <p class="qf-foot">Open the {esc(name)} panel for the full profile.</p>
</div>
<div class="body">
  <p class="findhint"><strong>{esc(name)} is open.</strong> Ctrl+F (Cmd+F on Mac) now searches everything in this state. Collapsed states are not searched.</p>
  <p class="subtitle">{esc(meta["subtitle"])}</p>
  {howto}
  <nav class="rail" aria-label="{esc(name)} sections">{rail}</nav>
  <article class="profile">{inner}</article>
</div>
</section>''')

for name, slug, abbr in DEVELOPING:
    panels.append(f'''<section class="panel devp" id="{slug}">
<input type="checkbox" class="tog vh" id="t-{slug}">
<div class="bar">
  <label class="barlabel" for="t-{slug}">
    <span class="abbr">{abbr}</span>
    <span class="nmwrap"><span class="nm">{esc(name)}</span>
      <span class="meta">In production</span></span>
    <span class="tag avail">Available by {REFRESH_SHORT}</span>
    <span class="chev">+</span>
  </label>
</div>
<div class="body">
  <div class="devbody">
    <p class="devbody-title">Developing</p>
    <p>Available by {REFRESH_DATE}.</p>
    <p>This profile is in production. In the meantime, the <a href="matrix.html">Cross-State Matrix</a> and the completed profiles cover the rest of the region.</p>
  </div>
</div>
</section>''')

# ---------------------------------------------------------------- index page
chips = "".join(
    f'<a class="chip{" dev" if st != "complete" else ""}" href="#{s}">'
    f'<span class="chip-abbr">{a}</span> {esc(n)}</a>'
    for (n, s, a, st) in ALL_JURIS if a in SMALL_CHIPS)

index_content = f'''<div class="hero">
  <p class="eyebrow">Dell Technologies &middot; Education Strategy</p>
  <h1>K-12 State Education Landscape</h1>
  <p class="lede">Every jurisdiction in the region on one page. Click a state on the map or open its panel below. Opening a state puts its full profile into the page, so Ctrl+F searches that state and nothing else.</p>
  <p class="refreshnote">All profiles scheduled for refresh on {REFRESH_DATE}</p>
</div>
<details class="mappanel" open>
  <summary>Region map</summary>
  <div class="mapinner">
    <div>
      {build_map_svg()}
      <p class="maplegend"><span><span class="lg complete"></span>Profile available</span>
      <span><span class="lg devl"></span>Developing</span>
      <span><span class="lg nyc"></span>New York City</span></p>
    </div>
    <div class="chipcol">
      <p class="chipcol-title">Small on the map, easy to tap here</p>
      {chips}
    </div>
  </div>
</details>
<input type="radio" name="filt" id="f-all" class="vh" checked>
<input type="radio" name="filt" id="f-ready" class="vh">
<input type="radio" name="filt" id="f-dev" class="vh">
<div class="filterrow">
  <span class="flabel">Show</span>
  <label for="f-all">All {len(ALL_JURIS)}</label>
  <label for="f-ready">Profiles ready ({len(STATES)})</label>
  <label for="f-dev">Developing ({len(DEVELOPING)})</label>
</div>
<div class="panels">
{''.join(panels)}
</div>'''

open(os.path.join(OUT, "index.html"), "w").write(
    shell("K-12 State Education Landscape | Dell Education Strategy", index_content))

# ---------------------------------------------------------------- matrix page
mx = subprocess.run(["pandoc", "-f", "markdown", "-t", "html", "--wrap=none",
                     os.path.join(UP, "Cross_State_Matrix.md")],
                    capture_output=True, text=True, check=True).stdout
ms = BeautifulSoup(mx, "lxml")
mb = ms.body or ms
if mb.find("h1"):
    mb.find("h1").decompose()
for tbl in mb.find_all("table"):
    tbl["class"] = tbl.get("class", []) + ["matrix"]
    w = ms.new_tag("div", **{"class": "table-scroll wide"})
    tbl.replace_with(w)
    w.append(tbl)
minner = "".join(str(c) for c in mb.children)
for (n, s, a, st) in ALL_JURIS:
    if st == "complete":
        minner = minner.replace(f"<th>{n}</th>", f'<th><a href="index.html#{s}">{n}</a></th>')
matrix_content = f'''<div class="hero">
<p class="eyebrow">Cross-state comparison</p>
<h1>Cross-State Matrix</h1>
<p class="refreshnote">All profiles scheduled for refresh on {REFRESH_DATE}</p>
</div>
{minner}
<p style="padding-bottom:40px"><a class="btn" href="index.html">Back to the jurisdictions</a></p>'''
open(os.path.join(OUT, "matrix.html"), "w").write(
    shell("Cross-State Matrix | K-12 State Education Landscape", matrix_content))

print(f"built: index.html ({os.path.getsize(os.path.join(OUT,'index.html'))//1024} KB), "
      f"matrix.html ({os.path.getsize(os.path.join(OUT,'matrix.html'))//1024} KB)")
