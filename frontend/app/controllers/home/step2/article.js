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

  isFormComplete: computed.and('isPagesValid', 'isPublicationYearValid', 'isJournalTitleValid'),

  isPubMedButtonEnabled: computed.notEmpty('applicationController.orderDetailsArticle.pubMedId'),

  actions: {
    back: function() {
      this.transitionToRoute("home.step1");
    },
    nextStep: function() {
      let step = "home.step3";
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }
});
