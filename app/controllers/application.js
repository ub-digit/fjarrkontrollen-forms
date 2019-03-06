import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { inject as inject_service} from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default Controller.extend({
  i18n: inject_service(),
  queryParams: ['lang', 'rft_genre', 'isbn_issn', 'book_title', 'journal_title', 'title_of_article', 'year', 'volume', 'issue', 'pages', 'edition', 'author', 'is_sfx'],
  lang: null,

  orderPath: "Web",

  init() {
    this._super(...arguments);
  },

  //selectedLocation
  //selectedOrderType
  //selectedCustomerType
  //selectedDeliveryMethod

  //TODO: Globally rename
  selectedLocation: storageFor('pickup-location'),
  selectedOrderType: storageFor('order-type'),
  selectedCustomerType: storageFor('customer-type'),
  selectedDeliveryMethod: storageFor('delivery-method'),

  /** Order **/
  //order: storageFor('order'),

  /** Customer details (dependant on selectedCustomerType) **/
  customerDetails: storageFor('customer-details'), //dashized?

  /** Invoicing details (dependant on ????) **/
  invoicingDetails: storageFor('invoicing-details'),

  /** Delivery details (dependant on selectedDeliveryMethod and ...??) **/
  deliveryDetails: storageFor('delivery-details'),

  /** Per order type details **/
  orderDetailsArticle: storageFor('order-details-article'),
  orderDetailsBook: storageFor('order-details-book'),
  orderDetailsChapter: storageFor('order-details-chapter'),
  orderDetailsMicrofilm: storageFor('order-details-microfilm'),
  orderDetailsScore: storageFor('order-details-score'),

  authRequired: computed('selectedOrderType', function() {
    return this.get('selectedOrderType.auth_required');
  }),

  isBillable: computed('selectedOrderType', 'orderDetailsBook.outsideNordics', function() {
    return !(
      // Check if order type is micro film, which is always without charge
      this.get('selectedOrderType.identifier') === 'microfilm' ||

      // Check if order type is book, which is always without charge...
      (
       this.get('selectedOrderType.identifier') === 'book' &&

       // ... as long as outside nordics are not checked
       !this.get('orderDetailsBook.outsideNordics')
      )
    );
  }),

  resetOrderDetailsWhenOrderTypeChanges: observer('selectedOrderType', function() {
    this.resetOrderDetails();
  }),

  isShippable: computed('selectedOrderType', function() {
    // Check if order type is of a kind that never will be shipped
    return !(
      this.get('selectedOrderType.identifier') === 'book' ||
      this.get('selectedOrderType.identifier') === 'microfilm' ||
      this.get('selectedOrderType.identifier') === 'score'
    );
  }),

  resetOrderDetails: function() {
    this.get('orderDetailsArticle').reset();
    this.set('orderDetailsBook').reset();
    this.get('orderDetailsChapter').reset();
    this.get('orderDetailsScore').reset();
    this.get('orderDetailsMicrofilm').reset()

    this.get('pubMed').reset();
  },

  resetCustomerDetails: function() {
    this.get('customerDetails').reset();
  },

  resetDeliveryDetails: function() {
    this.get('deliveryDetails').reset();
  },

  resetInvoicingDetails: function() {
    this.get('invoicingDetails').reset();
  },

  resetAllData: function() {
    this.get('selectedOrderType').reset();
    this.get('selectedDeliveryMethod').reset();
    this.get('selectedLocation').reset();
    this.get('selectedCustomerType').reset();
    this.set('orderPath', 'Web');

    this.resetOrderDetails();
    this.resetCustomerDetails();
    this.resetDeliveryDetails();
    this.resetInvoicingDetails();

    this.transitionToRoute('home.step1');
  },

  orderAnother: function() {
    this.resetOrderDetails();
    this.transitionToRoute('home.step2');
  }
});
