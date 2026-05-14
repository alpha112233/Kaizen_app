# SYNC.md — Alphab2bapp iOS fork (feature/ios2.6)

## Warning

This fork's `src/` is **byte-identical** to upstream `feature/sdk-plus-config_forkv2`. Do **not** make
tenant-specific edits inside `src/`. Tenant config belongs in `whitelabel/appVariants.js`;
custom UI belongs in `designs/<variant>/`.

## iOS-specific files (NEVER overwrite from Android branch)

| Path | Purpose |
|------|---------|
| `ios/` (entire folder) | Xcode project, Podfile, Podfile.lock, entitlements, Info.plist |
| `ios/AlphaQuark/GoogleService-Info.plist` | Firebase iOS config |
| `ios/AlphaQuark/Info.plist` | App permissions, bundle ID, Apple Sign-In entitlement |
| `ios/AlphaQuark/AlphaQuark.entitlements` | Sign in with Apple entitlement |
| `android/` (entire folder) | Android-specific build config |

## iOS-specific packages (in package.json, absent from Android forks)

| Package | Purpose |
|---------|---------|
| `@invertase/react-native-apple-authentication` | Sign in with Apple |
| `react-native-iap` | In-App Purchases (App Store) |

## Sync workflow

```bash
# Pull upstream src/ into this fork
git checkout feature/sdk-plus-config_forkv2 -- src/ designs/

# Verify byte-identical
git diff feature/sdk-plus-config_forkv2 HEAD -- src/ | wc -l
# → 0 = clean

# Also sync these upstream-managed files:
git checkout feature/sdk-plus-config_forkv2 -- docs/WHITELABEL_RECIPE.md

# Do NOT sync (fork-local):
#   package.json (has iOS-specific deps: apple-auth, react-native-iap)
#   metro.config.js (watchFolders removed — parent dir has 50+ projects)
#   whitelabel/appVariants.js (tenant config)
#   designs/<variant>/ (any iOS-variant UI)
#   ios/ (entire folder)
#   android/ (entire folder)
#   SYNC.md (this file)
```

## Tenant variants in this fork

| Variant key     | Subdomain       | Notes                        |
|-----------------|-----------------|------------------------------|
| arfs            | arfs            | layout1, dark purple         |
| magnus          | magnus          | layout2, teal                |
| alphaquark      | prod            | layout2, teal (AQ default)   |
| rgxresearch     | rgxresearch     | layout2, RGX branding        |
| zamzamcapital   | zamzamcapital   | layout1, dark purple         |

## Fork-local dependencies (additions to upstream)

- `@alphaquark/mobile-sdk` — `file:../../alphaquark-mobile-sdk/packages/rn`
- `@react-native-clipboard/clipboard` — `^1.16.3`
- `@invertase/react-native-apple-authentication` — iOS Sign in with Apple
- `react-native-iap` — App Store In-App Purchases

## iOS build notes

- Metro watchFolders points only to SDK package (not parent dir) — avoid watching 50+ sibling repos
- `@alphaquark/mobile-sdk` resolved via `extraNodeModules` to bypass symlink issues
- Podfile uses `razorpay-pod 1.5.0` + Firebase modular headers
- Apple Sign-In requires entitlement in Xcode and Apple Developer portal capability enabled

## Known regressions / gaps

None at initial whitelabel migration (2026-05-10).
