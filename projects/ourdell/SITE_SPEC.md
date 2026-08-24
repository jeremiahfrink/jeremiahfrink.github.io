# Site Spec: K-12 State Education Landscape Web Reference
**Version 1.0 | August 24, 2026**

This document governs the web version of the state profiles the same way the profile instructions document governs the Word files. It is written to be portable: any future session (Opus in Cowork, a fresh thread, or a person) should be able to maintain, extend, or migrate the site from this document alone.

## 1. Purpose and audience

A password-gated reference site for Dell education account executives covering every jurisdiction in the region. Interim home: GitHub Pages behind a StatiCrypt password (see README_DEPLOY.md). Final home: Dell internal static hosting, which allows no JavaScript and no JSON files.

## 2. The one architectural rule

**The core site is pure HTML and CSS. JavaScript exists only as a removable layer.**

- Every page must work completely with `assets/search.js` deleted.
- `assets/search.js` is the only script on the site. It creates the search UI itself (the pages contain only an empty `<div data-search-mount></div>`), so removing it leaves no dead controls behind.
- No inline JavaScript anywhere: no `onclick`, no `onchange`. The header jurisdiction dropdown is a pure-HTML `<details>` element.
- No JSON files. The search index lives inside `search.js` as a variable, so it leaves with the script.
- Anything new added to the site must obey this rule. If a feature needs JavaScript, it goes in `search.js` or a sibling file referenced by the same single script line, and the page must degrade to full function without it.

## 3. Dell internal migration procedure

1. Delete `assets/search.js`.
2. Remove the one script line from every page:
   `grep -rl 'assets/search.js' --include='*.html' . | xargs sed -i '/assets\/search\.js/d'`
3. Verify no page still references a script: `grep -r '<script' --include='*.html' .` must return nothing.
4. Upload everything else exactly as-is. All links are relative; the site works from any directory.

Without JavaScript the site keeps: the clickable map, the header dropdown, the jurisdiction cards and chips, the Cross-State Matrix, per-state section navigation, and cross-state search via the All Profiles page plus browser Find (Ctrl+F / Cmd+F). It loses only the live search box.

## 4. File map

```
index.html              Landing page: map, small-jurisdiction chips, cards
matrix.html             Cross-State Matrix, rendered from Cross_State_Matrix.md
all-states.html         Every completed profile on one page (Ctrl+F search)
states/<slug>.html      One page per jurisdiction (16 pages)
assets/site.css         All styling
assets/search.js        Removable search layer (index embedded inside)
build/                  Regeneration toolchain (not required for hosting)
SITE_SPEC.md            This document
README_DEPLOY.md        GitHub Pages and StatiCrypt deployment steps
```

Jurisdiction slugs: connecticut, maine, maryland, massachusetts, new-hampshire, new-jersey, new-york, ohio, pennsylvania, rhode-island, vermont, virginia (complete); delaware, west-virginia, washington-dc, new-york-city (developing placeholders).

## 5. How pages are generated

Pages are generated, never hand-edited. Source of truth stays the Word profiles.

- `build/build.py` converts each `State_Profile_<Name>.docx` (via pandoc) and normalizes all three spec generations to one shape:
  - Batch 2 profiles (NY, OH, MA) use real Heading 1 styles; Batch 1 (PA, MD, NJ) and v1.4 profiles (VA, Batch 3) use bold-paragraph headings. Both become `<h2 id="sN">` where N is the section number, so anchors are stable across spec versions.
  - Two-column snapshot tables render as keyed tables (`table.kv`) with navy band rows. Single-column tables (the Section 3 callout boxes) render as callout boxes: `E8F1FA` fill, `0672CB` left rule, matching the Word treatment.
  - "Last verified" lines and "Sources:" lines get their own styles.
- `build/genmap.js` produced `build/mapdata.json` from the public-domain us-atlas topology (Albers projection). It only needs re-running if the set of mapped states changes.
- The search index is rebuilt on every run from the normalized section text.

To regenerate after profile updates: place the current `.docx` files and `Cross_State_Matrix.md` in the uploads path configured at the top of `build.py`, then `python3 build.py`. Output lands in `dist/`.

## 6. Adding a jurisdiction (Batch 4 procedure)

1. Add the state to the `STATES` list in `build.py` (file stem, display name, slug, abbreviation) and remove it from `DEVELOPING`.
2. If it is Delaware, West Virginia, or DC it is already drawn on the map; the build recolors it automatically once it leaves `DEVELOPING`. New York City stays a point marker.
3. Run `python3 build.py`. This regenerates the state page, the index cards and chips, the dropdown on every page, all-states.html, and the search index in one pass.
4. Re-render `matrix.html` happens automatically from whatever `Cross_State_Matrix.md` is supplied. Supply the updated matrix.
5. Run the verification pass (Section 8).

## 7. Design tokens

Colors mirror the Word profiles exactly: Dell blue `#0672CB`, band fill `#EEF3F8`, callout fill `#E8F1FA` with `#0672CB` left border, body ink `#1F2A36`, secondary gray `#5A6372`. Site additions: deep navy `#0B2740` (header, band rows), developing gray `#8C97A3` / `#DDE3E9`, NYC marker amber `#FFB000`. Type is the system stack led by Segoe UI: no external font loading, so nothing breaks behind Dell's firewall. The section header treatment (band fill with a blue left rule) is deliberately the same visual language as the Word profiles so the two formats read as one product.

## 8. Verification pass (required before any publish)

1. **Dashes.** No em dashes (U+2014) or en dashes (U+2013) anywhere in HTML, CSS, or JS output. Check the rendered output, not the sources.
2. **Links.** Every internal href and src resolves; every TOC anchor exists on its page.
3. **Scripts.** Exactly one `<script src=".../assets/search.js">` per page and zero inline handlers (`grep -c 'onclick\|onchange'` must be 0).
4. **Map.** 16 links inside the SVG (15 drawn jurisdictions plus the NYC marker).
5. **No-JS pass.** Open index.html and one state page with JavaScript disabled; navigation, map, dropdown, and content must all work.

## 9. Content rules inherited from the profile program

The site displays profile content verbatim; it does not edit it. Content fixes happen in the Word files, then the site regenerates. Never use em dashes in any copy written for the site itself. The template controls where information goes, not what matters.
