const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/ttb', {
            target: 'http://www.aladin.co.kr',
            changeOrigin: true,
        }),
    );
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:3001',
            changeOrigin: true,
        }),
    );
};