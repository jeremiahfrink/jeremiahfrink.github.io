# NYSCATE 2026 Board Conference Planner (v3)

A static site for GitHub Pages. Phone first. Built for Board members, not for general attendees.

## Files (upload all nine to the same folder)
`index.html`, `styles.css`, `gate.js`, `app.js`, `events.json`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`

## Updating the live site
1. Upload all nine files to the same folder that holds the current site, replacing the old five.
2. Wait for GitHub Pages to finish deploying.
3. On a phone, open the site and tap **Refresh** under the title. The line next to it shows when the schedule was last updated.

Saved sessions are kept. Every event from the first release has the same ID, and the browser storage key (`nyscate-2026-saved-v1`) and the password screen are unchanged. Board members do not need to sign in again or save anything again, as long as the site stays at the same web address.

## What changed in v2
- Descriptions, speaker titles and organizations added from the official Cvent agenda (280 of 327 events now have a description).
- 46 sessions added that were only on Cvent: live podcasts, Portrait of a Graduate table talks, drone events, the regional meetings with rooms, and others. Their IDs start with `cv-`.
- Where the internal schedule and Cvent disagree on day, time, room or title, the Cvent value is shown and the card and details carry a note with the internal value. The original grid text is also kept under "Original internal grid entry" in details.
- Rooms now show their building (Conference Center, Grand Expo, Schoolhouse, Tower Meeting Rooms, Event Center).
- Bottom tabs: **Now**, **Agenda**, **Mine**, **Search**.
- **Now** opens first and shows what is happening and what is next, in Eastern time.
- **Agenda** has pinned day buttons, sticky time headings, a "Now" jump button, an "All events / Board & VIP" switch, and a Filters sheet. Operations and staffing rows are hidden until switched on in Filters.
- **Mine** shows saved sessions plus "my duties": type your name to see every row that lists you as presider, lead, helper or speaker.
- Details open full screen, the phone's back button closes them, and "Share link" sends a link straight to that session.
- Works offline after the first visit and can be added to the home screen. The site always tries the network first, so updates appear as soon as the phone is online.
- NYSCATE colors: navy with the logo's orange, amber and teal.

## Things to verify
- Audience labels (Board, invitation, staff) are still provisional, as in the first release.
- The internal grid entry "Google 5" (Monday 7:30 AM, Mohawk) is not on the Cvent agenda and is flagged on its card.
- The single "Regional Meetings" row from the internal schedule is kept as a heading. The eight individual meetings from Cvent carry the rooms.
- Presider names come only from the internal grid. If a session moved on Cvent, confirm the presider still applies.

## Editing data
Edit `events.json` and commit. Keep each `id` unchanged so saved sessions stay attached. Change `meta.updatedLabel` so phones show the new update time.

## Access screen
The site opens with the same shared password as before. It is not written in this file because a GitHub Pages repository is public. To change it, replace the SHA-256 value in `gate.js`.

**This is not real security.** Everything in `events.json` is publicly readable to anyone who knows the address, with or without the password. Email addresses are not included. Do not publish truly sensitive Board information here.

## Local preview
Run `python -m http.server 8000` in this folder and open http://localhost:8000. Offline support only switches on over HTTPS, so it will not run in a local preview.
