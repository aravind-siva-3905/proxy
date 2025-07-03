const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 3001;
const TARGET = 'https://loki-892158326.zohocatalyst.com';

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Handle CORS preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, mcp-protocol-version');
  res.header('Access-Control-Max-Age', '86400');
  res.sendStatus(200);
});

// Proxy with CORS headers
app.use('/', createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyRes: (proxyRes, req, res) => {
    // Add CORS headers to all responses
    proxyRes.headers['access-control-allow-origin'] = '*';
    proxyRes.headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
    proxyRes.headers['access-control-allow-headers'] = 'Content-Type, Authorization, mcp-protocol-version';
    proxyRes.headers['access-control-max-age'] = '86400';
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server with CORS running at http://localhost:${PORT} -> ${TARGET}`);
});
