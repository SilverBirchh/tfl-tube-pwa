/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "tfl-tube-pwa",
    short_name: "tfl-tube-pwa",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}
