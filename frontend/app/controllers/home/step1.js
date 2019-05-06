import Controller from '@ember/controller';
import { inject as injectController } from '@ember/controller';
import { inject as injectService} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: injectController('application'),
  i18n: injectService(),
  session: injectService(),
  auth: injectService(),

  isEnglish: computed('i18n.locale', function() {
    switch (this.get('i18n.locale')) {
      case 'sv':
        return false;
      default:
        return true;
    }
  }),

  isFormComplete: computed.notEmpty('applicationController.order.selectedOrderType'),

  actions: {
    nextStep: function() {
      let step = 'home.step2';
      if (this.get('auth.required')) {
        if (!this.get('session.isAuthenticated')) {
          step = 'home.login';
        }
      }
      else if (this.get('session.isAuthenticated')) {
        this.get('applicationController').invalidateSession();
      }
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }

});
