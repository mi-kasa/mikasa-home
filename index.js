const express = require('express');
const debug = require('debug')('mikasa-server');
const serveStatic = require('serve-static');
const api = require('./lib/api');
const app = express();
const mounter = require('./lib/mounter');

app.use(api);

const port = process.env.MIKASA_PORT || 3000;

// Mount installed apps
mounter.mountInstalled(app).then(() => {
  debug('Installed apps mounted')
  app.use('/', express.static('build'));
  app.listen(port, function () {
    debug(`MiKasa server running at ${port}`);
  });
});