import Controller from '@ember/controller';
import PreviewController from 'frontend/mixins/preview-controller';

export default Controller.extend(PreviewController, {

  successHandler: function(response) {
    var result = {};
    result.id = response.order.order_number;
    this.transitionToRoute('sfx.step4', {queryParams: result});
  },

  errorHandler: function(error) {
    this.transitionToRoute('sfx.error');
  },

  actions: {
    back: function() {
      this.transitionToRoute("sfx.step2");
    }
  }
});
