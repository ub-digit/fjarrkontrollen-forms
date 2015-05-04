import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  orderDetailsBinding: 'controllers.application.orderDetails',

  isFormComplete: function() {
    if (this.get('orderDetails.microfilm.newspaper') && this.get('orderDetails.microfilm.period')) {
      return true;
    }
    else {
      return false;
    }
  }.property('orderDetails.microfilm.newspaper','orderDetails.microfilm.period'),

  actions: {
		back: function() {
			this.transitionToRoute("home.step1");
		},
		nextStep: function() {
			this.transitionToRoute("home.step3");
		}
  }
});
