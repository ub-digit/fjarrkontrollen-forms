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

  actions: {
    login(username, password) {
      this.set('oauth2ErrorMessage', false);
      this.set('loginErrorMessage', false);
      return this.get('session').authenticate('authenticator:librarycard', {
        username: username,
        password: password
      }).catch((error) => {
        this.set('loginErrorMessage', true);
      });
    },

    loginOauth2() {
      this.set('oauth2ErrorMessage', false);
      this.set('loginErrorMessage', false);
      return this.get('session').authenticate('authenticator:torii', 'gub-oauth2')
      .catch((reason) => {
        this.set('oauth2ErrorMessage', true);
      });
    },

    back() {
      let step = 'home.order-type';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  },
  passwordForgotLink: Ember.computed('i18n.locale', function() {
    var lang = this.get('i18n.locale');
    return (lang === 'en') ? ENV.passwordForgotLinkEn : ENV.passwordForgotLinkSv;
  })
});
