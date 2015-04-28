import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  pubMedId: null,
  	isEnabled: function() {
  		if (this.get('controllers.application.orderDetails.article.pages') && this.get('controllers.application.orderDetails.article.publicationYear')) {
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.orderDetails.article.pages','controllers.application.orderDetails.article.publicationYear'),

	actions: {
		back: function() {
			this.transitionToRoute("home.step1");
		}
	}


});
