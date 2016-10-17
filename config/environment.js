/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'frontend-chat',
    podModulePrefix: 'frontend-chat/pods',
    environment: environment,
    apiHost: '',
    wsHost: '',
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['apiHost'] = 'http://192.168.0.159:3000';//'http://192.168.0.103:3000';//'http://192.168.0.159:3000';//'http://localhost:3000';
    ENV['wsHost']  = 'ws://192.168.0.159:3000';//'ws://192.168.0.103:3000';//'ws://192.168.0.159:3000';//'ws://localhost:3000';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'chatroom',
    routeIfAlreadyAuthenticated: 'chatroom',
    authenticationRoute: 'login'
  }

  ENV.contentSecurityPolicy = {
    'default-src': "'self' " + ENV.apiHost,
    'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com maps.gstatic.com " + ENV.apiHost,
    'font-src': "'self'" + ENV.apiHost,
    'connect-src': "'self' maps.gstatic.com " + ENV.apiHost,
    'img-src': "'self' *.googleapis.com " + ENV.apiHost,
    'style-src': "'self' 'unsafe-inline http://fonts.googleapis.com http://platform.twitter.com " + ENV.apiHost,
  };

  return ENV;
};
