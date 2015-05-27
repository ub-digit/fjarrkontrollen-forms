import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  pubMedIdBinding: 'controllers.application.pubMedId',

  isFormComplete: function() {
    if (this.get('controllers.application.orderDetails.article.pages') && this.get('controllers.application.orderDetails.article.publicationYear') && this.get('controllers.application.orderDetails.article.journalTitle')) {
      return true;
    }
    else {
      return false;
    }
  }.property('controllers.application.orderDetails.article.pages','controllers.application.orderDetails.article.publicationYear', 'controllers.application.orderDetails.article.journalTitle'),


  isPubMedButtonEnabled: Ember.computed.gte('pubMedId.length', 1),


  actions: {
    back: function() {
      this.transitionToRoute("home.step1");
    },
    nextStep: function() {
      this.transitionToRoute("home.step3");
    }
  }


});
