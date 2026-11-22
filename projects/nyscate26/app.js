'use strict';
/* NYSCATE 2026 Board Planner. Saved sessions use the same storage key as the first release. */
const KEY = 'nyscate-2026-saved-v1';
const PREFS = 'nyscate-2026-prefs-v1';
const DAYS = { '2026-11-21': 'Saturday, November 21', '2026-11-22': 'Sunday, November 22', '2026-11-23': 'Monday, November 23', '2026-11-24': 'Tuesday, November 24' };
const DAY_SHORT = { '2026-11-21': ['Sat', '21'], '2026-11-22': ['Sun', '22'], '2026-11-23': ['Mon', '23'], '2026-11-24': ['Tue', '24'] };
const DAY_KEYS = Object.keys(DAYS);
const BOARD_AUD = ['board', 'invite', 'registration'];

let events = [], meta = {}, byId = new Map();
let selected = new Set();
let state = { view: 'now', day: '', scope: 'all', name: '' };
let filters = { track: '', building: '', room: '', types: null, ops: false, blocks: false, open: false };
let query = '';
let nowTimer = null;

const $ = id => document.getElementById(id);
const safe = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const mins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const hm = n => String(Math.floor(n / 60)).padStart(2, '0') + ':' + String(n % 60).padStart(2, '0');
function clock(t) { if (!t) return 'TBD'; const [h, m] = t.split(':').map(Number); return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; }
const endOf = e => e.end || (e.start ? hm(Math.min(mins(e.start) + 60, 1439)) : '');
const isRestricted = e => e.restricted || !['everyone', 'review'].includes(e.audience);
const isBoard = e => BOARD_AUD.includes(e.audience) || /Board|VIP/.test(e.type) || e.type === 'Regional meeting';
const audienceLabel = a => ({ everyone: 'General attendees', board: 'Board or committee', invite: 'Invitation only', registration: 'Eligibility or registration to confirm', staff: 'Staff and volunteers', review: 'Eligibility to confirm' }[a] || a);
const where = e => [e.room, e.building && e.building !== e.room ? e.building : ''].filter(Boolean).join(' · ');

/* Conference time is Eastern, whatever the phone is set to. A now= value in the address is for testing. */
function nowET() {
  const o = new URLSearchParams(location.search).get('now');
  if (o && /^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(o)) return { date: o.slice(0, 10), time: o.slice(11, 16) };
  const p = {};
  new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date()).forEach(x => { p[x.type] = x.value; });
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` };
}

/* ---------- storage ---------- */
function loadSaved() { try { selected = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { selected = new Set(); } }
function persistSaved() { try { localStorage.setItem(KEY, JSON.stringify([...selected])); } catch { } $('savedCount').textContent = selected.size; }
function loadPrefs() { try { Object.assign(state, JSON.parse(localStorage.getItem(PREFS) || '{}')); } catch { } }
function persistPrefs() { try { localStorage.setItem(PREFS, JSON.stringify(state)); } catch { } }

/* ---------- my duties ---------- */
function nameTerms() { return state.name.split(',').map(s => s.trim().toLowerCase()).filter(s => s.length >= 3); }
function hasTerm(text, term) {
  const t = String(text || '').toLowerCase(); let i = t.indexOf(term);
  while (i >= 0) {
    const before = i === 0 || !/[a-z0-9]/.test(t[i - 1]); const after = i + term.length >= t.length || !/[a-z0-9]/.test(t[i + term.length]);
    if (before && after) return true; i = t.indexOf(term, i + 1);
  }
  return false;
}
function duties(e) {
  const terms = nameTerms(); if (!terms.length) return [];
  const roles = [];
  const check = (label, text) => { if (text && terms.some(t => hasTerm(text, t))) roles.push(label); };
  check('Presider', e.presider); check('Lead', e.lead); check('Helper', e.helpers);
  check('Speaker', (e.speakers || []).map(s => s.name).join(', ') || e.presenter);
  return roles;
}

/* ---------- filtering ---------- */
function activeFilterCount() { return [filters.track, filters.building, filters.room, filters.types, filters.ops, filters.blocks, filters.open].filter(Boolean).length; }
function baseVisible(e) {
  if (e.type === 'Session block' && !filters.blocks) return false;
  if (e.type === 'Operations' && !filters.ops) return false;
  if (state.scope === 'board' && !isBoard(e)) return false;
  return true;
}
function agendaVisible(e) {
  if (!baseVisible(e)) return false;
  if (filters.track && e.track !== filters.track) return false;
  if (filters.building && e.building !== filters.building) return false;
  if (filters.room && e.room !== filters.room) return false;
  if (filters.types && !filters.types.has(e.type)) return false;
  if (filters.open && isRestricted(e)) return false;
  return true;
}
const order = (a, b) => (a.date + (a.start || '99:99') + a.title).localeCompare(b.date + (b.start || '99:99') + b.title);
function conflicts(e) {
  if (!e.start) return 0; const s = e.start, en = endOf(e);
  return events.filter(x => x.id !== e.id && selected.has(x.id) && x.date === e.date && x.start && s < endOf(x) && x.start < en).length;
}

/* Every place where the official agenda replaced an internal schedule value. */
function changeNotes(e) {
  const n = [];
  if (e.gridNote) n.push(e.gridNote + '. Official agenda shown.');
  if (e.gridTitle) n.push('Internal schedule lists this as: ' + e.gridTitle);
  if (e.presiderCheck) n.push('Presider was assigned for the internal schedule slot. Confirm it still applies.');
  if (e.changeNote) n.push(e.changeNote);
  return n;
}
/* ---------- cards ---------- */
function card(e, opt = {}) {
  const saved = selected.has(e.id);
  const tags = [];
  if (opt.roles && opt.roles.length) tags.push(`<span class="tag duty">${safe(opt.roles.join(' · '))}</span>`);
  if (e.type !== 'Presentation') tags.push(`<span class="tag type">${safe(e.type)}</span>`);
  if (e.track) tags.push(`<span class="tag">${safe(e.track)}</span>`);
  if (e.featured) tags.push('<span class="tag feat">Featured</span>');
  (e.tags || []).forEach(t => tags.push(`<span class="tag">${safe(t)}</span>`));
  if (isRestricted(e)) tags.push('<span class="tag restricted">Restricted · verify</span>');
  const c = saved ? conflicts(e) : 0;
  const people = e.presenter ? `<p class="meta">${safe(e.presenter)}</p>` : '';
  const pres = e.presider ? `<p class="meta"><b>Presider:</b> ${safe(e.presider)}</p>` : '';
  const lead = e.lead && e.source !== 'program' ? `<p class="meta"><b>Lead:</b> ${safe(e.lead)}</p>` : '';
  return `<article class="card${saved ? ' is-saved' : ''}" data-open="${safe(e.id)}" tabindex="0" role="button" aria-label="${safe(e.title)}, details">
  <div class="when"><strong>${safe(e.start ? clock(e.start) : 'Time TBD')}</strong><small>${e.end ? 'to ' + safe(clock(e.end)) : ''}</small>${opt.day ? `<small class="d">${safe(DAY_SHORT[e.date] ? DAY_SHORT[e.date].join(' ') : e.date)}</small>` : ''}</div>
  <div class="body">
    ${tags.length ? `<div class="tags">${tags.join('')}</div>` : ''}
    <h3>${safe(e.title)}</h3>
    ${people}
    ${where(e) ? `<p class="meta place">${safe(where(e))}</p>` : ''}
    ${pres}${lead}
    ${e.description && e.type !== 'Session block' ? `<p class="preview">${safe(e.description)}</p>` : ''}
    ${changeNotes(e).map(n => `<p class="note">${safe(n)}</p>`).join('')}
    ${e.gridOnly ? '<p class="note">Not found on the official agenda. Confirm before attending.</p>' : ''}
    ${c ? `<p class="note warn">Overlaps ${c} other saved event${c > 1 ? 's' : ''}</p>` : ''}
  </div>
  <button type="button" class="star${saved ? ' on' : ''}" data-save="${safe(e.id)}" aria-pressed="${saved}" aria-label="${saved ? 'Remove from' : 'Add to'} my schedule">${saved ? '★' : '☆'}</button>
</article>`;
}
const empty = msg => `<div class="empty">${msg}</div>`;
function scopeControl() {
  return `<div class="seg" role="group" aria-label="Show"><button type="button" data-scope="all" class="${state.scope === 'all' ? 'on' : ''}" aria-pressed="${state.scope === 'all'}">All events</button><button type="button" data-scope="board" class="${state.scope === 'board' ? 'on' : ''}" aria-pressed="${state.scope === 'board'}">Board &amp; VIP</button></div>`;
}

/* ---------- views ---------- */
function renderNow() {
  const n = nowET();
  $('strip').innerHTML = `<div class="strip-row">${scopeControl()}<span class="clock">${safe(DAY_SHORT[n.date] ? DAY_SHORT[n.date][0] + ' ' : '')}${safe(clock(n.time))} ET</span></div>`;
  const pool = events.filter(baseVisible);
  const first = DAY_KEYS[0], last = DAY_KEYS[DAY_KEYS.length - 1];
  let html = '';
  if (n.date > last) { $('view').innerHTML = empty('The conference has ended. Use Agenda or Search to look back at any session.'); return; }
  const mineNext = events.filter(e => (selected.has(e.id) || duties(e).length) && e.start && (e.date > n.date || (e.date === n.date && endOf(e) > n.time))).sort(order)[0];
  if (mineNext) html += `<h2 class="sec">Your next commitment</h2>${card(mineNext, { day: mineNext.date !== n.date, roles: duties(mineNext) })}`;
  if (n.date < first) html += `<p class="lead-in">The conference has not started yet. Here is how it opens.</p>`;
  const live = n.date < first ? [] : pool.filter(e => e.date === n.date && e.start && e.start <= n.time && endOf(e) > n.time);
  const short = live.filter(e => mins(endOf(e)) - mins(e.start) <= 150).sort((a, b) => b.start.localeCompare(a.start) || a.title.localeCompare(b.title));
  const long = live.filter(e => mins(endOf(e)) - mins(e.start) > 150).sort(order);
  if (short.length) html += `<h2 class="sec">Happening now <span>${short.length}</span></h2>${short.map(e => card(e)).join('')}`;
  let upcoming = pool.filter(e => e.start && (e.date > n.date || (e.date === n.date && e.start > n.time))).sort(order);
  if (upcoming.length) {
    const d0 = upcoming[0].date; const slots = [...new Set(upcoming.filter(e => e.date === d0).map(e => e.start))].slice(0, 2);
    slots.forEach((s, i) => {
      const rows = upcoming.filter(e => e.date === d0 && e.start === s);
      const wait = d0 === n.date ? mins(s) - mins(n.time) : null;
      const label = (i === 0 ? 'Up next' : 'Then') + ' · ' + (d0 !== n.date ? DAY_SHORT[d0][0] + ' ' : '') + clock(s);
      html += `<h2 class="sec">${safe(label)} ${wait !== null && wait <= 90 ? `<em>in ${wait} min</em>` : ''}<span>${rows.length}</span></h2>${rows.map(e => card(e)).join('')}`;
    });
    html += `<p class="more"><button type="button" class="secondary" data-go-agenda="${safe(d0)}">Open the full ${safe(DAY_SHORT[d0][0])} agenda</button></p>`;
  }
  if (long.length) html += `<h2 class="sec">Open all day <span>${long.length}</span></h2>${long.map(e => card(e)).join('')}`;
  $('view').innerHTML = html || empty(state.scope === 'board' ? 'No Board or VIP events are coming up. Switch to All events to see everything.' : 'Nothing is scheduled right now.');
}

function renderAgenda() {
  const n = nowET();
  if (!DAYS[state.day]) state.day = DAYS[n.date] ? n.date : '2026-11-22';
  const cnt = activeFilterCount();
  $('strip').innerHTML = `<div class="days" role="tablist" aria-label="Day">${DAY_KEYS.map(d => `<button type="button" role="tab" data-day="${d}" class="${d === state.day ? 'on' : ''}" aria-selected="${d === state.day}"><small>${DAY_SHORT[d][0]}</small><b>${DAY_SHORT[d][1]}</b></button>`).join('')}</div>
  <div class="strip-row">${scopeControl()}<button type="button" class="pill" id="openFilters">Filters${cnt ? ` <b>${cnt}</b>` : ''}</button>${DAYS[n.date] ? '<button type="button" class="pill" id="jumpNow">Now</button>' : ''}</div>`;
  const rows = events.filter(e => e.date === state.day && agendaVisible(e)).sort(order);
  if (!rows.length) { $('view').innerHTML = empty('Nothing matches on this day. Try another day, switch to All events, or reset the filters.'); return; }
  let html = '', lastSlot = null;
  for (const e of rows) {
    const s = e.start || '';
    if (s !== lastSlot) { html += `<h2 class="slot" id="slot-${s.replace(':', '') || 'tbd'}" data-slot="${s}">${s ? clock(s) : 'Time TBD'} <span>${rows.filter(x => (x.start || '') === s).length}</span></h2>`; lastSlot = s; }
    html += card(e);
  }
  $('view').innerHTML = html;
}

function renderMine() {
  $('strip').innerHTML = '';
  const terms = nameTerms();
  const rows = events.map(e => ({ e, roles: duties(e) })).filter(x => selected.has(x.e.id) || x.roles.length).sort((a, b) => order(a.e, b.e));
  let html = `<div class="panel">
    <label for="myName">Your name on the schedule</label>
    <input id="myName" type="text" inputmode="text" autocomplete="off" autocapitalize="words" placeholder="For example: Laurie Guyon, Laurie G" value="${safe(state.name)}">
    <p class="hint">Shows every row that lists you as presider, lead, helper or speaker. Type it the way the schedule shows it. Add short forms after a comma. This stays on your phone.</p>
  </div>`;
  if (!rows.length) html += empty(terms.length ? 'No duties found for that name and nothing saved yet. Tap the star on any event to save it.' : 'Nothing saved yet. Tap the star on any event to add it here.');
  else {
    html += `<div class="actions"><button type="button" class="secondary" id="exportCalendar">Export to calendar (.ics)</button><button type="button" class="secondary" id="printMy">Print</button></div>`;
    let last = '';
    for (const { e, roles } of rows) { if (e.date !== last) { html += `<h2 class="sec day">${safe(DAYS[e.date] || e.date)}</h2>`; last = e.date; } html += card(e, { roles }); }
  }
  $('view').innerHTML = html;
}

function searchRows() {
  const q = query.toLowerCase().trim(); if (q.length < 2) return null;
  const words = q.split(/\s+/);
  return events.filter(e => {
    const hay = [e.title, e.room, e.building, e.presenter, e.presider, e.track, e.type, e.lead, e.helpers, e.description, e.original, (e.speakers || []).map(s => s.company + ' ' + s.title).join(' '), (e.tags || []).join(' ')].join(' ').toLowerCase();
    return words.every(w => hay.includes(w));
  }).sort(order);
}
function renderSearchResults() {
  const rows = searchRows();
  if (!rows) { $('results').innerHTML = empty('Search every day at once: a title, speaker, presider, room, sponsor or topic.'); return; }
  if (!rows.length) { $('results').innerHTML = empty('No events match that search.'); return; }
  let html = `<p class="count">${rows.length} event${rows.length !== 1 ? 's' : ''}</p>`, last = '';
  for (const e of rows.slice(0, 150)) { if (e.date !== last) { html += `<h2 class="sec day">${safe(DAYS[e.date] || e.date)}</h2>`; last = e.date; } html += card(e); }
  $('results').innerHTML = html;
}
function renderSearch() {
  $('strip').innerHTML = `<div class="strip-row"><input id="q" type="search" placeholder="Search titles, people, rooms, topics" value="${safe(query)}" aria-label="Search events" enterkeyhint="search"></div>`;
  $('view').innerHTML = '<div id="results"></div>';
  renderSearchResults();
}

function render(keepScroll) {
  const y = window.scrollY;
  document.querySelectorAll('.tab').forEach(b => { const on = b.dataset.view === state.view; b.classList.toggle('active', on); b.setAttribute('aria-current', on ? 'page' : 'false'); });
  document.body.dataset.view = state.view;
  ({ now: renderNow, agenda: renderAgenda, mine: renderMine, search: renderSearch }[state.view] || renderNow)();
  $('savedCount').textContent = selected.size;
  document.documentElement.style.setProperty('--strip-h', $('strip').offsetHeight + 'px');
  if (keepScroll) window.scrollTo(0, y);
  clearInterval(nowTimer);
  if (state.view === 'now') nowTimer = setInterval(() => { if (!$('details').open) render(true); }, 60000);
}
function go(view) { state.view = view; persistPrefs(); render(); window.scrollTo(0, 0); if (view === 'search') { const q = $('q'); if (q) q.focus(); } }
function jumpToNow() {
  const n = nowET(); if (!DAYS[n.date]) return;
  if (state.day !== n.date) { state.day = n.date; render(); }
  const heads = [...document.querySelectorAll('.slot[data-slot]')].filter(h => h.dataset.slot);
  const target = heads.filter(h => h.dataset.slot <= n.time).pop() || heads[0];
  if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - $('strip').offsetHeight - 4, behavior: 'smooth' });
}

/* ---------- details ---------- */
let openId = null;
function detailHTML(e) {
  const roles = duties(e);
  const lines = [
    ['When', `${DAYS[e.date] || e.date}, ${e.start ? clock(e.start) : 'time TBD'}${e.end ? ' to ' + clock(e.end) : ''}`],
    ['Where', where(e) || 'Not specified'],
    ['Type', [e.type, e.format && e.format !== e.type ? e.format : ''].filter(Boolean).join(' · ')],
    ['Track', e.track], ['Audience', audienceLabel(e.audience)],
    ['Presider', e.presider], ['Lead', e.lead], ['Helpers / notes', e.helpers],
    ['Your role', roles.join(', ')]
  ].filter(x => x[1]);
  const sp = (e.speakers || []).map(s => `<li><b>${safe(s.name)}</b>${[s.title, s.company].filter(Boolean).length ? `<span>${safe([s.title, s.company].filter(Boolean).join(', '))}</span>` : ''}</li>`).join('');
  const saved = selected.has(e.id);
  return `<div class="tags">${e.featured ? '<span class="tag feat">Featured</span>' : ''}${(e.tags || []).map(t => `<span class="tag">${safe(t)}</span>`).join('')}<span class="tag ${isRestricted(e) ? 'restricted' : 'type'}">${isRestricted(e) ? 'Eligibility may be restricted' : safe(e.type)}</span></div>
  <h2>${safe(e.title)}</h2>
  <button type="button" class="save-wide${saved ? ' on' : ''}" data-save="${safe(e.id)}">${saved ? '★ Saved to my schedule' : '☆ Add to my schedule'}</button>
  ${changeNotes(e).map(n => `<p class="note">${safe(n)}</p>`).join('')}${changeNotes(e).length ? '<p class="hint">The official Cvent agenda is shown. Confirm with organizers if it matters.</p>' : ''}
  ${e.gridOnly ? '<p class="note">This entry comes from the internal grid and was not found on the official agenda. Confirm before attending.</p>' : ''}
  <dl class="facts">${lines.map(([k, v]) => `<div><dt>${safe(k)}</dt><dd>${safe(v)}</dd></div>`).join('')}</dl>
  ${sp ? `<h3>Speakers</h3><ul class="people">${sp}</ul>` : (e.presenter ? `<h3>Presenter</h3><p>${safe(e.presenter)}</p>` : '')}
  ${e.description ? `<h3>About this session</h3><div class="about">${safe(e.description)}</div>` : '<p class="hint">No description was published for this event.</p>'}
  ${e.original ? `<details class="orig"><summary>Original internal grid entry</summary><p>${safe(e.original)}</p></details>` : ''}
  <p class="hint">${e.official ? 'Details from the official Cvent agenda, plus internal presider and staffing notes.' : 'From the internal conference schedule.'} <a href="https://www.nyscate.org/conference-schedule.html" target="_blank" rel="noopener noreferrer">Official schedule ↗</a></p>`;
}
function showDetail(id, fromHistory) {
  const e = byId.get(id); if (!e) return;
  openId = id; $('detailBody').innerHTML = detailHTML(e);
  if (!$('details').open) { $('details').showModal(); if (!fromHistory) history.pushState({ detail: id }, '', '#e=' + encodeURIComponent(id)); }
  $('detailBody').scrollTop = 0; $('details').scrollTop = 0;
}
function closeDetail() { if (history.state && history.state.detail) history.back(); else { if ($('details').open) $('details').close(); openId = null; history.replaceState(null, '', location.pathname + location.search); render(true); } }
window.addEventListener('popstate', ev => {
  if (ev.state && ev.state.detail) showDetail(ev.state.detail, true);
  else { if ($('details').open) $('details').close(); if ($('filters').open) $('filters').close(); openId = null; render(true); }
});
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2400); }
async function share() {
  const e = byId.get(openId); if (!e) return;
  const url = location.origin + location.pathname + '#e=' + encodeURIComponent(e.id);
  const text = `${e.title} · ${DAY_SHORT[e.date] ? DAY_SHORT[e.date][0] : ''} ${e.start ? clock(e.start) : ''}${e.room ? ' · ' + e.room : ''}`;
  try { if (navigator.share) { await navigator.share({ title: e.title, text, url }); return; } } catch (err) { if (err && err.name === 'AbortError') return; }
  try { await navigator.clipboard.writeText(url); toast('Link copied'); } catch { toast(url); }
}

/* ---------- filter sheet ---------- */
function fillSelect(sel, values, current) { sel.length = 1; values.forEach(v => { const o = document.createElement('option'); o.value = v; o.textContent = v; sel.append(o); }); sel.value = current; }
function buildFilters() {
  const uniq = k => [...new Set(events.map(e => e[k]).filter(Boolean))].sort();
  fillSelect($('fTrack'), uniq('track'), filters.track);
  fillSelect($('fBuilding'), uniq('building'), filters.building);
  const room = $('fRoom'); room.length = 1; room.querySelectorAll('optgroup').forEach(g => g.remove());
  const groups = {}; events.forEach(e => { if (e.room && e.type !== 'Session block') (groups[e.building || 'Other'] ||= new Set()).add(e.room); });
  Object.keys(groups).sort().forEach(b => { if (filters.building && b !== filters.building) return; const g = document.createElement('optgroup'); g.label = b; [...groups[b]].sort().forEach(r => { const o = document.createElement('option'); o.value = r; o.textContent = r; g.append(o); }); room.append(g); });
  room.value = filters.room; if (room.value !== filters.room) filters.room = '';
  const types = uniq('type').filter(t => t !== 'Operations' && t !== 'Session block');
  $('typeChips').innerHTML = types.map(t => { const on = !filters.types || filters.types.has(t); return `<button type="button" class="chip ${on ? 'on' : ''}" data-type="${safe(t)}" aria-pressed="${on}">${safe(t)}</button>`; }).join('');
  $('fOps').checked = filters.ops; $('fBlocks').checked = filters.blocks; $('fOpen').checked = filters.open;
  const n = events.filter(e => e.date === state.day && agendaVisible(e)).length;
  $('applyFilters').textContent = `Show ${n} event${n !== 1 ? 's' : ''} on ${DAY_SHORT[state.day] ? DAY_SHORT[state.day][0] : 'this day'}`;
}
function resetFilters() { filters = { track: '', building: '', room: '', types: null, ops: false, blocks: false, open: false }; }

/* ---------- calendar export ---------- */
const icsDate = (e, t) => e.date.replaceAll('-', '') + 'T' + t.replace(':', '') + '00';
const icsEscape = s => String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
function exportICS() {
  const parts = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//NYSCATE Community Planner//EN', 'CALSCALE:GREGORIAN'];
  const rows = events.filter(e => (selected.has(e.id) || duties(e).length) && e.start).sort(order);
  rows.forEach(e => {
    const roles = duties(e); const desc = [roles.length ? 'Your role: ' + roles.join(', ') : '', e.presenter ? 'Speakers: ' + e.presenter : '', e.presider ? 'Presider: ' + e.presider : '', (e.description || '').slice(0, 900)].filter(Boolean).join('\n');
    parts.push('BEGIN:VEVENT', `UID:${e.id}@nyscate-community-planner`, `DTSTART;TZID=America/New_York:${icsDate(e, e.start)}`);
    if (e.end) parts.push(`DTEND;TZID=America/New_York:${icsDate(e, e.end)}`);
    parts.push(`SUMMARY:${icsEscape(e.title)}`, `LOCATION:${icsEscape(where(e))}`, `DESCRIPTION:${icsEscape(desc)}`, 'END:VEVENT');
  });
  parts.push('END:VCALENDAR');
  const url = URL.createObjectURL(new Blob([parts.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = 'nyscate-my-conference.ics'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ---------- data ---------- */
async function loadData(fresh) {
  const r = await fetch('events.json', { cache: fresh ? 'reload' : 'no-cache' }); if (!r.ok) throw Error('HTTP ' + r.status);
  const data = await r.json(); events = data.events; meta = data.meta || {}; byId = new Map(events.map(e => [e.id, e]));
  $('stamp').textContent = `Updated ${meta.updatedLabel || meta.updated || ''} · ${events.length} events`;
}
async function refresh() {
  $('refresh').disabled = true; $('stamp').textContent = 'Checking for updates…';
  try { if (navigator.serviceWorker) { const reg = await navigator.serviceWorker.getRegistration(); if (reg) reg.update(); } await loadData(true); render(true); toast(navigator.onLine === false ? 'Offline. Showing the saved copy.' : 'Schedule is up to date'); }
  catch { toast('Could not reach the site. Showing the saved copy.'); if (events.length) $('stamp').textContent = `Schedule updated ${meta.updated || ''} · offline copy`; }
  $('refresh').disabled = false;
}
async function init() {
  loadSaved(); loadPrefs();
  state.view = 'now';
  try { await loadData(false); }
  catch (err) { $('view').innerHTML = empty(`Unable to load the schedule. Check your connection and tap Refresh.<br>${safe(err.message)}`); return; }
  render();
  const m = location.hash.match(/^#e=(.+)$/);
  if (m) { const id = decodeURIComponent(m[1]); history.replaceState(null, '', location.pathname + location.search); if (byId.has(id)) showDetail(id); }
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => { });
}

/* ---------- events ---------- */
document.addEventListener('click', ev => {
  const t = ev.target;
  const save = t.closest('[data-save]');
  if (save) { ev.stopPropagation(); const id = save.dataset.save; selected.has(id) ? selected.delete(id) : selected.add(id); persistSaved(); if ($('details').open && openId === id) $('detailBody').innerHTML = detailHTML(byId.get(id)); else render(true); if (!selected.has(id)) toast('Removed from my schedule'); else toast('Saved to my schedule'); return; }
  const tab = t.closest('.tab'); if (tab) { go(tab.dataset.view); return; }
  const scope = t.closest('[data-scope]'); if (scope) { state.scope = scope.dataset.scope; persistPrefs(); render(); return; }
  const day = t.closest('[data-day]'); if (day) { state.day = day.dataset.day; persistPrefs(); render(); window.scrollTo(0, 0); return; }
  const ga = t.closest('[data-go-agenda]'); if (ga) { state.day = ga.dataset.goAgenda; go('agenda'); return; }
  if (t.closest('#openFilters')) { buildFilters(); $('filters').showModal(); return; }
  if (t.closest('#jumpNow')) { jumpToNow(); return; }
  if (t.closest('#resetFilters')) { resetFilters(); buildFilters(); return; }
  const chip = t.closest('[data-type]');
  if (chip) { const all = [...document.querySelectorAll('#typeChips [data-type]')].map(c => c.dataset.type); const set = filters.types || new Set(all); const v = chip.dataset.type; set.has(v) ? set.delete(v) : set.add(v); filters.types = set.size === all.length ? null : set; buildFilters(); return; }
  if (t.closest('#closeDetails')) { closeDetail(); return; }
  if (t.closest('#shareDetails')) { share(); return; }
  if (t.closest('#refresh')) { refresh(); return; }
  if (t.closest('#exportCalendar')) { exportICS(); return; }
  if (t.closest('#printMy')) { window.print(); return; }
  if (t === $('filters')) { $('filters').close(); return; }
  const open = t.closest('[data-open]'); if (open && !t.closest('a')) showDetail(open.dataset.open);
});
document.addEventListener('keydown', ev => { if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches && ev.target.matches('.card')) { ev.preventDefault(); showDetail(ev.target.dataset.open); } });
document.addEventListener('input', ev => {
  if (ev.target.id === 'q') { query = ev.target.value; renderSearchResults(); }
});
document.addEventListener('change', ev => {
  const id = ev.target.id;
  if (id === 'myName') { state.name = ev.target.value.trim(); persistPrefs(); render(true); return; }
  if (id === 'fTrack') filters.track = ev.target.value; else if (id === 'fBuilding') { filters.building = ev.target.value; filters.room = ''; } else if (id === 'fRoom') filters.room = ev.target.value;
  else if (id === 'fOps') filters.ops = ev.target.checked; else if (id === 'fBlocks') filters.blocks = ev.target.checked; else if (id === 'fOpen') filters.open = ev.target.checked; else return;
  buildFilters();
});
$('filters').addEventListener('close', () => render());
$('details').addEventListener('cancel', ev => { ev.preventDefault(); closeDetail(); });
window.addEventListener('online', () => refresh());
init();
