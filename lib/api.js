const express = require('express');
const debug = require('debug')('mikasa-api');
const packages = require('./packages');
const app = express();

app.get('/api/v1/packages/search', (req, res) => {
  debug('Requesting a package search');
  return res.json(packages.getAll());
});

app.get('/api/v1/packages/installed', (req, res) => {
  debug('Asking for packages installed');
  return res.json(packages.getInstalled());
});

app.post('/api/v1/packages/:name', (req, res) => {
  const packageName = req.params.name;
  debug('Requesting to install package ', packageName);
  packages.markInstalled(packageName);
  res.json(packages.getInstalled());
});

app.delete('/api/v1/packages/:name', (req, res) => {
  const packageName = req.params.name;
  debug('Requesting to uninstall package ', packageName);
  packages.markUnInstalled(packageName);
  res.json(packages.getInstalled());
});

module.exports = app;