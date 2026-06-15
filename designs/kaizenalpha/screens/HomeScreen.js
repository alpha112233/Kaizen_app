/**
 * HomeScreen — kaizenalpha variant presentation.
 *
 * Composes the default presentation with a kaizenalpha-branded top bar
 * (logo + greeting + ticker strip) so home gets the brand chrome the
 * upstream default lacks. The default presentation is rendered unchanged
 * underneath — every section (recommendations, MP rebalances, Plans,
 * Knowledge Hub, modals) keeps working without duplication.
 *
 * The header is conditionally rendered: when one of the full-screen
 * overlay flags is set (`seeAllBespoke` / `seeAllMP` / `seeAllBlogs` /
 * etc.), the default presentation owns the whole viewport with its own
 * back button, so we hide the header to avoid double-chrome — same rule
 * the default already uses internally.
 *
 * Receives the same `home` prop bag built by
 * `src/screens/Home/HomeScreen.js`. `tickers` arrives populated by
 * `useHomeMarketSummary` (NIFTY / SENSEX / BANKNIFTY LTPs).
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import DefaultHomeScreen from '../../default/screens/HomeScreen';
import AppHeader from './_AppHeader';

const HomeScreenPresentation = ({ home }) => {
    const {
        seeAllBespoke,
        seeAllMP,
        seeAllBespokeplan,
        seeAllMPplan,
        seeAllBlogs,
        seeAllVideos,
        seeAllPDFs,
        userEmail,
        userName,
        config,
        tickers,
    } = home || {};

    const overlayOpen =
        seeAllBespoke ||
        seeAllMP ||
        seeAllBespokeplan ||
        seeAllMPplan ||
        seeAllBlogs ||
        seeAllVideos ||
        seeAllPDFs;

    return (
        <View style={styles.root}>
            {!overlayOpen && (
                <AppHeader
                    userEmail={userEmail}
                    userName={userName}
                    config={config}
                    tickers={tickers}
                />
            )}
            <View style={styles.body}>
                <DefaultHomeScreen home={home} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#FFFFFF' },
    body: { flex: 1 },
});

export default HomeScreenPresentation;
