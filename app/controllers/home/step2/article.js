import Controller from '@ember/controller';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  applicationController: inject_controller('application'),
  i18n: inject_service(),

  isPagesValid: computed.notEmpty('applicationController.orderDetailsArticle.pages'),

  isPublicationYearValid: computed.notEmpty('applicationController.orderDetailsArticle.publicationYear'),

  isJournalTitleValid: computed.notEmpty('applicationController.orderDetailsArticle.journalTitle'),

  isFormComplete: computed('isPagesValid', 'isPublicationYearValid', 'isJournalTitleValid', function() {
    return (this.get('isPagesValid') && this.get('isPublicationYearValid') && this.get('isJournalTitleValid'));
  }),

  isPubMedButtonEnabled: computed.gte('applicationController.pubMedId.length', 1),

  actions: {
    back: function() {
      this.transitionToRoute("home.step1");
    },
    nextStep: function() {
      this.transitionToRoute("home.step3");
    }
  }
});
