const debug = require('debug')('mikasa-sources');

module.exports = {
  getAll: () => {
    debug('Returning all packages ', model.packages);
    return Promise.resolve(model.packages);
  }
}

const model = {
  packages: [
    {
      name: 'mediaupload',
      description: 'Synchronize the media files in your android phone with your mikasa server.',
      package: '/Users/arcturus/dev/android/MediaSync/server/'
    },
    {
      name: 'mikasa-gallery',
      description: 'Browse the images installed in mikasa server. Use with Media Sync for browse your backup medias.',
      package: '/Users/arcturus/dev/tests/mikasa-gallery'
    },
  ]
};