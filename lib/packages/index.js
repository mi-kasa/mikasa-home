const debug = require('debug')('mikasa-packages');
const fs = require('fs');
const path = require('path');

// Cheap db
function persistInstalled(packages) {
  debug('Persisting installed packages ', packages);
  const fd = fs.openSync(path.join(__dirname, 'installed.json'), 'w')
  fs.writeSync(fd, JSON.stringify(packages));
}

module.exports = {
  getAll: () => {
    debug('Returning all packages ', model.packages);
    return model.packages
  },
  getInstalled: () => {
    const installed = require('./installed.json') || [];
    const installedPkg = model.packages.filter(package => {
      return installed.indexOf(package.name) > -1;
    });
    debug('Getting installed packages ', installedPkg);
    return installedPkg;
  },
  markInstalled: (name) => {
    debug('Mark ' + name + ' as installed');
    const exists = model.packages.find(package => package.name === name);
    if (!exists) {
      debug(name + ' not found in the list of packages');
      return;
    }
    var installed = require('./installed.json') || [];
    if (installed.indexOf(name) !== -1) {
      debug(name + ' already installed');
      return;
    }
    installed.push(name);
    persistInstalled(installed);
  },
  markUnInstalled: (name) => {
    debug('Mark ' + name + ' as uninstalled');
    var installed = require('./installed.json') || [];
    const index = installed.indexOf(name);
    if (index === -1) {
      debug(name + ' not installed');
      return;
    }
    installed = installed.splice(index, 1);
    persistInstalled(installed);
  }
}

const model = {
  packages: [
    {
      name: 'mediasync',
      description: 'Synchronize the media files in your android phone with your mikasa server.',
      package: '/Users/arcturus/dev/android/MediaSync/server/'
    },
    {
      name: 'gallery',
      description: 'Browse the images installed in mikasa server. Use with Media Sync for browse your backup medias.',
      package: '/Users/arcturus/dev/tests/mikasa-gallery'
    },
  ]
};