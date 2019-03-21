import OrderDetailsController from 'frontend/mixins/order-details-controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default OrderDetailsController.extend({
  i18n: inject(),

  isPagesValid: computed.notEmpty('applicationController.orderDetailsArticle.pages'),

  isPublicationYearValid: computed.notEmpty('applicationController.orderDetailsArticle.publicationYear'),

  isJournalTitleValid: computed.notEmpty('applicationController.orderDetailsArticle.journalTitle'),

  isFormComplete: computed.and('isPagesValid', 'isPublicationYearValid', 'isJournalTitleValid'),

  isPubMedButtonEnabled: computed.notEmpty('applicationController.orderDetailsArticle.pubMedId'),

});
