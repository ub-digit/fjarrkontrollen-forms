import Controller from '@ember/controller';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),

  isTitleValid: computed.notEmpty('applicationController.orderDetailsBook.bookTitle'),

  isAuthorsValid: computed.notEmpty('applicationController.orderDetailsBook.authors'),

  isFormComplete: computed.and('isTitleValid', 'isAuthorsValid'),

  actions: {
    back: function() {
      this.transitionToRoute("home.step1");
    },
    nextStep: function() {
      let step = "home.step3";
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }
});
