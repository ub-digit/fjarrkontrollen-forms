import Ember from 'ember';

export default Ember.Controller.extend({
	orderDetails: {
		articleTitle: null,
		journalTitle: null,
		authors: null,
		issn: null,
		publicationYear: null,
		issue: null,
		volume: null,
		pages: null,
		notValidAfter: null,
		comment: null
	},

	resetAllData: function() {
		this.set("selectedOrdertype", null);
		this.transitionToRoute('home.step1');
	},

});
