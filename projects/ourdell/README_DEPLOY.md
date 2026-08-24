# Deploying site v2 to GitHub Pages behind a password

Site v2 is two self-contained files. Nothing loads from the network, so encrypting the two HTML files gates the entire site. This closes the gap in v1, where the search index sat outside the password in a separate JavaScript file.

## One thing to decide first: repo visibility

GitHub's free plan only serves Pages from **public** repositories.

- **Option A (free):** public repo. StatiCrypt puts a password prompt in front, but the encrypted files are public and the encryption is a courtesy lock, not real security. Fine here, because every fact on the site is public data.
- **Option B (paid):** GitHub Pro or an organization on Team serves Pages from a private repo. Same steps otherwise.

## Steps

1. **Create the repo** (example: `k12-landscape`).

2. **Lay it out** with the source in `site/` and the encrypted output in `docs/`, which is what Pages will serve:

   ```
   site/          index.html, matrix.html
   docs/          StatiCrypt output (created in step 3)
   build/         regeneration toolchain (optional to commit)
   ```

3. **Encrypt.** From the repo root, with Node.js installed:

   ```bash
   npx staticrypt site/index.html site/matrix.html \
     -d docs \
     -p "YOUR-SIMPLE-PASSWORD" \
     --remember 30 \
     --template-title "Dell K-12 State Education Landscape" \
     --template-instructions "Enter the team password."
   ```

   No assets to copy: the CSS and the map are inside the HTML. Both files are encrypted, so there is nothing readable without the password.

   `--remember 30` keeps a device signed in for 30 days, so the team is not retyping the password every visit. Keep the password out of the repo; run this locally and commit only `docs/`.

4. **Commit and push.** On a public repo, consider leaving `site/` uncommitted so only the encrypted copies are online.

5. **Turn on Pages:** Settings, Pages, Source "Deploy from a branch", Branch `main`, folder `/docs`. Live at `https://<username>.github.io/k12-landscape/` in a minute or two.

6. **Share** the URL and the password with the team.

## A note on file size

`index.html` is roughly 1 MB because every profile is in the page. That is the design: it is what makes one-click expansion and per-state Find work with no JavaScript. First load takes a moment on a slow connection, then everything is instant. GitHub Pages serves it compressed, so the transfer is far smaller than the raw size.

## Updating after profile changes

Regenerate (see REDESIGN_SPEC_v2.md Section 8), re-run step 3, push.

## When it moves inside Dell

There is nothing to strip. v2 has no JavaScript, no external requests, and no separate asset files. Hand `site/index.html` and `site/matrix.html` to the internal space as they are. The StatiCrypt layer does not travel with them; retire the GitHub repo at that point.
