# 14-Day Fitness Guide — Version 5

Phone-first repeatable fitness guide for GitHub Pages. The cycle anchor is Saturday, August 15, 2026.

## Files
- `index.html` — app, plan, tracker, import/export
- `workouts.json` — optional alternate-workout library; fetched only when **Browse Alternates** is tapped
- `manifest.webmanifest` — installable-web-app metadata
- `sw.js` — lightweight caching for the core app

## Data model
Every logged day snapshots:
- plan ID, name, and version
- Foundation name/version
- scheduled workout ID/name/version/target
- actual workout mode (`planned` or `alternate`)
- actual workout ID/name/target
- completion, movement-break status/count, feeling, duration, distance, and note
- optional daily-health fields: sleep hours, snooze minutes, and water ounces
- daily Devotions checkbox
- Healthy Choices checkboxes for breakfast, lunch, dinner, and snacks
- Reports tab with Week, 14-Day Cycle, Month, and Lifetime views

This prevents later seasonal plan edits from rewriting historical meaning.

## Daily health and habits
The **Today** screen includes:
- Devotions checkbox
- Healthy Choices: Breakfast, Lunch, Dinner, Snacks
- sleep hours
- snooze minutes
- water ounces

Healthy Choices export in CSV as one `healthy_meals` field, for example:
`breakfast|lunch|dinner`

These fields are stored by date and included in History, Reports, CSV export, and JSON backup. They do not affect workout completion.

## Reports
The Reports tab includes:
- This Week (Monday–Sunday)
- Current 14-Day Cycle
- This Month
- Lifetime

Reports show Foundation and Workout consistency, Devotions consistency, healthy-choice checks by meal, workout minutes, miles, movement breaks, sleep, snooze, water, zero-snooze mornings, and completed workout types. There is intentionally no combined health score.

## Alternate workouts
Tap **Use Alternate** on Today. You can type any workout directly. Tap **Browse Alternates** to load `workouts.json` only on demand. The JSON file can be edited independently when you want to add seasonal/travel options.

## Updating the standard plan later
When making a meaningful plan change, change `PLAN.id`, `PLAN.version`, and the appropriate workout version labels in `index.html`. Existing logged days retain their saved snapshots.

## GitHub Pages
Upload all five files together to the published folder. Keep the URL stable because localStorage is scoped to the site/origin. Export JSON backups periodically.
