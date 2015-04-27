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

	customerDetails: {
		name: null,
		emailAddress: null,
		phoneNumber: null,
		organisation: null,
		department: null,
		institution: null,
		libraryCardNumber: null, 
		xAccount: null
	},

	deliveryDetails: {
		company: null,
		name: null,
		address: null,
		postalCode: null,
		city: null
	},

	invoicingDetails: {
		name: null,
		company: null,
		address: null,
		postalCode: null,
		city: null,
		customerId: null,
	},


	resetAllData: function() {
		this.set("selectedOrdertype", null);
		this.transitionToRoute('home.step1');
	},

});
