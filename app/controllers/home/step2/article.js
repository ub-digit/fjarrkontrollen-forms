import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  pubMedIdBinding: 'controllers.application.pubMedId',

  isPagesValid: Ember.computed.notEmpty('controllers.application.orderDetails.article.pages'),

  isPublicationYearValid: Ember.computed.notEmpty('controllers.application.orderDetails.article.publicationYear'),

  isJournalTitleValid: Ember.computed.notEmpty('controllers.application.orderDetails.article.journalTitle'),
  
  isFormComplete: Ember.computed('isPagesValid', 'isPublicationYearValid', 'isJournalTitleValid', function() {
    return (this.get('isPagesValid') && this.get('isPublicationYearValid') && this.get('isJournalTitleValid'));
  }),


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
