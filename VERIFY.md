# VERIFY.md — don't trust us. Check.
*How to prove the Forgetful Street actually forgets. Takes five minutes.*

## The claim
The memory-only adapter cannot persist your files. Close the tab and they're gone — not "deleted," not "hidden." Gone, because there was never anywhere else for them to be.

## The proof (do it yourself)

1. **Read the adapter** (`adapter.js`, ~90 lines). Count persistence calls:
   - `localStorage` → 0
   - `sessionStorage` → 0
   - `indexedDB` → 0
   - `fetch` / `XMLHttpRequest` → 0
   - `document.cookie` → 0
2. **Find the only state:** one module-level `Map` called `store`. Module state lives in the tab's JavaScript heap. The heap dies with the tab. That's the entire mechanism — there is no second place.
3. **Test it live:**
   - Open the dashboard, upload a file to the demo street.
   - Open devtools → Application → Local Storage / Session Storage / IndexedDB. All empty.
   - Open devtools → Network. Reload, upload again — zero requests except the page itself.
   - Close the tab. Reopen. The file is gone.
4. **Compare with the alternative:** any "ephemeral mode" that's a policy toggle still sends your bytes through their servers and logs. Ask them for *their* adapter.js. Policies are promises; code is proof.

## What this doesn't prove
- It doesn't prove your **browser** is clean (a compromised browser sees everything — no web page can fix that).
- It doesn't prove your **device** is clean (same reason).
- It proves the **page** has nowhere to put your files except the tab's memory. That's the claim, and the claim is checkable.

## The rule
Provable beats promised. If a vendor can't show you the code path, their ephemerality is a policy — and policies change without telling you.
