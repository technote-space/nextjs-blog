// https://github.com/Automattic/node-canvas/issues/1779#issuecomment-895885846
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack5: true,
  reactStrictMode: true,
  trailingSlash: true,
  distDir: process.env.NODE_ENV === 'production' ? 'build' : '.next',
  webpack: (config, {isServer, webpack}) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
      net: false,
      tls: false,
      stream: false,
      timers: false,
    };
    if (!isServer) {
      config.externals.push({'./registry.server': 'var {}'});
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    );

    return config;
  },
  eslint: {
    dirs: ['src/pages', 'src/packages', 'src/components']
  }
});
