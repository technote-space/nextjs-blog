module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {fs: false, path: false, crypto: false, net: false, tls: false, stream: false, timers: false};

    return config;
  },
  images: {
    loader: 'akamai',
    path: '/',
  },
  eslint: {
    dirs: ['src/pages', 'src/packages', 'src/components']
  }
}
