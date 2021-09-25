module.exports = {
  presets: ['next/babel'],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', {
      legacy: true,
    }],
    [
      "prismjs",
      {
        "languages": [
          "javascript",
          "css",
          "bash",
          "diff",
          "docker",
          "json",
          "markdown",
          "php",
          "python",
          "jsx",
          "tsx",
          "sql",
          "typescript",
          "yaml"
        ],
        "plugins": [],
        "theme": "tomorrow",
        "css": true
      }
    ]
  ],
};
