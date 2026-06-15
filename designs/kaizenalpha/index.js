/**
 * ============================================================================
 * designs/kaizenalpha — KAIZEN ALPHA VARIANT ROOT
 * ============================================================================
 *
 * Thin overlay on the `default` variant. Today this overrides only the asset
 * slot (logo). All primitives / composites / screens fall through to default
 * via the registry's variant-resolution chain — that means every upstream
 * feature lands in this fork automatically on the next src/ sync.
 *
 * To override a screen, composite, or SDK widget:
 *   1. Add the file under `designs/kaizenalpha/<layer>/<Name>.js`
 *   2. Import it here and register the same dot-namespaced key used by the
 *      default variant (e.g. `'screens.HomeScreen'`, `'composites.BasketCard'`).
 *
 * Keep this folder small. Anything that's a generic improvement belongs
 * upstream, not here. See docs/WHITELABEL_RECIPE.md § "What stays in
 * upstream vs the fork".
 * ============================================================================
 */

import * as tokens from './tokens';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import ModelPortfolioScreen from './screens/ModelPortfolioScreen';

const variant = {
    name: 'kaizenalpha',
    tokens,
    components: {
        // Each tab screen wraps its default presentation with the
        // kaizenalpha top bar (logo + greeting + Nifty/Sensex/BankNifty
        // ticker strip). The wrappers are purely additive — the default
        // presentation renders unchanged inside, so every section, modal,
        // and tab interaction behaves exactly as upstream. AccountSettings
        // ("More" tab) is intentionally skipped — its default presentation
        // already paints a full-page brand gradient that would clash with
        // a stacked header. The Plans tab wrapper only stacks the header
        // when the default is NOT drawing its own gradient header
        // (`!viewModel.showHeader`); see ./screens/ModelPortfolioScreen.js.
        'screens.HomeScreen': HomeScreen,
        'screens.OrderScreen': OrderScreen,
        'screens.PortfolioScreen': PortfolioScreen,
        'screens.ModelPortfolioScreen': ModelPortfolioScreen,
    },
    // No SDK widget overrides yet — default's `sdk/` bundle flows through
    // via the registry's `sdk` fallback. Override individual slots by
    // registering them on a `sdk: { ... }` map here.
};

export default variant;
