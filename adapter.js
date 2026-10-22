/**
 * memory-only-adapter.js — the Forgetful Street, provable.
 * A storage adapter that CANNOT persist: everything lives in a Map,
 * nothing touches disk, network, localStorage, or cookies.
 * Close the tab and it's gone. Read the code — that's the proof.
 * Public domain. Part of the Night Owl open curriculum.
 */

// The entire "database". One Map. No persistence anywhere.
const store = new Map(); // id -> { name, size, bytes, house, addedAt }
let usedBytes = 0;
const QUOTA_BYTES = 50 * 1024 * 1024; // 50 MB, same as the dashboard

function validId(id) {
  return typeof id === 'string' && id.length > 0 && id.length <= 128;
}

export function put(id, name, bytes, house) {
  if (!validId(id)) throw new Error('bad id');
  if (typeof name !== 'string' || name.length > 255) throw new Error('bad name');
  if (!(bytes instanceof Uint8Array)) throw new Error('bad bytes');
  if (typeof house !== 'string') throw new Error('bad house');
  if (usedBytes + bytes.byteLength > QUOTA_BYTES) throw new Error('quota exceeded');
  const old = store.get(id);
  if (old) usedBytes -= old.bytes.byteLength;
  store.set(id, { name, size: bytes.byteLength, bytes, house, addedAt: Date.now() });
  usedBytes += bytes.byteLength;
  return { id, name, size: bytes.byteLength, house };
}

export function get(id) {
  if (!validId(id)) return null;
  return store.get(id) || null;
}

export function list() {
  // Records validated at the boundary: name is string, size is finite number.
  const out = [];
  for (const [id, r] of store) {
    if (typeof r.name !== 'string') continue;
    if (!Number.isFinite(r.size)) continue;
    out.push({ id, name: r.name, size: r.size, house: r.house });
  }
  return out;
}

export function del(id) {
  if (!validId(id)) return false;
  const r = store.get(id);
  if (!r) return false;
  usedBytes -= r.bytes.byteLength;
  return store.delete(id);
}

export function forget() {
  // The whole street, gone. This is the feature.
  store.clear();
  usedBytes = 0;
}

// Proof of ephemerality: count the persistence calls in this file.
// localStorage: 0 · sessionStorage: 0 · indexedDB: 0 · fetch: 0 · cookies: 0.
// The only state is `store`, a module-level Map. Module state dies with the tab.
