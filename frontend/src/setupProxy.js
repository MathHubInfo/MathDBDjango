// this code sets up a proxy to be included in the development server
// this includes https://localhost:8000 (the django dev server) under a given set of urls

const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyDirs = ['api', 'admin', 'assets'];
const proxyURL = 'http://127.0.0.1:8000/';

module.exports = function(app) {
    proxyDirs.forEach(function(dir) {
        app.use(
            '/' + dir, 
            createProxyMiddleware({
                target: proxyURL,
                changeOrigin: true,
            })
        );
    });
};
