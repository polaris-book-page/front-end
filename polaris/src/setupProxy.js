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
            target: 'http://13.124.200.174:5000',
            changeOrigin: true,
            pathRewrite: { '^/flask': '/' },
        }),
    );
};