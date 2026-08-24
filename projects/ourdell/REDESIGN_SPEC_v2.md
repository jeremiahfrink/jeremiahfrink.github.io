# Redesign Spec: K-12 State Education Landscape, Site v2.0
**August 24, 2026 | Supersedes the navigation model of SITE_SPEC v1.0 | Handoff document for build execution**

This document specifies the v2 redesign. It is written to be executed without access to the design conversation. Read it in full before writing any code. SITE_SPEC v1.0 (in the v1 delivery) remains authoritative for everything this document does not change: design tokens, the content pipeline, the verification mindset, and the em dash prohibition. Where the two conflict, this document wins.

## 1. What v2 is

One HTML page that behaves like an application. The entire region on a single page: map at top, every jurisdiction as an expandable panel below. No page loads. Modern interaction (accordions, popovers, filters, deep links) built entirely from native HTML and CSS. JavaScript remains prohibited in the core, same as v1.

The v1 multi-page site is retired by this build. The v1 content pipeline (build/build.py normalization of the Word profiles) is reused; only page assembly changes.

## 2. The governing principle: search scope equals open state

The audience works one or two states at a time. Browser Find (Ctrl+F / Cmd+F) is the search feature, and it must be scoped to whatever the user has expanded, never the whole region. There is no site search box in v2 and no search.js.

This is achieved through deliberate mechanism choice, and this is the one place where implementation technique is dictated rather than left to judgment:

- **State-level collapse MUST hide content from browser Find.** Collapsed state panels must have their content in a `display: none` subtree. Content under `display: none` is not matched by find-in-page in any browser. Do NOT use a closed `<details>` element for state-level collapse: Chromium-family browsers search inside closed `details` and auto-expand matches, which would break the per-state scope by surfacing hits from states the user never opened.
- **Within an expanded state, all twelve sections MUST be simultaneously rendered** (visible, not display: none), so that Find reliably hits everything in the open state in every browser. Sections may be visually organized (see Section 5) but must not be hidden from Find while their state is open.

Acceptance test, stated here so it cannot be skipped: with every state collapsed, Ctrl+F for "BOCES" must return zero matches. With only New York expanded, it must match only New York's content. With New York and New Jersey both expanded, it must match both and nothing else. This test is part of the verification pass (Section 10).

## 3. Page anatomy, top to bottom

1. **Header bar** (sticky, navy #0B2740): brand mark, site title, "Jurisdictions" dropdown (pure HTML `details`, as in v1), link to the Cross-State Matrix (see Section 7).
2. **Map panel**: the v1 SVG region map, unchanged in substance (16 targets, Dell blue for available, gray for developing, amber NYC dot, chip column or chip row for the small jurisdictions). Map links point to in-page anchors (`#virginia`), not to separate pages. The map panel itself is collapsible via `<details open>` so a user deep in the page can reclaim the viewport; default open.
3. **Filter row**: pure CSS filtering (Section 6).
4. **Jurisdiction panels**: one per jurisdiction, alphabetical, sixteen total. Each is a full-width bar: abbreviation block, name, verification date, a Quick Facts button (Section 5), and an expand control. Developing jurisdictions (DE, WV, DC, NYC) render the bar in the gray treatment with their placeholder text inline when expanded; DC and NYC carry "Developing. Available by 8/25/2026" and DE and WV carry "In development (Batch 4)", exactly as in v1 unless the owner has supplied a revised date.
5. **Footer**: unchanged from v1.

## 4. Expansion mechanics (state level)

Each state panel expands two ways, and both must work:

- **Manual toggle**: a hidden checkbox per state with the bar as its label, shown/hidden via a `:has(:checked)` (or classic sibling-selector) rule that flips the panel body between `display: none` and visible. Checkboxes allow multiple states open at once, which is the "my two states" working mode.
- **Deep link / map click**: clicking Virginia on the map navigates to `#virginia`, and the CSS must also expand a panel that is the `:target`, i.e. panel body visible when `.panel:target` OR the panel's checkbox is checked. This is what lets a map click land on an already-expanded state. `:target` holds only one panel at a time; the checkbox path is what keeps a second state open alongside it. Note the interaction: arriving at a new `#target` releases the previous one, so a state opened only by map click collapses when another map click happens. That is acceptable behavior; a user keeping two states open does it with the toggles, and the Quick Facts hint text (Section 5) may mention it if it fits naturally.
- The expanded panel gets a visible active treatment (Dell blue left rule on the bar, band background) via the same selectors, so the user always sees which states are open and therefore what Find is searching.
- `scroll-margin-top` on every anchor target sized to clear the sticky header. `scroll-behavior: smooth` with the `prefers-reduced-motion` override, carried from v1.

## 5. Inside an expanded state

- **Section rail**: at the top of the expanded body, a horizontal row of twelve anchor chips (1 through 12, titled) linking to `#virginia-s3` style anchors within the panel. All sections are rendered below it in order (per Section 2 they may not be collapsed while the state is open). Existing `sN` ids from the v1 pipeline become `slug-sN` to stay unique on one page; the v1 all-states assembly already demonstrates this rewrite.
- **A "search this state" hint**: a short line at the top of every expanded panel: "This state is open, so Ctrl+F (Cmd+F on Mac) now searches everything in it." This converts the scoping mechanism into a feature the AEs can feel. Keep it one line, gray, dismissible not required.
- **Quick Facts popover**: each completed state's bar carries a Quick Facts button using the native `popover` attribute (`popovertarget` on the button). Content: five to seven rows pulled verbatim from the Snapshot table by the build script: Governor, state chief and selection method, budget rhythm, local money mechanism, November 2026 exposure. This serves the five-minute-prep case without expanding anything. Popover content is public data already on the page in full form; it is generated, never hand-written. Native popovers are supported in all evergreen browsers as of 2024; no fallback beyond the button doing nothing in a truly ancient browser, which is acceptable because the same facts are one click deeper.
- Content styling (kv tables, callout boxes, verified lines, sources lines) carries over from v1 CSS unchanged.

## 6. Filter row (pure CSS)

A row of radio-driven filters above the panels, implemented with hidden radios and `:has()`:

- **All | Profiles ready | Developing**: hides non-matching panels entirely (display: none, which also keeps them out of Find, consistent with Section 2).
- No other filters in v2.0. Cross-state topic pivots were considered and cut: they contradict the per-state search scope that motivates this redesign. Do not add them.

`:has()` is supported in all evergreen browsers since late 2023. If the owner reports a target browser without it, the filter row degrades: wrap it in a feature-query so unsupported browsers simply do not show the filters. Nothing else on the page may depend on `:has()` in a way that breaks core reading; the checkbox expansion pattern has a decades-old sibling-selector fallback form, and the build should prefer the form with the widest support at equal cleanliness.

## 7. What stays multi-file and what does not

- **The page is one self-contained HTML file**: CSS inlined in `<head>`, SVG map inline, zero external requests. This makes the artifact maximally portable for both the interim GitHub hosting and the eventual Dell upload, and it makes StatiCrypt trivially total: encrypting the one file gates everything, closing the v1 gap where search.js sat outside the gate.
- **The Cross-State Matrix remains its own page** (`matrix.html`, self-contained the same way), linked from the header. Rationale: it is a different tool (comparison, not per-state work), it is very wide, and folding it into the one page would put twelve states of matrix text inside Find scope permanently, violating Section 2. This is a standing decision; the owner can reverse it, the build must not.
- Expected weight of the main page is roughly 1 MB. That is accepted. Do not "optimize" by lazy-loading content with JavaScript.

## 8. Build procedure

1. Start from the v1 delivery's `build/` toolchain. Reuse `build.py`'s normalization (docx via pandoc, heading promotion across the three spec generations, table classification, verified/sources styling) exactly as-is. Reuse `mapdata.json`; only link targets in the SVG change (page anchors instead of `states/*.html`).
2. Write the v2 assembler (suggested: `build_v2.py`) that emits `index.html` (the one page) and `matrix.html`. Quick Facts popover rows are extracted from each profile's Snapshot table by matching the row labels listed in Section 5; if a label is absent in a given state (spec generations differ), omit that row rather than guessing.
3. Inputs are the current twelve (or more) `State_Profile_<Name>.docx` files and `Cross_State_Matrix.md`, supplied fresh at build time. Never reuse stale converted content from a previous run.
4. Jurisdiction roster, slugs, and developing placeholders as in SITE_SPEC v1.0 Sections 4 and 6. When a Batch 4 profile arrives, it moves from the developing list to the states list and the same build regenerates everything.

## 9. Design tokens and voice

Unchanged from SITE_SPEC v1.0 Section 7: Dell blue #0672CB, band #EEF3F8, callout #E8F1FA with #0672CB left rule, ink #1F2A36, gray #5A6372, navy #0B2740, developing grays, NYC amber, Segoe UI system stack, no external fonts. Section headers keep the band-with-blue-rule treatment so the site continues to read as the same product as the Word profiles. All copy written for the site itself: plain, active voice, no em dashes and no en dashes anywhere in rendered output.

## 10. Verification pass (all required before delivery)

1. **Find scoping** (the defining test): the three-part acceptance test in Section 2, executed in a Chromium browser at minimum, reported explicitly in the delivery note.
2. **Dashes**: zero U+2014 and U+2013 in rendered HTML output, checked on the output files.
3. **No JavaScript**: zero `<script>` tags, zero inline handlers in both files.
4. **Self-containment**: zero external requests; the page renders fully from the single file with the network disabled.
5. **Links and anchors**: every map target, dropdown entry, section-rail chip, and filter resolves; every `slug-sN` anchor exists exactly once.
6. **No-JS is moot but no-CSS is not**: with CSS disabled the document must still read top to bottom in correct order (semantic structure, no content trapped in pseudo-elements).
7. **Reduced motion and keyboard**: `prefers-reduced-motion` respected; every expand control, popover button, and filter reachable and operable by keyboard with visible focus.
8. **Popovers**: every completed state's Quick Facts opens, shows only generated Snapshot content, and closes on outside click and Escape.

## 11. Delivery

The zip contains: `index.html`, `matrix.html`, `build/` (updated toolchain), this document, and an updated `README_DEPLOY.md` reflecting single-file StatiCrypt (the command simplifies to the two HTML files; no assets copy step remains). Report the verification results, including the Find-scoping test outcome, in the delivery note. Do not redesign beyond this document; ambiguities are resolved by choosing the simpler option and flagging the choice in the delivery note.
