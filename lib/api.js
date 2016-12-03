const express = require('express');
const debug = require('debug')('mikasa-api');
const packages = require('./packages');
const app = express();
const mounter = require('./mounter');

app.get('/api/v1/packages/search', (req, res) => {
  debug('Requesting a package search');
  packages.getAll().
    then((packages) => {
      res.json(packages);
    })
});

app.get('/api/v1/packages/installed', (req, res) => {
  debug('Asking for packages installed');
  packages.getInstalled().
    then(installed => {
      return res.json(installed);
    });
});

app.post('/api/v1/packages/:name', (req, res) => {
  const packageName = req.params.name;
  debug('Requesting to install package ', packageName);
  packages.install(packageName).then((package) => {
    debug('Mounting package ', packageName);
    return mounter.mountPackage(app, package);
  }).
  then(package => {
    debug('Done with installation of ', package);
    res.json(package);
  }).
  catch((e) => {
    res.status(400).send(e);
  });
});

app.delete('/api/v1/packages/:name', (req, res) => {
  const packageName = req.params.name;
  debug('Requesting to uninstall package ', packageName);
  packages.uninstall(packageName).
    then((package) => {
      debug('Unmounting ', package);
      return mounter.unMountPackage(app, package);
    }).
    then((package) => {
      res.json(packages.getInstalled());
    });
});

module.exports = app;