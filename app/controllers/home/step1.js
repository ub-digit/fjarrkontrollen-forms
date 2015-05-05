import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],

	isFormComplete: Ember.computed.and('controllers.application.selectedOrderType', 'controllers.application.selectedLocation'),

	actions: {
		nextStep: function() {
			// based on values in selectedOrderType
			var orderType = this.get("controllers.application.selectedOrderType");
			switch(orderType.identifier) {
			    case 'article':
			        this.transitionToRoute('home.step2.article');
			        break;
			    case 'book':
			    	this.transitionToRoute('home.step2.book');
			        break;
			    case 'chapter':
			    	this.transitionToRoute('home.step2.chapter');
			        break;
			    case 'score':
			    	this.transitionToRoute('home.step2.score');
			        break;
			    case 'microfilm':
			    	this.transitionToRoute('home.step2.microfilm');
			        break;
			    default:
			        break;
			};
		}
	}

});
