import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  pubMedId: null,

  isNextEnabled: function() {
    if (this.get('controllers.application.orderDetails.article.pages') && this.get('controllers.application.orderDetails.article.publicationYear')) {
      return true;
    }
    else {
      return false;
    }
  }.property('controllers.application.orderDetails.article.pages','controllers.application.orderDetails.article.publicationYear'),


  isPubMedButtonEnabled: Ember.computed.gte('pubMedId.length', 2),


  validatePublicationYear: function() {
    var year = this.get("controllers.application.orderDetails.article.publicationYear");
    this.set("ErrorPublicationYear", "");
    if (!year) {
      return false;
    }
    // check if number
    if (isNaN(year)) {
      // not a number
      this.set("ErrorPublicationYear", "Endast siffror.");
      return "has-error";
    }
    if (year.length !== 4) {
      if (year.length > 4) {
        var str = this.get('controllers.application.orderDetails.article.publicationYear');
        this.set("controllers.application.orderDetails.article.publicationYear", str.substring(0,4));
      }
      else {
        this.set("ErrorPublicationYear", "Minst 4 tecken (t ex 2004)");
        return 'has-warning';
      }
    }
    //	this.set("ErrorPublicationYear", "");
    return "has-success has-feedback";
  }.property('controllers.application.orderDetails.article.publicationYear'),

  actions: {
    back: function() {
      this.transitionToRoute("home.step1");
    },
    nextStep: function() {
      this.transitionToRoute("home.step3");
    }
  }


});
