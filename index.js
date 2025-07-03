const express = require('express');
const cors = require('cors'); // You'll need to add this to package.json
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;
const TARGET = 'https://loki-892158326.zohocatalyst.com';

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'mcp-protocol-version'],
  credentials: true
}));

// Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Proxy
app.use('/', createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  logLevel: 'debug'
}));

app.listen(PORT, () => {
  console.log(`Proxy server with CORS running at http://localhost:${PORT} -> ${TARGET}`);
});
