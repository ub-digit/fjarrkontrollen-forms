import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  pubMedId: null,
  	isEnabled: function() {
  		if (this.get('controllers.application.orderDetails.pages') && this.get('controllers.application.orderDetails.publicationYear')) {
  			return true;
  		}
  		else {
  			return false;
  		}
  	}.property('controllers.application.orderDetails.pages','controllers.application.orderDetails.publicationYear'),

	actions: {
		back: function() {
			this.transitionToRoute("home.step1");
		}
	}


});
