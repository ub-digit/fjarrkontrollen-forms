import Controller from '@ember/controller';
import PreviewController from 'frontend/mixins/preview-controller';
import { storageFor } from 'ember-local-storage';

export default Controller.extend(PreviewController, {
  order: storageFor('order'),

  successHandler: function(response) {
    var result = {};
    result.id = response.order.order_number;
    let step = 'sfx.step4';
    this.set('order.currentStep', step);
    this.transitionToRoute(step, {queryParams: result});
  },

  errorHandler: function(error) {
    let step = 'sfx.error';
    this.set('order.currentStep', step);
    this.transitionToRoute(step);
  },

  actions: {
    back: function() {
      let step = 'sfx.step2';
      this.set('order.currentStep', step);
      this.transitionToRoute('sfx.step2');
    }
  }
});
