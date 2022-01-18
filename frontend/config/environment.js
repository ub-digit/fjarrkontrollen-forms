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
      authenticationBaseUrl: '/api/sessions',
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.APP.casBaseUrl = process.env.FORMS_CAS_URL ? process.env.FORMS_CAS_URL : 'https://idp3.it.gu.se/idp/profile/cas';

  if (environment === 'development') {
    ENV.APP.fjarrkontrollenServiceUrl = 'http://localhost:' + process.env.FJARRKONTROLLEN_BACKEND_SERVICE_PORT;
    ENV.APP.serviceUrl = 'http://localhost:' + process.env.BACKEND_SERVICE_PORT + '/api';
    ENV.APP.authenticationBaseUrl = 'http://localhost:' + process.env.BACKEND_SERVICE_PORT + '/api/sessions';
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
    ENV.APP.fjarrkontrollenServiceUrl = 'https://' + process.env.FJARRKONTROLLEN_BACKEND_SERVICE_HOSTNAME;
    ENV.APP.serviceUrl = 'https://' + process.env.BACKEND_SERVICE_HOSTNAME + '/api';
    ENV.APP.authenticationBaseUrl = 'https://' + process.env.BACKEND_SERVICE_HOSTNAME + '/api/sessions';
    ENV.APP.registrationUrl = process.env.BIBLIOTEKSKORT_SERVICE_URL; //???
  }

  ENV.i18n = {
    defaultLocale: 'sv'
  };

  return ENV;
};
