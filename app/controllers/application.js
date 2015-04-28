import Ember from 'ember';

export default Ember.Controller.extend({
	orderDetails: {
		article: {
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
		book: {
			bookTitle: null,
			authors: null,
			isbn: null,
			outsideNordics: false,
			allowCopy: false,
			notValidAfter: null,
			comment: null
		}
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
		this.set("selectedOrderType", null);
		this.transitionToRoute('home.step1');
	},

});
