const express = require('express');
const cors_proxy = require('cors-anywhere');
const path = require('path');
const app = express();

// CORS Anywhereのサーバー作成
const proxy = cors_proxy.createServer({
    originWhitelist: [], // 全てのオリジンを許可
    requireHeader: [],    // 特定のヘッダーを要求しない
    removeHeaders: [
        'cookie',
        'cookie2',
        'x-frame-options',
        'content-security-policy',
        'x-webkit-csp'
    ]
});

// プロキシのメインロジック
app.get('/proxy/:url*', (req, res) => {
    req.url = req.url.replace('/proxy/', '/');
    proxy.emit('request', req, res);
});

// トップページ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`CORS Proxy running on port ${port}`);
});
