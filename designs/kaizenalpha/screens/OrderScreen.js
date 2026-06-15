/**
 * OrderScreen — kaizenalpha variant presentation.
 *
 * Wraps the default presentation with the variant-local Kaizen top bar
 * (logo + greeting + Nifty/Sensex ticker strip). The default
 * presentation has no top header — it begins with a search row + the
 * orders list — so the wrapper is purely additive.
 *
 * Container at `src/screens/Home/OrderScreen.js` exposes
 * `viewModel.tickers / userEmail / userName / config` for any variant
 * that renders its own header. The default ignores them; we consume
 * them here.
 */

import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import DefaultOrderScreen from '../../default/screens/OrderScreen';
import AppHeader from './_AppHeader';

const OrderScreenPresentation = ({ viewModel, actions }) => {
    const { tickers, userEmail, userName, config } = viewModel || {};

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
                <DefaultOrderScreen viewModel={viewModel} actions={actions} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#0A0A0A' },
    body: { flex: 1, backgroundColor: '#EFF0EE' },
});

export default OrderScreenPresentation;
