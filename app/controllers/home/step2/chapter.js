import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  orderDetailsBinding: 'controllers.application.orderDetails',

  isFormComplete: function() {
    if (this.get('orderDetails.chapter.chapterTitle') && this.get('orderDetails.chapter.bookTitle')) {
      return true;
    }
    else {
      return false;
    }
  }.property('orderDetails.chapter.chapterTitle','orderDetails.chapter.bookTitle'),

  actions: {
		back: function() {
			this.transitionToRoute("home.step1");
		},
		nextStep: function() {
			this.transitionToRoute("home.step3");
		}
  }

});
