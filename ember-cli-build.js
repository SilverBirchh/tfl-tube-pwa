'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    'esw-cache-fallback': {
      patterns: [
        '/',
        'https://api.tfl.gov.uk/line/mode/(.+)',
      ],
      version: '1.1'
    },

    'ember-service-worker': {
      registrationStrategy: 'inline'
    },

    'asset-cache': {
      include: [
        'assets/**/*',
        '**/fonts/fontawesome-webfont.ttf?v=4.7.0',
        '**/fonts/fontawesome-webfont.woff?v=4.7.0',
        '**/fonts/fontawesome-webfont.woff2?v=4.7.0',
        '/manifest.webmanifest',
        '/sw.js'
      ],

      manual: [
        'http://localhost:5200/fonts/fontawesome-webfont.ttf?v=4.7.0',
        'http://localhost:4200/fonts/fontawesome-webfont.ttf?v=4.7.0',
        'http://localhost:4200/manifest.webmanifest'
      ],
      lenientErrors: false
    },

    'ember-font-awesome': {
      useScss: true, // for ember-cli-sass
    },

  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
