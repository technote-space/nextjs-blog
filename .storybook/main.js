module.exports = {
  "stories": [
    "../src/components/Introduction.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/components/*.stories.tsx",
    "../src/packages/infra/**/components/*.stories.tsx",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
}
