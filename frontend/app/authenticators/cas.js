import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'frontend/config/environment';
import { Promise } from 'rsvp';
import { resolve, reject } from 'rsvp';
import $ from 'jquery';
import { run } from '@ember/runloop';

export default Base.extend({

  restore(data) {
    return resolve(data);
    /* TODO!!! */
    /*
    return new Promise((resolve, reject) => {
      this.get('ajax').request(
          `${ENV.APP.authenticationBaseUrl}/${data.token}`
          ).then(() => {
        run(() => {
          resolve(data);
        });
      }, (error) => {
        run(null, reject, error);
      });
    });
    */
  },

  authenticate(credentials) {
    if (
        credentials.cas_ticket && credentials.cas_service ||
        credentials.username && credentials.password
    ) {
      return new Promise(function(resolve, reject) {
        $.ajax({
          type: 'POST',
          url: ENV.APP.authenticationBaseUrl,
          data: JSON.stringify(credentials),
          contentType: 'application/json'
        }).then(function(response) {
          let token = response.access_token;
          let user = response.user;
          run(() => {
            resolve({
              token: token,
              user: user
            });
          });
        }, function(xhr) {
          run(null, reject, xhr.responseJSON);
        });
      });
    }
    else {
      reject("Invalid credentials");
    }
  },
  invalidate(data) {
    //TODO: call server to remove token/session??
    return resolve();
  }
});
