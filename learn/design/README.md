# Game Space Design Lab

A static webpage. No build step, no database, no server-side code.

## Add it to an existing GitHub Pages site

1. Create a folder in the repository, such as `design-lab`.
2. Upload `index.html`, `styles.css`, and `app.js` into that folder.
3. Commit.
4. Open the folder URL, for example `https://YOUR-SITE/design-lab/`.

All links are relative, so it works at the site root or in a subfolder.

If the site is a Jekyll site, put an empty file named `.nojekyll` at the repository root. Without it Jekyll can skip files and break the build.

Notes are saved in that browser on that device using local storage. Nothing is sent anywhere. The Download button on the last step produces a markdown file, which is how work leaves the device.

## What changed from v1

The previous version assumed an instructor standing next to the student explaining why each step mattered. This version puts that explanation on the page.

- **New Step 0, "Start here."** States the purpose, names the real skill being taught (working with an AI so it produces something useful), and lists what counts as finished before any work begins.
- **A "Why you are doing this" block on every step.** Three or four paragraphs of rationale, in the student's language, explaining what the move builds and what goes wrong without it.
- **Worked examples where the task is genuinely hard.** Weak against strong context on step 2. Three working design challenges and three failing ones with reasons on step 3. A five-question critical checklist for reading generated images on step 5.
- **A "Stuck on this step?" expander on every working step**, addressing the specific ways that step fails rather than generic encouragement.
- **A "How to work with the AI" dialog**, reachable from the sidebar at any time. Five moves, six failure modes, and a privacy warning about uploading photographs.
- **Expandable dictionary entries** in the sidebar, two per step, covering anchoring, constraints, solutioning, divergent and convergent thinking, fidelity, the curse of knowledge, staging, and the tendency of models to agree with you.
- **Three new fields** that carry most of the assessment weight: what the AI suggested that the student rejected and why, what the generated images got impossible, and what still has to be verified before anything is bought.
- **Download replaces print as the primary output**, since work needs to move between devices. Print still works.
- **Storage failures no longer break the page.** Local storage is wrapped, so the page still runs when it is blocked and simply does not persist.

The WebMCP tool registration from v1 was removed. It added a dependency on an experimental browser API for no benefit to a single student working alone.
