import Ember from 'ember';

export default Ember.Controller.extend({

	pubMedId: null,

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
			comment: null,
		},
		book: {
			bookTitle: null,
			authors: null,
			isbn: null,
			publicationYear: null,
			outsideNordics: false,
			allowCopy: false,
			notValidAfter: null,
			comment: null
		},
		chapter: {
			chapterTitle: null,
			bookTitle: null,
			authors: null,
			isbn: null,
			publicationYear: null,
			pages: null,
			notValidAfter: null,
			comment: null
		},
		score: {
			composers: null,
			opusTitle: null,
			publicationType: null,
			notValidAfter: null,
			comment: null
		},
		microfilm: {
			newspaper: null,
			period: null,
			startyear: null,
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
		unit: null,
		address: null,
		postalCode: null,
		city: null,
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
		customerId: null
	},


	isBillable: Ember.computed('selectedOrderType', 'orderDetails.book.outsideNordics', 'orderDetails.book.allowCopy', function() {
		if (
			// Check if order type is micro film, which is always without charge
			(this.get('selectedOrderType.identifier') === 'microfilm') ||

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


	resetOrderDetailsWhenOrderTypeChanges: Ember.observer('selectedOrderType', function() {

		this.resetOrderDetails();

	}),


	isShippable: Ember.computed('selectedOrderType', function() {

		// Check if order type is of a kind that never will be shipped
		if (this.get('selectedOrderType.identifier') === 'book' || this.get('selectedOrderType.identifier') === 'microfilm') {
			return false;
		} else {
			return true;
		}
	}),

	resetOrderDetails: function() {

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
		this.set('orderDetails.book.publicationYear', null);
		this.set('orderDetails.book.outsideNordics', false);
		this.set('orderDetails.book.allowCopy', false);
		this.set('orderDetails.book.notValidAfter', null);
		this.set('orderDetails.book.comment', null);


		this.set('orderDetails.chapter.chapterTitle', null);
		this.set('orderDetails.chapter.bookTitle', null);
		this.set('orderDetails.chapter.authors', null);
		this.set('orderDetails.chapter.isbn', null);
		this.set('orderDetails.chapter.publicationYear', null);
		this.set('orderDetails.chapter.pages', null);
		this.set('orderDetails.chapter.notValidAfter', null);
		this.set('orderDetails.chapter.comment', null);

		this.set('orderDetails.score.composers', null);
		this.set('orderDetails.score.opusTitle', null);
		this.set('orderDetails.score.publicationType', null);
		this.set('orderDetails.score.notValidAfter', null);
		this.set('orderDetails.score.comment', null);

		this.set('orderDetails.microfilm.newspaper', null);
		this.set('orderDetails.microfilm.period', null);
		this.set('orderDetails.microfilm.startyear', null);
		this.set('orderDetails.microfilm.notValidAfter', null);
		this.set('orderDetails.microfilm.comment', null);

		this.set('pubMedId', null);

	},

	resetCustomerDetails: function() {

		this.set('customerDetails.name', null);
		this.set('customerDetails.emailAddress', null);
		this.set('customerDetails.phoneNumber', null);
		this.set('customerDetails.organisation', null);
		this.set('customerDetails.department', null);
		this.set('customerDetails.unit', null);
		this.set('customerDetails.libraryCardNumber', null);
		this.set('customerDetails.xAccount', null);

	},

	resetDeliverDetails: function() {

		this.set('deliveryDetails.company', null);
		this.set('deliveryDetails.name', null);
		this.set('deliveryDetails.address', null);
		this.set('deliveryDetails.postalCode', null);
		this.set('deliveryDetails.city', null);

	},

	resetInvoicingDetails: function() {

		this.set('invoicingDetails.name', null);
		this.set('invoicingDetails.company', null);
		this.set('invoicingDetails.address', null);
		this.set('invoicingDetails.postalCode', null);
		this.set('invoicingDetails.city', null);
		this.set('invoicingDetails.customerId', null);

	},


	resetAllData: function() {
		this.set('selectedOrderType', null);
		this.set('selectedDeliveryMethod', null);
		this.set('selectedLocation', null);
		this.set('selectedCustomerType', null);

		this.resetOrderDetails();
		this.resetCustomerDetails();
		this.resetDeliverDetails();
		this.resetInvoicingDetails();

		this.transitionToRoute('home.step1');
	}
});
