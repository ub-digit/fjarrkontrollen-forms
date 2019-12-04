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
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.i18n = {
    defaultLocale: 'sv'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.serviceUrl = 'http://localhost:' + process.env.FJARRKONTROLLEN_FORMS_SERVICE_PORT + '/api';
    ENV.APP.authenticationBaseUrl =  ENV.APP.serviceUrl + '/sessions';
    ENV.APP.fjarrkontrollenServiceUrl = 'http://localhost:' + process.env.FJARRKONTROLLEN_SERVICE_PORT;
    ENV.APP.registrationUrl = 'https://bibliotekskort-lab.ub.gu.se';
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicyHeader = 'Disabled-Content-Security-Policy';
  }
  else if (environment === 'lab') {
    ENV.APP.serviceUrl = 'https://fjarrkontrollen-forms-server-lab.ub.gu.se/api';
    ENV.APP.authenticationBaseUrl = ENV.APP.serviceUrl + '/sessions';
    ENV.APP.fjarrkontrollenServiceUrl = 'https://fjarrkontrollen-server-lab.ub.gu.se';
    ENV.APP.registrationUrl = 'https://bibliotekskort-lab.ub.gu.se';
  }
  else if (environment === 'staging') {
    ENV.APP.serviceUrl = 'https://fjarrkontrollen-forms-server-staging.ub.gu.se/api';
    ENV.APP.authenticationBaseUrl = ENV.APP.serviceUrl + '/sessions';
    ENV.APP.fjarrkontrollenServiceUrl = 'https://fjarrkontrollen-server-staging.ub.gu.se';
    ENV.APP.registrationUrl = 'https://bibliotekskort-staging.ub.gu.se';
  }
  else if (environment === 'production') {
    ENV.APP.serviceUrl = 'https://fjarrkontrollen-forms-server.ub.gu.se/api';
    ENV.APP.authenticationBaseUrl = ENV.APP.serviceUrl + '/sessions';
    ENV.APP.fjarrkontrollenServiceUrl = 'https://fjarrkontrollen-server.ub.gu.se';
    ENV.APP.registrationUrl = 'https://bibliotekskort.ub.gu.se';
  }

  return ENV;
};
