const express = require('express');
const debug = require('debug')('mikasa-server');
const serveStatic = require('serve-static');
const api = require('./lib/api');
const app = express();

app.use('/', express.static('build'));
app.use(api);

const port = process.env.MIKASA_PORT || 3000;

app.listen(port, function () {
  debug(`MiKasa server running at ${port}`);
});