/**
 * ============================================================================
 * whitelabel/appVariants — TENANT CONFIG ROOT (Kaizen_app fork)
 * ============================================================================
 *
 * 🔴 PER-FORK FILE. NOT BYTE-IDENTICAL ACROSS REPOS. 🔴
 *
 * The `APP_VARIANTS` map for tenants this repo ships. `src/utils/Config.js`
 * is the upstream-managed re-exporter (byte-identical across forks); this
 * file holds the actual values per repo.
 *
 * To add a new tenant, add an entry below. To create a fork (whitelabel
 * overlay), copy this file into the fork's `whitelabel/appVariants.js`
 * and edit. See `docs/WHITELABEL_RECIPE.md`.
 *
 * Synced from upstream Alphab2bapp on 2026-07-17 (full re-sync); the
 * `kaizenalpha` entry below is this fork's own variant (dark purple + black
 * theme, colors sourced from the kaizen_alpha web repo's
 * src/SeperateDesigns/LandingPageDesigns/KaizenLandingPage.jsx CSS variables:
 * --purple #A199FF, --black #000000, --near-black #0A0A0A, --dark #1A1A1A,
 * --yellow #F2F261, --purple-dark #8B82F0). `EmptyStateUi` is likewise kept
 * as this fork's purple-themed override (matches the kaizenalpha brand)
 * rather than upstream's red default.
 * ============================================================================
 */

// SharedDefaultLogo is the fallback logo applied to every variant
// that doesn't explicitly override `logo`. The file at
// `src/assets/AppLogo/logo.png` is the ZamZam-branded logo (the
// asset is byte-identical to `src/assets/AppLogo/Zamzam.png`) — so
// any variant that inherits `sharedUIConfig` without overriding
// `logo` will display ZamZam branding. Variants which need their
// own brand MUST set `logo` and `toolbarlogo` explicitly (see
// `alphaquark` and `kaizenalpha` below). The variable was previously
// named `ZamzamLogo`, which made the leak path visually obvious in
// code review but was misleading: this is the SHARED-CONFIG fallback
// logo, not a ZamZam-specific asset.
import SharedDefaultLogo from '../src/assets/AppLogo/logo.png';
import AlphaQuarkLogo from '../src/assets/logo.png';
import KaizenAlphaLogo from '../src/assets/AppLogo/kaizenalpha.png';

// Shared UI config — theme, colors, layout
const sharedUIConfig = {
  themeColor: '#ff0000',
  logo: SharedDefaultLogo,
  toolbarlogo: SharedDefaultLogo,
  homeScreenLayout: 'layout1',
  mainColor: '#0D021F',
  secondaryColor: '#ffffff',
  gradient1: '#F0F0F0',
  gradient2: '#773D9A',
  placeholderText: '#B893F1',
  CardborderWidth: 1.5,
  cardElevation: 0,
  basket1: '#6A29CA',
  basket2: '#4F0A9E',
  cardverticalmargin: 3,
  tabIconColor: '#fff',
  bottomTabBorderTopWidth: 0,
  bottomTabbg: '#242424',
  selectedTabcolor: '#8555EF',
  basketcolor: '#600CC0',
  basketsymbolbg: '#6D0DD6',
  googleWebClientId: '892331696104-e26pu9iotqrjk1o6jq4ifd4e95fasil1.apps.googleusercontent.com',
};

// Per-advisor config: subdomain + advisorRaCode
// When copying the app for a new advisor, just add a new entry here.
const APP_VARIANTS = {
  alphaquark: {
    themeColor: '#0000ff',
    logo: AlphaQuarkLogo,
    toolbarlogo: AlphaQuarkLogo,
    homeScreenLayout: 'layout2',
    mainColor: '#4CAAA0',
    secondaryColor: '#F0F0F0',
    gradient1: '#F0F0F0',
    gradient2: '#F0F0F0',
    placeholderText: '#FFFFFF',
    CardborderWidth: 0,
    cardElevation: 3,
    cardverticalmargin: 3,
    tabIconColor: '#000',
    bottomTabBorderTopWidth: 1.5,
    bottomTabbg: '#fff',
    selectedTabcolor: '#000',
    basketcolor: '#721E30',
    basketsymbolbg: '#8D2952',
    basket1: '#9D2115',
    basket2: '#6B1207',
    googleWebClientId: '892331696104-e26pu9iotqrjk1o6jq4ifd4e95fasil1.apps.googleusercontent.com',
    subdomain: 'prod',
    advisorRaCode: 'ALPHAQUARK',
    paymentModal: {
      headerBg: '#0056B7',
      stepActiveColor: '#0056B7',
      stepCompletedColor: '#29A400',
      buttonPrimaryBg: '#0056B7',
      buttonSecondaryBg: '#0056B7',
      accentColor: '#0056B7',
      checkboxActiveColor: '#29A400',
      linkColor: '#0056B7',
      progressBarColor: '#0056B7',
    },
  },
  zamzamcapital: {...sharedUIConfig, subdomain: 'zamzamcapital',   advisorRaCode: 'ZAMZAMCAPITAL'},
  rgxresearch:   {...sharedUIConfig, subdomain: 'rgxresearch',     advisorRaCode: 'RGXRESEARCH'},
  arfs:          {...sharedUIConfig, subdomain: 'arfs',            advisorRaCode: 'ARFS'},
  magnus:        {...sharedUIConfig, subdomain: 'zamzamcapital',   advisorRaCode: 'ZAMZAMCAPITAL'},

  // ── kaizenalpha (this fork) ──────────────────────────────────────────────
  // Dark purple + black theme, from KaizenLandingPage.jsx CSS vars.
  kaizenalpha: {
    themeColor: '#A199FF',        // --purple (primary accent)
    logo: KaizenAlphaLogo,
    toolbarlogo: KaizenAlphaLogo,
    homeScreenLayout: 'layout2',
    mainColor: '#0A0A0A',         // --near-black (primary background)
    secondaryColor: '#FFFFFF',    // --white
    gradient1: '#0A0A0A',         // near-black (login bg top)
    gradient2: '#2D2B5A',         // dark purple-black (login bg bottom)
    placeholderText: '#999999',   // --light-gray

    // ── Cards ──
    CardborderWidth: 0,
    cardElevation: 3,
    cardverticalmargin: 3,

    // ── Bottom tab bar ──
    tabIconColor: '#FFFFFF',
    bottomTabBorderTopWidth: 1,
    bottomTabbg: '#0A0A0A',       // --near-black
    selectedTabcolor: '#A199FF',  // --purple

    // ── Basket/portfolio colors ──
    basketcolor: '#2D2B5A',       // dark purple
    basketsymbolbg: '#A199FF',    // --purple
    basket1: '#1A1840',           // deep dark purple
    basket2: '#2D2B5A',           // medium dark purple

    // ── Auth ──
    googleWebClientId: '174847117466-0e6dhmt698bm7suh3n2ani4h98bq1mm5.apps.googleusercontent.com',
    subdomain: 'kaizenalpha',
    advisorRaCode: 'kaizenalpha',

    // ── Payment modal ──
    paymentModal: {
      headerBg: '#A199FF',
      stepActiveColor: '#A199FF',
      stepCompletedColor: '#8B82F0',
      buttonPrimaryBg: '#A199FF',
      buttonSecondaryBg: '#8B82F0',
      accentColor: '#A199FF',
      checkboxActiveColor: '#A199FF',
      linkColor: '#A199FF',
      progressBarColor: '#A199FF',
    },
  },

  // kaizenalpha's own EmptyStateUi (purple-themed, matches the brand above)
  // — overrides upstream's red default for this fork.
  EmptyStateUi: {
    backgroundColor: '#2D2B5A',     // dark purple
    darkerColor: '#1A1840',
    mediumColor: '#252350',
    brighterColor: '#A199FF',       // --purple
    mutedColor: '#6B68C0',
    lightColor: '#EDEAFF',          // --purple-subtle
    mediumLightShade: '#C8C3FF',    // --purple-light
    lightWarmColor: '#F2EEDF',      // --eggshell
  },
};

export default APP_VARIANTS;
