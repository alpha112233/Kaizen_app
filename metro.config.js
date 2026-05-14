const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);
const { resolver: { sourceExts, assetExts } } = defaultConfig;

const sdkPath = path.resolve(__dirname, "../../alphaquark-mobile-sdk/packages/rn");
const fs = require("fs");
const sdkExists = fs.existsSync(sdkPath);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    resolverMainFields: ["sbmodern", "react-native", "browser", "main"],
    ...(sdkExists && {
      extraNodeModules: {
        "@alphaquark/mobile-sdk": sdkPath,
      },
    }),
  },
  // Only watch the SDK folder if it exists
  ...(sdkExists && { watchFolders: [sdkPath] }),
};

module.exports = mergeConfig(defaultConfig, config);
