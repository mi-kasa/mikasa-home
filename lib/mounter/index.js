const express = require('express');
const packages = require('../packages');
const debug = require('debug')('mikasa-mounter');

function getRouteForPackage(package) {
  var route = package.name;
  if (route.indexOf('mikasa-') === 0) {
    route = route.replace('mikasa-', '');
  }
  return '/' + route;
}

const MiddlewareMounter = {
  mountInstalled: (expressApp) => {
    debug('Mounting installed packages');
    return packages.getInstalled().
      then(installed => {
        var mounting = [];
        installed.forEach(package => {
          mounting.push(MiddlewareMounter.mountPackage(expressApp, package.package));
        });

        return Promise.all(mounting);
      });
  },
  mountPackage: (expressApp, package) => {
    return new Promise((resolve, reject) => {
      const route = getRouteForPackage(package);
      debug('Requiring package', package.name);
      const pkg = require(package.name);
      debug('Mounting', route, pkg);
      expressApp.use(route, pkg);
      resolve(package);
    });
  },
  unMountPackage: (expressApp, package) => {
    const route = getRouteForPackage(package);
    return Promise.resolve(package);
  }
};

module.exports = MiddlewareMounter;