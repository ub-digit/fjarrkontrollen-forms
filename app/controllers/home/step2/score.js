import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  orderDetailsBinding: 'controllers.application.orderDetails',

  isFormComplete: function() {
    if (this.get('orderDetails.score.composers') && this.get('orderDetails.score.opusTitle')) {
      return true;
    }
    else {
      return false;
    }
  }.property('orderDetails.score.composers','orderDetails.score.opusTitle'),

  actions: {
		back: function() {
			this.transitionToRoute("home.step1");
		},
		nextStep: function() {
			this.transitionToRoute("home.step3");
		}
  }
});
