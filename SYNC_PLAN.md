# Android ↔ iOS Branch Sync Plan

**Date:** 2026-01-28  
**Android Branch:** `feature/V2.5_brokerScreen`  
**iOS Branch:** `feature/ios2.5`

---

## Summary

| Branch | Unique Commits |
|--------|---------------|
| Android | 21 commits (including new liability fix) |
| iOS | 3 commits |

---

## Step 1: Sync iOS to Android (Recommended)

iOS branch needs these fixes from Android:

### Critical (Business Logic)
- [ ] `AddtoCartModal.js` — Restore market hours check
- [ ] `ReviewTradeModal.js` — Restore disabled button logic
- [ ] `TermsModal.js` — Use no-liability language (just committed)

### Config/Theming
- [ ] `SignupScreen.js` — Use config-based gradients & logo handling
- [ ] `ResetPassword.js` — Use dynamic colors from config

### Take from iOS → Android
- [ ] `Navigation.js` — Use percentage-based positioning (`screenHeight * 0.82`)

---

## Step 2: Commands

```bash
# On iOS branch, cherry-pick critical Android commits
git checkout feature/ios2.5
git fetch origin

# Cherry-pick the liability fix
git cherry-pick ddc9bcb

# Cherry-pick other Android commits (review each)
git log --oneline feature/V2.5_brokerScreen ^feature/ios2.5

# Or merge Android into iOS (careful - review conflicts)
git merge feature/V2.5_brokerScreen --no-commit
```

---

## Step 3: Files to Review After Merge

| File | Check |
|------|-------|
| `AddtoCartModal.js` | Market hours check present |
| `ReviewTradeModal.js` | Button disabled logic uncommented |
| `SignupScreen.js` | Config gradients, not hardcoded |
| `Navigation.js` | Percentage positioning (0.82) |
| `TermsModal.js` | "No liability whatsoever" language |
| `google-services.json` | Correct Firebase config per platform |
| `GoogleService-Info.plist` | Correct iOS Firebase config |

---

## Step 4: Test Checklist

- [ ] Sign up flow works on both platforms
- [ ] Reset password works
- [ ] Trade modal blocks after-hours trades
- [ ] Trade button disabled during loading
- [ ] Terms modal displays correctly
- [ ] Bottom sheet positioning correct on various screen sizes

---

## Liability Clause (Updated)

```
5.1. To the fullest extent permitted by law, we will not be liable for any 
direct, indirect, incidental, special, consequential, or punitive damages, 
including but not limited to loss of profits, data, or other intangible 
losses, arising out of or in connection with your use of the Service.

5.2. You acknowledge and agree that your use of the Service is at your 
sole risk. Under no circumstances shall we have any liability to you for 
any damages whatsoever.

5.3. We disclaim all warranties, whether express or implied, including 
but not limited to warranties of merchantability, fitness for a particular 
purpose, and non-infringement.
```

---

## Notes

- iOS had removed market hours check — likely for App Store review (they don't like time-based restrictions). Consider a flag to toggle this behavior.
- Android has more complex logo handling to support white-label configs.
- Both branches have different Firebase configs — do not overwrite platform-specific files.
