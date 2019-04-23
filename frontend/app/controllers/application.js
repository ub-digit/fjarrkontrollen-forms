import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { inject as injectService} from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { A } from '@ember/array';

export default Controller.extend({
  i18n: injectService(),
  queryParams: [
    'lang',
    'rft_genre',
    'isbn_issn',
    'book_title',
    'journal_title',
    'title_of_article',
    'year',
    'volume',
    'issue',
    'pages',
    'edition',
    'author',
    'is_sfx'
  ],

  lang: null,
  session: injectService(),

  /** Order **/
  order: storageFor('order'),

  //FIXME: @each?
  selectedLocation: computed('order.selectedLocation', 'locations', function() {
    return this.get('locations').findBy('label', this.get('order.selectedLocation'));
  }),
  selectedOrderType: computed('order.selectedOrderType', 'orderTypes', function() {
    return this.get('orderTypes').findBy('label', this.get('order.selectedOrderType'));
  }),
  selectedCustomerType: computed('order.selectedCustomerType', 'customerTypes', function() {
    return this.get('customerTypes').findBy('label', this.get('order.selectedCustomerType'));
  }),
  selectedDeliveryMethod: computed('order.selectedDeliveryMethod', 'deliveryMethods', function() {
    return this.get('deliveryMethods').findBy('label', this.get('order.selectedDeliveryMethod'));
  }),

  selectableCustomerTypes: computed('customerTypes', function() {
    return this.get('customerTypes').filter((customerType) => {
      return customerType.label !== 'koha' && customerType.label !== 'unknown';
    });
  }),

  selectedLocationName: computed('selectedLocation,i18n.locale', function() {
    return this.get('selectedLocation.name_' + this.get('i18n.locale'));
  }),

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

  isBillable: computed('selectedOrderType', 'orderDetailsBook.outsideNordics', function() {
    return (
      // Check if order type is micro film, which is always without charge
      this.get('selectedOrderType.label') !== 'microfilm' &&
      // Check if order type is book, which is always without charge...
      (
        this.get('selectedOrderType.label') !== 'loan' ||
        // ... as long as outside nordics are not checked
        this.get('orderDetailsBook.outsideNordics')
      )
    );
  }),

  resetOrderDetailsWhenOrderTypeChanges: observer('selectedOrderType', function() {
    this.resetOrderDetails();
  }),

  isShippable: computed('order.selectedOrderType', function() {
    // Check if order type is of a kind that never will be shipped
    return !(
      this.get('order.selectedOrderType') === 'loan' ||
      this.get('order.selectedOrderType') === 'microfilm' ||
      this.get('order.selectedOrderType') === 'score'
    );
  }),

  resetOrderDetails: function() {
    this.get('orderDetailsArticle').reset();
    this.get('orderDetailsBook').reset();
    this.get('orderDetailsChapter').reset();
    this.get('orderDetailsScore').reset();
    this.get('orderDetailsMicrofilm').reset()
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
    this.get('order').reset();
    this.resetOrderDetails();
    this.resetCustomerDetails();
    this.resetDeliveryDetails();
    this.resetInvoicingDetails();
    this.setDataFromSession();
  },

  setDataFromSession() {
    if (this.get('session.isAuthenticated')) {
      this.set('order.selectedCustomerType', 'koha');
      let user = this.get('session.data.authenticated.user');

      this.set('customerDetails.name', user['first_name'] + ' ' + user['last_name']); //computed prop on storage?
      this.set('customerDetails.emailAddress', user['email']);
      //this.set('customerDetails.organisation', user.get('')); //attribute in Koha for this?
      //this.set('customerDetails.department', user.get('')); //attribute in Koha for this?
      //this.set('customerDetails.unit', user.get('')); //attribute in Koha for this?
      this.set('customerDetails.address', user['address']);
      this.set('customerDetails.postalCode', user['zipcode']);
      this.set('customerDetails.city', user['city']);
      this.set('customerDetails.libraryCardNumber', user['cardnumber']);
      this.set('customerDetails.xAccount', user['xaccount']);
    }
  },

  orderNew() {
    this.resetAllData();
    //order.step is reset, so no need to set this
    this.transitionToRoute('home.step1');
  },

  orderAnother() {
    this.resetOrderDetails();
    //TODO: Controller base class with method for this?
    let step = 'home.step2';
    this.set('order.currentStep', step);
    this.transitionToRoute(step);
  },

  invalidateSession() {
    this.get('session').invalidate();
    this.set('order.selectedCustomerType', null);
  }
});
