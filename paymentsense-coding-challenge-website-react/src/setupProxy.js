const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      secure: false,
      target: 'https://localhost:5001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  );
};
