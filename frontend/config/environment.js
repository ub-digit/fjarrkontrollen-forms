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
    },
    torii: {
      sessionServiceName: 'session',
      providers: {
        'gub-oauth2': {
          apiKey: process.env.GUB_OAUTH2_CLIENT_ID,
          scope: 'user'
        }
      }
    }
  };

  let serviceBaseUrl = null;
  let frontendBaseUrl = null;

  if (environment === 'development') {
    ENV.APP.fjarrkontrollenServiceUrl = 'http://localhost:' + process.env.FJARRKONTROLLEN_BACKEND_SERVICE_PORT;
    serviceBaseUrl = `http://localhost:${process.env.BACKEND_SERVICE_PORT}`;
    frontendBaseUrl = `http://localhost:${process.env.FRONTEND_PORT}`;
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
    serviceBaseUrl = `https://${process.env.BACKEND_SERVICE_HOSTNAME}`;
    frontendBaseUrl = `https://${ process.env.FRONTEND_HOSTNAME}`;
  }

  if (environment !== 'test') {
    ENV.APP.registrationUrl = process.env.BIBLIOTEKSKORT_SERVICE_URL; //???
    ENV.APP.serviceUrl = `${serviceBaseUrl}/api`;
    ENV.APP.authenticationBaseUrl = `${serviceBaseUrl}/api/sessions`;
    ENV.torii.providers['gub-oauth2'].tokenExchangeUri = ENV.APP.authenticationBaseUrl;
    ENV.torii.providers['gub-oauth2'].redirectUri = `${frontendBaseUrl}/torii/redirect.html`;
    ENV.APP.gubOAuth2AuthorizeUri = process.env.GUB_OAUTH2_AUTHORIZE_ENDPOINT;
  }

  ENV.i18n = {
    defaultLocale: 'sv'
  };

  return ENV;
};
