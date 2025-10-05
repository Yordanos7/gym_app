module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          env: ["EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY"],
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          blacklist: null, // Deprecated
          whitelist: null, // Deprecated
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};
