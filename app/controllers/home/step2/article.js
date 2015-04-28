import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  pubMedId: null,

	isEnabled: Ember.computed.and('controllers.application.selectedOrdertype', 'controllers.application.selectedLocation'),
	actions: {
		back: function() {
			this.transitionToRoute("home.step1");
		}
	}


});
