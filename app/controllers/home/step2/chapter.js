import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  orderDetailsBinding: 'controllers.application.orderDetails',

  isChapterTitleValid: Ember.computed.notEmpty('orderDetails.chapter.chapterTitle'),

  isBookTitleValid: Ember.computed.notEmpty('orderDetails.chapter.bookTitle'),

  isFormComplete: Ember.computed('orderDetails.chapter.chapterTitle', 'orderDetails.chapter.bookTitle', function() {
    return (this.get('isChapterTitleValid') && this.get('isBookTitleValid'));
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
