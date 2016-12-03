const sources = require('./sources');
const debug = require('debug')('mikasa-packages');
const fs = require('fs');
const path = require('path');
const npm = require('npm');

// Cheap db
function persistInstalled(packages) {
  debug('Persisting installed packages ', packages);
  const fd = fs.openSync(path.join(__dirname, 'installed.json'), 'w')
  fs.writeSync(fd, JSON.stringify(packages));
}

function readInstalled() {
  return require(path.join(__dirname, 'installed.json')) || []
}

const PackageManager = {
  getAll: () => {
    return sources.getAll();
  },
  getInstalled: () => {
    const installed = readInstalled();
    debug('Getting installed packages ', installed);
    return Promise.resolve(installed);
  },
  install: (name) => {
    debug('Installing ', name);
    return new Promise((resolve, reject) => {
      const installed = readInstalled();
      const alreadyInstalled = installed.find(package => package.package.name === name);
      if (alreadyInstalled) {
        return reject(name + ' already installed');
      }

      return sources.getAll().
        then((allPackages) => {
          const exists = allPackages.find(package => package.name === name);
          if (!exists) {
            debug('Package ' + name + ' doesnt exists');
            return reject(name + ' doesnt exists');
          }

          return exists;
        }).
        then((package) => {
          debug('Performing install of ', package);
          return new Promise((res) => {
            npm.load({}, (err) => {
              if (err) {
                return reject(err);
              }
              npm.commands.install([package.package], (err, data) => {
                if (err) {
                  debug('Error installing ' + package + ' : ', err);
                  return reject(err);
                }
                return res(package);
              });
            });
          });
        }).
        then((package) => {
          debug('Persisting ', package);
          var installed = require('./installed.json') || [];
          installed.push({
            package
          });
          persistInstalled(installed);
          resolve(package);
        });
    });
  },
  uninstall: (packageName) => {
    debug('Uninstalling ', packageName);
    var installed = readInstalled();
    const package = installed.find(pkg => pkg.name == packageName);
    const index = installed.indexOf(package);
    if (index === -1) {
      debug(packageName + ' not installed');
      return Promise.resolve(null);
    }
    installed = installed.splice(index, 1);
    persistInstalled(installed);
    return Promise.resolve(package);
  }
};

module.exports = PackageManager;