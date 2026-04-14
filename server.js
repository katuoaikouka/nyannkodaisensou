const express = require('express');
const Unblocker = require('unblocker');
const path = require('path');
const app = express();

// Unblockerの設定
// prefix: '/proxy/' 以降のパスをプロキシとして処理します
const unblocker = new Unblocker({
    prefix: '/proxy/'
});

// ミドルウェアの登録
app.use(unblocker);

// ルートアクセス時に説明を表示（または後述のindex.htmlを表示）
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Renderなどのホスティング環境ではプロセスが提供するPORTを使用する
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
    console.log(`URL format: http://localhost:${port}/proxy/https://www.google.com`);
});

// WebSocket (upgrade) リクエストに対応（必要なサイト用）
server.on('upgrade', unblocker.onUpgrade);
