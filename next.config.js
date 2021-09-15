module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {fs: false, path: false};

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
