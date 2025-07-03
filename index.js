const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;
const TARGET = 'https://loki-892158326.zohocatalyst.com'; // 🔁 Change this to your target URL

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Basic proxy for all routes
app.use('/', createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  logLevel: 'debug' // logs proxy activity to console
}));

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT} -> ${TARGET}`);
});

