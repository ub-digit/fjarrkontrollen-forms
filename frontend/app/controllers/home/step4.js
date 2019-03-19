import Controller from '@ember/controller'
import PreviewController from 'frontend/mixins/preview-controller';

export default Controller.extend(PreviewController, {

  successHandler: function(response) {
    var result = {};
    result.id = response.order.order_number;
    this.transitionToRoute('home.step5', {queryParams: result});

  },

  errorHandler: function(error) {
    this.transitionToRoute('home.error');
  },

  actions: {
    back: function() {
      let step = 'home.step3';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }
});
