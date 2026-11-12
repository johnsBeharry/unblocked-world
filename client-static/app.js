// UNBLOCKED submission form.
// Flow: intro → (01) contact + email code → (02) posters (+ editor) → (03) submit → done.
//
// The portal holds the main copy of every entry. The page keeps a local copy
// in IndexedDB and a queue of unsaved changes, so typing is never lost and the
// form keeps working on a bad connection. All calls go through our Worker
// (/api/forms/<name>/…), which adds the portal API key and the artist's
// session from an HttpOnly cookie. This script never sees either.

(() => {
  'use strict';

  const FORM = location.pathname.split('/')[2] || '';
  const VARIANT = new URLSearchParams(location.search).get('v') || 'posters';
  const API = `/api/forms/${encodeURIComponent(FORM)}`;

  // Size limits match the portal API.
  const TYPES = {
    jpg: { mime: ['image/jpeg'], max: 5, kind: 'image' },
    jpeg: { mime: ['image/jpeg'], max: 5, kind: 'image' },
    png: { mime: ['image/png'], max: 5, kind: 'image' },
    pdf: { mime: ['application/pdf'], max: 5, kind: 'pdf' },
    gif: { mime: ['image/gif'], max: 20, kind: 'image' },
    mp4: { mime: ['video/mp4'], max: 20, kind: 'video' },
  };
  const MAX_ASSETS = 3;
  const MB = 1024 * 1024;
  const FIELDS = ['title', 'year_designed', 'designed_for', 'client_name', 'creation_method', 'materials_used', 'digital_programs', 'printing_method', 'concept'];
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const SAVE_DELAY = 800;
  const OFFLINE_PING = 20000;
  const ME_POLL = 5000;

  const STEPS = ['contact', 'posters', 'submit'];
  const VIEWS = ['loading', 'intro', ...STEPS, 'edit', 'done'];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const state = {
    contest: null,
    me: null,                 // profile from the server once the email is verified
    contact: { email: '', name: '', country: '', instagram: '', bio: '', terms: false, photo: null },
    profileDirty: false,
    photoDirty: null,         // 'upload' | 'remove' while the photo change hasn't saved
    mode: 'create',           // signed out: 'create' (all details) or 'signin' (email only)
    sending: false,           // a code request is in flight
    profileError: '',
    verify: null,             // { email, sentAt, resendAfter } while a code is pending
    entries: [],              // local entries (see newEntry)
    earlier: [],              // posters sent before artist accounts (read-only)
    used: 0,
    max: null,
    draftId: null,            // entry open in the editor
    picked: {},               // Submit view: entryId → ticked
    consents: [false, false, false],
    online: navigator.onLine !== false,
    submitting: false,
    submitStage: '',
    lastRefs: [],
    confirm: null,            // inline confirmation: { type: 'withdraw'|'remove', id }
  };

  // ---------- Local storage (IndexedDB) ----------
  // One record per signed-in artist and form, so two people on one computer
  // never see each other's drafts. Before sign-in, typed details live in an
  // "anon" record and move across once the email is verified.

  const DB = { name: 'ubk-form', store: 'progress' };
  const KEEP_DAYS = 30;
  /**
   * Key of this person's saved record in IndexedDB: per artist once signed in, "anon" before.
   * @returns {string}
   */
  const recordKey = () => `${FORM}:${state.me ? 'artist:' + state.me.email : 'anon'}`;
  const LEGACY_KEY = `${FORM}:${VARIANT}`; // the single-session form saved here

  /**
   * Opens (and on first use creates) the IndexedDB database that holds saved progress.
   * @returns {Promise<IDBDatabase>}
   */
  function openDb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB.name, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(DB.store);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  /**
   * Reads one saved record from IndexedDB.
   * @param {string} key Record key, see recordKey().
   * @returns {Promise<any>} The record, or undefined if missing or storage is unavailable.
   */
  async function dbGet(key) {
    try {
      const db = await openDb();
      return await new Promise((resolve, reject) => {
        const req = db.transaction(DB.store).objectStore(DB.store).get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch { return null; }
  }

  /**
   * Writes one record to IndexedDB. Pass null to clear it. Failures are ignored,
   * since the server copy is the main one.
   * @param {string} key Record key, see recordKey().
   * @param {any} value Record to store, or null.
   * @returns {Promise<void>}
   */
  async function dbPut(key, value) {
    try {
      const db = await openDb();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(DB.store, 'readwrite');
        if (value) tx.objectStore(DB.store).put(value, key);
        else tx.objectStore(DB.store).delete(key);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) { console.warn('Could not save on this device', err); }
  }

  /**
   * The part of an entry that's kept on this device. File blobs are kept only
   * until they've uploaded; after that the server copy is used.
   * @param {Entry} e
   * @returns {object} A structured-clone-safe copy for IndexedDB.
   */
  const storable = (e) => ({
    id: e.id, status: e.status, version: e.version, created: e.created,
    fields: { ...e.fields }, base: { ...e.base }, dirty: [...e.dirty],
    file: e.file && { name: e.file.name, type: e.file.type, size: e.file.size, pending: !!e.file.pending, blob: e.file.pending ? e.file.blob : undefined },
    fileRemoved: !!e.fileRemoved,
    assets: e.assets.map((a) => ({ id: a.id, localId: a.localId, name: a.name, type: a.type, size: a.size, pending: !!a.pending, blob: a.pending ? a.blob : undefined })),
    removedAssets: [...e.removedAssets],
    discard: !!e.discard,
    reference: e.reference, submittedAt: e.submittedAt, withdrawnAt: e.withdrawnAt,
    isNew: !!e.isNew,
  });

  let saveTimer;
  /**
   * Saves progress to this device shortly (debounced), so fast typing writes once.
   */
  function persist() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 250);
  }
  /**
   * Saves progress to this device right away.
   * @returns {Promise<void>}
   */
  function saveNow() {
    clearTimeout(saveTimer);
    return dbPut(recordKey(), {
      savedAt: Date.now(),
      contact: state.contact,
      profileDirty: state.profileDirty,
      photoDirty: state.photoDirty,
      entries: state.entries.map(storable),
      consents: state.consents,
    });
  }

  /**
   * Loads progress saved on this device for the current person (artist or anon).
   * Records older than KEEP_DAYS are ignored.
   * @returns {Promise<void>}
   */
  async function restoreLocal() {
    const saved = await dbGet(recordKey());
    if (!saved || Date.now() - saved.savedAt > KEEP_DAYS * 864e5) return;
    state.contact = { ...state.contact, ...(saved.contact || {}) };
    state.profileDirty = !!saved.profileDirty;
    state.photoDirty = saved.photoDirty || null;
    state.consents = saved.consents || state.consents;
    state.entries = (saved.entries || []).map(hydrate);
  }

  /**
   * Turns a stored entry back into a live one, with fresh arrays and sync state.
   * @param {object} raw Entry as saved by storable().
   * @returns {Entry}
   */
  function hydrate(raw) {
    const e = newEntry(raw.id);
    Object.assign(e, raw, {
      dirty: [...(raw.dirty || [])],
      assets: (raw.assets || []).map((a) => ({ ...a })),
      removedAssets: [...(raw.removedAssets || [])],
      sync: 'saved',
    });
    return e;
  }

  /**
   * Moves work saved by the earlier one-session form into entries, so nobody
   * loses a draft when this version goes live.
   * @returns {Promise<void>}
   */
  async function importLegacy() {
    const old = await dbGet(LEGACY_KEY);
    if (!old) return;
    const c = old.contact || {};
    state.contact.email ||= c.artist_email || '';
    state.contact.name ||= c.artist_name || '';
    state.contact.country ||= c.country || '';
    for (const p of old.posters || []) {
      if (!p || p.result) continue;
      const e = newEntry();
      for (const k of FIELDS) e.fields[k] = (p.fields && p.fields[k]) || '';
      e.dirty = FIELDS.filter((k) => e.fields[k]);
      if (p.file) e.file = { name: p.file.name, type: p.file.type, size: p.file.size, blob: p.file, pending: true };
      e.assets = (p.assets || []).map((f) => ({ localId: uuid(), name: f.name, type: f.type, size: f.size, blob: f, pending: true }));
      if (!isEmpty(e)) state.entries.push(e);
    }
    await dbPut(LEGACY_KEY, null);
    persist();
  }

  // ---------- Entries ----------

  /**
   * Makes a random v4 UUID, used as an entry ID before the server has seen it.
   * @returns {string}
   */
  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
    const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  }

  /**
   * A poster entry as the page keeps it.
   *
   * @typedef {object} Entry
   * @property {string} id UUID, chosen on this device.
   * @property {'draft'|'submitted'|'withdrawn'} status
   * @property {number} version Server version, sent as If-Match.
   * @property {boolean} created Whether it exists on the server yet.
   * @property {Object<string,string>} fields Current values (see FIELDS).
   * @property {Object<string,string>} base Last values the server is known to have.
   * @property {string[]} dirty Fields changed here and not yet saved.
   * @property {?object} file Poster file: { name, type, size, blob?, pending? }.
   * @property {boolean} fileRemoved Poster file removed here, not yet on the server.
   * @property {object[]} assets Extra files: { id?, localId?, name, type, size, blob?, pending? }.
   * @property {string[]} removedAssets Asset IDs to delete on the server.
   * @property {boolean} discard Marked for removal.
   * @property {string} sync 'saved' | 'saving' | 'offline' | 'failed' | 'conflict'.
   */

  /**
   * Creates an empty draft entry.
   * @param {string} [id] Use this ID instead of a new one.
   * @returns {Entry}
   */
  function newEntry(id) {
    const fields = Object.fromEntries(FIELDS.map((k) => [k, '']));
    return {
      id: id || uuid(),
      status: 'draft',
      version: 0,
      created: false,       // exists on the server yet?
      fields,
      base: { ...fields },  // last values the server is known to have
      dirty: [],            // fields changed here and not yet saved
      file: null,           // { name, type, size, blob?, pending? }
      fileRemoved: false,
      assets: [],           // [{ id?, localId?, name, type, size, blob?, pending? }]
      removedAssets: [],
      discard: false,
      reference: null, submittedAt: null, withdrawnAt: null,
      sync: 'saved', error: '', progress: null, conflict: null, isNew: false,
    };
  }

  /**
   * Builds an entry from the server's copy.
   * @param {object} s Entry as returned by the portal.
   * @param {Entry} [keep] Local entry whose file blob is reused for the thumbnail if it's the same file.
   * @returns {Entry}
   */
  function fromServer(s, keep) {
    const e = newEntry(s.id);
    e.created = true;
    e.status = s.status;
    e.version = s.version;
    for (const k of FIELDS) { e.fields[k] = s.fields[k] || ''; e.base[k] = s.fields[k] || ''; }
    e.file = s.file ? { ...s.file } : null;
    // Keep a local blob for the thumbnail if it's the same file.
    if (keep?.file?.blob && e.file && keep.file.name === e.file.name && keep.file.size === e.file.size) e.file.blob = keep.file.blob;
    e.assets = (s.assets || []).map((a) => ({ ...a }));
    e.reference = s.reference; e.submittedAt = s.submittedAt; e.withdrawnAt = s.withdrawnAt;
    return e;
  }

  /**
   * Finds an entry by ID.
   * @param {string} id
   * @returns {Entry|undefined}
   */
  const findEntry = (id) => state.entries.find((e) => e.id === id);
  /**
   * Drafts that haven't been removed.
   * @returns {Entry[]}
   */
  const drafts = () => state.entries.filter((e) => e.status === 'draft' && !e.discard);
  /**
   * Whether nothing has been filled in or attached yet.
   * @param {Entry} e
   * @returns {boolean}
   */
  const isEmpty = (e) => !e.file && !e.assets.length && !Object.values(e.fields).some(Boolean);
  /**
   * Whether a draft can be submitted: it needs a title and a poster file.
   * @param {Entry} e
   * @returns {boolean}
   */
  const isReady = (e) => e.status === 'draft' && !!(e.fields.title && e.file);
  /**
   * What a draft still needs before it can be submitted, for messages.
   * @param {Entry} e
   * @returns {string[]} For example ['a title', 'a poster file'].
   */
  const needs = (e) => [!e.fields.title && 'a title', !e.file && 'a poster file'].filter(Boolean);
  /**
   * Whether an entry has changes the server doesn't have yet.
   * @param {Entry} e
   * @returns {boolean}
   */
  const hasWork = (e) => !e.created || e.dirty.length > 0 || !!e.file?.pending || e.fileRemoved
    || e.assets.some((a) => a.pending) || e.removedAssets.length > 0 || e.discard;
  /**
   * Whether saving stopped and needs the artist (an error or a conflict).
   * @param {Entry} e
   * @returns {boolean}
   */
  const blocked = (e) => e.sync === 'failed' || e.sync === 'conflict';
  /**
   * Number of things still to save: entries plus profile details and photo.
   * @returns {number}
   */
  const pendingCount = () => state.entries.filter(hasWork).length + (state.profileDirty ? 1 : 0) + (state.photoDirty ? 1 : 0);

  // ---------- Network ----------

  class NetworkError extends Error {}

  /**
   * Calls the form API through our Worker. A 401 while signed in signs the page out.
   * @param {string} method HTTP method.
   * @param {string} path Path after /api/forms/<name>, e.g. '/entries'.
   * @param {object} [body] Sent as JSON.
   * @param {Object<string,string>} [headers]
   * @returns {Promise<{status:number, ok:boolean, body:object}>}
   * @throws {NetworkError} When offline.
   */
  async function api(method, path, body, headers = {}) {
    const init = { method, headers: { ...headers }, credentials: 'same-origin' };
    if (body !== undefined) {
      init.headers['content-type'] = 'application/json';
      init.body = JSON.stringify(body);
    }
    let res;
    try {
      res = await fetch(API + path, init);
    } catch {
      setOnline(false);
      throw new NetworkError('offline');
    }
    if (!state.online) setOnline(true);
    let data = null;
    try { data = await res.json(); } catch { /* empty body */ }
    if (res.status === 401 && state.me && path !== '/session') onSignedOut(true);
    return { status: res.status, ok: res.ok, body: data || {} };
  }

  /**
   * Uploads a file with XHR, so the file box can show progress.
   * @param {string} method 'PUT' or 'POST'.
   * @param {string} path Path after /api/forms/<name>.
   * @param {{name:string, type:string, blob?:Blob}|Blob} file
   * @param {(pct:number) => void} onProgress Called with 0–100.
   * @returns {Promise<{status:number, ok:boolean, body:object}>}
   * @throws {NetworkError} When offline.
   */
  function upload(method, path, file, onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, API + path);
      xhr.responseType = 'json';
      xhr.setRequestHeader('x-file-name', encodeURIComponent(file.name || 'file'));
      if (file.type) xhr.setRequestHeader('content-type', file.type);
      xhr.upload.onprogress = (ev) => { if (ev.lengthComputable) onProgress(Math.round((ev.loaded / ev.total) * 100)); };
      xhr.onload = () => {
        if (!state.online) setOnline(true);
        resolve({ status: xhr.status, ok: xhr.status >= 200 && xhr.status < 300, body: xhr.response || {} });
      };
      xhr.onerror = () => { setOnline(false); reject(new NetworkError('offline')); };
      xhr.send(file.blob || file);
    });
  }

  // ---------- Online / offline ----------

  let pingTimer;
  let doneTimer;
  /**
   * Records a change in connection. Offline, it checks every OFFLINE_PING ms and
   * treats the first success as back online; back online, it saves what's queued.
   * @param {boolean} online
   */
  function setOnline(online) {
    if (state.online === online) return;
    state.online = online;
    clearInterval(pingTimer);
    if (!online) {
      // Check every 20 s and treat the first success as back online.
      pingTimer = setInterval(async () => {
        try { const r = await fetch(`${API}/contest`, { cache: 'no-store' }); if (r.ok) setOnline(true); } catch { /* still offline */ }
      }, OFFLINE_PING);
      for (const e of state.entries) if (hasWork(e) && !blocked(e)) e.sync = 'offline';
    } else {
      schedule(0);
    }
    renderConnection();
    refreshView();
  }

  /**
   * Shows or hides the offline / syncing / saved bar and updates online-only buttons.
   */
  function renderConnection() {
    const bar = $('#offline-bar');
    clearTimeout(doneTimer);
    if (!state.online) {
      bar.textContent = 'You’re offline. Changes are saved on this device and will sync when you reconnect.';
      bar.dataset.tone = 'off';
      bar.hidden = false;
    } else if (syncing || pendingCount()) {
      if (!bar.hidden) {
        const n = pendingCount();
        bar.textContent = n ? `Back online · syncing ${n} change${n === 1 ? '' : 's'}…` : 'Back online · syncing…';
        bar.dataset.tone = 'sync';
      }
    } else if (!bar.hidden) {
      bar.textContent = 'All changes saved';
      bar.dataset.tone = 'ok';
      doneTimer = setTimeout(() => { bar.hidden = true; }, 2500);
    }
    $$('[data-needs-online]').forEach(applyOnline);
    $('body').classList.toggle('is-offline', !state.online);
  }

  /**
   * Disables a button that needs the server while offline, and shows its reason.
   * @param {HTMLElement} el Button with data-needs-online (the reason) and optional data-reason (ID of the reason element).
   */
  function applyOnline(el) {
    const off = !state.online;
    el.setAttribute('aria-disabled', off ? 'true' : 'false');
    const reasonId = el.dataset.reason;
    if (reasonId) {
      const r = document.getElementById(reasonId);
      if (r) { r.textContent = off ? el.dataset.needsOnline : ''; r.hidden = !off; }
    }
  }
  /**
   * Whether a button is turned off (aria-disabled, so it stays focusable).
   * @param {HTMLElement} el
   * @returns {boolean}
   */
  const isDisabled = (el) => el.getAttribute('aria-disabled') === 'true';

  window.addEventListener('online', () => setOnline(true));
  window.addEventListener('offline', () => setOnline(false));

  // ---------- Sync queue ----------

  let syncing = false;
  let syncAgain = false;
  let syncTimer;
  let syncWaiters = [];

  /**
   * Runs the save queue after a short pause, so several quick edits save together.
   * @param {number} [delay] Milliseconds to wait.
   */
  function schedule(delay = SAVE_DELAY) {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(runSync, delay);
  }

  /**
   * Runs the save queue now.
   * @returns {Promise<void>} Resolves once the queue has run, or stopped because it's offline.
   */
  function flush() {
    return new Promise((resolve) => { syncWaiters.push(resolve); schedule(0); });
  }

  /**
   * Saves everything that's changed: profile, photo, then each entry in turn.
   * Runs one at a time; a call while it's running makes it go round again.
   * @returns {Promise<void>}
   */
  async function runSync() {
    if (!state.me || !state.online) { releaseWaiters(); return; }
    if (syncing) { syncAgain = true; return; }
    syncing = true;
    renderConnection();
    try {
      if (state.profileDirty) await pushProfile();
      if (state.photoDirty && state.online) await pushPhoto();
      for (const e of [...state.entries]) {
        if (!state.online) break;
        if (hasWork(e) && !blocked(e)) await syncEntry(e);
      }
    } catch (err) {
      if (!(err instanceof NetworkError)) console.error(err);
    } finally {
      syncing = false;
      persist();
      refreshView();
      renderConnection();
      if (syncAgain) { syncAgain = false; schedule(50); } else releaseWaiters();
    }
  }

  /**
   * Resolves every flush() waiting on the queue.
   */
  function releaseWaiters() {
    const w = syncWaiters; syncWaiters = [];
    w.forEach((fn) => fn());
  }

  /**
   * Saves the artist's profile details (and terms acceptance) to the server.
   * @returns {Promise<void>}
   */
  async function pushProfile() {
    const c = state.contact;
    const sent = { name: c.name, country: c.country, instagram: c.instagram, bio: c.bio || '' };
    if (c.terms && !state.me.termsAccepted) sent.acceptTerms = state.contest.termsVersion;
    const r = await api('PATCH', '/me', sent);
    if (r.ok) {
      state.me = r.body;
      state.profileError = '';
      // Only clear the flag if nothing changed while the request was out.
      if (['name', 'country', 'instagram', 'bio'].every((k) => (c[k] || '') === sent[k])) state.profileDirty = false;
    } else if (r.body.error === 'invalid_instagram') {
      state.profileError = 'That doesn’t look like an Instagram handle. Use your @name.';
      state.profileDirty = false;
      showContactErrors();
    }
  }

  /**
   * Sets an entry's save state and updates its status tags on the page.
   * @param {Entry} e
   * @param {string} s 'saved' | 'saving' | 'offline' | 'failed' | 'conflict'.
   * @param {string} [error] Message shown with 'failed'.
   */
  function setSync(e, s, error = '') {
    e.sync = s;
    e.error = error;
    updateEntryUi(e);
  }

  /**
   * Saves one entry: removes it, or creates it, then sends field changes, the
   * poster file, new assets and asset removals, in that order.
   * @param {Entry} e
   * @returns {Promise<void>}
   */
  async function syncEntry(e) {
    setSync(e, 'saving');

    if (e.discard) {
      if (e.created) {
        const r = await api('DELETE', `/entries/${e.id}`);
        if (!r.ok && r.status !== 404) {
          if (r.body.error === 'entry_locked') { e.discard = false; await reloadEntries(); return; }
          return setSync(e, 'failed', 'Couldn’t remove this draft.');
        }
      }
      state.entries = state.entries.filter((x) => x !== e);
      return;
    }

    if (!e.created) {
      const sent = { ...e.fields };
      let r = await api('POST', '/entries', { id: e.id, fields: sent });
      // The ID is already used by another account (a copy of this draft left
      // in another tab, say). Save this copy as a new entry instead.
      if (r.status === 409 && r.body.error === 'entry_id_taken') {
        rekeyEntry(e);
        r = await api('POST', '/entries', { id: e.id, fields: sent });
      }
      if (!r.ok) return setSync(e, 'failed', errorText(r));
      e.created = true;
      e.version = r.body.entry.version;
      e.base = { ...r.body.entry.fields };
      e.dirty = FIELDS.filter((k) => e.fields[k] !== e.base[k]);
    }

    // Field changes: one PATCH with everything that changed, guarded by If-Match.
    for (let attempt = 0; e.dirty.length && attempt < 3; attempt++) {
      const changed = [...e.dirty];
      const sent = Object.fromEntries(changed.map((k) => [k, e.fields[k]]));
      const r = await api('PATCH', `/entries/${e.id}`, { fields: sent }, { 'if-match': String(e.version) });
      if (r.ok) {
        e.version = r.body.version;
        Object.assign(e.base, sent);
        e.dirty = e.dirty.filter((k) => e.fields[k] !== sent[k]);
        break;
      }
      if (r.status === 409 && r.body.entry) {
        const outcome = resolveConflict(e, r.body.entry);
        if (outcome !== 'merged') return;
        continue; // resend on top of the server's version
      }
      return setSync(e, 'failed', errorText(r));
    }

    if (e.fileRemoved) {
      const r = await api('DELETE', `/entries/${e.id}/file`);
      if (!r.ok) return handleLocked(e, r) || setSync(e, 'failed', errorText(r));
      e.fileRemoved = false;
      e.version = r.body.version;
    }

    if (e.file?.pending) {
      const file = e.file;
      e.progress = 0;
      const r = await upload('PUT', `/entries/${e.id}/file`, file, (pct) => { e.progress = pct; updateEntryUi(e); });
      e.progress = null;
      if (!r.ok) return handleLocked(e, r) || setSync(e, 'failed', errorText(r, file.name));
      if (e.file === file) e.file = { ...r.body.file, blob: file.blob };
      e.version = r.body.version;
    }

    for (const a of e.assets.filter((x) => x.pending)) {
      const r = await upload('POST', `/entries/${e.id}/assets`, a, (pct) => { e.progress = pct; updateEntryUi(e); });
      e.progress = null;
      if (!r.ok) return handleLocked(e, r) || setSync(e, 'failed', errorText(r, a.name));
      const saved = r.body.asset;
      Object.assign(a, { id: saved.id, name: saved.name, type: saved.type, size: saved.size, pending: false });
      e.version = r.body.version;
    }

    while (e.removedAssets.length) {
      const id = e.removedAssets[0];
      const r = await api('DELETE', `/entries/${e.id}/assets/${id}`);
      if (!r.ok) return handleLocked(e, r) || setSync(e, 'failed', errorText(r));
      e.removedAssets.shift();
      e.version = r.body.version;
    }

    setSync(e, hasWork(e) ? 'saving' : 'saved');
    if (hasWork(e)) syncAgain = true;
  }

  /**
   * Gives a not-yet-created entry a fresh ID, carrying its pick, editor and
   * page state over. Used when the old ID already belongs to another account.
   * @param {Entry} e
   */
  function rekeyEntry(e) {
    const old = e.id;
    e.id = uuid();
    if (state.draftId === old) state.draftId = e.id;
    if (old in state.picked) { state.picked[e.id] = state.picked[old]; delete state.picked[old]; }
    for (const el of $$(`[data-sync-for="${old}"]`)) el.dataset.syncFor = e.id;
    for (const el of $$(`[data-pick="${old}"]`)) el.dataset.pick = e.id;
    for (const el of $$(`li[data-id="${old}"]`)) el.dataset.id = e.id;
    if (location.hash === `#poster-${old}`) history.replaceState(null, '', `#poster-${e.id}`);
    persist();
  }

  /**
   * Handles an entry submitted or withdrawn on another device: drops local
   * edits and shows the real status.
   * @param {Entry} e
   * @param {{status:number, body:object}} r API response.
   * @returns {boolean} True if the response was that case and has been handled.
   */
  function handleLocked(e, r) {
    if (r.status === 409 && r.body.error === 'entry_locked' && r.body.entry) {
      replaceEntry(e, fromServer(r.body.entry, e));
      return true;
    }
    return false;
  }

  /**
   * Swaps an entry for a fresh copy, leaving the editor if it can no longer be edited.
   * @param {Entry} e Entry to replace.
   * @param {Entry} fresh
   */
  function replaceEntry(e, fresh) {
    const i = state.entries.indexOf(e);
    if (i > -1) state.entries[i] = fresh;
    if (state.draftId === e.id && fresh.status !== 'draft') {
      showEditNotice('This entry was submitted or withdrawn on another device, so it can’t be edited here.');
    }
  }

  /**
   * Merges the server's newer copy (another device saved) into a local entry.
   * Fields only one side changed merge silently. If both changed the same
   * field, nothing is overwritten until the artist chooses.
   * @param {Entry} e
   * @param {object} server Entry as returned by the portal.
   * @returns {'merged'|'conflict'|'locked'}
   */
  function resolveConflict(e, server) {
    if (server.status !== 'draft') { replaceEntry(e, fromServer(server, e)); return 'locked'; }
    const clash = e.dirty.filter((k) => (server.fields[k] || '') !== (e.base[k] || '') && (server.fields[k] || '') !== e.fields[k]);
    for (const k of FIELDS) if (!e.dirty.includes(k)) e.fields[k] = server.fields[k] || '';
    e.base = { ...server.fields };
    e.version = server.version;
    if (!e.file?.pending && !e.fileRemoved) e.file = server.file ? { ...server.file, blob: e.file?.blob } : null;
    const localPending = e.assets.filter((a) => a.pending);
    e.assets = [...server.assets.filter((a) => !e.removedAssets.includes(a.id)).map((a) => ({ ...a })), ...localPending];
    e.dirty = e.dirty.filter((k) => e.fields[k] !== e.base[k]);
    if (clash.length) {
      e.conflict = { fields: clash, server: { ...server.fields } };
      setSync(e, 'conflict');
      if (state.draftId === e.id) fillEditor(e);
      return 'conflict';
    }
    if (state.draftId === e.id) fillEditor(e, true);
    return 'merged';
  }

  /**
   * Resolves a conflict by keeping this device's values and saving them.
   * @param {Entry} e
   */
  function keepMine(e) {
    e.conflict = null;
    setSync(e, 'saving');
    schedule(0);
  }

  /**
   * Resolves a conflict by taking the other device's values for the clashing fields.
   * @param {Entry} e
   */
  function useTheirs(e) {
    for (const k of e.conflict.fields) e.fields[k] = e.conflict.server[k] || '';
    e.dirty = e.dirty.filter((k) => !e.conflict.fields.includes(k));
    e.conflict = null;
    setSync(e, hasWork(e) ? 'saving' : 'saved');
    if (state.draftId === e.id) fillEditor(e);
    persist();
    schedule(0);
  }

  /**
   * Fetches the artist's entries and merges them with what's on this device.
   * Entries created here but gone from the server are dropped.
   * @returns {Promise<void>}
   */
  async function reloadEntries() {
    const r = await api('GET', '/entries');
    if (!r.ok) return;
    state.used = r.body.used;
    state.max = r.body.max;
    state.earlier = r.body.earlierSubmissions || [];
    if (r.body.contest) state.contest = { ...state.contest, ...r.body.contest };
    const seen = new Set();
    for (const s of r.body.entries) {
      seen.add(s.id);
      const local = findEntry(s.id);
      if (!local) state.entries.push(fromServer(s));
      else if (s.status !== 'draft') replaceEntry(local, fromServer(s, local));
      else if (!hasWork(local)) replaceEntry(local, fromServer(s, local));
      else if (s.version !== local.version) resolveConflict(local, s);
    }
    // Created here earlier but gone from the server (removed on another device).
    state.entries = state.entries.filter((e) => !e.created || seen.has(e.id) || e.discard);
    persist();
  }

  // ---------- Boot ----------

  init();

  /**
   * Starts the page: binds events, loads the contest, restores saved progress
   * and the session, then shows the requested view.
   * @returns {Promise<void>}
   */
  async function init() {
    fillCountries();
    fillYears();
    bindContact();
    bindNav();
    bindPosters();
    bindEditor();
    bindDragAndDrop();
    bindSubmit();

    if (VARIANT !== 'posters') return unavailable('This form isn’t available.');

    const params = new URLSearchParams(location.search);
    const linkExpired = params.get('signin') === 'expired';
    if (linkExpired) {
      params.delete('signin');
      history.replaceState(null, '', `${location.pathname}?${params}${location.hash}`);
    }

    try {
      const res = await fetch(`${API}/contest`);
      if (!res.ok) return unavailable('This contest couldn’t be found.');
      state.contest = await res.json();
    } catch {
      return unavailable('Couldn’t reach the contest. Check your connection and reload.');
    }

    // Signed in already (cookie still valid)?
    try {
      const r = await api('GET', '/me');
      if (r.ok) state.me = r.body;
    } catch { /* offline: carry on with what's on this device */ }

    // An old or used email link: only worth mentioning if not signed in here.
    $('#signin-expired').hidden = !(linkExpired && !state.me);
    await restoreLocal();
    if (!state.me) await importLegacy();
    if (state.me) {
      // Details typed before verifying (e.g. the email link opened this tab).
      const adopted = await adoptAnon();
      // Edits made offline last time win over the server's copy.
      fillContactFromProfile(state.me, state.profileDirty || adopted);
      settlePhoto(state.me, null);
      try { await reloadEntries(); } catch { /* offline */ }
      schedule(0);
    }
    fillContactInputs();

    renderIntro();
    renderConnection();
    window.addEventListener('hashchange', render);
    render();
  }

  /**
   * Shows a full-page message when the form can't be used.
   * @param {string} msg
   */
  function unavailable(msg) {
    $('#loading-text').textContent = msg;
    show('loading');
  }

  /**
   * Fills the intro page with the contest's theme, entry limit and closing date,
   * and shows Enter or View depending on whether submissions are open.
   */
  function renderIntro() {
    const c = state.contest;
    const theme = c.theme || 'Ownership';
    $$('[data-theme]').forEach((el) => (el.textContent = theme));
    if (c.maxEntriesPerArtist) {
      $('#rule-count').textContent = `You can submit up to ${c.maxEntriesPerArtist} posters, on the same day or later.`;
    }
    if (c.closesAt) {
      $('#rule-closes').textContent = `Submissions close on ${formatDate(c.closesAt)}.`;
      $('#rule-closes').hidden = false;
    }
    const open = c.acceptingSubmissions;
    $('#closed-note').hidden = open;
    // When closed, signed-in artists (and returning ones) can still view their entries.
    $('#enter-label').textContent = open ? 'Enter' : 'View';
    $('#enter-meta').innerHTML = open ? 'Start your<br>submission' : 'Your<br>entries';
  }

  // ---------- Routing (hash based, so the back button works) ----------

  /**
   * Goes to a view by changing the URL hash, so the back button works.
   * @param {string} view 'intro' | 'contact' | 'posters' | 'poster-<id>' | 'submit' | 'done'.
   */
  function go(view) {
    if (location.hash.slice(1) === view) render();
    else location.hash = view;
  }

  /**
   * Whether the artist is signed in with a name, country and accepted terms,
   * which the posters and submit steps need.
   * @returns {boolean}
   */
  const profileComplete = () => !!(state.me && state.contact.name && state.contact.country
    && (state.me.termsAccepted || state.contact.terms) && !state.profileError);

  /**
   * Shows the view in the URL hash, redirecting to an earlier step when this one
   * can't be used yet.
   */
  function render() {
    const requested = location.hash.slice(1) || 'intro';
    let view = requested === 'consent' ? 'submit' : requested;
    let editId = null;
    if (view.startsWith('poster-')) { editId = view.slice(7); view = 'edit'; }

    if (view === 'done' && !state.lastRefs.length) view = state.me ? 'posters' : 'intro';
    if (['posters', 'edit', 'submit'].includes(view) && !profileComplete()) view = 'contact';
    if (view === 'submit' && !drafts().some(isReady)) view = 'posters';
    if (view === 'edit' && !state.contest.acceptingSubmissions) view = 'posters';
    if (!VIEWS.includes(view)) view = 'intro';

    if (view !== 'edit' && view !== requested) history.replaceState(null, '', '#' + view);
    state.view = view;

    if (view !== 'edit' && state.draftId) closeEditor();
    if (view !== 'contact') stopMePoll();
    if (view === 'contact') renderContact();
    if (view === 'edit') openEditor(editId);
    if (view === 'posters') renderPosters();
    if (view === 'submit') renderSubmit();
    if (view === 'done') renderDone();

    show(view);
  }

  /**
   * Re-renders the current view after background changes (sync, online/offline).
   */
  function refreshView() {
    if (state.view === 'posters') renderPosters();
    if (state.view === 'submit') renderSubmit();
    if (state.view === 'contact') renderContact();
    if (state.view === 'edit') { const e = findEntry(state.draftId); if (e) updateEntryUi(e); }
    updateNav();
    updateWhoami();
  }

  /**
   * Shows one view and updates the step list, progress bar and bottom nav.
   * @param {string} view
   */
  function show(view) {
    for (const v of $$('.view')) v.hidden = v.dataset.view !== view;

    const stepIdx = STEPS.indexOf(view === 'edit' ? 'posters' : view);
    const inSteps = stepIdx > -1;

    $('#steps').hidden = !inSteps;
    $('#home-link').hidden = view === 'edit';
    $('#form-nav').hidden = !inSteps || view === 'edit';
    $('#edit-nav').hidden = view !== 'edit';

    $$('#steps button').forEach((b, i) => {
      b.classList.toggle('current', i === stepIdx);
      b.classList.toggle('done', i < stepIdx);
      b.disabled = i > stepIdx && !canReach(STEPS[i]);
      if (i === stepIdx) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });

    const pct = view === 'done' ? 100 : view === 'intro' ? 4 : ((stepIdx + 1) / (STEPS.length + 1)) * 100;
    $('#progress-bar').style.width = pct + '%';

    updateNav();
    updateWhoami();
    window.scrollTo({ top: 0 });
  }

  /**
   * Whether a step in the side list can be opened yet.
   * @param {string} step 'contact' | 'posters' | 'submit'.
   * @returns {boolean}
   */
  function canReach(step) {
    if (step === 'contact') return true;
    if (step === 'posters') return profileComplete();
    if (step === 'submit') return profileComplete() && drafts().some(isReady) && state.contest.acceptingSubmissions;
    return false;
  }

  /**
   * Sets the bottom nav's next button and the centred hint for the current step.
   * The hint says why the button is turned off.
   */
  function updateNav() {
    const v = state.view;
    if (!STEPS.includes(v)) return;
    const next = $('#nav-next');
    const hint = $('#nav-hint');
    let label = '';
    let reason = '';
    if (v === 'contact') {
      if (!state.me) {
        // Signed out, the nav sends the code. Fields are checked on click.
        label = state.verify ? '' : state.sending ? 'Sending…' : state.mode === 'create' ? 'Join (→)' : 'Send Code (→)';
        if (label && !state.online) reason = 'Connect to the internet to verify your email';
      } else if (!state.contact.name || !state.contact.country) reason = 'Add your name and country';
      else if (!state.me.termsAccepted && !state.contact.terms) reason = 'Agree to the terms to continue';
      else if (state.profileError) reason = 'Check your Instagram handle';
    } else if (v === 'posters') {
      label = state.contest.acceptingSubmissions ? 'Submit (→)' : '';
      if (label && !drafts().some(isReady)) reason = drafts().length ? 'Finish a poster to submit' : 'Add a poster to submit';
    } else if (v === 'submit') {
      const n = pickedDrafts().length;
      label = state.submitting ? state.submitStage
        : n === 1 ? 'Submit 1 entry (→)' : n ? `Submit ${n} entries (→)` : 'Submit (→)';
      if (!state.submitting) reason = !state.online ? 'Connect to the internet to submit' : !n ? 'Tick a poster to submit' : '';
    }
    const busy = state.sending || state.submitting;
    next.textContent = label;
    next.hidden = !label;
    next.setAttribute('aria-disabled', reason || busy ? 'true' : 'false');
    hint.textContent = reason;
    hint.hidden = !reason || !label;
  }

  /**
   * Names step 1 "Join" until the email is confirmed, then "Profile", and sets
   * the matching page heading ("Join the collective", "Sign In" or "Profile &
   * Contact Information").
   */
  function renderStepTitle() {
    $('#step1-label').textContent = state.me ? 'Profile' : 'Join';
    $('#contact-title').textContent = state.me ? 'Profile & Contact Information'
      : state.mode === 'signin' ? 'Sign In' : 'Join the collective';
  }

  /**
   * Shows the signed-in email and the sign-out link beside the steps.
   */
  function updateWhoami() {
    renderStepTitle();
    const w = $('#whoami');
    const show = !!state.me && STEPS.concat('edit').includes(state.view);
    w.hidden = !show;
    if (show) $('#whoami-email').textContent = state.me.email;
  }

  /**
   * Binds the intro button, the step list and the bottom nav's back and next buttons.
   */
  function bindNav() {
    $('#enter-btn').addEventListener('click', (e) => {
      e.preventDefault();
      go(profileComplete() ? 'posters' : 'contact');
    });
    $$('#steps button').forEach((b) => b.addEventListener('click', () => {
      const target = b.dataset.go;
      if (target !== 'contact' && !profileComplete()) { showContactErrors(); return; }
      go(target);
    }));
    $('#nav-back').addEventListener('click', () => {
      // On the code screen, Back returns to the details.
      if (state.view === 'contact' && state.verify && !state.me) { $('#other-email').click(); return; }
      go({ contact: 'intro', posters: 'contact', submit: 'posters' }[state.view] || 'intro');
    });
    $('#nav-next').addEventListener('click', () => {
      const v = state.view;
      if (v === 'contact') {
        if (!state.me) { sendCode(); return; }
        if (!profileComplete()) { showContactErrors(); return; }
        go('posters');
      }
      if (v === 'posters') {
        if (!drafts().some(isReady)) {
          const err = $('#posters-error');
          err.textContent = drafts().length
            ? 'Finish a poster first: it needs a title and a poster file.'
            : 'Add a poster first.';
          err.hidden = false;
          return;
        }
        go('submit');
      }
      if (v === 'submit') submitPicked();
    });
    $('#sign-out').dataset.needsOnline = 'Connect to the internet to sign out.';
    $('#sign-out').dataset.reason = 'sign-out-reason';
    $('#sign-out').addEventListener('click', () => signOut());

    // Don't lose queued changes by closing the tab.
    window.addEventListener('beforeunload', (e) => {
      if (state.submitting || (state.me && pendingCount())) { e.preventDefault(); e.returnValue = ''; }
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) saveNow();
      else if (state.verify && !state.me) checkSignedIn();
    });
    window.addEventListener('focus', () => { if (state.verify && !state.me) checkSignedIn(); });
    window.addEventListener('pagehide', saveNow);
  }

  // ---------- Account & contact + sign-in ----------
  // Signed out, the step is either "create" (all details, sent with the code
  // request so the portal saves them once the email is verified, by code or
  // by link) or "signin" (email only). Signed in, it edits the profile.

  const PROFILE_TEXT = ['name', 'country', 'instagram', 'bio'];
  const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const PHOTO_MAX_INPUT = 20 * MB; // shrunk on this device before upload
  /**
   * Escapes text for use in HTML.
   * @param {*} s
   * @returns {string}
   */
  const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

  /**
   * Fills the Join / Profile fields from state.contact.
   */
  function fillContactInputs() {
    const c = state.contact;
    $('#c-email').value = state.me ? state.me.email : c.email;
    $('#c-name').value = c.name;
    $('#c-country').value = c.country;
    $('#c-instagram').value = c.instagram ? '@' + c.instagram.replace(/^@/, '') : '';
    $('#c-bio').value = c.bio || '';
    $('#c-terms').checked = !!(c.terms || state.me?.termsAccepted);
    $$('#contact-form .field input, #contact-form .field select, #contact-form .field textarea').forEach(syncFilled);
    updateBioCount();
    renderPhoto();
  }

  /**
   * Merges the saved profile into the details after sign-in. What the artist
   * typed wins; saved values fill the gaps.
   * @param {object} profile The portal's /me response.
   * @param {boolean} preferTyped Keep typed values over saved ones.
   * @returns {boolean} Whether a typed value differs and needs saving.
   */
  function fillContactFromProfile(profile, preferTyped) {
    const c = state.contact;
    c.email = profile.email;
    let changed = false;
    for (const k of PROFILE_TEXT) {
      const typed = normalizeHandle(c[k], k);
      if (preferTyped && typed && typed !== (profile[k] || '')) { c[k] = typed; changed = true; }
      else if (!typed || !preferTyped) c[k] = profile[k] || typed || '';
    }
    c.terms = !!profile.termsAccepted || (preferTyped && !!c.terms);
    if (c.terms && !profile.termsAccepted) changed = true;
    if (changed) state.profileDirty = true;
    if (!c.photo?.pending) c.photo = profile.hasPhoto ? { remote: true, id: profile.photoId } : null;
  }

  /**
   * Tidies a contact field. For Instagram it accepts @name, a profile URL or a
   * bare handle and returns the bare handle in lower case.
   * @param {string} v Value typed.
   * @param {string} k Field name.
   * @returns {string}
   */
  function normalizeHandle(v, k) {
    if (k !== 'instagram') return (v || '').trim();
    const h = (v || '').trim().replace(/^https?:\/\//i, '').replace(/^(www\.)?instagram\.com\//i, '').replace(/^@/, '');
    return h.split(/[/?#]/)[0].toLowerCase();
  }
  /**
   * Whether an Instagram handle looks valid (empty is fine).
   * @param {string} h Handle from normalizeHandle().
   * @returns {boolean}
   */
  const validHandle = (h) => !h || /^[a-z0-9._]{1,30}$/.test(h);

  /**
   * Draws step 1 for its three states: joining or signing in, waiting for the
   * code, and signed in (editing the profile).
   */
  function renderContact() {
    renderStepTitle();
    const signedIn = !!state.me;
    const pending = !signedIn && !!state.verify;
    const create = signedIn || state.mode === 'create';
    $('#account-details').hidden = pending;
    $('#verify').hidden = !pending;
    $('#profile-fields').hidden = !create;
    $('#mode-switch').hidden = signedIn;
    $('#mode-q').textContent = state.mode === 'create' ? 'Already joined?' : 'New here?';
    $('#mode-toggle').textContent = state.mode === 'create' ? 'Sign in' : 'Join UNBLOCKED';
    $('#contact-lede').textContent = signedIn
      ? 'Your account details. Changes save as you type.'
      : create
        ? 'Be part of a body of creative work exploring the systems shaping our lives. Submit posters in our open calls, contribute to the archive, discover new voices, and take part in upcoming grants, residencies, exhibitions, and conversations.'
        : 'Enter the email you joined with and we’ll send you a code to sign in.';

    const email = $('#c-email');
    email.readOnly = signedIn;
    if (signedIn) email.value = state.me.email;
    syncFilled(email);
    $('#email-field').classList.toggle('verified', signedIn);
    $('#verified-tag').hidden = !signedIn;
    $('#email-actions').hidden = !signedIn;


    const accepted = !!state.me?.termsAccepted;
    const terms = $('#c-terms');
    terms.checked = accepted || !!state.contact.terms;
    terms.disabled = accepted;
    $('#terms-when').textContent = accepted && state.me.termsAcceptedAt ? ` Agreed ${shortDate(state.me.termsAcceptedAt)}.` : '';

    if (pending) {
      const v = state.verify;
      $('#verify-note').innerHTML = `Enter the 6-digit code we sent to <strong>${esc(v.email)}</strong> to ${v.mode === 'create' ? 'confirm your email and join UNBLOCKED' : 'sign in'}. It expires in 15 minutes.`;
      updateResend();
      startMePoll();
    }
    const note = signedIn ? 'Changes apply to new entries. Entries you already sent keep the details they had.' : '';
    $('#contact-note').textContent = note;
    $('#contact-note').hidden = !note;
    for (const el of [$('#resend-code'), $('#change-email')]) applyOnline(el);
    $$('#code-boxes input').forEach((i) => { i.disabled = !state.online; });
    if (state.profileError) setError($('#c-instagram'), state.profileError);
    renderPhoto();
    updateNav();
  }

  /**
   * Updates the bio's character count.
   */
  function updateBioCount() {
    $('#bio-count').textContent = `${$('#c-bio').value.length} / 1000`;
  }

  /**
   * Binds the Join / Profile fields, the photo picker, the code boxes and the
   * sign-in, resend and sign-out links.
   */
  function bindContact() {
    document.addEventListener('input', onFieldChange);
    document.addEventListener('change', onFieldChange);

    const form = $('#contact-form');
    /**
     * Reads the fields into state.contact, saves locally, and queues a profile
     * save once signed in.
     * @param {Event} [ev]
     */
    const read = (ev) => {
      if (ev?.target?.id === 'photo-input') return;
      const c = state.contact;
      if (!state.me) c.email = $('#c-email').value.trim();
      c.name = $('#c-name').value.trim();
      c.country = $('#c-country').value;
      c.instagram = normalizeHandle($('#c-instagram').value, 'instagram');
      c.bio = $('#c-bio').value.trim();
      if (!$('#c-terms').disabled) c.terms = $('#c-terms').checked;
      if (c.terms) { $('#terms-label').classList.remove('invalid'); $('#terms-msg').hidden = true; }
      updateBioCount();
      state.profileError = validHandle(c.instagram) ? '' : 'That doesn’t look like an Instagram handle. Use your @name.';
      if (!state.profileError) clearError($('#c-instagram'));
      if (state.me && !state.profileError) { state.profileDirty = true; schedule(); }
      persist();
      updateNav();
    };
    form.addEventListener('input', read);
    form.addEventListener('change', read);
    form.addEventListener('submit', (e) => e.preventDefault());
    $('#c-instagram').addEventListener('blur', () => { if (state.profileError) setError($('#c-instagram'), state.profileError); });
    $('#c-email').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); if (!state.me && !state.verify) sendCode(); }
    });

    $('#mode-toggle').addEventListener('click', () => {
      state.mode = state.mode === 'create' ? 'signin' : 'create';
      hideMsg('#send-msg');
      renderContact();
      $('#c-email').focus();
    });

    for (const [el, msg] of [
      [$('#resend-code'), 'Connect to the internet to verify your email.'],
      [$('#change-email'), 'Connect to the internet to change your email.'],
    ]) el.dataset.needsOnline = msg;
    $('#change-email').dataset.reason = 'change-email-reason';

    $('#resend-code').addEventListener('click', () => sendCode(true));
    $('#other-email').addEventListener('click', () => {
      state.verify = null;
      stopMePoll();
      clearCode();
      hideMsg('#verify-msg');
      renderContact();
      $('#c-email').focus();
    });
    $('#change-email').addEventListener('click', () => signOut(true));

    /**
     * Opens the profile photo file picker.
     */
    const pick = () => $('#photo-input').click();
    $('#photo-pick').addEventListener('click', pick);
    $('#photo-preview').addEventListener('click', pick);
    $('#photo-input').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      e.target.value = '';
      if (file) await choosePhoto(file);
    });
    $('#photo-remove').addEventListener('click', () => {
      hideMsg('#photo-msg');
      const hadRemote = !!state.me?.hasPhoto;
      state.contact.photo = null;
      state.photoDirty = state.me && hadRemote ? 'remove' : null;
      persist();
      renderPhoto();
      if (state.me) schedule(0);
    });

    // Code boxes: type, paste or autofill; checked as soon as the 6th digit is in.
    const boxes = $$('#code-boxes input');
    /**
     * Spreads typed or pasted digits across the code boxes, ignoring spaces and
     * dashes ("569 269"). A full code always starts at the first box, wherever it
     * was pasted, and is checked straight away.
     * @param {number} start Index of the box the digits went into.
     * @param {string} text
     */
    const fillFrom = (start, text) => {
      const digits = String(text).replace(/\D/g, '').slice(0, 6);
      const from = digits.length === 6 ? 0 : start;
      digits.split('').forEach((d, j) => { if (boxes[from + j]) boxes[from + j].value = d; });
      const last = from + digits.length - 1;
      (boxes[last + 1] || boxes[Math.min(5, last)]).focus();
      hideMsg('#verify-msg');
      const code = boxes.map((b) => b.value).join('');
      if (code.length === 6) verifyCode(code);
    };
    boxes.forEach((box, i) => {
      // Paste is handled here so a box's length limit can't cut the code short.
      box.addEventListener('paste', (e) => {
        const text = e.clipboardData?.getData('text') || '';
        if (!/\d/.test(text)) return;
        e.preventDefault();
        fillFrom(i, text);
      });
      box.addEventListener('input', () => {
        const digits = box.value.replace(/\D/g, '');
        if (digits.length > 1) {
          // Autofilled (e.g. from a text message) into one box.
          box.value = '';
          fillFrom(i, digits);
          return;
        }
        box.value = digits;
        if (digits && boxes[i + 1]) boxes[i + 1].focus();
        hideMsg('#verify-msg');
        const code = boxes.map((b) => b.value).join('');
        if (code.length === 6) verifyCode(code);
      });
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && boxes[i - 1]) { boxes[i - 1].focus(); boxes[i - 1].value = ''; }
        if (e.key === 'ArrowLeft' && boxes[i - 1]) boxes[i - 1].focus();
        if (e.key === 'ArrowRight' && boxes[i + 1]) boxes[i + 1].focus();
      });
      box.addEventListener('focus', () => box.select());
    });
  }

  // ----- Profile photo -----

  let photoUrl = { blob: null, url: '' };
  /**
   * Shows the profile photo preview and its Add / Change / Remove links.
   */
  function renderPhoto() {
    const p = state.contact.photo;
    const preview = $('#photo-preview');
    let src = '';
    if (p?.blob) {
      if (photoUrl.blob !== p.blob) {
        if (photoUrl.url) URL.revokeObjectURL(photoUrl.url);
        photoUrl = { blob: p.blob, url: URL.createObjectURL(p.blob) };
      }
      src = photoUrl.url;
    } else if (p?.remote && state.me) {
      src = `${API}/me/photo?v=${encodeURIComponent(p.id || '')}`;
    }
    const img = $('img', preview);
    if (src) {
      if (!img || img.getAttribute('src') !== src) preview.innerHTML = `<img src="${esc(src)}" alt="">`;
    } else if (img || !$('.photo-empty', preview)) {
      preview.innerHTML = '<span class="photo-empty" aria-hidden="true">+</span>';
    }
    preview.classList.toggle('has-photo', !!src);
    $('#photo-pick').textContent = src ? '(Change photo)' : '(Add a photo)';
    $('#photo-remove').hidden = !src;
  }

  /**
   * Checks and shrinks a chosen profile photo, then shows it and queues the upload.
   * @param {File} file
   * @returns {Promise<void>}
   */
  async function choosePhoto(file) {
    hideMsg('#photo-msg');
    if (!PHOTO_TYPES.includes(file.type)) return showMsg('#photo-msg', 'Use a JPG, PNG or WebP image.');
    if (file.size > PHOTO_MAX_INPUT) return showMsg('#photo-msg', 'That image is over 20 MB. Choose a smaller one.');
    const blob = await shrinkPhoto(file);
    if (!blob) return showMsg('#photo-msg', 'That image couldn’t be read. Try another one.');
    state.contact.photo = { blob, pending: true };
    if (state.me) { state.photoDirty = 'upload'; schedule(0); }
    persist();
    renderPhoto();
  }

  /**
   * Resizes a photo on this device (longest side 800 px, JPEG) so uploads stay small.
   * @param {File} file
   * @returns {Promise<?Blob>} The smaller image, or null if it can't be read.
   */
  function shrinkPhoto(file) {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, 800 / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.86);
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    });
  }

  /**
   * Reads a blob as base64 (without the data: prefix), for the JSON code request.
   * @param {Blob} blob
   * @returns {Promise<string>}
   */
  function blobToBase64(blob) {
    return new Promise((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).replace(/^data:[^,]*,/, ''));
      r.onerror = () => resolve('');
      r.readAsDataURL(blob);
    });
  }

  /**
   * Uploads or removes the profile photo on the server.
   * @returns {Promise<void>}
   */
  async function pushPhoto() {
    if (state.photoDirty === 'remove') {
      const r = await api('DELETE', '/me/photo');
      if (r.ok) { state.me = r.body; state.photoDirty = null; }
      return;
    }
    const p = state.contact.photo;
    if (!p?.blob) { state.photoDirty = null; return; }
    const r = await upload('PUT', '/me/photo', { blob: p.blob, name: 'photo.jpg', type: p.blob.type || 'image/jpeg' }, () => {});
    if (r.ok) {
      state.me = r.body;
      if (state.contact.photo === p) state.contact.photo = { remote: true, id: r.body.photoId, blob: p.blob };
      state.photoDirty = null;
    } else {
      state.photoDirty = null;
      state.contact.photo = state.me.hasPhoto ? { remote: true, id: state.me.photoId } : null;
      showMsg('#photo-msg', r.status === 413 ? 'That image is too large.' : 'That photo couldn’t be saved. Try another one.');
    }
    renderPhoto();
  }

  // ----- Sending and checking the code -----

  /**
   * Checks the join fields (name, country, Instagram, terms) and marks problems.
   * @returns {?HTMLElement} The first field with a problem, or null.
   */
  function checkCreateFields() {
    let first = null;
    const c = state.contact;
    /**
     * Marks or clears one field's error.
     * @param {HTMLElement} el
     * @param {boolean} ok
     * @param {string} msg Error shown when not ok.
     */
    const check = (el, ok, msg) => { if (!ok) { setError(el, msg); first ||= el; } else clearError(el); };
    check($('#c-name'), !!c.name, 'Add your name');
    check($('#c-country'), !!c.country, 'Choose your country');
    if (state.profileError) check($('#c-instagram'), false, state.profileError);
    const termsOk = !!(c.terms || state.me?.termsAccepted);
    $('#terms-label').classList.toggle('invalid', !termsOk);
    $('#terms-msg').hidden = termsOk;
    if (!termsOk) first ||= $('#c-terms');
    return first;
  }

  let resendTimer;
  /**
   * Counts down until another code can be sent, then turns the resend link on.
   */
  function updateResend() {
    clearInterval(resendTimer);
    const btn = $('#resend-code');
    /**
     * Updates the resend countdown once a second.
     */
    const tick = () => {
      if (!state.verify) return clearInterval(resendTimer);
      const left = Math.ceil((state.verify.sentAt + state.verify.resendAfter * 1000 - Date.now()) / 1000);
      if (left > 0) {
        btn.textContent = `(Resend code in 0:${String(left).padStart(2, '0')})`;
        btn.setAttribute('aria-disabled', 'true');
      } else {
        btn.textContent = '(Resend code)';
        applyOnline(btn);
        clearInterval(resendTimer);
      }
    };
    tick();
    resendTimer = setInterval(tick, 1000);
  }

  /**
   * Asks for an email code. When joining, the details and photo go with it and
   * are saved to the account once the email is confirmed. Fields are locked
   * while it sends.
   * @param {boolean} [resend] Resend to the address already waiting for a code.
   * @returns {Promise<void>}
   */
  async function sendCode(resend = false) {
    const btn = resend ? $('#resend-code') : $('#nav-next');
    if (resend ? isDisabled(btn) : state.sending || !state.online) return;
    const mode = resend && state.verify ? state.verify.mode : state.mode;
    const email = (resend && state.verify ? state.verify.email : $('#c-email').value.trim()).toLowerCase();
    hideMsg('#send-msg');
    hideMsg('#verify-msg');
    if (!EMAIL_RE.test(email)) { setError($('#c-email'), email ? 'Check this email address' : 'Add your email'); $('#c-email').focus(); return; }
    clearError($('#c-email'));
    if (mode === 'create') {
      const bad = checkCreateFields();
      if (bad) { bad.focus(); return; }
    }
    $('#signin-expired').hidden = true;

    let label = '';
    if (resend) { btn.setAttribute('aria-disabled', 'true'); label = btn.textContent; btn.textContent = 'Sending…'; }
    else { state.sending = true; updateNav(); lockFields($('#account-details'), true); }

    const payload = { email };
    if (mode === 'create') {
      const c = state.contact;
      payload.profile = { name: c.name, country: c.country, instagram: c.instagram, bio: c.bio, acceptTerms: state.contest.termsVersion };
      if (c.photo?.blob && c.photo.pending) payload.photo = await blobToBase64(c.photo.blob);
    }

    let r;
    try { r = await api('POST', '/codes', payload); } catch { r = null; }
    if (resend) { btn.textContent = label; applyOnline(btn); }
    else { state.sending = false; updateNav(); lockFields($('#account-details'), false); }
    const where = resend ? '#verify-msg' : '#send-msg';
    if (!r) return showMsg(where, 'You’re offline. Connect to the internet to get a code.');
    if (r.status === 202) {
      state.contact.email = email;
      state.verify = { email, mode, sentAt: Date.now(), resendAfter: r.body.resendAfterSeconds || 30 };
      persist();
      clearCode();
      renderContact();
      $$('#code-boxes input')[0].focus();
      return;
    }
    const e = r.body.error;
    const msg = r.status === 429
      ? `Too many codes requested. Try again in ${Math.max(1, Math.ceil((r.body.retryAfter || 60) / 60))} min.`
      : e === 'invalid_email' ? 'Check this email address.'
        : e === 'invalid_instagram' ? 'That doesn’t look like an Instagram handle. Use your @name.'
          : e === 'terms_outdated' ? 'The terms have changed. Reload the page to see the latest version.'
            : e === 'file_too_large' || e === 'unsupported_file_type' || e === 'invalid_photo' ? 'That photo can’t be used. Choose another one, or remove it.'
              : 'We couldn’t send the email. Try again in a moment.';
    showMsg(where, msg);
  }

  /**
   * Disables every field in root while a request is in flight. Only fields this
   * call disabled are turned back on, so ones that were already off stay off.
   * @param {HTMLElement} root
   * @param {boolean} on
   */
  function lockFields(root, on) {
    root.classList.toggle('is-locked', on);
    root.querySelectorAll('input, textarea, select, button').forEach((el) => {
      if (on && !el.disabled) { el.disabled = true; el.dataset.locked = '1'; }
      else if (!on && el.dataset.locked) { el.disabled = false; delete el.dataset.locked; }
    });
  }

  /**
   * Checks a 6-digit code and signs in on success.
   * @param {string} code
   * @returns {Promise<void>}
   */
  async function verifyCode(code) {
    if (!state.verify || !state.online) return;
    const boxes = $$('#code-boxes input');
    boxes.forEach((b) => { b.readOnly = true; });
    let r;
    try { r = await api('POST', '/session', { email: state.verify.email, code }); } catch { r = null; }
    boxes.forEach((b) => { b.readOnly = false; });
    if (!r) return showMsg('#verify-msg', 'You’re offline. Connect to the internet to verify your email.');
    if (r.ok) return onSignedIn(r.body.artist, r.body.applied || []);
    clearCode();
    boxes[0].focus();
    const e = r.body.error;
    const msg = e === 'invalid_code' && r.body.attemptsLeft
      ? `That code didn’t match. ${r.body.attemptsLeft} ${r.body.attemptsLeft === 1 ? 'try' : 'tries'} left.`
      : e === 'code_locked' ? 'Too many wrong tries. Send a new code.'
        : e === 'code_expired' ? 'That code has expired. Send a new one.'
          : 'That didn’t work. Try again.';
    showMsg('#verify-msg', msg);
  }

  /**
   * Empties the code boxes.
   */
  function clearCode() { $$('#code-boxes input').forEach((b) => { b.value = ''; }); }

  // The sign-in link may be clicked in another tab: check now and then.
  let mePoll;
  /**
   * Checks now and then whether the email link signed this browser in from another tab.
   */
  function startMePoll() {
    if (mePoll) return;
    mePoll = setInterval(checkSignedIn, ME_POLL);
  }
  /**
   * Stops checking for a sign-in from another tab.
   */
  function stopMePoll() { clearInterval(mePoll); mePoll = null; }
  /**
   * Signs this tab in if the session cookie now belongs to an artist.
   * @returns {Promise<void>}
   */
  async function checkSignedIn() {
    if (state.me || !state.online) return;
    try {
      const r = await api('GET', '/me');
      if (r.ok) onSignedIn(r.body, null);
    } catch { /* offline */ }
  }

  /**
   * Picks up details typed before verifying (saved under "anon") when the email
   * link opened a fresh tab. Only taken if they were typed for this same address.
   * @returns {Promise<boolean>} Whether anything was taken.
   */
  async function adoptAnon() {
    const anon = await dbGet(`${FORM}:anon`);
    if (!anon) return false;
    const c = anon.contact || {};
    if (c.email && c.email.toLowerCase() !== state.me.email) return false;
    for (const k of PROFILE_TEXT) if (c[k]) state.contact[k] = c[k];
    if (c.terms) state.contact.terms = true;
    if (c.photo?.pending && c.photo.blob) state.contact.photo = c.photo;
    for (const raw of anon.entries || []) if (!findEntry(raw.id)) state.entries.push(hydrate(raw));
    await dbPut(`${FORM}:anon`, null);
    return true;
  }

  /**
   * Decides whether a photo picked before joining still needs uploading.
   * @param {object} profile The portal's /me response.
   * @param {?string[]} applied Profile fields the portal saved from the code request (null = unknown).
   */
  function settlePhoto(profile, applied) {
    const p = state.contact.photo;
    if (!p?.pending) return;
    if (applied && applied.includes('photo')) state.contact.photo = { remote: true, id: profile.photoId, blob: p.blob };
    else state.photoDirty = 'upload';
  }

  /**
   * Switches the page to a signed-in artist: brings in work saved on this device,
   * merges the profile, then loads entries from the server.
   * @param {object} profile The portal's /me response.
   * @param {?string[]} applied Fields the portal saved from the code request (null = unknown).
   * @returns {Promise<void>}
   */
  async function onSignedIn(profile, applied) {
    stopMePoll();
    const anon = { contact: { ...state.contact }, entries: state.entries, consents: state.consents };
    state.verify = null;
    state.me = profile;
    // Bring in anything saved earlier on this device under this address.
    state.entries = [];
    await restoreLocal();
    state.contact = { ...state.contact, ...anon.contact };
    for (const e of anon.entries) if (!findEntry(e.id)) state.entries.push(e);
    fillContactFromProfile(profile, true);
    settlePhoto(profile, applied);
    await dbPut(`${FORM}:anon`, null);
    fillContactInputs();
    persist();
    try { await reloadEntries(); } catch { /* offline */ }
    schedule(0);
    renderContact();
    updateWhoami();
    if (state.view === 'contact') {
      if (profileComplete()) go('posters');
      else { const bad = checkCreateFields(); if (bad) bad.focus(); }
    }
  }

  /**
   * Signs out once everything has saved, since signing out clears this device's copy.
   * @param {boolean} [changeEmail] Keep the typed details to join with another address.
   * @returns {Promise<void>}
   */
  async function signOut(changeEmail = false) {
    const btn = changeEmail ? $('#change-email') : $('#sign-out');
    if (isDisabled(btn)) return;
    // Save everything first; signing out clears this device's copy.
    if (pendingCount()) await flush();
    if (pendingCount()) {
      showMsg('#send-msg', 'Some changes haven’t saved yet. Stay online for a moment, then try again.');
      return;
    }
    try { await api('DELETE', '/session'); } catch { return; }
    onSignedOut(false, changeEmail);
  }

  /**
   * Clears the artist's data from the page and this device and returns to step 1.
   * @param {boolean} expired The session ended on its own; keep the email and say so.
   * @param {boolean} [changeEmail] Keep the details to reuse with a new address.
   */
  function onSignedOut(expired, changeEmail) {
    const c = state.contact;
    // Changing email keeps the details to reuse; signing out clears them from this device.
    const keep = changeEmail
      ? { name: c.name, country: c.country, instagram: c.instagram, bio: c.bio, terms: false, photo: null }
      : { name: '', country: '', instagram: '', bio: '', terms: false, photo: null };
    dbPut(recordKey(), null);
    state.me = null;
    state.entries = [];
    state.earlier = [];
    state.used = 0;
    state.profileDirty = false;
    state.photoDirty = null;
    state.mode = changeEmail ? 'create' : 'signin';
    state.contact = { email: changeEmail || !expired ? '' : c.email, ...keep };
    if (expired) state.contact.email = c.email;
    fillContactInputs();
    persist();
    if (expired) showMsg('#send-msg', 'You were signed out. Confirm your email again to carry on.');
    go('contact');
    renderContact();
    $('#c-email').focus();
  }

  /**
   * Takes the artist to step 1 and points at what's missing.
   */
  function showContactErrors() {
    if (state.view !== 'contact') go('contact');
    if (!state.me) {
      const ok = EMAIL_RE.test($('#c-email').value.trim());
      setError($('#c-email'), ok ? (state.mode === 'create' ? 'Join first' : 'Sign in first') : 'Add your email');
      $('#c-email').focus();
      return;
    }
    (checkCreateFields() || $('#c-name')).focus();
  }

  /**
   * Shows a message element.
   * @param {string} sel Selector.
   * @param {string} text
   */
  function showMsg(sel, text) { const el = $(sel); el.textContent = text; el.hidden = false; }
  /**
   * Hides a message element.
   * @param {string} sel Selector.
   */
  function hideMsg(sel) { $(sel).hidden = true; }

  // ---------- Fields ----------

  /**
   * Keeps a field's floating label up while it has a value and clears its error.
   * @param {Event} e
   */
  function onFieldChange(e) {
    const el = e.target;
    if (!el.closest?.('.field')) return;
    syncFilled(el);
    if (el.id !== 'c-instagram' || !state.profileError) clearError(el);
  }

  /**
   * Marks a field as filled so its label stays up.
   * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} el
   */
  function syncFilled(el) {
    el.closest('.field')?.classList.toggle('filled', !!el.value);
  }

  /**
   * Marks a field as invalid and shows the message under it.
   * @param {HTMLElement} el
   * @param {string} msg
   */
  function setError(el, msg) {
    const field = el.closest('.field');
    field.classList.add('invalid');
    el.setAttribute('aria-invalid', 'true');
    let m = $('.msg', field);
    if (!m) {
      m = document.createElement('span');
      m.className = 'msg';
      m.id = el.id + '-msg';
      field.append(m);
      el.setAttribute('aria-describedby', m.id);
    }
    m.textContent = msg;
  }

  /**
   * Clears a field's error.
   * @param {HTMLElement} el
   */
  function clearError(el) {
    const field = el.closest('.field');
    if (!field?.classList.contains('invalid')) return;
    field.classList.remove('invalid');
    el.removeAttribute('aria-invalid');
    $('.msg', field)?.remove();
  }

  /**
   * Fills the country list with English names, sorted.
   */
  function fillCountries() {
    const codes = 'AF AX AL DZ AS AD AO AI AQ AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BQ BA BW BR IO BN BG BF BI CV KH CM CA KY CF TD CL CN CX CC CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT VA HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI KP KR XK KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU NF MK MP NO OM PK PW PS PA PG PY PE PH PN PL PT PR QA RE RO RU RW BL SH KN LC MF PM VC WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA GS SS ES LK SD SR SJ SE CH SY TW TJ TZ TH TL TG TK TO TT TN TR TM TC TV UG UA AE GB US UM UY UZ VU VE VN VG VI WF EH YE ZM ZW'.split(' ');
    let names;
    try {
      const dn = new Intl.DisplayNames(['en'], { type: 'region' });
      names = codes.map((c) => dn.of(c));
    } catch { names = codes; }
    names = [...new Set(names)].sort((a, b) => a.localeCompare(b));
    const sel = $('#c-country');
    for (const n of names) sel.add(new Option(n, n));
  }

  /**
   * Fills the year list with this year and the 30 before it.
   */
  function fillYears() {
    const sel = $('#p-year');
    const now = new Date().getFullYear();
    for (let y = now; y >= now - 30; y--) sel.add(new Option(String(y), String(y)));
    sel.add(new Option(`Before ${now - 30}`, `Before ${now - 30}`));
  }

  /**
   * Formats a date as "8 Nov 2026".
   * @param {string} iso
   * @returns {string} The input as-is if it isn't a date.
   */
  function formatDate(iso) {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  /**
   * Formats a date as "8 Nov". Accepts ISO or SQLite "YYYY-MM-DD HH:MM:SS" (UTC).
   * @param {string} iso
   * @returns {string} '' if missing or invalid.
   */
  const shortDate = (iso) => {
    if (!iso) return '';
    const d = new Date(/^\d{4}-\d\d-\d\d \d/.test(iso) ? iso.replace(' ', 'T') + 'Z' : iso);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  // ---------- Files ----------

  /**
   * File extension in lower case.
   * @param {string} name
   * @returns {string}
   */
  function ext(name) { return (name.split('.').pop() || '').toLowerCase(); }

  /**
   * Checks a file's type and size against the portal's limits.
   * @param {File} file
   * @returns {string} An error message, or '' if the file is fine.
   */
  function checkFile(file) {
    const t = TYPES[ext(file.name)];
    if (!t) return `${file.name}: use JPG, PNG, PDF, GIF or MP4.`;
    if (file.size > t.max * MB) return `${file.name} is ${(file.size / MB).toFixed(1)} MB — ${ext(file.name).toUpperCase()} files must be under ${t.max} MB.`;
    return '';
  }

  /**
   * What kind of preview a file gets.
   * @param {{type?:string, name?:string}} f
   * @returns {'image'|'video'|'pdf'|'other'}
   */
  function kindOf(f) {
    if (f.type?.startsWith('image/')) return 'image';
    if (f.type?.startsWith('video/')) return 'video';
    if (f.type === 'application/pdf') return 'pdf';
    return TYPES[ext(f.name || '')]?.kind || 'other';
  }

  /**
   * Formats a byte count as KB or MB.
   * @param {number} bytes
   * @returns {string}
   */
  function sizeLabel(bytes) {
    return bytes < MB ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / MB).toFixed(1)} MB`;
  }

  // Thumbnails reuse one object URL per Blob
  const urls = new WeakMap();
  /**
   * Object URL for a blob, made once and reused.
   * @param {Blob} blob
   * @returns {string}
   */
  function urlFor(blob) {
    if (!urls.has(blob)) urls.set(blob, URL.createObjectURL(blob));
    return urls.get(blob);
  }

  /**
   * Where to load a file's preview from: the local blob if we have one,
   * otherwise the copy on the server.
   * @param {Entry} e
   * @param {object} f File or asset.
   * @param {string} [assetId] Set for an asset, unset for the poster file.
   * @returns {string} URL, or '' if there's nothing to show yet.
   */
  function srcFor(e, f, assetId) {
    if (f.blob) return urlFor(f.blob);
    if (!e.created) return '';
    const v = encodeURIComponent(`${f.name}-${f.size}`);
    return assetId ? `${API}/entries/${e.id}/assets/${assetId}?v=${v}` : `${API}/entries/${e.id}/file?v=${v}`;
  }

  /**
   * Builds a thumbnail for a file: image, video frame, or a type label.
   * @param {Entry} e
   * @param {?object} f File or asset.
   * @param {string} [assetId]
   * @returns {HTMLElement}
   */
  function thumb(e, f, assetId) {
    const box = document.createElement('div');
    box.className = 'thumb';
    if (!f) { box.textContent = 'No file'; return box; }
    const k = kindOf(f);
    const src = srcFor(e, f, assetId);
    if (k === 'image' && src) {
      const img = new Image();
      img.alt = '';
      img.loading = 'lazy';
      img.src = src;
      box.append(img);
    } else if (k === 'video' && src) {
      const v = document.createElement('video');
      v.src = src;
      v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      box.append(v);
    } else {
      box.textContent = ext(f.name || '').toUpperCase() || 'FILE';
    }
    return box;
  }

  /**
   * Guesses a poster title from a file name:
   * "Andre_The-Locked-Garden.png" → "The Locked Garden".
   * @param {string} name
   * @returns {string}
   */
  function titleFromName(name) {
    let base = name.replace(/\.[^.]+$/, '');
    const parts = base.split('_').filter(Boolean);
    if (parts.length > 1) base = parts.slice(1).join(' ');
    return base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
  }

  // ---------- Posters (the artist's home) ----------

  /**
   * Whether the artist has used every submission the contest allows.
   * @returns {boolean}
   */
  function limitReached() {
    return state.max !== null && state.max !== undefined && state.used >= state.max;
  }

  /**
   * Draws step 2: drafts in progress, submitted, withdrawn and earlier entries.
   */
  function renderPosters() {
    const c = state.contest;
    const bits = [];
    if (state.max) bits.push(`${state.used} of ${state.max} entries used`);
    else if (state.used) bits.push(`${state.used} submitted`);
    if (c.closesAt) bits.push(c.acceptingSubmissions ? `Closes ${formatDate(c.closesAt)}` : `Submissions closed on ${formatDate(c.closesAt)}`);
    else if (!c.acceptingSubmissions) bits.push('Submissions are closed');
    $('#posters-meta').textContent = bits.join(' · ');
    $('#posters-meta').hidden = !bits.length;

    const blockedMsg = !c.acceptingSubmissions
      ? 'Submissions are closed. Your drafts are kept, but they can’t be submitted.'
      : limitReached() ? `You’ve used all ${state.max} entries. Withdraw one to make room.` : '';
    $('#add-poster').hidden = !!blockedMsg;
    $('#add-blocked').textContent = blockedMsg;
    $('#add-blocked').hidden = !blockedMsg;

    const draftList = drafts();
    const sent = state.entries.filter((e) => e.status === 'submitted');
    const withdrawn = state.entries.filter((e) => e.status === 'withdrawn');
    const earlierSent = state.earlier.filter((s) => s.status === 'submitted');
    const earlierWithdrawn = state.earlier.filter((s) => s.status === 'withdrawn');

    fillList($('#draft-list'), draftList.map(draftRow));
    fillList($('#sent-list'), [...sent.map(sentRow), ...earlierSent.map(earlierRow)]);
    fillList($('#withdrawn-list'), [...withdrawn.map(withdrawnRow), ...earlierWithdrawn.map(earlierRow)]);
    $('#drafts-title').hidden = !draftList.length;
    $('#sent-title').hidden = !(sent.length + earlierSent.length);
    const nWithdrawn = withdrawn.length + earlierWithdrawn.length;
    $('#withdrawn-group').hidden = !nWithdrawn;
    $('#withdrawn-title').textContent = `Withdrawn (${nWithdrawn})`;
    $('#posters-empty').hidden = !!(draftList.length || sent.length || nWithdrawn || earlierSent.length);
    if (draftList.some(isReady)) $('#posters-error').hidden = true;
    updateNav();
  }

  /**
   * Replaces a list's items.
   * @param {HTMLElement} ul
   * @param {HTMLElement[]} items
   */
  function fillList(ul, items) { ul.replaceChildren(...items); }

  /**
   * Builds the common part of a list row: thumbnail and title.
   * @param {?Entry} e
   * @param {?object} file
   * @param {string} titleText
   * @returns {{li:HTMLLIElement, info:HTMLDivElement}}
   */
  function rowShell(e, file, titleText) {
    const li = document.createElement('li');
    li.dataset.id = e?.id || '';
    li.append(e ? thumb(e, file) : thumbPlaceholder());
    const info = document.createElement('div');
    info.className = 'info';
    const t = document.createElement('div');
    t.className = 'p-title';
    t.textContent = titleText || 'Untitled';
    info.append(t);
    li.append(info);
    return { li, info };
  }

  /**
   * An empty thumbnail, for rows without a file.
   * @returns {HTMLElement}
   */
  function thumbPlaceholder() { const b = document.createElement('div'); b.className = 'thumb'; b.textContent = '—'; return b; }

  /**
   * Row for a draft: status, what it still needs, and Edit / Remove.
   * @param {Entry} e
   * @returns {HTMLLIElement}
   */
  function draftRow(e) {
    const { li, info } = rowShell(e, e.file, e.fields.title);
    const meta = document.createElement('div');
    meta.className = 'sub-meta';
    const bits = [];
    if (e.file) bits.push(`${ext(e.file.name || '').toUpperCase()} · ${sizeLabel(e.file.size)}`);
    if (e.assets.length) bits.push(`${e.assets.length} supporting file${e.assets.length > 1 ? 's' : ''}`);
    if (e.fields.year_designed) bits.push(e.fields.year_designed);
    meta.textContent = bits.join(' · ');
    info.append(meta);

    const tags = document.createElement('div');
    tags.className = 'tags';
    const status = document.createElement('span');
    status.className = isReady(e) ? 'flag ready' : 'flag';
    status.textContent = isReady(e) ? 'Ready to submit' : `In progress · needs ${needs(e).join(' and ')}`;
    tags.append(status, syncTag(e));
    info.append(tags);

    if (e.sync === 'conflict') info.append(conflictPanel(e));

    const actions = document.createElement('div');
    actions.className = 'actions';
    if (state.confirm?.type === 'remove' && state.confirm.id === e.id) {
      info.append(confirmPanel(
        `Remove “${e.fields.title || 'Untitled'}”?`,
        'It won’t be submitted. We keep a record of removed drafts.',
        [btn('(Remove draft)', () => { state.confirm = null; removeDraft(e); }, 'strong'), btn('(Keep it)', () => { state.confirm = null; renderPosters(); })],
      ));
    } else {
      if (state.contest.acceptingSubmissions) {
        actions.append(btn(isReady(e) ? '(Edit)' : '(Continue)', () => go('poster-' + e.id)), dot());
      }
      actions.append(btn('(Remove)', () => { state.confirm = { type: 'remove', id: e.id }; renderPosters(); }));
      info.append(actions);
    }
    return li;
  }

  /**
   * Row for a submitted entry: reference, date and Withdraw.
   * @param {Entry} e
   * @returns {HTMLLIElement}
   */
  function sentRow(e) {
    const { li, info } = rowShell(e, e.file, e.fields.title);
    const meta = document.createElement('div');
    meta.className = 'sub-meta';
    meta.textContent = `${e.reference || ''} · Submitted ${shortDate(e.submittedAt)}`;
    info.append(meta);
    const tags = document.createElement('div');
    tags.className = 'tags';
    const tag = document.createElement('span');
    tag.className = 'flag ready';
    tag.textContent = `Submitted · ${e.reference || ''}`;
    tags.append(tag);
    info.append(tags);

    if (state.confirm?.type === 'withdraw' && state.confirm.id === e.id) {
      info.append(withdrawPanel(e));
    } else if (state.contest.withdrawalsOpen) {
      const actions = document.createElement('div');
      actions.className = 'actions';
      const w = btn('(Withdraw)', () => { if (isDisabled(w)) return; state.confirm = { type: 'withdraw', id: e.id }; renderPosters(); });
      needsOnline(w, 'Connect to the internet to withdraw.');
      actions.append(w, reasonSpan(w));
      info.append(actions);
    } else {
      const note = document.createElement('div');
      note.className = 'sub-meta';
      note.textContent = 'Judging has started. Contact us to withdraw.';
      info.append(note);
    }
    return li;
  }

  /**
   * Row for a withdrawn entry, with Restore while the contest is open.
   * @param {Entry} e
   * @returns {HTMLLIElement}
   */
  function withdrawnRow(e) {
    const { li, info } = rowShell(e, e.file, e.fields.title);
    const meta = document.createElement('div');
    meta.className = 'sub-meta';
    meta.textContent = `${e.reference || ''} · Withdrawn ${shortDate(e.withdrawnAt)}`;
    info.append(meta);
    if (state.contest.acceptingSubmissions) {
      const actions = document.createElement('div');
      actions.className = 'actions';
      const r = btn('(Restore)', async () => {
        if (isDisabled(r)) return;
        if (limitReached()) return showPostersError(`You’ve used all ${state.max} entries. Withdraw another one first.`);
        r.setAttribute('aria-disabled', 'true');
        let res;
        try { res = await api('POST', `/entries/${e.id}/restore`); } catch { res = null; }
        if (!res) return renderPosters();
        if (!res.ok) showPostersError(errorText(res));
        await reloadEntries();
        renderPosters();
      });
      needsOnline(r, 'Connect to the internet to restore.');
      actions.append(r, reasonSpan(r));
      info.append(actions);
    }
    return li;
  }

  /**
   * Row for a submission made with the earlier form (read only).
   * @param {object} s Earlier submission from the portal.
   * @returns {HTMLLIElement}
   */
  function earlierRow(s) {
    const { li, info } = rowShell(null, null, s.title);
    const meta = document.createElement('div');
    meta.className = 'sub-meta';
    meta.textContent = `${s.reference} · ${s.status === 'withdrawn' ? 'Withdrawn' : 'Submitted'} ${shortDate(s.submittedAt)} · Sent with the earlier form. Contact us to change it.`;
    info.append(meta);
    return li;
  }

  /**
   * Inline confirm for withdrawing a submitted entry, with an optional reason.
   * @param {Entry} e
   * @returns {HTMLElement}
   */
  function withdrawPanel(e) {
    const wrap = document.createElement('div');
    wrap.className = 'inline-confirm';
    const h = document.createElement('p');
    h.className = 'ic-title';
    h.textContent = `Withdraw “${e.fields.title}”?`;
    const p = document.createElement('p');
    p.textContent = `It will be removed from judging. You can restore it while submissions are open${state.contest.closesAt ? ` (until ${formatDate(state.contest.closesAt)})` : ''}. We keep a record of withdrawn entries.`;
    const field = document.createElement('div');
    field.className = 'field';
    const input = document.createElement('input');
    input.id = 'withdraw-reason';
    input.maxLength = 500;
    input.placeholder = ' ';
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.textContent = 'Reason (optional)';
    field.append(input, label);
    const actions = document.createElement('div');
    actions.className = 'actions';
    const go_ = btn('(Withdraw entry)', async () => {
      if (isDisabled(go_)) return;
      go_.setAttribute('aria-disabled', 'true');
      let res;
      try { res = await api('POST', `/entries/${e.id}/withdraw`, { reason: input.value.trim() }); } catch { res = null; }
      state.confirm = null;
      if (res && !res.ok) showPostersError(errorText(res));
      if (res) await reloadEntries();
      renderPosters();
    }, 'strong');
    needsOnline(go_, 'Connect to the internet to withdraw.');
    actions.append(go_, dot(), btn('(Keep it)', () => { state.confirm = null; renderPosters(); }), reasonSpan(go_));
    wrap.append(h, p, field, actions);
    setTimeout(() => input.focus(), 0);
    return wrap;
  }

  /**
   * Inline confirm box with a title, text and buttons.
   * @param {string} title
   * @param {string} text
   * @param {HTMLElement[]} buttons
   * @returns {HTMLElement}
   */
  function confirmPanel(title, text, buttons) {
    const wrap = document.createElement('div');
    wrap.className = 'inline-confirm';
    const h = document.createElement('p');
    h.className = 'ic-title';
    h.textContent = title;
    const p = document.createElement('p');
    p.textContent = text;
    const actions = document.createElement('div');
    actions.className = 'actions';
    buttons.forEach((b, i) => { if (i) actions.append(dot()); actions.append(b); });
    wrap.append(h, p, actions);
    return wrap;
  }

  /**
   * Panel shown when the same field changed on two devices, letting the artist
   * keep this version or take the other.
   * @param {Entry} e
   * @returns {HTMLElement}
   */
  function conflictPanel(e) {
    const wrap = document.createElement('div');
    wrap.className = 'inline-confirm conflict-panel';
    const h = document.createElement('p');
    h.className = 'ic-title';
    h.textContent = 'Changed on another device';
    const names = e.conflict.fields.map((k) => FIELD_LABELS[k] || k).join(', ');
    const p = document.createElement('p');
    p.textContent = `${names} ${e.conflict.fields.length === 1 ? 'was' : 'were'} also edited somewhere else. Nothing is overwritten until you choose.`;
    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.append(
      btn('(Keep this version)', () => keepMine(e), 'strong'), dot(),
      btn('(Use the other version)', () => useTheirs(e)),
    );
    wrap.append(h, p, actions);
    return wrap;
  }

  const FIELD_LABELS = {
    title: 'Title', year_designed: 'Year', designed_for: 'Designed for', client_name: 'Client',
    creation_method: 'Creation method', materials_used: 'Materials', digital_programs: 'Programs',
    printing_method: 'Printing method', concept: 'Concept',
  };

  /**
   * Small save-status tag for an entry, with Retry when saving failed.
   * @param {Entry} e
   * @returns {HTMLSpanElement}
   */
  function syncTag(e) {
    const s = document.createElement('span');
    s.className = `sync sync-${e.sync}`;
    s.dataset.syncFor = e.id;
    s.textContent = syncLabel(e);
    if (e.sync === 'failed') {
      s.append(' · ');
      s.append(btn('Retry', () => { setSync(e, 'saving'); schedule(0); }));
    }
    return s;
  }

  /**
   * Text for an entry's save status.
   * @param {Entry} e
   * @returns {string} For example 'Saved', 'Saving… 40%' or 'Saved on this device'.
   */
  function syncLabel(e) {
    if (e.sync === 'conflict') return 'Changed on another device';
    if (e.sync === 'failed') return `Couldn’t save${e.error ? ': ' + e.error : ''}`;
    if (!state.online && hasWork(e)) return 'Saved on this device';
    if (e.sync === 'saving' || hasWork(e)) return e.progress != null ? `Saving… ${e.progress}%` : 'Saving…';
    return 'Saved';
  }

  /**
   * Updates an entry's status tags in place while syncing, so typing in the
   * editor isn't interrupted.
   * @param {Entry} e
   */
  function updateEntryUi(e) {
    for (const el of $$(`[data-sync-for="${e.id}"]`)) el.replaceWith(syncTag(e));
    if (state.view === 'edit' && state.draftId === e.id) renderEditSync(e);
  }

  /**
   * Makes a text-link button.
   * @param {string} label
   * @param {(ev:MouseEvent) => void} onClick
   * @param {string} [cls] Extra class names.
   * @returns {HTMLButtonElement}
   */
  function btn(label, onClick, cls) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'link-btn' + (cls ? ' ' + cls : '');
    b.textContent = label;
    b.addEventListener('click', onClick);
    return b;
  }
  /**
   * A separator dot between links.
   * @returns {HTMLSpanElement}
   */
  function dot() { const s = document.createElement('span'); s.className = 'dot'; s.setAttribute('aria-hidden', 'true'); return s; }
  /**
   * Marks a button as needing the server, so it turns off while offline.
   * @param {HTMLElement} el
   * @param {string} msg Reason shown while offline.
   */
  function needsOnline(el, msg) {
    el.dataset.needsOnline = msg;
    el.dataset.reason = 'r-' + Math.random().toString(36).slice(2, 9);
    setTimeout(() => applyOnline(el), 0);
  }
  /**
   * Element that shows why a button is turned off.
   * @param {HTMLElement} el Button set up with needsOnline().
   * @returns {HTMLSpanElement}
   */
  function reasonSpan(el) {
    const s = document.createElement('span');
    s.className = 'reason';
    s.id = el.dataset.reason;
    s.hidden = true;
    return s;
  }

  /**
   * Shows a message on the posters page.
   * @param {string} msg
   */
  function showPostersError(msg) {
    const err = $('#posters-error');
    err.textContent = msg;
    err.hidden = false;
  }

  /**
   * Removes a draft, from the server too if it was saved there.
   * @param {Entry} e
   */
  function removeDraft(e) {
    if (!e.created) state.entries = state.entries.filter((x) => x !== e);
    else { e.discard = true; schedule(0); }
    persist();
    renderPosters();
  }

  /**
   * Adds a new draft, optionally starting from a poster file.
   * @param {?File} file
   * @returns {Entry}
   */
  function addEntry(file) {
    const e = newEntry();
    e.isNew = true;
    if (file) {
      e.fields.title = titleFromName(file.name);
      e.dirty = ['title'];
      e.file = { name: file.name, type: file.type, size: file.size, blob: file, pending: true };
    }
    state.entries.push(e);
    persist();
    schedule();
    return e;
  }

  /**
   * Binds the posters page's Add a Poster button (file drops are in bindDragAndDrop).
   */
  function bindPosters() {
    $('#add-poster').addEventListener('click', () => {
      if (!state.contest.acceptingSubmissions || limitReached()) return;
      const e = addEntry(null);
      go('poster-' + e.id);
    });
  }

  /**
   * Adds files dropped on the posters page. One file opens the editor; several
   * become one poster each, titled from the file name.
   * @param {File[]} files
   */
  function addFilesAsPosters(files) {
    if (!state.contest.acceptingSubmissions || limitReached()) return;
    const errors = [];
    const ok = [];
    for (const f of files) { const err = checkFile(f); err ? errors.push(err) : ok.push(f); }
    if (errors.length) showPostersError(errors.join(' '));
    const added = ok.map((f) => addEntry(f));
    if (added.length === 1 && !errors.length) { go('poster-' + added[0].id); return; }
    renderPosters();
  }

  // ---------- Poster editor ----------

  /**
   * Binds the poster editor: its nav buttons, live saving as fields change, and
   * the file and extra-file pickers.
   */
  function bindEditor() {
    $('#edit-cancel').addEventListener('click', () => go('posters'));
    $('#edit-save').addEventListener('click', finishPoster);
    $('#poster-form').addEventListener('submit', (ev) => { ev.preventDefault(); finishPoster(); });
    /**
     * Reads the editor's fields into the draft and queues a save.
     */
    const live = () => {
      const e = findEntry(state.draftId);
      if (!e) return;
      readDraftFields(e);
      persist();
      schedule();
      renderEditSync(e);
    };
    $('#poster-form').addEventListener('input', live);
    $('#poster-form').addEventListener('change', live);
    $('#p-concept').addEventListener('input', (ev) => {
      $('#concept-count').textContent = `${ev.target.value.length} / 4000`;
    });

    const fileInput = $('#file-input');
    const assetsInput = $('#assets-input');
    clickable($('#file-box'), fileInput);
    clickable($('#assets-box'), assetsInput);
    fileInput.addEventListener('change', () => { setPosterFile(fileInput.files[0]); fileInput.value = ''; });
    assetsInput.addEventListener('change', () => { addAssets([...assetsInput.files]); assetsInput.value = ''; });
  }

  /**
   * Makes a whole box open a file picker, except when its inner buttons are clicked.
   * @param {HTMLElement} box
   * @param {HTMLInputElement} input File input.
   */
  function clickable(box, input) {
    box.addEventListener('click', (ev) => { if (!ev.target.closest('button')) input.click(); });
    box.addEventListener('keydown', (ev) => {
      if ((ev.key === 'Enter' || ev.key === ' ') && ev.target === box) { ev.preventDefault(); input.click(); }
    });
  }

  /**
   * Opens the editor for a draft, or a new one for 'new'.
   * @param {string} id Entry ID or 'new'.
   */
  function openEditor(id) {
    if (id === 'new') {
      const e = addEntry(null);
      history.replaceState(null, '', '#poster-' + e.id);
      id = e.id;
    }
    const e = findEntry(id);
    if (!e || e.status !== 'draft' || e.discard) { go('posters'); return; }
    state.draftId = e.id;
    $('#edit-title').textContent = e.isNew ? 'Add a Poster' : 'Edit Poster';
    $('#edit-error').hidden = true;
    fillEditor(e);
  }

  /**
   * Fills the editor's fields from a draft.
   * @param {Entry} e
   * @param {boolean} [keepFocus] Refresh values without disturbing the field being typed in.
   */
  function fillEditor(e, keepFocus) {
    for (const el of $('#poster-form').elements) {
      if (keepFocus && el === document.activeElement) continue;
      el.value = e.fields[el.name] || '';
      syncFilled(el);
      clearError(el);
    }
    $('#concept-count').textContent = `${(e.fields.concept || '').length} / 4000`;
    renderEditSync(e);
    renderDraftFiles(e);
  }

  /**
   * Shows the draft's save status in the editor's bottom nav, and the conflict
   * panel if there is one.
   * @param {Entry} e
   */
  function renderEditSync(e) {
    const line = $('#edit-sync');
    line.replaceChildren(syncTag(e));
    const box = $('#edit-conflict');
    box.replaceChildren();
    box.hidden = e.sync !== 'conflict';
    if (e.sync === 'conflict') box.append(conflictPanel(e));
  }

  /**
   * Leaves the editor and shows why on the posters page.
   * @param {string} msg
   */
  function showEditNotice(msg) {
    go('posters');
    showPostersError(msg);
  }

  /**
   * Leaving the editor: forgets an entry that was never filled in.
   */
  function closeEditor() {
    const e = findEntry(state.draftId);
    state.draftId = null;
    if (!e) return;
    e.isNew = false;
    if (isEmpty(e) && e.status === 'draft') {
      if (!e.created) state.entries = state.entries.filter((x) => x !== e);
      else { e.discard = true; schedule(0); }
    }
    persist();
  }

  /**
   * Copies the editor's fields into a draft and marks what changed.
   * @param {Entry} e
   */
  function readDraftFields(e) {
    for (const el of $('#poster-form').elements) {
      if (!el.name) continue;
      const v = el.value.trim();
      if (e.fields[el.name] !== v) {
        e.fields[el.name] = v;
        if (!e.dirty.includes(el.name)) e.dirty.push(el.name);
      }
    }
    e.dirty = e.dirty.filter((k) => e.fields[k] !== e.base[k]);
  }

  /**
   * Sets the draft's poster file after checking it, and queues the upload.
   * @param {?File} file
   */
  function setPosterFile(file) {
    const e = findEntry(state.draftId);
    if (!file || !e) return;
    const err = checkFile(file);
    if (err) return showEditError(err);
    readDraftFields(e);
    e.file = { name: file.name, type: file.type, size: file.size, blob: file, pending: true };
    e.fileRemoved = false;
    if (e.sync === 'failed') e.sync = 'saving';
    if (!e.fields.title) {
      e.fields.title = titleFromName(file.name);
      if (!e.dirty.includes('title')) e.dirty.push('title');
      const t = $('#p-title'); t.value = e.fields.title; syncFilled(t); clearError(t);
    }
    $('#edit-error').hidden = true;
    renderDraftFiles(e);
    persist();
    schedule(0); // start uploading straight away
  }

  /**
   * Adds extra files to the draft (up to MAX_ASSETS) after checking each.
   * @param {File[]} files
   */
  function addAssets(files) {
    const e = findEntry(state.draftId);
    if (!e) return;
    const errors = [];
    for (const f of files) {
      const err = checkFile(f);
      if (err) { errors.push(err); continue; }
      if (e.assets.length >= MAX_ASSETS) { errors.push(`Only ${MAX_ASSETS} supporting files per poster.`); break; }
      e.assets.push({ localId: uuid(), name: f.name, type: f.type, size: f.size, blob: f, pending: true });
    }
    if (e.sync === 'failed') e.sync = 'saving';
    if (errors.length) showEditError(errors.join(' ')); else $('#edit-error').hidden = true;
    renderDraftFiles(e);
    persist();
    schedule(0);
  }

  /**
   * Shows a message in the editor.
   * @param {string} msg
   */
  function showEditError(msg) {
    const el = $('#edit-error');
    el.textContent = msg;
    el.hidden = false;
  }

  /**
   * Draws the poster file and extra files in the editor, with progress and
   * Replace / Remove links.
   * @param {Entry} e
   */
  function renderDraftFiles(e) {
    const slot = $('#file-slot');
    slot.replaceChildren();
    if (e.file) {
      const card = document.createElement('div');
      card.className = 'file-card';
      card.append(thumb(e, e.file));
      const meta = document.createElement('div');
      meta.className = 'file-meta';
      meta.innerHTML = '<div class="name"></div><div class="size"></div>';
      $('.name', meta).textContent = e.file.name;
      $('.size', meta).textContent = sizeLabel(e.file.size) + (e.file.pending ? (state.online ? ' · uploading…' : ' · will upload when online') : ' · saved');
      const actions = document.createElement('div');
      actions.className = 'actions';
      actions.append(
        btn('(Replace)', () => $('#file-input').click()),
        dot(),
        btn('(Remove)', () => {
          // Unlink on the server too (harmless if it never got the file).
          if (e.created) e.fileRemoved = true;
          e.file = null;
          renderDraftFiles(e);
          persist();
          schedule(0);
        }),
      );
      meta.append(actions);
      card.append(meta);
      slot.append(card);
    }
    $('#file-box .browse').hidden = !!e.file;

    const list = $('#asset-list');
    list.replaceChildren();
    e.assets.forEach((a) => {
      const li = document.createElement('li');
      li.append(thumb(e, a, a.id));
      const meta = document.createElement('div');
      meta.className = 'file-meta';
      meta.innerHTML = '<div class="name"></div><div class="size"></div>';
      $('.name', meta).textContent = a.name;
      $('.size', meta).textContent = sizeLabel(a.size) + (a.pending ? ' · uploading…' : '');
      li.append(meta, btn('(Remove)', () => {
        if (!a.pending && a.id) e.removedAssets.push(a.id);
        e.assets = e.assets.filter((x) => x !== a);
        renderDraftFiles(e);
        persist();
        schedule(0);
      }));
      list.append(li);
    });
    $('#assets-box .browse').hidden = e.assets.length >= MAX_ASSETS;
    renderEditSync(e);
  }

  /**
   * The editor's "Save & Continue": checks the poster has a title and a file, saves right
   * away, and goes back to the list.
   */
  function finishPoster() {
    const e = findEntry(state.draftId);
    if (!e) return go('posters');
    readDraftFields(e);
    let bad = false;
    if (!e.fields.title) { setError($('#p-title'), 'Add a title'); bad = true; }
    if (!e.file) { showEditError('Add the poster file — browse or drop it on the Poster File box. Or go back to All Entries and finish it later.'); bad = true; }
    if (bad) {
      (e.fields.title ? $('#file-box') : $('#p-title')).focus();
      return;
    }
    e.isNew = false;
    persist();
    schedule(0);
    go('posters');
  }

  // ---------- Drag and drop ----------

  /**
   * Lets files be dropped anywhere on the posters page or the editor, with a
   * full-page overlay while dragging.
   */
  function bindDragAndDrop() {
    const overlay = $('#drop-overlay');
    let depth = 0;

    /**
     * The view showing now.
     * @returns {string|undefined}
     */
    const currentView = () => $('.view:not([hidden])')?.dataset.view;
    /**
     * Whether a file drop is taken on the current view.
     * @returns {boolean}
     */
    const accepts = () => ['posters', 'edit'].includes(currentView()) && state.contest?.acceptingSubmissions;
    /**
     * Whether a drag carries files (not text or a link).
     * @param {DragEvent} e
     * @returns {boolean}
     */
    const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes('Files');

    for (const [box, handler] of [
      [$('#add-poster'), (files) => addFilesAsPosters(files)],
      [$('#file-box'), (files) => { setPosterFile(files[0]); if (files.length > 1) addAssets(files.slice(1)); }],
      [$('#assets-box'), (files) => addAssets(files)],
    ]) {
      box.addEventListener('dragover', (e) => { if (!hasFiles(e)) return; e.preventDefault(); box.classList.add('over'); overlay.hidden = true; });
      box.addEventListener('dragleave', () => box.classList.remove('over'));
      box.addEventListener('drop', (e) => {
        if (!hasFiles(e)) return;
        e.preventDefault();
        e.stopPropagation();
        box.classList.remove('over');
        depth = 0;
        overlay.hidden = true;
        handler([...e.dataTransfer.files]);
      });
    }

    window.addEventListener('dragenter', (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      depth++;
      if (!accepts()) return;
      const d = findEntry(state.draftId);
      $('#drop-text').textContent = currentView() === 'edit'
        ? (d?.file ? 'Drop to add supporting files' : 'Drop to add the poster file')
        : 'Drop to add posters';
      overlay.hidden = false;
    });
    window.addEventListener('dragover', (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = accepts() ? 'copy' : 'none';
      if (accepts() && !e.target.closest?.('.box')) overlay.hidden = false;
    });
    window.addEventListener('dragleave', (e) => {
      if (!hasFiles(e)) return;
      depth = Math.max(0, depth - 1);
      if (!depth) overlay.hidden = true;
    });
    window.addEventListener('drop', (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault(); // never let the browser open the file
      depth = 0;
      overlay.hidden = true;
      $$('.box.over').forEach((b) => b.classList.remove('over'));
      const files = [...e.dataTransfer.files];
      if (!files.length || !accepts()) return;
      const v = currentView();
      if (v === 'posters') addFilesAsPosters(files);
      if (v === 'edit') {
        const d = findEntry(state.draftId);
        if (!d?.file) { setPosterFile(files[0]); if (files.length > 1) addAssets(files.slice(1)); }
        else addAssets(files);
      }
    });
  }

  // ---------- Submit ----------

  /**
   * Binds the submit step's poster picks and terms boxes.
   */
  function bindSubmit() {
    $('#consent-form').addEventListener('change', (e) => {
      e.target.closest('.check')?.classList.remove('invalid');
      $('#submit-error').hidden = true;
      state.consents = $$('#consent-form input').map((b) => b.checked);
      persist();
    });
    $('#pick-list').addEventListener('change', (e) => {
      const id = e.target.dataset.pick;
      if (id) { state.picked[id] = e.target.checked; updateNav(); }
    });
  }

  /**
   * Drafts that can be submitted.
   * @returns {Entry[]}
   */
  const readyDrafts = () => drafts().filter(isReady);
  /**
   * Ready drafts the artist has ticked (all are ticked by default).
   * @returns {Entry[]}
   */
  const pickedDrafts = () => readyDrafts().filter((e) => state.picked[e.id] !== false);

  /**
   * Draws step 3: the posters to pick, the terms and the artist's details.
   * Skipped while a submit is running.
   */
  function renderSubmit() {
    if (state.submitting) return;
    $$('#consent-form input').forEach((b, i) => { b.checked = !!state.consents[i]; });
    const ul = $('#pick-list');
    ul.replaceChildren(...readyDrafts().map((e) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      label.className = 'check';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.dataset.pick = e.id;
      input.checked = state.picked[e.id] !== false;
      const mark = document.createElement('span');
      mark.className = 'box-mark';
      mark.setAttribute('aria-hidden', 'true');
      const text = document.createElement('span');
      text.className = 'pick-text';
      text.textContent = e.fields.title;
      label.append(input, mark, text, syncTag(e));
      li.append(label);
      return li;
    }));
    const c = state.contact;
    const s = $('#summary');
    s.innerHTML = '<p class="muted"></p>';
    s.children[0].textContent = [c.name, state.me?.email, c.country, c.instagram && '@' + c.instagram].filter(Boolean).join(' · ');
    updateNav();
  }

  /**
   * Sets the label the bottom nav shows while submitting.
   * @param {string} stage For example 'Saving…' or 'Sending…'.
   */
  function setSubmitStage(stage) {
    state.submitStage = stage;
    updateNav();
  }

  /**
   * Submits the ticked posters. Checks the terms and limit, makes sure every
   * picked poster is fully saved, then sends them together. Fields are locked
   * while it runs.
   * @returns {Promise<void>}
   */
  async function submitPicked() {
    if (state.submitting) return;
    const err = $('#submit-error');
    if (!state.online) { err.textContent = 'You’re offline. Connect to the internet to submit.'; err.hidden = false; return; }
    const picked = pickedDrafts();
    if (!picked.length) { err.textContent = 'Tick at least one poster to submit.'; err.hidden = false; return; }
    const boxes = $$('#consent-form input');
    const unchecked = boxes.filter((b) => !b.checked);
    if (unchecked.length) {
      unchecked.forEach((b) => b.closest('.check').classList.add('invalid'));
      err.textContent = 'Please confirm all three terms to submit.';
      err.hidden = false;
      unchecked[0].focus();
      return;
    }
    if (limitReached() || (state.max && state.used + picked.length > state.max)) {
      err.textContent = `You can submit ${Math.max(0, state.max - state.used)} more. Untick some posters, or withdraw one first.`;
      err.hidden = false;
      return;
    }

    state.submitting = true;
    err.hidden = true;
    lockFields($('#pick-list'), true);
    lockFields($('#consent-form'), true);
    setSubmitStage('Saving…');

    // Make sure every picked entry is fully saved (files included) first.
    await flush();
    const unsaved = picked.filter((e) => hasWork(e) || blocked(e));
    if (unsaved.length) {
      finishSubmit(state.online
        ? `“${unsaved[0].fields.title}” hasn’t saved yet${unsaved[0].error ? ` (${unsaved[0].error})` : ''}. Fix it in your entries, then try again.`
        : 'You’re offline. Connect to the internet to submit.');
      return;
    }

    setSubmitStage('Sending…');
    let r;
    try {
      r = await api('POST', '/submit', { entryIds: picked.map((e) => e.id), consentVersion: state.contest.consentVersion });
    } catch { r = null; }
    if (!r) return finishSubmit('You’re offline. Connect to the internet to submit.');
    if (!r.ok) {
      const code = r.body.error;
      if (code === 'consent_outdated') {
        state.contest.consentVersion = r.body.consentVersion;
        state.consents = [false, false, false];
        $$('#consent-form input').forEach((b) => { b.checked = false; });
        return finishSubmit('The terms have been updated. Please read and confirm them again.');
      }
      if (code === 'profile_incomplete') { finishSubmit(''); return showContactErrors(); }
      return finishSubmit(errorText(r));
    }

    const refs = [];
    const failed = [];
    for (const res of r.body.results) {
      const e = findEntry(res.id);
      if (res.reference) refs.push({ title: e?.fields.title || '', reference: res.reference });
      else failed.push(`${e?.fields.title || 'A poster'}: ${errorText({ status: 409, body: res })}`);
    }
    state.used = r.body.used;
    try { await reloadEntries(); } catch { /* offline */ }

    if (refs.length) {
      state.lastRefs = refs;
      state.consents = [false, false, false]; // consent is given again on every submit
      state.picked = {};
      persist();
      finishSubmit('');
      if (failed.length) showPostersError(`Not sent: ${failed.join(' ')}`);
      go('done');
      return;
    }
    finishSubmit(failed.join(' ') || 'Nothing was sent. Please try again.');
  }

  /**
   * Ends a submit: unlocks the fields and shows a message if one is given.
   * @param {string} message Error to show, or ''.
   */
  function finishSubmit(message) {
    state.submitting = false;
    state.submitStage = '';
    lockFields($('#pick-list'), false);
    lockFields($('#consent-form'), false);
    renderSubmit();
    if (message) {
      const err = $('#submit-error');
      err.textContent = message;
      err.hidden = false;
    }
  }

  /**
   * Turns an API error into a message for the artist.
   * @param {{status:number, body:object}} r
   * @param {string} [fileName] Named in file errors.
   * @returns {string}
   */
  function errorText(r, fileName) {
    const body = r.body || {};
    const code = body.error;
    const mb = body.limitBytes ? `${Math.round(body.limitBytes / MB)} MB` : '';
    const map = {
      title_required: 'Add a title.',
      entry_incomplete: `Needs ${(body.missing || []).map((m) => (m === 'file' ? 'a poster file' : 'a title')).join(' and ') || 'more details'}.`,
      file_too_large: `${fileName || 'The file'} is too large${mb ? ` (max ${mb})` : ''}.`,
      unsupported_file_type: `${fileName || 'The file'} isn’t a real JPG, PNG, PDF, GIF or MP4.`,
      too_many_assets: `Only ${body.max || MAX_ASSETS} supporting files per poster.`,
      submissions_closed: 'Submissions for this contest have closed.',
      submission_limit_reached: state.max ? `You’ve used all ${state.max} entries.` : 'You’ve reached the entry limit.',
      withdrawals_closed: 'Judging has started, so entries can’t be withdrawn here. Contact us.',
      too_many_drafts: 'You have a lot of drafts open. Remove some first.',
      entry_locked: 'This entry was already submitted.',
      invalid_api_key: 'The form isn’t set up correctly. Please contact us.',
      form_not_configured: 'The form isn’t set up correctly. Please contact us.',
      forbidden_origin: 'Please use link.unblocked.world.',
      unauthenticated: 'You were signed out. Confirm your email again.',
      not_found: 'That entry couldn’t be found.',
    };
    return map[code] || `Something went wrong (${r.status}${code ? `: ${code}` : ''}).`;
  }

  // ---------- Done ----------

  /**
   * Draws the confirmation page with the reference for each submitted poster.
   */
  function renderDone() {
    const ul = $('#refs');
    ul.replaceChildren(...state.lastRefs.map((ref) => {
      const li = document.createElement('li');
      const t = document.createElement('span'); t.textContent = ref.title;
      const c = document.createElement('code'); c.textContent = ref.reference;
      li.append(t, c);
      return li;
    }));
    const another = $('#another-btn');
    another.hidden = !state.contest.acceptingSubmissions || limitReached();
    another.onclick = () => { const e = addEntry(null); state.lastRefs = []; go('poster-' + e.id); };
    $('#view-entries-btn').onclick = () => { state.lastRefs = []; go('posters'); };
  }
})();
