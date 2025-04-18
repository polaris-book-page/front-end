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
            target: 'http://13.124.200.174:3001',
            changeOrigin: true,
        }),
    );
    app.use(
        createProxyMiddleware('/flask', {
            target: 'https://cassiopeia2023.store',
            changeOrigin: true,
            pathRewrite: { '^/flask': '/' },
        }),
    );
};