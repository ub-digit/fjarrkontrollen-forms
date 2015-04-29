import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return params.id;
	},
	setupController: function(controller, model) {
		controller.set("model", model);
	},
	actions: {
		savestep: function() {
		  this.transitionTo('home.step1');
		}
	}
});
