import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ENV from 'frontend/config/environment';
import { inject as injectController } from '@ember/controller';
import { inject as injectService} from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
  applicationController: injectController('application'),
  i18n: injectService(),
  router: injectService(),

  queryParams: ['ticket'],

  registrationUrl: ENV.APP.registrationUrl,

  showCasLogin: true,

  serviceUrl: computed(function() {
    //Strip prepended slash for router path to be sure?
    return window.location.origin.replace(/\/$/, '') + this.get('router').urlFor('home.login');
  }),

  casUrl: computed(function() {
    return ENV.APP.casBaseUrl + '/login?' + $.param({ service: this.get('serviceUrl') });
  }),

  actions: {
    login(username, password) {
      return this.get('session').authenticate('authenticator:cas', {
        username: username,
        password: password
      }).catch((error) => {
        //TODO: set errors
        if(typeof error === 'string') {
          //changeset.pushErrors('password', error);
        }
        else {
          //changeset.pushErrors('password', "Någonting gick fel, det går eventuellt för närvarande inte att logga in");
          //console.dir(error);
        }
      });
    },
    back() {
      let step = 'home.step1';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }

});
