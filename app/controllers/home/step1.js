import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],

	isEnabled: Ember.computed.and('controllers.application.selectedOrderType', 'controllers.application.selectedLocation'),

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
			    case 'book-chapter-copy':
			    	this.transitionToRoute('home.step2.chapter');
			        break;
			    case 'scores':
			    	this.transitionToRoute('home.step2.score');
			        break;
			    case 'micro-film':
			    	//this.transitionToRoute('home.step2.article');
			        break;
			    default:
			        break;
			};	
		}
	}
	
});
