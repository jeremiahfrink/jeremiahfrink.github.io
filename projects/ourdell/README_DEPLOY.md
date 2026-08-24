# Deploying to GitHub Pages behind a password

The site itself has no password logic. The gate is applied at deploy time with StatiCrypt, so the underlying files stay pure and portable for the Dell internal migration.

## One thing to decide first: repo visibility

GitHub's free plan only serves Pages from **public** repositories. Two ways through:

- **Option A (free):** public repo. The StatiCrypt gate means casual visitors hit a password prompt, but the encrypted files are public and the encryption is a courtesy lock, not security. Fine here because every fact on the site is public data.
- **Option B (paid):** GitHub Pro or an organization on Team allows Pages from a private repo. Same deploy steps.

Either way, keep the *unencrypted* source out of the published folder so the raw pages are not one click away.

## Steps

1. **Create the repo** (example name: `k12-landscape`). Do not commit yet.

2. **Lay out the repo** with the site in a source folder and the encrypted output in `docs/` (Pages will serve `docs/`):

   ```
   site/          <- everything in this delivery except build/ and this file
   docs/          <- StatiCrypt output goes here (created in step 3)
   build/         <- optional; the regeneration toolchain
   ```

3. **Encrypt.** From the repo root, with Node.js installed:

   ```bash
   npx staticrypt site/index.html site/matrix.html site/all-states.html site/states/*.html \
     -d docs --recursive \
     -p "YOUR-SIMPLE-PASSWORD" \
     --remember 30 \
     --template-title "Dell K-12 State Education Landscape" \
     --template-instructions "Enter the team password."
   cp -r site/assets docs/assets
   ```

   Notes:
   - `--remember 30` keeps a device signed in for 30 days so AEs are not retyping the password every visit.
   - StatiCrypt encrypts HTML pages only. `assets/site.css` and `assets/search.js` are copied through as-is, which means the search index text inside `search.js` is technically readable without the password. Acceptable here because the content is public data; the password is a front door, not a vault.
   - Keep the password out of the repo. Run the command locally; only `docs/` gets committed.

4. **Commit and push** `docs/` (and `site/` if the repo is private; leave `site/` out if the repo is public and you would rather only the encrypted copies be visible).

5. **Turn on Pages:** repo Settings, Pages, Source: "Deploy from a branch", Branch: `main`, folder: `/docs`. The site appears at `https://<username>.github.io/k12-landscape/` within a minute or two.

6. **Share with the team:** the URL and the password. The `--remember` flag means one entry per device per month.

## Updating after profile changes

Regenerate the site (see SITE_SPEC.md Section 5), re-run step 3, push. StatiCrypt is deterministic enough that this is the whole update cycle.

## When it moves inside Dell

Follow SITE_SPEC.md Section 3: strip the one JavaScript file and one script line per page, hand the `site/` folder to the internal space, and retire the GitHub repo. Nothing about the StatiCrypt layer follows the site inward.
