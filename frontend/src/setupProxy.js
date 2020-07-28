const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/portal/api',
        createProxyMiddleware({
            target: process.env.PROXY_SET !== "staged" ? 'http://localhost/kncs-website/backend/' : "http://kncs.in/",
            changeOrigin: true,
        })
    );
};