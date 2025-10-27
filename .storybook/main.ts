import type { StorybookConfig } from "@storybook/react-webpack5";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              require.resolve("@babel/preset-env"),
              [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
              require.resolve("@babel/preset-typescript"),
            ],
          },
        },
      ],
    });
    if (config.resolve?.extensions) {
      for (const ext of [".ts", ".tsx"]) {
        if (!config.resolve.extensions.includes(ext)) {
          config.resolve.extensions.push(ext);
        }
      }
    }
    return config;
  },
};
export default config;
