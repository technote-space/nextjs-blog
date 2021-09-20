const {ESBuildMinifyPlugin} = require('esbuild-loader');
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

function useEsbuildMinify(config, options) {
  const {minimizer} = config.optimization;
  const terserIndex = minimizer.findIndex(
    minifier => minifier.constructor.name === 'TerserPlugin',
  );

  minimizer.splice(terserIndex, 1, new ESBuildMinifyPlugin(options));
}

function useEsbuildLoader(config, options) {
  const {rules} = config.module;
  const rule = rules.find(rule => rule.test.test('.js'));

  rule.use = {
    loader: 'esbuild-loader',
    options,
  };
}

module.exports = withBundleAnalyzer({
  webpack5: true,
  webpack: (config, {isServer, webpack}) => {
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

    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      }),
    );
    useEsbuildMinify(config);
    useEsbuildLoader(config, {
      loader: 'tsx',
      target: 'es2017',
    });

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
