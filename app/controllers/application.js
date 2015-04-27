import Ember from 'ember';

export default Ember.Controller.extend({

	resetAllData: function() {
		this.set("selectedOrdertype", null);
		this.transitionToRoute('home.step1');
	},

});
