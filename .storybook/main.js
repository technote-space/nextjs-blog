const path = require('path');
const tsconfigPaths = require('vite-tsconfig-paths').default;
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  core: {builder: "storybook-builder-vite"},
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
  viteFinal: async (config) => {
    config.plugins.push(tsconfigPaths({root: '..'}));
    config.resolve.alias = {
      ...config.resolve.alias,
      "@emotion/core": toPath("node_modules/@emotion/react"),
      "emotion-theming": toPath("node_modules/@emotion/react"),
    };
    config.define = {
      'process.env': process.env
    };
    config.optimizeDeps.include.push(
      'reflect-metadata', 'tsyringe', 'storybook-addon-performance',
      'dayjs', '@chakra-ui/react', '@chakra-ui/theme-tools'
    );
    config.esbuild = {jsxInject: 'import React from \'react\';'};

    return config;
  },
}
