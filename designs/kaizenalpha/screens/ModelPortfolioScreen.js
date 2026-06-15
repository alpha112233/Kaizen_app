/**
 * ModelPortfolioScreen — kaizenalpha variant presentation.
 *
 * Wraps the default presentation with the Kaizen top bar. The default
 * presentation honours a `viewModel.showHeader` flag — false when the
 * screen is mounted as the Plans tab (the bottom-tab bar already gives
 * it tab chrome), true when mounted as a detail/drawer view (then it
 * draws its own gradient header with back button).
 *
 * We render the Kaizen brand top bar ONLY in tab mode (`!showHeader`).
 * When the default is drawing its own gradient header (detail/drawer
 * mode), stacking ours on top would double up the chrome.
 *
 * Container at `src/screens/Drawer/ModelPortfolioScreen.js` exposes
 * `viewModel.tickers / userEmail / userName / config / showHeader`.
 */

import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import DefaultModelPortfolioScreen from '../../default/screens/ModelPortfolioScreen';
import AppHeader from './_AppHeader';

const ModelPortfolioScreenPresentation = (props) => {
    const { viewModel } = props || {};
    const {
        tickers,
        userEmail,
        userName,
        config,
        showHeader,
    } = viewModel || {};

    // Default presentation already draws its own gradient header when
    // `showHeader` is true (non-tab mounts). Adding the Kaizen header on
    // top in that case would stack two headers — skip our wrapper.
    if (showHeader) {
        return <DefaultModelPortfolioScreen {...props} />;
    }

    return (
        <View style={styles.root}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#0A0A0A"
                translucent={false}
            />
            <AppHeader
                userEmail={userEmail}
                userName={userName}
                config={config}
                tickers={tickers}
            />
            <View style={styles.body}>
                <DefaultModelPortfolioScreen {...props} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#0A0A0A' },
    body: { flex: 1, backgroundColor: '#FFFFFF' },
});

export default ModelPortfolioScreenPresentation;
