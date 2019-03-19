import Controller from '@ember/controller';
import { inject as injectController } from '@ember/controller';

export default Controller.extend({
  applicationController: injectController('application'),

  actions: {
    back: function() {
      this.transitionToRoute("home.step1");
    },
    nextStep: function() {
      var step;
      if (this.get('applicationController.authRequired')) {
        step = 'home.step3';
        // Values are populated in summary (or default computed)??
      }
      else {
        step = 'home.step3';
      }
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }
});
