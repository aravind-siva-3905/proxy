const express = require('express');
const cors = require('cors'); // You'll need to add this to package.json
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3001;
const TARGET = 'https://loki-892158326.zohocatalyst.com';

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/.well-known/oauth-authorization-server', (req, res) => {
  // Return Zapier's exact response structure
  res.json({
    "issuer": `https://${req.get('host')}`,
    "authorization_endpoint": `https://${req.get('host')}/authorize`,
    "token_endpoint": `https://${req.get('host')}/token`,
    "scopes_supported": ["profile", "email"],
    "response_types_supported": ["code"],
    "grant_types_supported": ["authorization_code", "refresh_token"],
    "token_endpoint_auth_methods_supported": ["none", "client_secret_post"],
    "code_challenge_methods_supported": ["S256"],
    "registration_endpoint": `https://${req.get('host')}/register`,
    "pkce_required": false,
    "mcp_protocol_version": "2024-11-05",
    "service_documentation": `https://${req.get('host')}/docs`,
    "cors_supported": true
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server with CORS running at http://localhost:${PORT} -> ${TARGET}`);
});
