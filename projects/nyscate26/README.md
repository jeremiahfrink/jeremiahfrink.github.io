# NYSCATE 2026 Conference Planner

A static GitHub Pages-ready website. Files: `index.html`, `styles.css`, `gate.js`, `app.js`, `events.json`.

## Deploy
1. Create a GitHub repository, or put the five files in an existing site's project directory.
2. Upload the five files to the same directory (not the ZIP file itself).
3. In repository **Settings → Pages**, set **Deploy from a branch**, choose `main` and `/ (root)` (or `/docs` if placing files there).
4. Visit your published Pages URL. Allow GitHub to finish deployment before testing.

For a quick local preview, run `python -m http.server 8000` in this folder and open http://localhost:8000 (opening `index.html` directly from disk may block `fetch`).

## How the data is classified
- Each presentation program-grid cell becomes one presentation event, retaining source text, session number, time, room, topic column, and presider name when available. Presider emails are NOT published.
- The full internal schedule provides keynotes, socials, meals, board/VIP events, corporate focus groups, operations, and generic session-block headers.
- Board/committee/private events are classified **provisionally**. The spreadsheet doesn't always identify allowed attendees. Verify access eligibility before announcing this as an official public attendee guide.
- By default, the website shows attendee-friendly events. The audience selector lets a visitor voluntarily see private or staff event listings. **This is NOT access control.** Any information inside `events.json` is public on GitHub Pages. Do not include confidential information, private locations, or contact details in the dataset.
- Generic block labels are hidden by default to avoid showing redundant “Session 1” alongside its presentations.
- Some session titles, presenters, sponsorship details, and venue names are combined in the original spreadsheet. The original program text is preserved in details, but splitting the presenter from the title is automated and should be reviewed.
- Some general-schedule events have a blank start or end time; the website displays TBD rather than inventing it. Calendar exports omit saved events without a start time, and omit an end time when unavailable.
- The presentation grid has limited abstract/description data; the site does not invent descriptions.

## Personal schedules
Selections are saved via browser localStorage. They persist only on that device/browser, not across different browsers or private-browsing sessions. Calendar export is an `.ics` file. No account system or back-end is included.

## Updating data
Update the `events.json` file and commit it to GitHub. IDs should remain stable when possible so that saved events remain associated with the same entries.

## Basic shared password
This release opens with a password prompt. The shared password is `B0@rd26` (the first character is a capital B, the second is zero). By default, “Remember this personal device” is checked, and successful entry is remembered in this browser using localStorage across visits and browser restarts. Uncheck it to remember access only for the current tab/session. Private browsing, clearing site data, or using a different browser/device may require entering the password again. To change it, update the SHA-256 digest in `gate.js` or ask for a replacement file.

**Security warning:** GitHub Pages publishes `events.json` and all other static files publicly even when the password prompt is enabled. The password hash is visible in source code and the prompt can be bypassed. This is only a casual UI gate, *not* secure storage or authenticated access. Do not publish truly sensitive board or invitee information in this repository. For actual protected content, use server-side authentication and authorization with a protected data store.

The published data includes session titles, speakers, tracks, rooms, source descriptions, and presider **names** where available. No email addresses are included in `events.json`.
