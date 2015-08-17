import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  isTitleValid: Ember.computed.notEmpty('controllers.application.orderDetails.book.bookTitle'),

  isAuthorsValid: Ember.computed.notEmpty('controllers.application.orderDetails.book.authors'),

  isFormComplete: Ember.computed('isTitleValid', 'isAuthorsValid', function() {
    return (this.get('isTitleValid') && this.get('isAuthorsValid'));
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
