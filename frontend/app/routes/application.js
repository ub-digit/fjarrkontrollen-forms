import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { storageFor } from 'ember-local-storage';
import ENV from 'frontend/config/environment';
import { hash } from 'rsvp';
import { computed } from '@ember/object';

export default Route.extend(ApplicationRouteMixin, {
  i18n: service(),
  session: service(),
  ajax: service(),
  auth: service(),
  order: storageFor('order'),

  routeAfterAuthentication: computed('order.orderPath', function() {
    // TODO: Duplicate code, also in routes/login.js
    return this.get('order.orderPath') === 'SFX' ? 'home.customer-details' : 'home.order-details';
  }),

  model(params) {
    if (params.lang) {
      this.set('i18n.locale', params.lang);
    }
    this.set('params', params);

    let ajax = this.get('ajax');
    let serviceUrl = ENV.APP.fjarrkontrollenServiceUrl;
    let promises = {
      locations: ajax.request(`${serviceUrl}/pickup_locations?show_only_available=true`).then((data) => {
        return data['pickup_locations'];
      }),
      orderTypes: ajax.request(`${serviceUrl}/order_types`).then((data) => {
        return data['order_types'];
      }),
      deliveryMethods: ajax.request(`${serviceUrl}/delivery_methods`).then((data) => {
        return data['delivery_methods'];
      }),
      customerTypes: ajax.request(`${serviceUrl}/customer_types`).then((data) => {
        return data['customer_types'];
      })
    };
    return hash(promises);
  },

  afterModel(model) {
    this.get('auth').set('orderTypes', model.orderTypes);
  },

  customerDetails: storageFor('customer-details'),
  order: storageFor('order'),

  sessionAuthenticated() {
    //TODO: Also run this on restored??
    this._super(...arguments);
    this.controllerFor('application').setDataFromSession();
  },

  setupController: function(controller, model) {
    controller.setProperties(model);

    let params = this.get('params');

    if (params.is_sfx === 'yes') {
      controller.resetAllData();
      controller.set('order.orderPath', 'SFX');

      // set the correct order type based on param rft_genre
      if (params.rft_genre === 'book' || params.rft_genre === 'dissertation') {
        controller.set('order.selectedOrderType', 'loan');
      }
      else if (params.rft_genre === 'bookitem') {
        controller.set('order.selectedOrderType', 'photocopy_chapter');
      }
      else {
        controller.set('order.selectedOrderType', 'photocopy');
      }

      // populate order details with data from params
      if (params.isbn_issn) {
        controller.set('orderDetailsArticle.issn', params.isbn_issn);
        controller.set('orderDetailsBook.isbn', params.isbn_issn);
        controller.set('orderDetailsChapter.isbn', params.isbn_issn);
      }

      if (params.book_title) {
        controller.set('orderDetailsBook.bookTitle', params.book_title);
        controller.set('orderDetailsChapter.bookTitle', params.book_title);
      }

      if (params.journal_title) {
        controller.set('orderDetailsArticle.journalTitle', params.journal_title);
      }

      if (params.title_of_article) {
        controller.set('orderDetailsArticle.articleTitle', params.title_of_article);
        controller.set('orderDetailsChapter.chapterTitle', params.title_of_article);
      }

      if (params.author) {
        controller.set('orderDetailsArticle.authors', params.author);
        controller.set('orderDetailsBook.authors', params.author);
        controller.set('orderDetailsChapter.authors', params.author);
      }

      if (params.year) {
        controller.set('orderDetailsArticle.publicationYear', params.year);
        controller.set('orderDetailsBook.publicationYear', params.year);
        controller.set('orderDetailsChapter.publicationYear', params.year);
      }

      if (params.volume) {
        controller.set('orderDetailsArticle.volume', params.volume);
      }

      if (params.issue) {
        controller.set('orderDetailsArticle.issue', params.issue);
      }

      if (params.pages) {
        controller.set('orderDetailsArticle.pages', params.pages);
        controller.set('orderDetailsChapter.pages', params.pages);
      }

      [
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
      ].forEach(function(item) {
        controller.set(item, null);
      });

      let step = this.get('auth.required') ? 'home.login' : 'home.customer-details';
      this.set('order.currentStep', step);
      this.transitionTo(step);
    }
  },

  actions: {
    toggleLang() {
      if (this.get("i18n.locale") === 'en') {
        this.set('i18n.locale', 'sv');
        this.controllerFor('application').set('lang', 'sv');
      }
      else {
        this.set('i18n.locale', 'en');
        this.controllerFor('application').set('lang', 'en');
      }
    },

    orderNew() {
      this.controllerFor('application').orderNew();
    },

    orderAnother() {
      this.controllerFor('application').orderAnother();
    }
  }
});
