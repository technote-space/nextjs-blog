const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack5: true,
  webpack: (config, {isServer}) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
      net: false,
      tls: false,
      stream: false,
      timers: false
    };
    if (!isServer) {
      config.externals.push(
        'mysql',
        {'serverless-mysql': 'var {}'},
        {'html-to-text': 'var {}'},
        {'gray-matter': 'var {}'},
        {'remark': 'var {}'},
        {'remark-html': 'var {}'},
        {'remove-markdown': 'var {}'},
      );
    }

    return config;
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
  eslint: {
    dirs: ['src/pages', 'src/packages', 'src/components']
  }
});
