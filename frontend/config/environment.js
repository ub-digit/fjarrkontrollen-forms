'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'frontend',
    environment,
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
      registrationUrl: 'https://bibliotekskort.ub.gu.se',
      authenticationBaseUrl: '/api/sessions',
      serviceUrl: '/api',
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.fjarrkontrollenServiceUrl = 'http://localhost:3001';
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicyHeader = 'Disabled-Content-Security-Policy';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }
  else if (environment === 'lab') {
    ENV.APP.fjarrkontrollenServiceUrl = 'https://fjarrkontrollen-lab.ub.gu.se';
  }
  else if (environment === 'staging') {
    ENV.APP.fjarrkontrollenServiceUrl = 'https://fjarrkontrollen-staging.ub.gu.se';
  }

  else if (environment === 'production') {
    ENV.APP.fjarrkontrollenServiceUrl = 'https://fjarrkontrollen.ub.gu.se';
  }

  ENV.i18n = {
    defaultLocale: 'sv'
  };

  return ENV;
};
