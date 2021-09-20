const path = require('path');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  "stories": [
    "../src/components/Introduction.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/components/**/*.stories.tsx",
    "../src/packages/infra/**/components/**/*.stories.tsx",
  ],
  "addons": [
    "storybook-addon-performance/register",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-links",
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [
          new TsconfigPathsPlugin({
            configFile: path.resolve(__dirname, '../tsconfig.json')
          }),
        ],
        alias: {
          ...config.resolve.alias,
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        }
      }
    }
  },
}
