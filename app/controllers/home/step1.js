import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],


	optionLabelPath: Ember.computed('lang', function() {
		switch (this.get('lang')) {
			case 'sv':
				return 'content.title_sv';
			default:
				return 'content.title_en';				
		}

	}),

	isFormComplete: Ember.computed.and('controllers.application.selectedOrderType', 'controllers.application.selectedLocation'),

	actions: {
		nextStep: function() {
			this.transitionToRoute('home.step2');
		}
	}

});
