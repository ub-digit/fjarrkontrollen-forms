import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],

	isDisabled: Ember.computed.and('controllers.application.selectedOrderType', 'controllers.application.selectedLocation')
	
});
