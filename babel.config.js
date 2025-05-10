module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push("react-native-reanimated/plugin");
  plugins.push([
    "module-resolver",
    {
      root: ["./"],
      extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
      alias: {
        "@": "./",
        "~": "./",
      },
    },
  ]);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins,
  };
};
