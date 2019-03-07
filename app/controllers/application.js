import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { inject as inject_service} from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { A } from '@ember/array';

export default Controller.extend({
  i18n: inject_service(),
  queryParams: ['lang', 'rft_genre', 'isbn_issn', 'book_title', 'journal_title', 'title_of_article', 'year', 'volume', 'issue', 'pages', 'edition', 'author', 'is_sfx'],
  lang: null,

  orderPath: "Web",

  init() {
    this._super(...arguments);

    var locations = A([]);
    locations.pushObject({
      id: 1,
      identifier: 'G',
      title_sv: 'Humanistiska biblioteket',
      title_en: 'Humanities Library'
    });
    locations.pushObject({
      id: 2,
      identifier: 'Ge',
      title_sv: 'Ekonomiska biblioteket',
      title_en: 'Economics Library'
    });
    locations.pushObject({
      id: 4,
      identifier: 'Gm',
      title_sv: 'Biomedicinska biblioteket',
      title_en: 'Biomedical Library'
    });
    locations.pushObject({
      id: 5,
      identifier: 'Gp',
      title_sv: 'Pedagogiska biblioteket',
      title_en: 'Education Library'
    });
    locations.pushObject({
      id: 6,
      identifier: 'Gk',
      title_sv: 'Samhällsvetenskapliga biblioteket',
      title_en: 'Social Sciences Library'
    });
    locations.pushObject({
      id: 7,
      identifier: 'Ghdk',
      title_sv: 'Konstbiblioteket',
      title_en: 'Art Library'
    });
    locations.pushObject({
      id: 8,
      identifier: 'Gumu',
      title_sv: 'Biblioteket för musik och dramatik',
      title_en: 'Music and Drama Library'
    });
    //locations.pushObject({id:8, identifier: 'Gcl', title_sv: 'Campus Linné', title_en: 'Learning Centre Campus Linné'});
    this.set("locations", locations);

    var orderTypes = A([]);
    orderTypes.pushObject({
      id: 1,
      identifier: 'article',
      auth_required: false,
      title_sv: 'Artikelkopia',
      title_en: 'Copy of article'
    });
    orderTypes.pushObject({
      id: 2,
      identifier: 'book',
      auth_required: true,
      title_sv: 'Bok',
      title_en: 'Loan'
    });
    orderTypes.pushObject({
      id: 3,
      identifier: 'chapter',
      auth_required: false,
      title_sv: 'Kopia av bokkapitel',
      title_en: 'Copy of book chapter'
    });
    orderTypes.pushObject({
      id: 4,
      identifier: 'score',
      auth_required: true,
      title_sv: 'Musiktryck',
      title_en: 'Score'
    });
    orderTypes.pushObject({
      id: 5,
      identifier: 'microfilm',
      auth_required: false,
      title_sv: 'Mikrofilmad dagstidning',
      title_en: 'Microfilm newspaper'
    });
    this.set("orderTypes", orderTypes);

    var customerTypes = A([]);
    customerTypes.pushObject({
      id: 1,
      identifier: 'univ',
      title_sv: 'Forskare/anställd/doktorand vid GU',
      title_en: 'Researcher/staff/PhD student at GU'
    });
    customerTypes.pushObject({
      id: 2,
      identifier: 'stud',
      title_sv: 'Student',
      title_en: 'Student'
    });
    customerTypes.pushObject({
      id: 3,
      identifier: 'sahl',
      title_sv: 'Anställd inom Västra Götalandsregionen',
      title_en: 'Staff at Region Västra Götaland'
    });
    customerTypes.pushObject({
      id: 4,
      identifier: 'priv',
      title_sv: 'Privatperson',
      title_en: 'Private individual'
    });
    customerTypes.pushObject({
      id: 5,
      identifier: 'ftag',
      title_sv: 'Företag',
      title_en: 'Company'
    });
    customerTypes.pushObject({
      id: 6,
      identifier: 'dist',
      title_sv: 'Distansstudent',
      title_en: 'Distance student'
    });
    customerTypes.pushObject({
      id: 7,
      identifier: 'ovri',
      title_sv: 'Övriga',
      title_en: 'Other'
    });

    this.set("customerTypes", customerTypes);

    var deliveryMethods = A([]);
    deliveryMethods.pushObject({
      id: 1,
      identifier: 'pickup',
      title_internal: "Hämtas",
      title_sv: 'Hämtas på bibliotek',
      title_en: 'Pickup at library'
    });
    deliveryMethods.pushObject({
      id: 2,
      identifier: 'send',
      title_internal: "Skickas",
      title_sv: 'Skickas till adress',
      title_en: 'Send to my address'
    });
    this.set("deliveryMethods", deliveryMethods);
  },

  /** Order **/
  order: storageFor('order'),

  //FIXME: @each?
  selectedLocation: computed('order.selectedLocation', 'locations', function() {
    return this.get('locations').findBy('identifier', this.get('order.selectedLocation'));
  }),
  selectedOrderType: computed('order.selectedOrderType', 'orderTypes', function() {
    return this.get('orderTypes').findBy('identifier', this.get('order.selectedOrderType'));
  }),
  selectedCustomerType: computed('order.selectedCustomerType', 'customerTypes', function() {
    return this.get('customerTypes').findBy('identifier', this.get('order.selectedCustomerType'));
  }),
  selectedDeliveryMethod: computed('order.selectedDeliveryMethod', 'deliveryMethods', function() {
    return this.get('deliveryMethods').findBy('identifier', this.get('order.selectedDeliveryMethod'));
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
