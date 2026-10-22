# memory-only-adapter 🧊💧

**A storage adapter that cannot persist.**

Everything lives in one JavaScript `Map`. Nothing touches disk, network, `localStorage`, or cookies. Close the tab and it's gone — not deleted, not hidden. *Gone*, because there was never anywhere else for it to be.

This is the "Forgetful Street" from **Brain Storm Cloud**, our command deck — the demo storage street whose honesty is its feature: it tells you to your face that it forgets, and then it proves it.

## Don't trust us. Check.

`adapter.js` is ~90 lines. That's the whole proof surface.

- **Read it.** Count the persistence calls: `localStorage` → 0 · `sessionStorage` → 0 · `indexedDB` → 0 · `fetch` / `XMLHttpRequest` → 0 · `document.cookie` → 0
- **Find the only state:** one module-level `Map` called `store`. Module state lives in the tab's JavaScript heap. The heap dies with the tab. There is no second place.
- **Test it live** with devtools open — full five-minute protocol in [VERIFY.md](VERIFY.md).

## Use it

```js
import { put, get, /* … */ } from './adapter.js';

put('id-1', 'notes.txt', new TextEncoder().encode('hello storm'), 'demo-house');
```

Quota: 50 MB, same as the dashboard. Over quota throws `quota exceeded`, same as a real street filling up — when one street fills, start the next house.

## Why

Most "privacy" claims ask you to trust a policy. This one asks you to read 90 lines. Verifiable beats promised — that's the whole Night Owl curriculum in one small file: *small, true, and checkable beats big, claimed, and closed.*

## License

Public domain — part of the Night Owl open curriculum. Take it, teach it, build on it.

---

*by Axl and Night Owl — The Nest, by Brain Storm Cloud* 🦉
