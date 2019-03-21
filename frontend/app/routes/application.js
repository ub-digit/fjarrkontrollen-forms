import Route from '@ember/routing/route';
import { inject as service} from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { storageFor } from 'ember-local-storage';

export default Route.extend(ApplicationRouteMixin, {
  i18n: service(),
  session: service(),

  routeAfterAuthentication: 'home.step2',
  routeIfAlreadyAuthenticated: 'home.step2',

  model: function(params) {
    if (params.lang) {
      this.set('i18n.locale', params.lang);
    }
    return params;
  },

  customerDetails: storageFor('customer-details'),

  sessionAuthenticated() {
    //TODO: Also run this on restored??
    this._super(...arguments);
    let user = this.get('session.data.authenticated.user');
    this.set('customerDetails.name', user.get('first_name') + ' ' + user.get('last_name')); //computed prop on storage?
    this.set('customerDetails.emailAddress', user.get('email'));
    //this.set('customerDetails.organisation', user.get('')); //attribute in Koha for this?
    //this.set('customerDetails.department', user.get('')); //attribute in Koha for this?
    //this.set('customerDetails.unit', user.get('')); //attribute in Koha for this?
    this.set('customerDetails.address', user.get('address'));
    this.set('customerDetails.postalCode', user.get('zipcode'));
    this.set('customerDetails.city', user.get('city'));
    this.set('customerDetails.libraryCardNumber', user.get('cardnumber'));
    this.set('customerDetails.xAccount', user.get('xaccount'));
  },

  setupController: function(controller, model) {
    if (model.is_sfx === 'yes') {

      controller.set("orderPath", "SFX");

      // set the correct order type based on param rft_genre
      if (model.rft_genre === 'book' || model.rft_genre === 'dissertation') {
        controller.set("selectedOrderType", controller.get("orderTypes").findBy('identifier', 'book'));
      }
      else if (model.rft_genre === 'bookitem') {
        controller.set("selectedOrderType", controller.get("orderTypes").findBy('identifier', 'chapter'));
      }
      else {
        controller.set("selectedOrderType", controller.get("orderTypes").findBy('identifier', 'article'));
      }

      // populate order details with data from params
      if (model.isbn_issn) {
        controller.set("orderDetailsArticle.issn", model.isbn_issn);
        controller.set("orderDetailsBook.isbn", model.isbn_issn);
        controller.set("orderDetailsChapter.isbn", model.isbn_issn);
      }

      if (model.book_title) {
        controller.set("orderDetailsBook.bookTitle", model.book_title);
        controller.set("orderDetailsChapter.bookTitle", model.book_title);
      }

      if (model.journal_title) {
        controller.set("orderDetailsArticle.journalTitle", model.journal_title);
      }

      if (model.title_of_article) {
        controller.set("orderDetailsArticle.articleTitle", model.title_of_article);
        controller.set("orderDetailsChapter.chapterTitle", model.title_of_article);
      }

      if (model.author) {
        controller.set("orderDetailsArticle.authors", model.author);
        controller.set("orderDetailsBook.authors", model.author);
        controller.set("orderDetailsChapter.authors", model.author);
      }

      if (model.year) {
        controller.set("orderDetailsArticle.publicationYear", model.year);
        controller.set("orderDetailsBook.publicationYear", model.year);
        controller.set("orderDetailsChapter.publicationYear", model.year);
      }

      if (model.volume) {
        controller.set("orderDetailsArticle.volume", model.volume);
      }

      if (model.issue) {
        controller.set("orderDetailsArticle.issue", model.issue);
      }

      if (model.pages) {
        controller.set("orderDetailsArticle.pages", model.pages);
        controller.set("orderDetailsChapter.pages", model.pages);
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
      this.transitionTo("sfx.step1");
    }
  },

  actions: {
    resetForm: function() {
      this.controllerFor("application").resetAllData();
    },

    toggleLang: function() {
      if (this.get("i18n.locale") === 'en') {
        this.set('i18n.locale', 'sv');
        this.controllerFor("application").set("lang", 'sv');
      }
      else {
        this.set('i18n.locale', 'en');
        this.controllerFor("application").set("lang", 'en');
      }
    },

    orderAnother: function() {
      this.controllerFor("application").orderAnother();
    }
  }
});
