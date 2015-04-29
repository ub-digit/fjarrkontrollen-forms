import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],

  isNextEnabled: function() {
    if (this.get('controllers.application.orderDetails.book.bookTitle') && this.get('controllers.application.orderDetails.book.authors')) {
      return true;
    }
    else {
      return false;
    }
  }.property('controllers.application.orderDetails.book.bookTitle', 'controllers.application.orderDetails.book.authors'),

  actions: {
		back: function() {
			this.transitionToRoute("home.step1");
		},
		nextStep: function() {
			this.transitionToRoute("home.step3");
		}
  }
});
