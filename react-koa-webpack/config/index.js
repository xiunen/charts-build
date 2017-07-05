const config = {
  port: 8080,
  distPath: 'dist',
  sourcePath: 'src',
  viewPath: './server/views',
  assetsMap: 'dist/assets.json',
  storeName: 'preloadedState',
  ssr: true,
  apiHost: 'http://api.example.com'
}

module.exports = config;
