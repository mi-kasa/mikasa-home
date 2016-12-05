const express = require('express');
const debug = require('debug')('mikasa-server');
const serveStatic = require('serve-static');
const api = require('./lib/api');
const app = express();
const mounter = require('./lib/mounter');
const package = require('./package.json');
const MozUnPnP = require('mozunpnp');

app.use(api);

const port = process.env.MIKASA_PORT || 3000;

// Mount installed apps
mounter.mountInstalled(app).then(() => {
  debug('Installed apps mounted')

  const mozunpnp = new MozUnPnP();
  mozunpnp.register('mi-kasa-server', {
    version: package.version
  });

  app.use('/', express.static('build'));
  app.listen(port, function () {
    debug(`MiKasa server running at ${port}`);
  });
});