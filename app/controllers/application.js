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


	isBillable: Ember.computed('selectedOrderType', 'orderDetails.book.outsideNordics', 'orderDetails.book.allowCopy', function() {
		if (
			//Kollar om typen är micro-film, som alltid är gratis
			(this.get('selectedOrderType.identifier') === 'micro-film') ||

			// Kollar om typen är bok, som är gratis...
			( (this.get('selectedOrderType.identifier') === 'book') &&

			// ...under förutsättning ingen av kryssrutorna "lån utanför norden" eller "kopior accepteras" är ikryssade.
			!(
				this.get('orderDetails.book.outsideNordics') ||
				this.get('orderDetails.book.allowCopy')) )
			) {
				return false;
			} else {
				return true;
			}
		}),

		isShippable: Ember.computed('selectedOrderType', function() {

			// Kolla om ordertypen är av en sort som inte kan skickas
			if (this.get('selectedOrderType.identifier') === 'book' || this.get('selectedOrderType.identifier') === 'micro-film') {
				return false;
			} else {
				return true;
			}
		}),
		resetAllData: function() {
			this.set("selectedOrderType", null);
			this.transitionToRoute('home.step1');
		},
		actions: {

		}
});
