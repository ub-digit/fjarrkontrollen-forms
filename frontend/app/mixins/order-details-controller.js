import Controller from '@ember/controller';
import { inject as injectController } from '@ember/controller';
import { inject as injectService } from '@ember/service';

export default Controller.extend({
  applicationController: injectController('application'),
  auth: injectService(),

  actions: {
    back: function() {
      this.transitionToRoute("home.step1");
    },
    nextStep: function() {
      var step;
      if (this.get('auth.required')) {
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
