import Controller from '@ember/controller'
import PreviewController from 'frontend/mixins/preview-controller';
import { storageFor } from 'ember-local-storage';

export default Controller.extend(PreviewController, {
  order: storageFor('order'),

  successHandler: function(response) {
    var result = {};
    result.id = response.order.order_number;
    let step = 'home.step5';
    this.set('order.currentStep', step);
    this.transitionToRoute(step, {queryParams: result});
  },

  errorHandler: function(error) {
    let step = 'home.error';
    this.set('order.currentStep', step);
    this.transitionToRoute(step);
  },

  actions: {
    back: function() {
      let step = 'home.customer-details';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }
});
