/**
 * PortfolioScreen — kaizenalpha variant presentation.
 *
 * Wraps the default presentation with the Kaizen top bar. Default
 * starts directly with the holdings hero card, so the wrapper is
 * additive — the brand chrome lands above the existing layout.
 *
 * Container at `src/screens/PortfolioScreen/PortfolioScreen.js` exposes
 * `portfolio.tickers / userEmail / userName / config` (sourced from
 * `useHomeMarketSummary`, mirroring the home prop bag).
 */

import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import DefaultPortfolioScreen from '../../default/screens/PortfolioScreen';
import AppHeader from './_AppHeader';

const PortfolioScreenPresentation = ({ portfolio }) => {
    const { tickers, userEmail, userName, config } = portfolio || {};

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
                <DefaultPortfolioScreen portfolio={portfolio} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#0A0A0A' },
    body: { flex: 1, backgroundColor: '#EFF0EE' },
});

export default PortfolioScreenPresentation;
