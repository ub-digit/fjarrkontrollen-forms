import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  orderDetailsBinding: 'controllers.application.orderDetails',

  isNewspaperValid: Ember.computed.notEmpty('orderDetails.microfilm.newspaper'),

  isPeriodValid: Ember.computed.notEmpty('orderDetails.microfilm.period'),

  isFormComplete: Ember.computed('isNewspaperValid', 'isPeriodValid', function() {
    return (this.get('isNewspaperValid') && this.get('isPeriodValid'));
  }),

  actions: {
		back: function() {
			this.transitionToRoute("home.step1");
		},
		nextStep: function() {
			this.transitionToRoute("home.step3");
		}
  }
});
