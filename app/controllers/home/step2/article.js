import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  pubMedIdBinding: 'controllers.application.pubMedId',

  isFormComplete: function() {
    if (this.get('controllers.application.orderDetails.article.pages') && this.get('controllers.application.orderDetails.article.publicationYear')) {
      return true;
    }
    else {
      return false;
    }
  }.property('controllers.application.orderDetails.article.pages','controllers.application.orderDetails.article.publicationYear'),


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
