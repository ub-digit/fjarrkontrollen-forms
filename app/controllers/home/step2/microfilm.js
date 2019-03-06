import Controller from '@ember/controller';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),

  isNewspaperValid: computed.notEmpty('applicationController.orderDetails.microfilm.newspaper'),

  isPeriodValid: computed.notEmpty('applicationController.orderDetails.microfilm.period'),

  isFormComplete: computed('isNewspaperValid', 'isPeriodValid', function() {
    return (this.get('isNewspaperValid') && this.get('isPeriodValid'));
  }),

  actions: {
    back: function() {
      this.transitionToRoute("home.step1");
    },
    nextStep: function() {
      this.transitionToRoute("home.step3");
    }
  }
});
