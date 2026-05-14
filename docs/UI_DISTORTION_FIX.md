# UI Distortion Fix — Fabric/New Architecture Rollback

**Date fixed:** 2026-05-12
**Symptom:** "Container-type" screens (Home, Plans, Portfolio, MPCard, BespokeCard, etc.) rendered with off-proportions/clipping after the May 10 whitelabel refactor (`f140fec`).
**Root cause:** `ios/Podfile` silently dropped `:fabric_enabled => false, :new_arch_enabled => false`, switching the app from Paper (old architecture) to Fabric/Bridgeless (new architecture). The codebase was designed and tested against Paper.

---

## How the problem presented

User report: _"UI going beyond what it should have gone in the respective places — not only plan card, everything that has container type is distorted. This happened in the past and was solved by managing package compatibility."_

Visible across MPCard, MPCardBespoke, FlatList items, TabView scenes, and nested SafeAreaView containers.

---

## Wrong hypotheses (tried and rejected)

Before finding the root cause, the following were investigated and ruled out:

| # | Hypothesis | How it was ruled out |
|---|---|---|
| 1 | Card width too wide (CSS) | Pixel-measured screenshots showed actual margins were ~25pt each side — not edge-clipped. Edge "black pixels" in user screenshots were 1-px screenshot artifacts. |
| 2 | Asymmetric `marginHorizontal` | Symmetry differed by only 4pt; making cards narrower + `alignSelf: 'center'` did not address the user's "container distortion" feeling because it wasn't the actual bug. |
| 3 | JS package version drift | `package-lock.json` between working commit `800abc8` and current HEAD: **identical** for all UI/navigation/layout-affecting packages (react-native-screens, safe-area-context, gesture-handler, reanimated, tab-view, pager-view, navigation 7.x). |
| 4 | Missing `patches/react-native-linear-gradient` patch | The patch was a symptom-masking hack (forced `clipsToBounds = NO`). Its own comment leaked the real story: _"Prevent Fabric/New Architecture from clipping content at borderRadius."_ |

The patch comment was the breakthrough clue.

---

## Root cause

`ios/Podfile` `use_react_native!` call was missing two lines.

### Working commit `800abc8`

```ruby
use_react_native!(
  :path => config[:reactNativePath],
  :app_path => "#{Pod::Config.instance.installation_root}/..",
  :fabric_enabled => false,        # ← present
  :new_arch_enabled => false       # ← present
)
```

### After the whitelabel sync (HEAD before fix)

```ruby
use_react_native!(
  :path => config[:reactNativePath],
  :app_path => "#{Pod::Config.instance.installation_root}/.."
  # missing the two flags above
)
```

In RN 0.78+, the New Architecture is **opt-out** (defaults to ON). Dropping those two lines silently flipped the app to Fabric + Bridgeless mode. Confirmation: the Metro inspector JSON endpoint reported the connected device as _"React Native Bridgeless [C++ connection]"_.

Fabric handles layout — especially clipping at rounded `borderRadius`, overflow on nested containers, and view shadow propagation — differently than Paper, breaking layouts written for the old behavior.

---

## The fix (4 steps)

### 1. Restore the two flags in `ios/Podfile`

```ruby
use_react_native!(
  :path => config[:reactNativePath],
  :app_path => "#{Pod::Config.instance.installation_root}/..",
  :fabric_enabled => false,
  :new_arch_enabled => false
)
```

### 2. Regenerate Pods

```bash
cd ios && pod install
```

`Podfile.lock` no longer contains Fabric pods after this. ~260 seconds.

### 3. Clean and rebuild iOS app

```bash
# Clear old .app to force fresh native compile
rm -rf ~/Library/Developer/Xcode/DerivedData/AlphaQuark-*/Build/Products/Debug-iphonesimulator/AlphaQuark.app

xcodebuild -workspace ios/AlphaQuark.xcworkspace \
  -scheme AlphaQuark \
  -configuration Debug \
  -destination 'id=<simulator-udid>' \
  ONLY_ACTIVE_ARCH=YES
```

~10 minutes clean build (parallel clang).

### 4. Install and launch

```bash
xcrun simctl install <udid> <path-to-AlphaQuark.app>
xcrun simctl launch <udid> in.alphaquark.alphapro
```

---

## What was NOT touched (and shouldn't be in a similar fix)

These all looked tempting during investigation but turned out irrelevant:

- `MPCard.js` / `MPCardBespoke.js` widths (`screenWidth - 30`)
- `marginHorizontal: 8` on card containers
- `react-native-tab-view` / `react-native-pager-view` versions
- `@react-navigation/*` versions
- `Dimensions.get('window')` vs `useWindowDimensions()`

Any CSS/component changes layered on top of a broken render architecture would mask, not fix, the bug.

---

## Side-discoveries during the investigation

The whitelabel refactor (`f140fec`, May 10) introduced two npm dependencies that were never installed:

- `@alphaquark/mobile-sdk` — declared as `file:../../alphaquark-mobile-sdk/packages/rn`, but that path doesn't exist on this machine.
- `@react-native-clipboard/clipboard` — listed as `^1.16.3` but missing from `node_modules`.

15+ source files have **static** imports from `@alphaquark/mobile-sdk` (cannot be tree-shaken even though SDK integration is feature-flagged off). Metro fails the bundle without these.

**Mitigation:** local stub packages at:
- `node_modules/@alphaquark/mobile-sdk/{package.json,index.js}` — exports no-op components/hooks (`TradeReviewSheet`, `AqSdkProvider`, `useAqSdk`, `evaluateSessionGate`, etc.)
- `node_modules/@react-native-clipboard/clipboard/{package.json,index.js}` — exports no-op clipboard API.

`metro.config.js` was also patched to only add `extraNodeModules`/`watchFolders` for the SDK if its path actually exists, so it doesn't warn at startup on machines without the sibling SDK repo.

Safe because:
- `REACT_APP_SDK_INTEGRATION` is not `'true'` in `.env`, so `SdkProviderRoot` falls back to a fragment wrapper at runtime.
- The stubs satisfy bundle-time imports only.
- The actual SDK can replace the stubs by checking out `../../alphaquark-mobile-sdk` and running `pod install`.

---

## How to detect this regression in the future

Quick sanity checks if "container distortion" reappears:

1. **Check `ios/Podfile`** — the two flags `:fabric_enabled => false, :new_arch_enabled => false` MUST be present inside `use_react_native!(…)`.
2. **Check Metro inspector** — `curl http://localhost:8081/json` and look at the device `description`. Should NOT say `"Bridgeless"` if you're on Paper.
3. **Check `ios/Podfile.lock`** — should NOT contain entries like `react-native-safe-area-context/fabric`, `FabricImage`, or similar fabric subspecs.

If any of those are out of place, run the 4-step fix above.

---

## Why this regressed

The whitelabel refactor (`f140fec`, "byte-identical src/ contract") was performed by syncing the iOS fork's `src/` to upstream. Native iOS files like `ios/Podfile` and `ios/AlphaQuark/AppDelegate.mm` were also changed in the same commit — including dropping the two flag lines and adding `RCTAppDependencyProvider` (a New-Arch TurboModule).

The upstream codebase had migrated to the New Architecture; the iOS fork hadn't. The byte-identical sync overwrote the fork's working Paper config.

**Lesson:** when syncing native iOS files from an upstream that may have moved arch, always diff:
- `ios/Podfile` (especially `use_react_native!` flags)
- `ios/AlphaQuark/AppDelegate.mm` (`RCTAppDependencyProvider` lines)
- `ios/AlphaQuark/Info.plist` (`RCTNewArchEnabled` key)
- `.env` and any build configs (`REACT_APP_NEW_ARCH_*`)

Don't blindly accept native-side changes from a `src/-only` refactor.
