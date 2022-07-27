const {createProxyMiddleware}= require('http-proxy-middleware');
 
module.exports = function(app) {
  app.use(createProxyMiddleware('/auth/**', { target: 'http://[::1]:5500/' }))
  app.use(createProxyMiddleware('/api/**', { target: 'http://[::1]:5500/' }))
};