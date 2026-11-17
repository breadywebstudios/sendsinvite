/* Invitation Studio, standalone website layer.
   The app talks to window.studioData.use('db' | 'user' | 'assets'). This file provides
   those three things on top of a Supabase project (see config.js). */
(function () {
  'use strict';
  var C = window.SITE_CONFIG || {};
  var BASE = String(C.supabaseUrl || '').replace(/\/+$/, ''), KEY = String(C.supabaseKey || '');
  var READY = /^https:\/\//.test(BASE) && KEY.length > 20;
  var PHOTOS = window.SITE_PHOTOS || {};
  var BUCKET = 'inv-photos';

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function rand(n) {
    var a = new Uint8Array(n), s = '';
    try { crypto.getRandomValues(a); } catch (e) { for (var i = 0; i < n; i++) a[i] = Math.floor(Math.random() * 256); }
    for (var j = 0; j < n; j++) s += ('0' + a[j].toString(16)).slice(-2);
    return s;
  }

  /* ── Guest key: lets a guest see and change their own reply from the same browser ── */
  var memKey = null;
  function guestKey() {
    var k = lsGet('inv.guest');
    if (!k || k.length < 24) { k = memKey || (memKey = 'g' + rand(20)); lsSet('inv.guest', k); }
    return k;
  }

  /* ── Host session ── */
  var session = null;
  try { session = JSON.parse(lsGet('inv.session') || 'null'); } catch (e) { session = null; }
  if (session && (!session.access_token || !session.refresh_token)) session = null;
  function keep(s) {
    if (s && s.access_token) {
      session = { access_token: s.access_token, refresh_token: s.refresh_token, expires_at: Date.now() + (Number(s.expires_in) || 3600) * 1000, user: s.user ? { id: s.user.id, email: s.user.email } : (session && session.user) };
      lsSet('inv.session', JSON.stringify(session));
    } else { session = null; lsSet('inv.session', null); }
    return session;
  }
  function authMsg(j, fallback) {
    var m = (j && (j.msg || j.error_description || j.message || j.error)) || fallback || 'Something went wrong. Try again.';
    if (/invalid login/i.test(m)) m = 'That email and password don’t match. Check them and try again.';
    if (/not confirmed/i.test(m)) m = 'Confirm your email first. Open the link we sent you, then sign in.';
    if (/already registered|already been registered/i.test(m)) m = 'There is already an account with that email. Sign in instead.';
    return String(m);
  }
  function raw(path, opt) {
    opt = opt || {};
    var h = { apikey: KEY };
    if (opt.token) h.Authorization = 'Bearer ' + opt.token;
    if (opt.json !== undefined) h['Content-Type'] = 'application/json';
    if (opt.headers) Object.keys(opt.headers).forEach(function (k) { h[k] = opt.headers[k]; });
    return fetch(BASE + path, { method: opt.method || 'GET', headers: h, body: opt.json !== undefined ? JSON.stringify(opt.json) : opt.body });
  }
  function readJson(r) { return r.text().then(function (t) { var j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {} return { ok: r.ok, status: r.status, json: j }; }); }
  var refreshing = null;
  function refresh() {
    if (!session) return Promise.resolve(null);
    if (!refreshing) {
      refreshing = raw('/auth/v1/token?grant_type=refresh_token', { method: 'POST', json: { refresh_token: session.refresh_token } }).then(readJson).then(function (x) {
        refreshing = null;
        if (x.ok && x.json && x.json.access_token) return keep(x.json);
        if (x.status === 400 || x.status === 401 || x.status === 403) keep(null);
        return session;
      }, function () { refreshing = null; return session; });
    }
    return refreshing;
  }
  function token() {
    if (!session) return Promise.resolve(null);
    if (session.expires_at - Date.now() < 60000) return refresh().then(function (s) { return s ? s.access_token : null; });
    return Promise.resolve(session.access_token);
  }
  /* A request as the signed-in host when there is one, otherwise as an anonymous guest */
  function api(path, opt) {
    opt = opt || {};
    return token().then(function (t) {
      var o = {}; Object.keys(opt).forEach(function (k) { o[k] = opt[k]; }); o.token = t;
      return raw(path, o).then(function (r) {
        if (r.status === 401 && session) return refresh().then(function (s) { o.token = s ? s.access_token : null; return raw(path, o); });
        return r;
      });
    }).then(readJson).then(function (x) {
      if (!x.ok) { var e = new Error((x.json && (x.json.message || x.json.error)) || ('Request failed (' + x.status + ')')); e.status = x.status; throw e; }
      return x.json;
    });
  }
  function rpc(name, args) { return api('/rest/v1/rpc/' + name, { method: 'POST', json: args }); }

  /* ── Sign-in links that arrive from an email (confirm address, reset password) ── */
  var recovering = false;
  (function () {
    var h = ''; try { h = location.hash || ''; } catch (e) {}
    if (h.indexOf('access_token=') < 0 && h.indexOf('error_description=') < 0) return;
    var p = {}; h.replace(/^#/, '').split('&').forEach(function (kv) { var i = kv.indexOf('='); if (i > 0) p[kv.slice(0, i)] = decodeURIComponent(kv.slice(i + 1).replace(/\+/g, ' ')); });
    if (p.access_token && p.refresh_token) { keep(p); recovering = p.type === 'recovery'; }
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  })();

  /* ── The pieces the app asks for ── */
  function snap(id, data) { return { id: id, exists: data !== null && data !== undefined, data: function () { return data; } }; }
  var watchers = [];
  function watch(load, cb, err) {
    var w = { stop: false, run: function () { if (w.stop) return; load().then(function (docs) { if (!w.stop) cb({ docs: docs }); }, function (e) { if (err) err(e); }); } };
    watchers.push(w); w.run();
    return function () { w.stop = true; };
  }
  var lastPoke = 0;
  function refreshNow() { if (!session || Date.now() - lastPoke < 3000) return; lastPoke = Date.now(); watchers.forEach(function (w) { w.run(); }); }
  window.addEventListener('hashchange', refreshNow); window.addEventListener('popstate', refreshNow);
  function pokeSoon() { setTimeout(function () { watchers.forEach(function (w) { w.run(); }); }, 400); }
  setInterval(function () { if (!document.hidden && session) watchers.forEach(function (w) { w.run(); }); }, 30000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden && session) watchers.forEach(function (w) { w.run(); }); });

  var mine = {}, links = {}, linksOff = false;
  function loadInvites() {
    if (!session) return Promise.resolve([]);
    var keepRows = function (rows) {
      mine = {};
      return (rows || []).map(function (r) { mine[r.id] = true; if (r.slug !== undefined) links[r.id] = r.slug || ''; return snap(r.id, r.data); });
    };
    if (linksOff) return api('/rest/v1/inv_invites?select=id,data&order=updated_at.desc').then(keepRows);
    /* a database set up before link names existed has no slug column: fall back to the plain list */
    return api('/rest/v1/inv_invites?select=id,data,slug&order=updated_at.desc').then(keepRows, function (e) {
      if (e && e.status === 400) { linksOff = true; return loadInvites(); }
      throw e;
    });
  }
  /* ── Link names: a host can give an invitation a readable address such as /emma-oliver-wedding ── */
  var LINK_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/, RESERVED = ['art', 'photos', 'index', 'new', 'edit', 'replies', 'admin', 'api', 'login', 'app', 'site', 'config', 'favicon'];
  /* Hosts that rewrite any path to the page (Vercel, see vercel.json) get /emma-oliver-wedding. Elsewhere, such as
     GitHub Pages, a path with no file behind it is answered with status 404, which makes chat apps drop the link
     preview, so those links use /?emma-oliver-wedding instead. Set cleanLinks in config.js to choose explicitly. */
  var CLEAN = C.cleanLinks !== undefined ? !!C.cleanLinks : (function () { try { return /\.vercel\.app$/i.test(location.hostname); } catch (e) { return false; } })();
  function basePath() { var p = '/'; try { p = location.pathname.replace(/[^\/]*$/, '') || '/'; } catch (e) {} return p; }
  function okName(seg) { seg = String(seg || '').toLowerCase(); return seg.length >= 3 && seg.length <= 60 && LINK_RE.test(seg) && RESERVED.indexOf(seg) < 0 ? seg : ''; }
  function pathName() {
    var seg = '', q = '';
    try { seg = decodeURIComponent(location.pathname.split('/').pop() || ''); } catch (e) {}
    try { q = decodeURIComponent((location.search || '').replace(/^\?/, '').split('&')[0]); } catch (e) {}
    return okName(seg) || (q.indexOf('=') < 0 ? okName(q) : '');
  }
  function loadReplies() {
    if (!session) return Promise.resolve([]);
    return api('/rest/v1/inv_rsvps?select=invite_id,guest_key,reply').then(function (rows) {
      var by = {};
      (rows || []).forEach(function (r) { (by[r.guest_key] = by[r.guest_key] || { replies: {} }).replies[r.invite_id] = r.reply; });
      return Object.keys(by).map(function (k) { return snap(k, by[k]); });
    });
  }
  var db = {
    doc: function (path) {
      var parts = String(path).split('/'), col = parts[0], id = parts[1];
      if (col !== 'invites') return { get: function () { return Promise.resolve(snap(id, null)); }, set: function () { return Promise.reject(new Error('not supported')); }, delete: function () { return Promise.reject(new Error('not supported')); } };
      return {
        get: function () { return rpc('inv_get_invite', { p_id: id }).then(function (d) { return snap(id, d); }); },
        set: function (data) {
          return api('/rest/v1/inv_invites?on_conflict=id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, json: { id: id, data: data, updated_at: new Date().toISOString() } }).then(function () { mine[id] = true; });
        },
        delete: function () { return api('/rest/v1/inv_invites?id=eq.' + encodeURIComponent(id), { method: 'DELETE' }).then(function () { delete mine[id]; pokeSoon(); }); }
      };
    },
    collection: function (name) {
      return { onSnapshot: function (cb, err) { return watch(name === 'invites' ? loadInvites : loadReplies, cb, err); } };
    },
    /* Guest replies go through two database functions, so guests need no account */
    getReply: function (inviteId) { return rpc('inv_get_reply', { p_invite: inviteId, p_key: guestKey() }).then(function (r) { return r || null; }, function () { return null; }); },
    saveReply: function (inviteId, reply) { return rpc('inv_save_reply', { p_invite: inviteId, p_key: guestKey(), p_reply: reply }).then(function () { pokeSoon(); }); }
  };
  var user = {
    id: function () { return Promise.resolve(guestKey()); },
    canEdit: function () { return Promise.resolve(!!session && !recovering); },
    isOwner: function () { return !!session; }
  };

  /* Photos are scaled down in the browser before upload, so a phone photo stays small and quick to load */
  function shrink(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var max = 1800, k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(img.naturalWidth * k)); c.height = Math.max(1, Math.round(img.naturalHeight * k));
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        c.toBlob(function (b) { if (b) resolve(b); else reject(new Error('could not read photo')); }, 'image/jpeg', 0.86);
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('could not read photo')); };
      img.src = url;
    });
  }
  var assets = {
    upload: function (file) {
      if (!session) return Promise.reject(new Error('sign in first'));
      return shrink(file).then(function (blob) {
        var path = session.user.id + '/' + Date.now().toString(36) + rand(6) + '.jpg';
        return api('/storage/v1/object/' + BUCKET + '/' + path, { method: 'POST', body: blob, headers: { 'Content-Type': 'image/jpeg', 'cache-control': 'max-age=31536000' } })
          .then(function () { return { id: 'u:' + path, url: SITE.photoUrl('u:' + path), sizeBytes: blob.size, contentType: 'image/jpeg' }; });
      });
    }
  };

  /* ── Host sign-in screen ── */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  var mode = recovering ? 'newpass' : 'in', note = '', noteBad = false, busy = false;
  var COPY = {
    in: { h: 'Welcome back', p: 'Sign in to create invitations and see who is coming.', b: 'Sign in' },
    up: { h: 'Create your host account', p: 'One account keeps all your invitations and replies together. Guests never need one.', b: 'Create account' },
    forgot: { h: 'Reset your password', p: 'Enter your email and we will send you a link to choose a new password.', b: 'Send reset link' },
    newpass: { h: 'Choose a new password', p: 'Pick a new password for your host account.', b: 'Save password' }
  };
  function renderLogin(root) {
    var c = COPY[mode];
    root.textContent = '';
    var form = el('form', { class: 'signin-card', novalidate: '' });
    form.appendChild(el('span', { class: 'signin-brand', text: 'Invitation Studio' }));
    form.appendChild(el('h1', { text: c.h }));
    form.appendChild(el('p', { class: 'signin-sub', text: READY ? c.p : 'This site is not connected to its database yet. Add the Supabase address and key to config.js, then reload.' }));
    if (READY) {
      if (mode !== 'newpass') form.appendChild(el('label', { class: 'signin-field' }, [el('span', { text: 'Email' }), el('input', { type: 'email', name: 'email', autocomplete: 'email', required: '', inputmode: 'email' })]));
      if (mode !== 'forgot') form.appendChild(el('label', { class: 'signin-field' }, [el('span', { text: mode === 'newpass' ? 'New password' : 'Password' }), el('input', { type: 'password', name: 'password', autocomplete: mode === 'in' ? 'current-password' : 'new-password', required: '', minlength: '8' })]));
      if (mode === 'up') form.appendChild(el('p', { class: 'signin-hint', text: 'Use at least 8 characters.' }));
      var msg = el('p', { class: 'signin-msg' + (noteBad ? ' bad' : ''), role: 'status', text: note }); msg.hidden = !note; form.appendChild(msg);
      var btn = el('button', { class: 's-btn primary signin-go', type: 'submit', text: busy ? 'One moment…' : c.b }); btn.disabled = busy; form.appendChild(btn);
      var links = el('div', { class: 'signin-links' });
      var link = function (label, m) { var b = el('button', { type: 'button', class: 'text-link', text: label }); b.addEventListener('click', function () { mode = m; note = ''; noteBad = false; renderLogin(root); }); links.appendChild(b); };
      if (mode === 'in') { link('Create a host account', 'up'); link('Forgot your password?', 'forgot'); }
      else if (mode !== 'newpass') link('Back to sign in', 'in');
      form.appendChild(links);
      form.addEventListener('submit', function (e) {
        e.preventDefault(); if (busy) return;
        var email = form.email ? form.email.value.trim() : '', pw = form.password ? form.password.value : '';
        var fail = function (m) { busy = false; note = m; noteBad = true; renderLogin(root); };
        if (form.email && !/^\S+@\S+\.\S+$/.test(email)) return fail('Enter your email address.');
        if (form.password && pw.length < (mode === 'in' ? 1 : 8)) return fail(mode === 'in' ? 'Enter your password.' : 'Use at least 8 characters for the password.');
        busy = true; note = ''; renderLogin(root);
        var req;
        if (mode === 'in') req = raw('/auth/v1/token?grant_type=password', { method: 'POST', json: { email: email, password: pw } });
        else if (mode === 'up') req = raw('/auth/v1/signup', { method: 'POST', json: { email: email, password: pw }, headers: {} });
        else if (mode === 'forgot') req = raw('/auth/v1/recover', { method: 'POST', json: { email: email } });
        else req = token().then(function (t) { return raw('/auth/v1/user', { method: 'PUT', token: t, json: { password: pw } }); });
        req.then(readJson).then(function (x) {
          if (!x.ok) return fail(authMsg(x.json));
          if (mode === 'forgot') { busy = false; mode = 'in'; note = 'Check your email for the reset link.'; noteBad = false; return renderLogin(root); }
          if (mode === 'newpass') { recovering = false; location.reload(); return; }
          if (x.json && x.json.access_token) { keep(x.json); location.reload(); return; }
          busy = false; mode = 'in'; note = 'Almost there. Open the confirmation link we just emailed you, then sign in.'; noteBad = false; renderLogin(root);
        }, function () { fail('Couldn’t reach the server. Check your connection and try again.'); });
      });
    }
    root.appendChild(el('main', { class: 'signin' }, [form, el('p', { class: 'signin-foot', text: 'Received an invitation? Open the link your host sent you. No account needed.' })]));
  }
  function signOut() {
    var t = session && session.access_token; keep(null);
    var done = function () { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} location.reload(); };
    if (t && READY) raw('/auth/v1/logout', { method: 'POST', token: t }).then(done, done); else done();
  }
  document.addEventListener('click', function (e) { var t = e.target.closest && e.target.closest('[data-signout]'); if (t) { e.preventDefault(); signOut(); } });

  var SITE = window.SITE = {
    ready: READY,
    email: function () { return session && session.user ? session.user.email || '' : ''; },
    owns: function (id) { return !!mine[id]; },
    needsPassword: function () { return recovering; },
    inviteUrl: function (id) { return location.origin + basePath() + (links[id] ? (CLEAN ? '' : '?') + links[id] : '#i-' + id); },
    basePath: basePath,
    pathName: pathName,
    linkBase: function () { return location.host + basePath() + (CLEAN ? '' : '?'); },
    linksReady: function () { return !linksOff; },
    linkName: function (id) { return links[id] || ''; },
    linkProblem: function (name) {
      if (name.length < 3) return 'Use at least 3 letters or numbers.';
      if (name.length > 60) return 'Keep the link name under 60 characters.';
      if (!LINK_RE.test(name)) return 'Use only letters, numbers and dashes.';
      if (RESERVED.indexOf(name) >= 0) return 'That name is reserved by the site. Pick another one.';
      return '';
    },
    /* true when no other invitation uses this link name */
    linkFree: function (name, id) { return rpc('inv_link_free', { p_slug: name, p_id: id }).then(function (r) { return r === true; }); },
    /* saves the link name; the database refuses a name another invitation already has (error.taken) */
    setLink: function (id, name) {
      /* ask for the row back: a PATCH that matched nothing (signed out, invitation not saved or deleted) still answers 204 */
      return api('/rest/v1/inv_invites?id=eq.' + encodeURIComponent(id) + '&select=id', { method: 'PATCH', headers: { Prefer: 'return=representation' }, json: { slug: name || null } })
        .then(function (rows) { if (!rows || !rows.length) { var e = new Error('not saved'); e.missing = true; throw e; } links[id] = name || ''; },
          function (e) { if (e && (e.status === 409 || /duplicate|unique/i.test(e.message || ''))) e.taken = true; throw e; });
    },
    findInvite: function (name) { return rpc('inv_find_invite', { p_slug: name }).then(function (r) { return r && r.id ? r : null; }); },
    photoUrl: function (id) {
      if (!id) return '';
      if (PHOTOS[id]) return PHOTOS[id];
      if (String(id).indexOf('u:') === 0) return BASE + '/storage/v1/object/public/' + BUCKET + '/' + String(id).slice(2).split('/').map(encodeURIComponent).join('/');
      return '';
    },
    mapEmbedUrl: function (query) { return 'https://www.google.com/maps?q=' + encodeURIComponent(query) + '&z=15&output=embed'; },
    refresh: refreshNow,
    renderLogin: renderLogin,
    signOut: signOut
  };

  window.studioData = {
    use: function (name) {
      if (!READY) return Promise.resolve(null);
      if (name === 'db') return Promise.resolve(db);
      if (name === 'user') return Promise.resolve(user);
      if (name === 'assets') return Promise.resolve(session ? assets : null);
      return Promise.resolve(null);
    }
  };
})();
