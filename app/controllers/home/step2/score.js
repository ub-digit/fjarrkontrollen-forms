import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  orderDetailsBinding: 'controllers.application.orderDetails',

  isComposersValid: Ember.computed.notEmpty('orderDetails.score.composers'),

  isOpusTitleValid: Ember.computed.notEmpty('orderDetails.score.opusTitle'),


  isFormComplete: Ember.computed('isComposersValid', 'isOpusTitleValid', function() {
    return (this.get('isComposersValid') && this.get('isOpusTitleValid'));
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
