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
			// Check if order type is micro film, which is always without charge
			(this.get('selectedOrderType.identifier') === 'micro-film') ||

			// Check if order type is book, which is always without charged...
			( (this.get('selectedOrderType.identifier') === 'book') &&

			// ... as long as neither of outside nordics or copies accepted are checked
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

		// Check if order type is of a kind that never will be shipped
		if (this.get('selectedOrderType.identifier') === 'book' || this.get('selectedOrderType.identifier') === 'micro-film') {
			return false;
		} else {
			return true;
		}
	}),


	resetAllData: function() {
		this.set('selectedOrderType', null);
		this.set('selectedDeliveryMethod', null);
		this.set('selectedLocation', null);
		this.set('selectedCustomerType', null);

		this.set('orderDetails.article.articleTitle', null);
		this.set('orderDetails.article.journalTitle', null);
		this.set('orderDetails.article.authors', null);
		this.set('orderDetails.article.issn', null);
		this.set('orderDetails.article.publicationYear', null);
		this.set('orderDetails.article.issue', null);
		this.set('orderDetails.article.volume', null);
		this.set('orderDetails.article.pages', null);
		this.set('orderDetails.article.notValidAfter', null);
		this.set('orderDetails.article.comment', null);

		this.set('orderDetails.book.bookTitle', null);
		this.set('orderDetails.book.authors', null);
		this.set('orderDetails.book.isbn', null);
		this.set('orderDetails.book.outsideNordics', false);
		this.set('orderDetails.book.allowCopy', false);
		this.set('orderDetails.book.notValidAfter', null);
		this.set('orderDetails.book.comment', null);

		this.set('customerDetails.name', null);
		this.set('customerDetails.emailAddress', null);
		this.set('customerDetails.phoneNumber', null);
		this.set('customerDetails.organisation', null);
		this.set('customerDetails.department', null);
		this.set('customerDetails.institution', null);
		this.set('customerDetails.libraryCardNumber', null);
		this.set('customerDetails.xAccount', null);

		this.set('deliveryDetails.company', null);
		this.set('deliveryDetails.name', null);
		this.set('deliveryDetails.address', null);
		this.set('deliveryDetails.postalCode', null);
		this.set('deliveryDetails.city', null);

		this.set('invoicingDetails.name', null);
		this.set('invoicingDetails.company', null);
		this.set('invoicingDetails.address', null);
		this.set('invoicingDetails.postalCode', null);
		this.set('invoicingDetails.city', null);
		this.set('invoicingDetails.customerId', null);

		this.controllerFor('home.step2.article').set('pubMedId', null);

		this.transitionToRoute('home.step1');
	}
});
