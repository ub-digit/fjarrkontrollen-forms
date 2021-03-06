import Controller from '@ember/controller';
import { inject as injectController } from '@ember/controller';
import { inject as injectService } from '@ember/service';

export default Controller.extend({
  applicationController: injectController('application'),
  auth: injectService(),

  actions: {
    back: function() {
      let step = 'home.order-type';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    },
    nextStep: function() {
      let step = 'home.customer-details';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }
});
