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
  session: injectService(),
  registrationUrl: ENV.APP.registrationUrl,
  errorMessage: null,

  actions: {
    login(username, password) {
      return this.get('session').authenticate('authenticator:librarycard', {
        username: username,
        password: password
      }).catch((error) => {
        this.set('errorMessage', true);
      });
    },

    loginOauth2() {
      return this.get('session').authenticate('authenticator:torii', 'gub')
      .catch((reason) => {
        //let message = typeof reason === 'string' ? reason : 'Unknown server error';
        this.set('errorMessage', true);
      });
    },

    back() {
      let step = 'home.order-type';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }

});
