'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'frontend',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    'ember-local-storage': {
      namespace: true
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      casBaseUrl: 'https://idp3.it.gu.se/idp/profile/cas',
      authenticationBaseUrl: '/api/sessions',
      serviceUrl: '/api',
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.APP.fjarrkontrollenServiceUrl = 'http://localhost:' + process.env.BACKEND_SERVICE_PORT;
    ENV.APP.registrationUrl = process.env.BIBLIOTEKSKORT_SERVICE_URL; //???
    ENV.contentSecurityPolicyHeader = 'Disabled-Content-Security-Policy';
  }
  else if(environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }
  else {
    ENV.APP.fjarrkontrollenServiceUrl = 'https://' + process.env.BACKEND_SERVICE_HOSTNAME;
    ENV.APP.registrationUrl = process.env.BIBLIOTEKSKORT_SERVICE_URL; //???
  }

  ENV.i18n = {
    defaultLocale: 'sv'
  };

  return ENV;
};
